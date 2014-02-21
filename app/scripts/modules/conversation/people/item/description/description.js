define([
	'comps/modapp/app',
	'hbs!./description-tpl',
], function (App, tpl) {

	return App.Module.extend({

		init: function (item) {
			this._super();
			this.name = 'description';
			this.tpl = tpl;
			this.setItem(item);
		},

		setItem: function (item) {
			this.item = item;
		}

	});
});