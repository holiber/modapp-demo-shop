define([
	'comps/modapp/app',
	'hbs!./header-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'header';
			this.tpl = tpl;
		}

	});
});