define([
	'comps/modapp/components/modal/modal',
	'hbs!./item-tpl',
	'./description/description',
	'./inside/inside'
], function (Modal, tpl, Description, Inside) {

	var DEFAULT_PAGE = 'description';

	return Modal.extend({

		init: function () {
			this._super();
			this.name = 'item';
			this.tpl = tpl;
			this.pageTpl = /^\D+$/;
			this.item = null;
			this.notFound = false;
			this.defaultPage = DEFAULT_PAGE;
		},

		buy: function (e) {
			e && e.preventDefault();
			this.emit('catalog/cart/add', this.item);
			window.location.hash = '!catalog/cart';
		},

		toCart: function (e) {
			e && e.preventDefault();
			this.emit('catalog/cart/add', this.item);
			window.location.hash = '!catalog/items';
		},

		setPage: function (page) {
			this._super(page);
			if (this.loadState == 'done') {
				this.notFound = false;
				var name = this.route;
				this.item = this.data.findOne({name: name});
				this.get('description').setItem(this.item);
				this.get('inside').setItem(this.item);
				if (!this.item) this.notFound = true;
			}
		},

		_attachEvents: function () {
			//TODO: get rid of the "bind" method
			this.on('click', '.btn.buy', this.buy.bind(this));
			this.on('click', '.btn.to-cart', this.toCart.bind(this));
		},

		_onLoad: function (message) {
			if (message.error || message.response.error) {
				this.loadState == 'error';
				this.render();
				return;
			}

			this.data = new App.ActiveData(message.response);
			this.add(new Description());
			this.add(new Inside());
			this.loadState = 'done';
			this.setPage(this.page);
			this.render();
		},

		_on: function (event) {
			this._super(event);
			if (event.name == 'server/message') {
				switch (event.data.name) {
					case 'catalog/getItems': this._onLoad(event.data);break;
				}
			}
		}
	});
});