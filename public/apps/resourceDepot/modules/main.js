define(['knockout', 'sammy'], function(ko, Sammy){
	return function (context) {
		var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.loading = self.parent.loading;
        self.palette = ko.observable();

		Sammy(function () {
            this.get(/\#\/([^/]+)\/?([^/]*)/, function (){
                var module    = this.params.splat[0];
                var itemId    = this.params.splat[1];
                self.data.itemId = itemId;
        
                self.palette({
                    name: module,
                    data: {
                        parent  : self,
                        data    : self.data
                    },
                    afterRender: function (){
                        $('body').trigger(module+'_page_ready');
                        self.parent.loading(false);
                    }
                });
                self.parent.loading(true);
            });
        });
        
        Sammy().run();


        //debug
        window.add = self;

	};
});