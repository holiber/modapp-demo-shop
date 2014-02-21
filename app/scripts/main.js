require.config({

	pragmasOnSave: {
		//removes Handlebars.Parser code (used to compile template strings) set
		//it to `false` if you need to parse template strings even after build
		excludeHbsParser : true,
		// kills the entire plugin set once it's built.
		excludeHbs: true,
		// removes i18n precompiler, handlebars and json2
		excludeAfterBuild: true
	},
	shim: {
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		},
		hbs: {
			deps: ['handlebars']
		},
		socketio: {
			exports: 'io'
		},
		qstore: {
			exports: 'qstore'
		}
	},
	paths: {
		jquery: '../components/jquery/jquery',
		comps: '../components',
		handlebars : '../components/hbs/Handlebars',
		hbs: '../components/hbs/hbs',
		"underscore" : '../components/hbs/hbs/underscore',
		i18nprecompile : "../components/hbs/hbs/i18nprecompile",
		json2 : "../components/hbs/hbs/json2",
		bootstrap: '../components/bootstrap/dist/js/bootstrap',
		'class': '../components/modapp/class',
		qstore: '../components/qstore/data'
	},

	hbs : {
		templateExtension : 'hbs',
		helperDirectory: 'hbs-helpers/',
		disableI18n : true
	}
});

require([
	'jquery',
	'modules/app',
	'bootstrap',
	'class',
	'qstore',
	'comps/jquery.cookie/jquery.cookie'
], function ($, MyApp) {
	var app = window.app = new MyApp();
	app.start($('.app-container'));
});