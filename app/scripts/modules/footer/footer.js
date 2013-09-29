define([
	'comps/modapp/app',
	'hbs!./footer-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'footer';
			this.tpl = tpl;
		}

	});
});