define(['comps/modapp/mixins/events'], function (EventsMixin) {

	return Class.extend([EventsMixin], {

		_on: function (event) {
			if (event.name == 'server/message') this._onServerMessage(event.data);
		},

		_onServerMessage: function () {
		}
	})
});