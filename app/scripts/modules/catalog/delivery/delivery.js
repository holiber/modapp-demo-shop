define([
	'comps/modapp/app',
	'hbs!./delivery-tpl',
	'components/items-list/items-list'
], function (App, tpl, ItemsList) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'delivery';
			this.tpl = tpl;
		},

		load: function () {
			this.loadState = 'loading';
			app.api.catalog.getItems();
			this.render();
		},

		_onLoad: function (message) {
			if (message.error || message.response.error) {
				this.loadState == 'error';
				this.render();
				return;
			}

			this.loadState = 'done';
			var items = message.response;
			items = items.slice(0, 3);
			this.data = new App.ActiveData(items);
			this.add(new ItemsList(this.data));

			//simulate server delay by using setTimeout
			setTimeout(this.render.bind(this), 500);
			//this.render();
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