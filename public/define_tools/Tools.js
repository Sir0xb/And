define(['sweetalert'], function (sweetalert) {
    var version = "0.0.3";

    var Tools = {};

    function extend(child, parent) {
        var key;
        for(key in parent){
            if(parent.hasOwnProperty(key)){
                child[key] = parent[key];
            }
        }
    }

    function include(child, parent) {
        var key;
        for(key in parent){
            if(parent.hasOwnProperty(key)){
                child.prototype[key] = parent[key];
            }
        }
    }

    function namespace() {
        var space = arguments[0];
        var str = "window.";
        space = space.split(".");
        for(var i = 0, len = space.length; i < len; i++){
            str += space[i];

            if(i == len - 1 && arguments.length == 2){
                eval("if(!" + str + "){ " + str + " = '" + arguments[1] + "';}");
            }else{
                eval("if(!" + str + "){ " + str + " = {};}");
            }

            str += ".";
        }
        return true;
    }

    function guid(format) {
        return format.toLowerCase().replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    function backToTop(time) {
        $('html, body').animate({scrollTop: '0px'}, time || 0);
    }

    function replaceAll(target, str1, str2) {
        return target.replace(new RegExp(str1, "gm"), str2);
    }

    //显示loading图标
    function loadingStart(showmask) {
        if(showmask){
            var mask = $('.loadingmask');
            if(mask.length == 0){
                mask = $('<div class="loadingmask"></div>').appendTo(document.body);
            }
            mask.show();
        }
        var loadingicon = $('#loading');
        if(loadingicon.length == 0){
            loadingicon = $('<img class="loadingicon" style="" src="/static/img/loading.gif" alt="正在加载" />').appendTo(document.body);
        }
        loadingicon.show();
    }

    //隐藏loading图标
    function loadingEnd(hidemask) {
        $('#loading').hide();
        if(hidemask){
            $('.loadingmask').hide();
        }
    }

    /*通用消息提示弹窗
     **type为消息类型，'error'：错误，'success'：成功，'info'：普通消息，'warning'：警告
     */
    function msgTip(text, type, title) {
        type = type || 'error';
        title = title || null;
        if(typeof toastr !== 'undefined'){
            toastr[type](text, title, {
                positionClass: 'toast-middle-center',
                timeOut      : 2000
            })
        }
        else{
            alert(text);
        }
    }

    //通用ajax请求
    function ajax(conf) {
        var confObj = {
            url            : conf.url || '',
            type           : conf.type || 'POST',
            dataType       : conf.dataType || 'json',
            data           : conf.data,
            showLoading    : conf.showLoading===undefined ? true : conf.showLoading,  //是否显示loading图标
            showLoadingMask: conf.showLoadingMask===undefined ? true : conf.showLoadingMask,  //是否显示遮罩层
            success        : function(returnData) {
                if(returnData){
                    if(returnData.success){
                        conf.success && conf.success(returnData);
                    }else{
                        var errormsg = returnData.error || returnData.info || '操作失败，请重试！';
                        msgTip(errormsg);
                    }
                }
            },
            error          : function(xhr, textStatus) {
                if(textStatus != 'abort'){
                    if(conf.error){
                        conf.error();
                    }
                    else{
                        msgTip('发送请求失败，请重试！');
                    }

                }
            },
            complete       : function() {
                conf.complete && conf.complete();

                this.showLoading && loadingEnd(!!this.showLoadingMask);
                //如果页面js报错导致阻塞，隐藏loading
                if($('.loadingmask').css('display') == 'block'){
                    loadingEnd(true);
                }
            }
        }

        confObj.showLoading && loadingStart(!!confObj.showLoadingMask);
        $.ajax(confObj);
    }

    function getMappingFunc(matchStr, cutLength) {
        return function (key) {
            var result = this[key + matchStr];
            return result.substring(0, result.length - cutLength);
        };
    }

    return {
        version         : version,
        include         : include,
        extend          : extend,
        namespace       : namespace,
        guid            : guid,
        backToTop       : backToTop,
        replaceAll      : replaceAll,
        loadingStart    : loadingStart,
        loadingEnd      : loadingEnd,
        msgTip          : msgTip,
        ajax            : ajax,
        getMappingFunc  : getMappingFunc
    };
});
