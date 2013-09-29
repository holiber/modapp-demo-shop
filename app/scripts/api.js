define(['comps/modapp/app'], function (App) {

	return App.Protocol.extend({

		catalog: {
			getItems: function () {
				app.api.request({
					url: '/data/catalog/items.json',
					onRequest: 'catalog/getItemsRequest',
					onResponse: 'catalog/getItems',
					delay: 2000
				});
			}
		}

	});

});