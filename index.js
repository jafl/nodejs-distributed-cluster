"use strict";

exports.join = function(config)
{
	var type = config.type.substr(0,3);
	if (type == 'udp')
	{
		return require('./lib/udp.js').init(config);
	}
	else if (type == 'tcp')
	{
		return require('./lib/tcp.js').init(config);
	}
	else
	{
		throw new Error('unsupported config.type: ' + config.type);
	}
};
