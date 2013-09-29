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

    paths: {
	    jquery: '../components/jquery/jquery',
	    comps: '../components',
	    handlebars : '../components/hbs/Handlebars',
	    hbs: '../components/hbs/hbs',
	    "underscore" : '../components/hbs/hbs/underscore',
	    i18nprecompile : "../components/hbs/hbs/i18nprecompile",
	    json2 : "../components/hbs/hbs/json2",
        bootstrap: '../components/bootstrap/dist/js/bootstrap',
	    'class': '../components/modapp/class'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
	    hbs: {
		    deps: ['handlebars']
	    }
    },
	hbs : {
		templateExtension : 'hbs',
		helperDirectory: 'hbs-helpers/',
		disableI18n : true
	}
});

require(['jquery', 'modules/app', 'bootstrap', 'class'], function ($, MyApp) {
    'use strict';
    // use app here
	var myApp = window.app = new MyApp();
	myApp.start($('.app-container'));
});