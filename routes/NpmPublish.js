/*
上传文件到public/cdn-repo目录，并发布到私有npm

*/

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var unzip = require('unzip');

module.exports = function(app) {

    app.post("/upload/cdn-repo", function (req, res, next) {
    	var form = new formidable.IncomingForm();
	    form.uploadDir = path.resolve(__dirname, '..', 'public/tmp'); //文件保存的临时目录为当前项目下的tmp文件夹
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
	        var targetDir = path.resolve(__dirname, '..', 'public/cdn-repo');
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
                    fs.createReadStream(targetFile).pipe(unzip.Extract({ path: targetPath }));
                    
                    //删除压缩包
                    fs.unlink(targetFile);

                    //发布到npm
                    console.log(targetPath)
                    var exec = require('child_process').exec;

                	exec('npm publish '+targetPath, function (error, stdout, stderr) {
						if (error !== null) {
							console.log('exec error: ' + error);
							res.json({succ: false, message: error});
						}
						res.json({success: true, message: {name: filePath, url: ''} });
					});
                    
                }
            });

	    });

    });
};
