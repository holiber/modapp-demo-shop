define([
	'comps/modapp/app',
	'hbs!./catalog-tpl',
	'./menu/menu',
	'./items/items',
	'./cart/cart',
	'./delivery/delivery'
], function (App, tpl, Menu, Items, Cart, Delivery) {

	var DEFAULT_PAGE = 'items';

	return App.Module.extend({

		init: function () {
			this._super(DEFAULT_PAGE);
			this.name = 'catalog';
			this.tpl = tpl;

			this.add(new Menu());
			this.add(new Items());
			this.add(new Cart());
			this.add(new Delivery());
		}
	});
});