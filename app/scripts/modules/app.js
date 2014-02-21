define([
	'comps/modapp/app',
	'hbs!modules/app-tpl',
	'api',
	'models/user',
	'comps/modapp/components/notifier/notifier',
	'./dialogs/login/login',
	'./dialogs/register/register',
	'./header/header',
	'./footer/footer',
	'./home/home',
	'./conversation/conversation',
	'./personal/personal'
], function (App, tpl, Api, User, Notifier, Login, Register, Header, Footer, Home, Conversation, Personal) {

	var DEFAULT_PAGE = 'home';

	return  App.extend({

		init: function () {
			this._super(DEFAULT_PAGE);
			this.name = 'app';
			this.api = new Api({transport: 'sockets', host: 'http://localhost:8089'});
			this.helper = {};
			this.tpl = tpl;
			this.user = new User();

			this.add('api', this.api);
			this.add('user', this.user);

			this.add(new Login());
			this.add(new Register());
			this.add(new Header());
			this.add(new Footer());
			this.add(new Home());
			this.add(new Conversation());
			this.add(new Personal());
			this.add(new Notifier(1));
		},

		start: function ($el) {
			this.api.connect();
			this._super($el);
		}

	});
});