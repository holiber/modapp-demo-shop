define([
	'comps/modapp/app',
	'hbs!modules/app-tpl',
	'api',
	'comps/modapp/components/notifier/notifier',
	'./dialogs/login/login',
	'./dialogs/register/register',
	'./header/header',
	'./footer/footer',
	'./home/home',
	'./catalog/catalog',
	'./contacts/contacts'
], function (App, tpl, Api, Notifier, Login, Register, Header, Footer, Home, Catalog, Contacts) {

	var DEFAULT_PAGE = 'home';

	return  App.extend({

		init: function () {
			this._super(DEFAULT_PAGE);
			this.name = 'app';
			this.api = new Api();
			this.helper = {};
			this.tpl = tpl;

			this.add('api', this.api);
			this.add(new Login());
			this.add(new Register());
			this.add(new Header());
			this.add(new Footer());
			this.add(new Home());
			this.add(new Catalog());
			this.add(new Contacts());
			this.add(new Notifier(1));
		}

	});
});