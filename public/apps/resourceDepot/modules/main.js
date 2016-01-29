define(['knockout', 'sammy'], function(ko, Sammy){
	return function (context) {
		var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.loading = self.parent.loading;
        self.palette = ko.observable();

		Sammy(function () {
            this.get(/\#\/([^/]+)/, function (){
                var module    = this.params.splat[0];
        
                self.palette({
                    name: module,
                    data: {
                        parent  : self,
                        data    : self.data
                    },
                    afterRender: function (){

                    }
                });
                self.parent.loading(true);
            });
        });
        
        Sammy().run();

        self.parent.loading(false);

        //debug
        window.add = self;

	};
});