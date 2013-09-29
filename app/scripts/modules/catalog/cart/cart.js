define([
	'comps/modapp/app',
	'hbs!./cart-tpl'
], function (App, tpl) {

	var CART_MAX_SIZE = 5;

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'cart';
			this.tpl = tpl;
			this.items = [];
			this.data = new App.ActiveData({columns: ['id', 'name', 'price', 'quantity']});
		},

		add: function (item) {
			if (this.data.size() == CART_MAX_SIZE) {
				this.emit('notifier', {type: 'error', text: 'Cart is full!'}, 'root');
				return;
			}
			this.data.add(item);
			this.render();
			this.emit('catalog/cart/change', this.data, 'global');
			this.emit('notifier', 'Item <b>' + item.name + '</b> added to cart!', 'root');
		},

		clear: function () {
			this.data.remove();
			this.render();
			this.emit('catalog/cart/change', this.data, 'global');
		},

		buy: function () {
			this.emit('notifier', {type: 'warn', text: 'It\'s only demo application, sorry..'}, 'root');
		},

		_attachEvents: function () {
			this.on('click', '.btn.buy', this.buy.bind(this));
			this.on('click', '.btn.clear', this.clear.bind(this));
		},

		_on: function (event) {
			this._super(event);
			if (event.name == 'catalog/cart/add') this.add(event.data);
		}

	});
});