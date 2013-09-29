define(['handlebars'], function ( Handlebars ){

	function eq (a, b, options) {
		if (a == b) return options.fn(this);
		else return options.inverse(this);
	}

	Handlebars.registerHelper( 'eq', eq );

});