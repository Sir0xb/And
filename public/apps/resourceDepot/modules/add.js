define(['knockout'], function(ko){
	return function (context) {
		var self = this;

        self.parent = context.parent;
        self.data = context.data;

        self.types = [
        	{
	        	name: 'PC端',
	        	value: 1
	        },
	        {
	        	name: '移动端',
	        	value: 2
	        },
        ];

        self.formData = {
        	type: ko.observable('')
        };


	};
});