define([
	'comps/modapp/app',
	'hbs!./header-tpl'
], function (App, tpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'header';
			this.tpl = tpl;
			this.user = null;
		},

		_onReady: function () {
			this.user = this.app.user;
		},

		_attachEvents: function () {
			this.on('click', '.btn-logout', function (e) {
				e.preventDefault();
				this.emit('user/logoutRequest');
			}.bind(this));
		},

		_on: function (event) {
			if (event.name == 'user/auth' || event.name == 'user/logout') this.render();
		}

	});
});