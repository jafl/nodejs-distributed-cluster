#!/usr/bin/env node

var mod_cluster = require('../index.js');

var cluster = mod_cluster.join(
{
	type: 'udp4'
});
