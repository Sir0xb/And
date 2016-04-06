/*jQuery弹出层插件popbox
**version : 1.1.1
**author : 吕大豹
**pubdate : 2014-08-07
**blog : http://www.cnblogs/com/lvdabao
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.jQuery.popbox = factory(root.jQuery);
    }
}(this, function ($) {
	var boxObj = $.popbox = function(opts){
		var defaults = {
			width : '666px', 
			maxHeight : '500px',  //body区域的最大高度
			padding : '20px',   //body区域的padding值
			title : '温馨提示',  //标题
			content : '',  //主体内容，支持HTML标签
			contentSelector : '',  //加载选择器指定的元素的内容
			contentUrl : '',  //通过ajax加载单独的页面
			foot : '',  //底部内容
			showMask : true,  //是否显示遮罩层
			showCloseBtn : true,  //是否显示关闭按钮
			btns : [
				{
					type : 'ok',
					text : '确定',
					click : null
				},
				{
					type : 'cancel',
					text : '取消',
					click : null
				}

			], //默认显示的按钮，
			draggable : true,  //是否可拖动
			autoClose : 0, //是否自动关闭，否则设为0，是则设为大于0的数字，表示关闭时间，单位ms
			blurClose : false,  //点击窗口外部是否关闭窗口
			onOpen : null, //窗口加载完毕时的动作
			onClose : null,  //窗口关闭前的动作，返回false可组织窗口关闭
			onOk : null,  //点击确定按钮
			onCancel : null,//点击取消按钮
			showBtn : true,
			showFoot: true,
			customPos : '', //自定义位置
			keepOldBox: false //新打开一个弹窗时，是否要移除掉已有的弹窗。默认移除
		};

		var option = $.extend(defaults, opts);

		var oldBoxCount = $('.pb_container').length;

		var box = {
			id: 'pb_instance_'+ (oldBoxCount+1),
			template : '<div class="pb_container" id="pb_instance_'+(oldBoxCount+1)+'"><div class="pb_mask"></div><div class="pb_panel"><div class="pb_header"><h2 class="pb_title"></h2><a href="javascript:void(0);" class="pb_closebtn"></a></div><div class="pb_body"></div><div class="pb_btns"></div><div class="pb_footer"></div></div></div>',
			init : function(template){
				var _this = this;

				//显示遮罩
				if(option.showMask){
					template.find('.pb_mask').show();
				}
				else{
					template.find('.pb_mask').hide();	
				}

				//显示关闭按钮
				if(option.showCloseBtn){
					template.find('.pb_closebtn').show();
				}
				else{
					template.find('.pb_closebtn').hide();
				}

				//填充内容
				var body = template.find('.pb_body');

				if(option.content){
					body.html(option.content);
				}
				else if(option.contentSelector){
					body.html($(option.contentSelector).html());
				}
				else if(option.contentUrl){
					body.load(option.contentUrl);
				}

				body.css({maxHeight : option.maxHeight, padding : option.padding});


				template.find('.pb_panel').css({width : option.width});
				template.find('.pb_title').html(option.title);

				if(option.showFoot){
					template.find('.pb_footer').html(option.foot);
				}
				else{
					template.find('.pb_footer').remove();
				}
				
				//显示按钮
				if(option.showBtn){
					template.find('.pb_btns').html('');
					for(var i=0,len=option.btns.length; i<len; i++){
						var b = option.btns[i];
						var text = !!b.text ? b.text : (b.type=='ok' ? '确定' : '取消');
						var btn = $('<a href="javascript:void(0);" class="pb_'+b.type+'btn">'+text+'</a>');
						if(b.click && typeof b.click === 'function'){
							btn.click(b.click);
						}
						template.find('.pb_btns').append(btn);
					}
				}else{
					template.find('.pb_btns').html('').remove();
				}
				

				//点击确定按钮
				template.find('.pb_okbtn').click(function(){
					var close = true;
					if(option.onOk && typeof option.onOk === 'function'){
						close = option.onOk();
					}
					if(close !== false){
						_this.close();
					}
				});
				//点击取消按钮
				template.find('.pb_cancelbtn').click(function(){
					var close = true;
					if(option.onCancel && typeof option.onCancel === 'function'){
						close = option.onCancel();
					}
					if(close !== false){
						_this.close();
					}
				});

				//点击关闭按钮
				template.find('.pb_closebtn').off('click').on('click', function(){
					_this.close();
				});
				//失焦关闭
				if(option.blurClose){
					$(document).unbind('click', this.close).bind('click', function(){
						_this.close();
					});
					template.find('.pb_panel').click(function(event){
						event.stopPropagation();
					});
				}

				//拖动
				if(option.draggable){
					_this.draggable(template);
				}

				return template;
			},
			open : function(){
				var _this = this;
				var currentTemplate = $('.pb_container');

				//全部重新构造模板
				//if(currentTemplate.length===0){
					// currentTemplate.remove();
					// var newbox = this.init($(this.template));
					// newbox.appendTo(document.body).show();
				// }
				// else{
				// 	this.init(currentTemplate);
				// 	currentTemplate.show();
				// }

				
				var newbox = this.init($(this.template));
				//如果不清除已有弹窗，则给新弹窗赋予更高的zindex
				if(!option.keepOldBox){
					currentTemplate.remove();
				}
				else{
					newbox.find('.pb_panel').css({zIndex: 10002});
				}
				
				newbox.appendTo(document.body).show();

				this.adjustPos();

				if(option.autoClose){
					var closeTimmer;
					closeTimmer = setTimeout(function(){
						_this.close();
						clearTimeout(closeTimmer);
					}, option.autoClose);
				}

				if(option.onOpen && typeof option.onOpen === 'function'){
					option.onOpen(newbox);
				}
			},
			close : function(){
				if(!this.isOpened()){
					return;
				}
				var close = true;
				if(option.onClose && typeof option.onClose === 'function'){
					close = option.onClose();
				}
				if(close!==false){
					$('#'+this.id).remove();

					//如果为全局绑定了点击事件，则解除
					if(option.blurClose){
						$(document).unbind('click', this.close);
					}
				}
			},
			adjustPos : function(){
				var panel = $('.pb_panel');
				var w = panel.width();
				var h = panel.height();
				if(option.customPos){
					panel.css({marginTop : option.customPos.marginTop, marginLeft : option.customPos.marginLeft})
				}
				else{
					panel.css({marginTop : -h/2+'px', marginLeft : -w/2+'px'});	
				}
				
			},
			isOpened : function(){
				return $('.pb_container').css('display')!='none';
			},
			draggable : function(template){
				var panel = template.find('.pb_panel');
				var header = template.find('.pb_header');
				header.css('cursor', 'move');

				var eventX, eventY, startX, startY, drag;
				header.on('mousedown', function(event){
					eventX = event.clientX;
					eventY = event.clientY;
					startX = parseInt(panel.css('left'));
					startY = parseInt(panel.css('top'));
					drag = true;
					if(this.setCapture){this.setCapture();}
				}).on('mouseup', function(event){
					drag = false;
					if(this.releaseCapture){this.releaseCapture();}
				});

				var dragTarget = header[0].setCapture ? header[0] : document;
				var dragHandler = function(){
					if(drag){
						var l = startX + (event.clientX - eventX);
							t = startY + (event.clientY - eventY),
							ml = parseInt(panel.css('margin-left')),
							mt = parseInt(panel.css('margin-top')),
							docW = document.documentElement.clientWidth,
							docH = document.documentElement.clientHeight,
							w = panel.width(),
							h = panel.height();

						if(l + ml < 0){
							l = -ml;
						}
						else if(l + ml + w > docW){
							l = docW + ml;
						}
						if(t + mt < 0){
							t = -mt;
						}
						else if(t + mt + h > docH){
							t = docH + mt
						}
						panel.css({left : l, top : t});
					}
				};
				if(dragTarget.addEventListener){
					dragTarget.addEventListener('mousemove', dragHandler, true);
				}
				else{
					dragTarget.attachEvent('onmousemove', dragHandler);
				}

				/*防止出现mouseup后仍然能拖动的bug情况*/
				$(document).on('mouseup', function(){
					drag = false;
				});

			}

		}

		box.open();
		return box;
	}

	return boxObj;

}));