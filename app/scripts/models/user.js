define(['models/model'], function (Model) {
	return Model.extend({

		init: function () {
			this.isAuth = false;
			this.login = '';
			this.name = 'unknown';
			this._id = null;
		},

		auth: function (login, pass) {
			app.api.auth(login, pass);
		},

		logout: function () {
			app.api.logout();
		},

		_onConnect: function () {
			var token = $.cookie('token');
			if (token) app.api.authByToken(token);
		},

		_onDisconnect: function () {
			this.emit('notifier', {type: 'error', message: 'disconnected from server!'})
		},

		_onAuth: function (data) {
			if (data.error) return;
			this._id = data._id;
			this.login = data.login;
			this.name = data.name;
			this.isAuth = true;
			$.cookie('token', data.token);
			this.emit('user/auth');
		},

		_onLogout: function () {
			this.isAuth = false;
			this.login = '';
			this.name = 'unknown';
			this._id = null;
			$.removeCookie('token');
			location.hash = '#';
			this.emit('user/logout');
		},

		_onServerMessage: function (message) {
			switch (message.event) {
				case 'users/auth': this._onAuth(message.data);break;
				case 'users/logout': this._onLogout();break;
			}
		},

		_on: function (event) {
			this._super(event);
			switch (event.name) {
				case 'user/authRequest': this.auth(event.data.login, event.data.pass);break;
				case 'user/logoutRequest': this.logout();break;
				case 'server/connect': this._onConnect();break;
				case 'server/disconnect': this._onDisconnect();break;
			}
		}

	})
});