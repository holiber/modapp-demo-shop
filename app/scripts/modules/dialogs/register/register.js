define([
	'comps/modapp/components/modal/modal',
	'hbs!./register-tpl',
], function (Modal, tpl) {

	return Modal.extend({

		init: function () {
			this._super();
			this.name = 'register';
			this.tpl = tpl;
			this.ticketId = null;
			this.registrationStatus = 'none';
		},

		load: function () {
			this.loadState = 'loading';
			app.api.getRegistrationTicket();
			this.render();
		},

		showCondition: function () {
			return app.router.params && app.router.params.register == 'true';
		},

		submit: function (e) {
			e && e.preventDefault();
			var login = this.$('[name="login"]').val();
			var pass = this.$('[name="pass"]').val();
			var passconfirm = this.$('[name="passconfirm"]').val();
			var code = this.$('[name="code"]').val();

			if (!login || !pass || !passconfirm || !code) {
				alert('all fieds must be set');
				return false;
			}

			if (pass !== passconfirm) {
				alert('passwords does not match');
				return false;
			}

			app.api.registration(login, pass, this.ticketId, code);
			this.registrationStatus = 'loading';
			return true;
		},

		_onLoad: function (data) {
			if (data.error) {
				this.loadState = 'error';
				this.render();
				return;
			}
			this.loadState = 'done';
			this.ticketId = data.ticketId;
			this.render();
		},

		_onRegistrationComplete: function (data) {
			if (data.error) {
				this.registrationStatus = 'error';
				alert('Registration failed: ' + data.error);
				return;
			}
			this.registrationStatus = 'done';
			location.hash = '?login=true&justRegistered=true';
		},

		_attachEvents: function () {
			this.on('click', '.submit', this.submit.bind(this))
		},

		_onServerMessage: function (message) {
			if (message.event == 'users/registrationTicket') this._onLoad(message.data);
			if (message.event == 'users/registration') this._onRegistrationComplete(message.data);
		}
	});
});