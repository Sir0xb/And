define(['knockout'], function(ko){
	var ErrorHandlingBindingProvider = function() {
	    var original = new ko.bindingProvider();

	    //determine if an element has any bindings
	    this.nodeHasBindings = original.nodeHasBindings;

	    //return the bindings given a node and the bindingContext
	    this.getBindings = function(node, bindingContext) {
	        var result;
	        try {
	            result = original.getBindings(node, bindingContext);
	        }
	        catch (e) {
	            alert('页面初始化错误，请稍后重试！');
	        }

	        return result;
	    };
	};

	ko.bindingProvider.instance = new ErrorHandlingBindingProvider();
});
