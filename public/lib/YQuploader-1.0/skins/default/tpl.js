(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        root.skin_tpl = factory();
    }
}(this, function () {
    var tpl = [
        '<div class="uploader_skin_default">',
            '<div class="uploader_list"></div>',
            '<div class="uploader_btn">',
                '<div class="uploader_pick">选择文件</div>',
            '</div>',
            '<div class="uploader_valid_error"></div>',
        '</div>'
    ];

    var createItemHTML = function(file, instance){
        var itemHTML = [
            '<div class="uploader_list_item" id="'+instance.id+'-'+file.id+'">',
                '<div class="uploader_filename">'+file.name+'</div>',
                '<div class="uploader_progress">',
                    '<div class="uploader_progress_bar" style="width:0%;"></div>',
                '</div>',
                '<div class="uploader_progress_text">0%</div>',
                '<div class="uploader_info_success"></div>',
                '<div class="uploader_info_error"></div>',
            '</div>'
        ];
        return itemHTML.join('');
    }

    var initEvent = function(instance, container, config){
        var uploaderList = $('.uploader_list', container);
        instance.on('fileQueued', function(file){
            uploaderList.append(createItemHTML(file, instance));
            $('.uploader_pick, .uploader_tips', container).addClass('webuploader-element-invisible');
            $('.uploader_valid_error', container).html('');
            config.onCustomFileQueued && typeof config.onCustomFileQueued == 'function' && config.onCustomFileQueued(file);
        })
        .on('filesQueued', function(files){
            config.onCustomFilesQueued && typeof config.onCustomFilesQueued == 'function' && config.onCustomFilesQueued(files);
        })
        .on('beforeFileQueued', function(file){
            config.onCustomBeforeFileQueued && typeof config.onCustomBeforeFileQueued == 'function' && config.onCustomBeforeFileQueued(file);
        })
        .on('uploadProgress', function(file, percentage){
            var percentText = parseInt(percentage * 100) + '%';
            $('.uploader_progress_bar', container).css('width', percentText);
            $('.uploader_progress_text', container).text(percentText);
        })
        .on('uploadSuccess', function(file, data){
            if(data.success){
                $('.uploader_info_error', container).html('').hide();
                config.onCustomUploadSuccess && typeof config.onCustomUploadSuccess == 'function' && config.onCustomUploadSuccess(file, data);
            }
            else{
                instance.trigger('uploadError', file, data.error||'');
            }
        })
        .on('uploadError', function(file, reason){
            $('.uploader_info_success', container).text('');
            $('.uploader_info_error', container).html('上传失败，'+reason+'，<a href="javascript:void(0);" class="uploader_reupload">重新上传</a>').show();
            config.onCustomUploadError && typeof config.onCustomUploadError == 'function' && config.onCustomUploadError(file, reason);
        })
        .on('uploadComplete', function(file){
            $('.uploader_progress, .uploader_progress_text', container).fadeOut(200);
            config.onCustomUploadcomplete && typeof config.onCustomUploadcomplete == 'function' && config.onCustomUploadcomplete(file);
        })
        .on('error', function(type){
            var errorText = instance.errorTextMap[type] || '文件不合法';
            $('.uploader_valid_error', container).text(errorText);

        })
        .on('all', function(type){
            //console.log('事件触发：'+type);
        });

        container.on('click', '.uploader_reupload', function(){
            container.find('input[type="file"]').trigger('click');
            config.onCustomReupload && typeof config.onCustomReupload == 'function' && config.onCustomReupload();
        })
    }

    return {
        tpl: tpl.join(''),
        initEvent: initEvent
    }
}));