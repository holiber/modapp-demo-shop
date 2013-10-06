#Overview
Demo application based on [modapp](http://github.com/holiber/modapp) framework

![modapp](https://raw.github.com/holiber/modapp/master/logo.png)
## Installation
Make sure you have installed [Node.js](http://nodejs.org/), [Git](http://git-scm.com/) and [Bower](http://bower.io/).  
It's recommended what you have installed [Grunt](http://gruntjs.com/).

	$ git clone https://github.com/holiber/modapp-demo-shop.git
	$ cd modapp-demo-shop
	$ npm install
	$ bower install
## Run
	$ grunt server
It will start local web server for debugging application on port 9000
## Build
	$ grunt build
	
It will compile and compress your scripts, styles, templates, add version tags to builded files.
Builded application will be placed in the "dist" folder
