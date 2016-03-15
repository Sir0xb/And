define(['knockout', "Super", 'Tools', './dataMap', 'ko-mapping'], function(ko, Super, $tools, dataMap){
	return function (context) {
		var self = Super.call(this, context);

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

		if (self.data.test) {
			detail = self;
		}
	};
});
