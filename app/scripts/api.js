define(['comps/modapp/app'], function (App) {

	return App.Protocol.extend({

		request: function (params, callback, userData) {
			var requestId = 'req_' + ( + new Date());
			params = $.extend({event: 'message'}, params);
			params.data = {
				url: params.url,
				method: params.method || 'get',
				data: params.data,
				requestId: requestId
			};
			this._super(params, callback, userData);
			return requestId;
		},

		users: function () {
			this.request({url: 'users'});
		},

		getRegistrationTicket: function () {
			this.request({
				url: 'users',
				method: 'put'
			});
		},

		registration: function (login, pass, ticketId, code) {
			this.request({
				url: 'users',
				method: 'put',
				data: {
					login: login,
					pass: pass,
					ticketId: ticketId,
					code: code
				}
			});
		},

		auth: function (login, pass) {
			this.request({
				url: 'users/auth',
				data: {
					login: login,
					pass: pass
				}
			})
		},

		logout: function () {
			this.request({url: 'users/logout'});
		},

		authByToken: function (token) {
			this.request({
				url: 'users/auth',
				data: {
					token: token,
				}
			});
		},

		message: function (chatId, text) {
			return this.request({
				url: 'chats/' + chatId + '/messages',
				method: 'put',
				data: {text: text}
			});
		},

		dialog: function (member1, member2) {
			if (member1 == member2) return;
			if (member1 > member2) {
				var tmp = member1;
				member1 = member2;
				member2 = tmp;
			}

			var chatId = 'dialog_' + member1 + '_with_' + member2;
			return this.request({
				url: 'chats/' + chatId
			})
		}

	});

});