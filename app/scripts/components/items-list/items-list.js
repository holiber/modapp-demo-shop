define([
	'comps/modapp/app',
	'hbs!./items-list-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function (data) {
			this._super();
			this.name = 'itemsList';
			this.tpl = tpl;
			this.data = data;
		}

	});
});
