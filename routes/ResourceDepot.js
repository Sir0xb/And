var Tools = require("./resTools");

module.exports = function(app) {
	var ResourceDao = require("../models/resourceDao");
    app.get("/resourceDepot", function (req, res, next) {
        Tools.log('ResourceDepot', 'get', 'resourceDepot', '请求访问资源库', 'resourceDepot');

        Tools.pageJump(req, res, next, "index.html", "资源仓库", "resourceDepot");
    });

    app.post("/resourceDepot/save", function(req, res, next){
    	var resource = req.body.resource;

        //有id则为编辑更新
        if(resource.id){
            Tools.log("Resource", "post", "resource/save", "更新资源");

            ResourceDao.updateById(resource, function(err, data){
                if(err){
                    res.send({success: false, error: err});
                }
                else{
                    res.send({success: true, data: data});
                }
            });
        }
        else{
            Tools.log("Resource", "post", "resource/save", "添加资源");

            ResourceDao.save(resource, function(err, data){
                if(err){
                    res.send({success: false, error: err});
                }
                else{
                    res.send({success: true, data: data});
                }
            });
        }

        
    });

    app.post("/resourceDepot/list", function(req, res, next){
    	Tools.log("Resource", "post", "resource/list", "资源列表");

    	ResourceDao.list(function(err, data){
    		if(err){
				res.send({success: false, error: err});
			}
			else{
				res.send({success: true, data: data});
			}
    	});
    });

    app.post("/resourceDepot/get", function(req, res, next){

        var id = req.body.id;

        Tools.log("Resource", "post", "resource/get", "获取资源");

        ResourceDao.findById(id, function(err, data){
            if(err){
                res.send({success: false, error: err});
            }
            else{
                res.send({success: true, data: data});
            }
        });
    });

    app.post("/resourceDepot/remove", function(req, res, next){
        var id = req.body.id;
        Tools.log("Resource", "post", "resource/remove", "删除资源");
        ResourceDao.remove(id, function(err, data){
            if(err){
                res.send({success: false, error: err});
            }
            else{
                res.send({success: true, data: data});
            }
        });
    });

};
