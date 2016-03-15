define(['knockout', "Super", 'sammy'], function(ko, Super, Sammy){
	return function (context) {
		var self = Super.call(this, context);

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

            this.get('/resourceDepot', function(){
                this.app.runRoute('get', '#/list')
            })
        });

        Sammy().run();

		if (self.data.test) {
			main = self;
		}
	};
});
