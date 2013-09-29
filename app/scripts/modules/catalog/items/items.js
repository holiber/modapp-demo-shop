define([
	'comps/modapp/app',
	'hbs!./items-tpl',
	'./item/item',
	'components/items-list/items-list'
], function (App, tpl, ItemDialog, ItemsList) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'items';
			this.tpl = tpl;
			//this.defaultPage = '1none';
			this.routeDepend = true;
			this.add(new ItemDialog());
		},

		/*
			if module has "load" method, it will be called automatically (see Module.place method)
			set autoLoad = false if you don't need this
		*/
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
			this.data = new App.ActiveData(message.response)
			this.add(new ItemsList(this.data));

			this.render();
		},

		/*
			listen events here
		 */
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