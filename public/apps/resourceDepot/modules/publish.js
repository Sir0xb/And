define(['knockout', "Super", 'Tools', 'uploader', 'uploader_skin'], function(ko, Super, $tools, YQuploader, skin){
	return function (context) {
		var self = Super.call(this, context);

		$('body').on('publish_page_ready', function(){
			var uploader = new YQuploader({
				server: '/upload/cdn-repo',
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
                    
				}
			});
		});
	}
});