define([
	'comps/modapp/app',
	'hbs!./discount-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'discount';
			this.tpl = tpl;
			this.pageTpl = /my/;
		}

	});
});