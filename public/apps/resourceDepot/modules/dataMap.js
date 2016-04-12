define(function(){
	return {
		types: [
        	{
	        	name: '框架/类库',
	        	value: 1,
	        	desc: '已经成熟的框架/类库，基本不会修改其代码，如jquery、requirejs'
	        },
	        {
	        	name: '第三方组件',
	        	value: 2,
	        	desc: 'UI组件及功能组件，来自于第三方，不像框架那样稳定且有长期维护，例如：datepicker、knockout-amd-helpers'
	        },
	        {
	        	name: '自研模块',
	        	value: 3,
	        	desc: '公司内部自己写的模块，通用的业务模块、功能模块'
	        }
        ],
        resource: {
        	id: '',
        	title: '',
        	type: '',
        	description: '',
			useMethod: '',
			demoUrls: [],
			siteUrl: '',
			owner: '',
			ownerQQ: '',
			comment: '',
			versionPackage: []
        }
	}
});