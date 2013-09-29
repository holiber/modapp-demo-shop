define([
	'comps/modapp/components/modal/modal',
	'hbs!./login-tpl',
], function (Modal, tpl) {

	return Modal.extend({

		init: function () {
			this._super();
			this.name = 'login';
			this.tpl = tpl;
		},

		showCondition: function () {
			return app.router.params && app.router.params.login == 'true';
		}
	});
});