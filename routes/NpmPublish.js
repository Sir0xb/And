/*
上传文件到public/cdn-repo目录，并发布到私有npm

*/

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var unzip = require('unzip');
var exec = require('child_process').exec;

function execSequence(commands, callback, breakOnError) {
    var onSuccessOnly  = onSuccessOnly || false,
        BreakException = {};

    try {
        commands.forEach(function (command) {
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    if (breakOnError) {
                        throw BreakException;
                    } else {
                        callback(error, stderr, command);
                    }
                } else {
                    callback(null, stdout, command);
                }
            });
        });
    } catch (ex) {
        if (breakOnError) {
            return;
        }
    }
}

module.exports = function(app) {

    app.post("/upload/cdn-repo", function (req, res, next) {
    	var form = new formidable.IncomingForm();
	    form.uploadDir = path.resolve(__dirname, '..', 'public/tmp'); //文件保存的临时目录为当前项目下的tmp文件夹
	    if (!fs.existsSync(form.uploadDir)) {
            fs.mkdir(form.uploadDir);
        }
	    form.maxFieldsSize = 100 * 1024 * 1024;  //用户头像大小限制为最大100M
	    form.keepExtensions = true;        //使用文件的原扩展名
	    form.parse(req, function (err, fields, file) {
	        var filePath = '';
	        var originFileName = '';
	        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
	        if(file.tmpFile){
	            filePath = file.tmpFile.path;
	            originFileName = file.tmpFile.name;
	        } else {
	            for(var key in file){
	                if( file[key].path && filePath==='' ){
	                    filePath = file[key].path;
	                    originFileName = file[key].name;
	                    break;
	                }
	            }
	        }
	        //文件移动的目录文件夹，不存在时创建目标文件夹
	        var targetDir = path.resolve(__dirname, '..', 'public/cdn-repo/lib');
	        if (!fs.existsSync(targetDir)) {
	            fs.mkdir(targetDir);
	        }
            var targetFile = path.join(targetDir, originFileName);
            //移动文件
            fs.rename(filePath, targetFile, function (err) {
                if (err) {
                    console.info(err);
                    res.json({success: false, message:'操作失败'});
                } else {
                    //解压文件
                    var folderName = originFileName.substring(0, originFileName.length-4);
                    var targetPath = path.join(targetDir, folderName);
                    fs.createReadStream(targetFile).pipe(unzip.Extract({ path: targetDir }));
                    
                    //删除压缩包
                    fs.unlink(targetFile);

                    //发布到npm
                    var publicPath = '';
                    console.log(targetPath)
                    fs.readdir(targetPath, function(err, files){
                    	if(err){
                    		res.json({success: false, message: err});
                    	}
                    	else{                    		
                    		var cmdArray = [];
                    		files.forEach(function(item){
                    			var cmd = 'npm publish '+path.join(targetPath, item);
                    			console.log(cmd)
                    			cmdArray.push(cmd);
                    		});
                    		execSequence(cmdArray, function(err){
                    			if(err){
                    				res.json({success: false, message: err});
                    			}
                    			else{
                    				res.json({success: true });
                    			}
                    		});
                    	}
                    })
                    
                }
            });

	    });

    });
};
