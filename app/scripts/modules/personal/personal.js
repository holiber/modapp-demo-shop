define([
	'comps/modapp/app',
	'hbs!./personal-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'personal';
			this.tpl = tpl;
		}

	});
});