define([
	'comps/modapp/components/modal/modal',
	'hbs!./register-tpl',
], function (Modal, tpl) {

	return Modal.extend({

		init: function () {
			this._super();
			this.name = 'register';
			this.tpl = tpl;
		},

		showCondition: function () {
			return app.router.params && app.router.params.register == 'true';
		}
	});
});