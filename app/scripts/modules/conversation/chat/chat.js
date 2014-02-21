define([
	'comps/modapp/app',
	'hbs!./chat-tpl',
	'hbs!./message-tpl'
], function (App, tpl, messageTpl) {

	return App.Module.extend({

		init: function () {
			this._super();
			this.name = 'chat';
			this.tpl = tpl;
			this.chats = new Qstore();
			this.currentChat = null;
			this.helpers = {};
		},

		switchChat: function (_id) {
			this.chats.update({focused: false});
			this.chats.update({_id: _id}, {focused: true});
			this.currentChat = this.chats.findOne({_id: _id});
			this.render();
		},

		send: function () {
			var $input = this.$('.input-message');
			var text = $input.val();
			$input.val('');
			this.app.api.message(this.currentChat._id, text);
		},

		render: function (el) {
			var chat = this.currentChat;
			var renderedMessages = '';
			if (chat) {
				for (var i = 0; i < chat.messages.length; i++) {
					renderedMessages += messageTpl(chat.messages[i]);
				}
				this.helpers.renderedMessages = renderedMessages;
			}
			this._super(el);
			this.scrollDown();
		},

		scrollDown: function () {
			// TODO: fix scroll
			var $chatArea = this.$('.chat-area');
			$chatArea.animate({scrollTop: $chatArea.find('.track').outerHeight()});
		},

		renderMessage: function (message) {
			var $message = $(messageTpl(message));
			this.$('.chat-area .track').append($message);
			this.scrollDown();
		},

		_onChatGot: function (message) {
			var chat = message.data;
			var requestId = message.requestId;
			if (chat.error) return;
			if (this.chats.findOne({_id: chat._id})) {
				location.hash = '!conversation/chat';
				if (requestId) return this.switchChat(chat._id);
				return;
			};
			chat = $.extend({}, chat);
			chat.name = chat.name || chat.type;
			if (chat.type == 'dialog') {
				var oponent = Qstore.findIn(chat.members, {_id: {$ne: this.app.user._id}})[0];
				chat.name = oponent.name;
			}

			this.chats.add(chat);
			if (requestId) {
				if (app.router.hash != '!conversation/chat') location.hash = '!conversation/chat';
				this.switchChat(chat._id);
			} else {
				this.render();
			}
		},

		_onMessage: function (message) {
			var chat = this.chats.findOne({_id: message.chatId});
			if (!chat) {
				this.app.api.dialog(this.app.user._id, message.user._id);
				return;
			}
			chat.messages.push(message);
			if (chat._id == this.currentChat._id) this.renderMessage(message);
		},

		_onKeyPress: function (e) {
			if (e.keyCode == 13) this.send();
		},

		_attachEvents: function () {
			this.on('click', '.btn-send', this.send.bind(this));
			this.on('keypress', '.input-message', this._onKeyPress.bind(this));
			this.on('click', '.chat-tabs li', this._onChatTabClick.bind(this));
		},

		_onChatTabClick: function (e) {
			var chatId = $(e.currentTarget).attr('rel');
			this.switchChat(chatId);
		},

		_onServerMessage: function (message) {
			if (message.event == 'chat/get') this._onChatGot(message);
			if (message.event == 'chat/message') this._onMessage(message.data);
		}


	});
});