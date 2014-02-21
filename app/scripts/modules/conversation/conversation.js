define([
	'comps/modapp/app',
	'hbs!./conversation-tpl',
	'./menu/menu',
	'./people/people',
	'./chat/chat'
], function (App, tpl, Menu, People, Chat) {

	var DEFAULT_PAGE = 'people';

	return App.Module.extend({

		init: function () {
			this._super(DEFAULT_PAGE);
			this.name = 'conversation';
			this.tpl = tpl;

			this.add(new Menu());
			this.add(new People());
			this.add(new Chat());
		}
	});
});