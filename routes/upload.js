var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = function(app) {
    
    app.post("/upload", function (req, res, next) {
    	var form = new formidable.IncomingForm();
	    form.uploadDir = path.resolve(__dirname, '..', 'public/tmp'); //文件保存的临时目录为当前项目下的tmp文件夹
	    form.maxFieldsSize = 100 * 1024 * 1024;  //用户头像大小限制为最大100M  
	    form.keepExtensions = true;        //使用文件的原扩展名
	    form.parse(req, function (err, fields, file) {
	        var filePath = '';
	        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
	        if(file.tmpFile){
	            filePath = file.tmpFile.path;
	        } else {
	            for(var key in file){
	                if( file[key].path && filePath==='' ){
	                    filePath = file[key].path;
	                    break;
	                }
	            }
	        }
	        //文件移动的目录文件夹，不存在时创建目标文件夹
	        var targetDir = path.resolve(__dirname, '..', 'public/upload');
	        if (!fs.existsSync(targetDir)) {
	            fs.mkdir(targetDir);
	        }
	        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
	        
            //以当前时间戳对上传文件进行重命名
            var fileName = new Date().getTime() + fileExt;
            var targetFile = path.join(targetDir, fileName);
            //移动文件
            fs.rename(filePath, targetFile, function (err) {
                if (err) {
                    console.info(err);
                    res.json({success: false, message:'操作失败'});
                } else {
                    //上传成功，返回文件的相对路径
                    var fileUrl = '/upload/' + fileName;
                    res.json({success: true, message: {name: fileName, url: fileUrl} });
                }
            });
	        
	    });

    });
};
