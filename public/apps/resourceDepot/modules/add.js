define(['knockout', 'uploader', 'marked', 'highlight', '../../../lib/YQuploader-1.0/skins/default/tpl', 'css!../../../lib/YQuploader-1.0/skins/default/style'], function(ko, YQuploader, marked, highlight, skin){
	return function (context) {
		var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.types = [
        	{
	        	name: 'PC端',
	        	value: 1
	        },
	        {
	        	name: '移动端',
	        	value: 2
	        },
        ];

        self.addFile = function(){
        	this.files.push({name: ko.observable(''), devUrl: ko.observable(''), cdn: ko.observable('')});
        }

        self.addVersion = function(){
        	self.formData.versionPackage.push({version: ko.observable(''), files: ko.observableArray([{name: ko.observable(''), devUrl: ko.observable(''), cdn: ko.observable('')}])});
        }

        $('body').on('add_page_ready', function(){
        	//初始化上传控件
	        var uploader = new YQuploader({
				server: '/test/YQuploader-1.0/server/fileupload.php',
				accept:{
					title: 'html',
					extensions: 'html,htm,zip,png,pdf'
				},
				auto: true,
				skin_tpl: skin,
				pick:{
					id: '.uploader_pick',
	                label: '',
					innerHTML: '上传',
	                multiple: true
				},
				onCustomUploadSuccess: function(){
					
				}
			});
        });


        self.formData = {
        	id: ko.observable(''),
        	title: ko.observable(''),
        	type: ko.observable(''),
        	description: ko.observable(''),
			useMethod: ko.observable(''),
			demoUrls: ko.observableArray([]),
			siteUrl: ko.observable(''),
			owner: ko.observable(''),
			ownerQQ: ko.observable(''),
			comment: ko.observable(''),
			lastModified: ko.observable(''),
			versionPackage: ko.observableArray([{version: ko.observable(''), files: ko.observableArray([{name: ko.observable(''), devUrl: ko.observable(''), cdn: ko.observable('')}])}])
        };

        marked.setOptions({
			highlight: function (code) {
				return require('highlight.js').highlightAuto(code).value;
			}
		});

        self.parsedUseMethod = ko.computed(function(){
        	return marked(self.formData.useMethod());
        });

        //debug
        window.add = self;


	};
});