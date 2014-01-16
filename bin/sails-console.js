#!/usr/bin/env node


/**
 * Module dependencies
 */

var Sails = require('../lib/app')
	, path  = require('path')
	, _     = require('lodash')
	, captains = require('captains-log')
	, REPL		= require('repl');



/**
 * `sails console`
 *
 * Enter the interactive console (aka REPL) for the app
 * in our working directory.
 */

module.exports = function () {

	var config = {};
	var log = captains();

	console.log();
	log.info('Welcome to the Sails console.');
	log.info('( to exit, type <CTRL>+<C> )');
	log.verbose('Lifting `' + process.cwd() + '` in interactive mode...');

	// Now load up sails for real
	var sails = new Sails();
	sails.lift(_.merge({},
		config, {

			// Disable ASCII ship to keep from dirtying things up
			log: {
				noShip: true
			}
		}), function(err) {
		if (err) return Err.fatal.failedToLoadSails(err);

		var repl = REPL.start('sails> ');
		repl.on('exit', function(err) {
			if (err) {
				log.error(err);
				process.exit(1);
			}
			process.exit(0);
		});

	});
};
