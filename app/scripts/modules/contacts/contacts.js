define([
	'comps/modapp/app',
	'hbs!./contacts-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'contacts';
			this.tpl = tpl;
		}

	});
});