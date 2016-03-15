define(['knockout', "Super", 'Tools', './dataMap', 'ko-mapping'], function(ko, Super, $tools, dataMap){
	return function (context) {
		var self = Super.call(this, context);

        self.dataList = ko.observableArray([]);
        self.typeList = ko.observableArray(dataMap.types);

        self.remove = function(){
            var _this = this;
            if(window.confirm('确定删除吗？')){
                $tools.ajax({
                    url: '/resourceDepot/remove',
                    data: {id: _this.id},
                    success: function(){
                        self.dataList.remove(_this);
                    }
                });
            }
        };

        $('body').on('list_page_ready', function(){
        	//请求列表数据
        	$tools.ajax({
        		url: '/resourceDepot/list',
        		success: function(data){
        			self.dataList(data.data);
        		}
        	});
        });

        if (self.data.test) {
        	list = self;
        }
	};
});
