define(['knockout', 'Tools', 'uploader', 'marked', 'hljs', '../../../lib/YQuploader-1.0/skins/default/tpl', './dataMap', 'sweetalert', 'css!../../../lib/YQuploader-1.0/skins/default/style', 'css!../../../lib/highlight/styles/monokai-sublime', 'css!../../../lib/sweetalert/sweetalert.css', 'ko-mapping'], function(ko, $tools, YQuploader, marked, highlight, skin, dataMap, swal){
	return function (context) {
		var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.types = dataMap.types;

        self.addFile = function(){
        	this.files.push({name: ko.observable(''), devUrl: ko.observable(''), cdn: ko.observable('')});
        }

        self.addVersion = function(){
        	self.formData.versionPackage.push({version: ko.observable(''), files: ko.observableArray([{name: ko.observable(''), devUrl: ko.observable(''), cdn: ko.observable('')}])});
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
        			swal("保存成功！", "", "success")
        		}
        	});
        }

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
				return highlight.highlightBlock($('<code>'+code+'</code>')[0]);
			}
		});

        self.parsedUseMethod = ko.computed(function(){
        	return marked(self.formData.useMethod());
        });

        //debug
        window.edit = self;


	};
});