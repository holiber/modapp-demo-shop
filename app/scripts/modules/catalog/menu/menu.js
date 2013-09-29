define([
	'comps/modapp/app',
	'hbs!./menu-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'menu';
			this.tpl = tpl;

			this.cartSize = 0;
		},

		_onCartChange: function (cartItems) {
			this.cartSize = cartItems.size();
			this.render();
		},

		_on: function (event) {
			this._super(event);
			if (event.name == 'catalog/cart/change') this._onCartChange(event.data);
		}

	});
});