define([
	'comps/modapp/app',
	'hbs!./menu-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'menu';
			this.tpl = tpl;
		}

	});
});