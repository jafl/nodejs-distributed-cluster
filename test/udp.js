#!/usr/bin/env node

var mod_dcluster = require('../index.js');

var cluster = mod_dcluster.join(
{
	type: 'udp4'
});
