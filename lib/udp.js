"use strict";

var socket       = require('socket.io'),
	EventEmitter = require('events').EventEmitter,

	broadcast_addr = '255.255.255.255',
	default_port   = 1026;

exports.init = function(config)
{
	var mod_udp = require('dgram'),
		port    = config.port || default_port,
		id      = Math.round(Math.random() * 1e12),
		result  = new EventEmitter();

	var socket = mod_udp.createSocket(config.type, function(msg, rinfo)
	{
		var s = msg.toString();
		try
		{
			var data = JSON.parse(s);
		}
		catch (e)
		{
			console.log('failed to parse message: ' + s);
			return;
		}

		console.log(data);
		console.log(rinfo);

		if (data.join && data.join != id)
		{
			// TODO: conversation if data.join is not unique within the cluster
			// TODO: respond with list of other members
			result.emit('newMember', data.join);
		}
		else if (data.welcome)
		{
			// TODO: conversation if data.join is not unique within the cluster
			result.emit('joined', id);
		}
	});
	socket.bind(port);

	var buffer = new Buffer(JSON.stringify(
	{
		join: id
	}));

	socket.setBroadcast(true);
	socket.send(buffer, 0, buffer.length, port, broadcast_addr);

	// add member functions

	result.getId = function()
	{
		return id;
	};

	result.leave = function()
	{
		socket.close();
	};

	return result;
};
