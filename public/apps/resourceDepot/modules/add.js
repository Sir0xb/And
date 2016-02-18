define(['knockout', 'Tools', 'uploader', 'marked', 'hljs', '../../../lib/YQuploader-1.0/skins/default/tpl', './dataMap', 'css!../../../lib/YQuploader-1.0/skins/default/style', 'css!../../../lib/highlight/styles/monokai-sublime', 'ko-mapping'], function(ko, $tools, YQuploader, marked, highlight, skin, dataMap){
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
        			
        		}
        	});
        }

        $('body').on('add_page_ready', function(){
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
					self.formData.demoUrls.push({name: data.message.name, url: data.message.url});
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
			versionPackage: ko.observableArray([{version: ko.observable(''), files: ko.observableArray([{name: ko.observable(''), devUrl: ko.observable(''), cdn: ko.observable('')}])}])
        };

        marked.setOptions({
			highlight: function (code, lang, callback) {
				return highlight.highlightBlock($('<code>'+code+'</code>')[0]);
			}
		});

        self.parsedUseMethod = ko.computed(function(){
        	return marked(self.formData.useMethod());
        });

        //debug
        window.add = self;


	};
});