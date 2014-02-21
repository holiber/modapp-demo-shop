define([
	'comps/modapp/app',
	'hbs!./people-tpl',
	'./item/item',
	'components/items-list/items-list'
], function (App, tpl, ItemDialog, ItemsList) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'people';
			this.tpl = tpl;
			this.routeDepend = true;
			this.add(new ItemDialog());
		},

		/*
			if module has "load" method, it will be called automatically (see Module.place method)
			set autoLoad = false if you don't need this
		*/
		load: function () {
			this.loadState = 'loading';
			app.api.users();
			this.render();
		},

		_onLoad: function (users) {
			if (users.error) {
				this.loadState == 'error';
				this.render();
				return;
			}

			this.loadState = 'done';
			this.data = new Qstore(users).search({_id: {$ne: this.app.user._id}});
			this.add(new ItemsList(this.data));

			this.render();
		},

		_attachEvents: function () {
			this.on('click', '.item', this._onUserClick.bind(this));
		},

		_onUserClick: function (e) {
			e.preventDefault();
			var userId = $(e.currentTarget).attr('rel');
			this.app.api.dialog(this.app.user._id, userId);
		},

		_onServerMessage: function (message) {
			if (message.event == 'users') this._onLoad(message.data);
		},

		_onLogout: function () {
			this.loadState = 'none';
		},

		_on: function (event) {
			this._super(event);
			if (event.name == 'user/logout') this._onLogout();
		}

	});
});