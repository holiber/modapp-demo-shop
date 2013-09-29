define([
	'comps/modapp/app',
	'hbs!./home-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'home';
			this.tpl = tpl;
		}

	});
});