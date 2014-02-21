define([
	'comps/modapp/components/modal/modal',
	'hbs!./login-tpl',
], function (Modal, tpl) {

	return Modal.extend({

		init: function () {
			this._super();
			this.name = 'login';
			this.tpl = tpl;
			this.justRegistered = false;
		},

		showCondition: function () {
			return app.router.params && app.router.params.login == 'true';
		},

		render: function () {
			if (app.router.params && app.router.params.justRegistered == 'true')
				this.justRegistered = true;
			this._super();
		},

		submit: function (e) {
			e && e.preventDefault();
			var login = this.$('[name="login"]').val();
			var pass = this.$('[name="pass"]').val();
			if (!login || !pass) {
				alert('Please fill in all fields');
				return;
			}

			this.emit('user/authRequest', {login: login, pass: pass});
		},

		_onAuth: function (message) {
			if (message.error) {
				alert(message.error);
				return;
			}
			location.hash = '?';
		},

		_attachEvents: function () {
			this.on('click', '.submit', this.submit.bind(this))
		},

		_onServerMessage: function (message) {
			if (message.event == 'users/auth') this._onAuth(message.data);
		}
	});
});