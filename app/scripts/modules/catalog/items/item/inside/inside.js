define([
	'comps/modapp/app',
	'hbs!./inside-tpl',
], function (App, tpl) {

	return App.Module.extend({

		init: function (item) {
			this._super();
			this.name = 'inside';
			this.tpl = tpl;
			this.setItem(item);
		},

		setItem: function (item) {
			this.item = item;
		}

	});
});