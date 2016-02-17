var Tools = require("./resTools");

module.exports = function(app) {
	var ResourceDao = require("../models/resourceDao");
    app.get("/resourceDepot", function (req, res, next) {
        Tools.log('ResourceDepot', 'get', 'resourceDepot', '请求访问资源库', 'resourceDepot');

        Tools.pageJump(req, res, next, "index.html", "资源仓库", "resourceDepot");
    });

    app.post("/resourceDepot/save", function(req, res, next){
    	var resource = req.body.resource;

        Tools.log("Resource", "post", "resource/save", "添加资源");

    	ResourceDao.save(resource, function(err, data){
    		if(err){
				res.send({success: false, error: err});
			}
			else{
				res.send({success: true, data: data});
			}
    	});
    });

};
