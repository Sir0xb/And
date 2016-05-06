define(['knockout', "Super", 'Tools', 'uploader', 'marked', 'hljs', 'uploader_skin', './dataMap', 'sweetalert', 'css!css_monokai', 'ko-mapping'], function(ko, Super, $tools, YQuploader, marked, highlight, skin, dataMap, swal){
	return function (context) {
		var self = Super.call(this, context);

        self.types = dataMap.types;

        var cdnPrefix = 'http://cdn-static-shared.test.17zuoye.net/s17/';

        self.addFile = function(){
            var _this = this;
            var newFile = {
                name: ko.observable('')
            }

            newFile.devUrl = ko.computed(function(){
                return 'lib/' + self.formData.title() + '/' + _this.version() + '/' + 'dist/' + newFile.name();
            });

            newFile.cdn = ko.computed(function(){
                return cdnPrefix + newFile.devUrl();
            });
        	this.files.push(newFile);
        };

        self.addVersion = function(){
            
            var newVersion = {
                version: ko.observable(''), 
                files: ko.observableArray([])
            }
            /*var newFile = {
                name: ko.observable('')
            }

            newFile.devUrl = ko.computed(function(){
                return 'lib/' + self.formData.title() + '/' + newVersion.version() + '/' + 'dist/' + newFile.name();
            });

            newFile.cdn = ko.computed(function(){
                return cdnPrefix + newFile.devUrl();
            });

            newVersion.files.push(newFile);*/

            self.addFile.call(newVersion);

        	self.formData.versionPackage.push(newVersion);
        };

        self.removeVersion = function(){
            self.formData.versionPackage.remove(this);
        }

        self.submit = function(){
        	var sdata = ko.mapping.toJS(self.formData);
        	console.log(sdata);
        	$tools.ajax({
        		url: '/resourceDepot/save',
        		data: {resource: sdata},
        		success: function(data){
                    swal({
                        title: '保存成功！',
                        type: 'success',
                        timer: 2000
                    });
        			swal("保存成功！", "", "success");
        		}
        	});
        };

        $('body').on('edit_page_ready', function(){
            //如果有id，则是编辑进来的，初始化数据
            if(self.data.itemId){
                $tools.ajax({
                    url: '/resourceDepot/get',
                    data: {id: self.data.itemId},
                    success: function(data){
                        ko.mapping.fromJS(data.data, self.formData);
                    }
                });
            }


        	//初始化上传控件
	        var uploader = new YQuploader({
				server: '/upload',
				accept:{
					title: 'html',
					extensions: 'html,htm,zip,png,pdf,gif'
				},
				auto: true,
				skin_tpl: skin,
				pick:{
					id: '.uploader_pick',
	                label: '',
					innerHTML: '上传',
	                multiple: true
				},
				onCustomUploadSuccess: function(file, data){
                    self.formData.demoUrls.removeAll();
					self.formData.demoUrls.push(data.message.url);
				}
			});
        });

        self.formData = ko.mapping.fromJS(dataMap.resource);

        marked.setOptions({
			highlight: function (code, lang, callback) {
				return highlight.highlightBlock($('<xmp>'+code+'</xmp>')[0]);
			}
		});

        self.parsedUseMethod = ko.computed(function(){
        	return marked(self.formData.useMethod());
        });

        if (self.data.test) {
        	edit = self;
        }
	};
});
