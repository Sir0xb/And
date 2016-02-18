define(['knockout', 'Tools', './dataMap', 'ko-mapping'], function(ko, $tools, dataMap){
	return function (context) {
		var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.resource = ko.observable();

        $('body').on('detail_page_ready', function(){
        	//获取资源数据
            $tools.ajax({
                url: '/resourceDepot/get',
                data: {id: self.data.itemId},
                success: function(data){
                    //获取类型的文字
                    ko.utils.arrayForEach(dataMap.types, function(item){
                        if(item.value == data.data.type){
                            data.data.typeName = item.name;
                        }
                    });
                    self.resource(ko.mapping.fromJS(data.data));
                }
            });
        });

        //debug
        window.detail = self;


	};
});