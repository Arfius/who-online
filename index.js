// index.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var _ = require('underscore');
var sem = require('semaphore')(1);

var timer = 5000;
var refresh = 10000;
var porta = 4200;
var server_key="server_key_string";

var result=
{
	online:[],
	live:[]
};

var setConf= function(options)
{
	timer=options.timer,
	refresh=options.refresh,
	porta=options.porta,
	server_key=options.server_key
}

var run = function()
{
	console.log("[server_key]",server_key);

	io.on('connection', function(client)
	{ 
		var id_client="";
		client.on('join', function(data)
		{
			id_client=data;
			sem.take(function()
			{
				result.online.push({id:id_client, time:new Date().getTime() });
				result.live.push({id:id_client, time:new Date().getTime() });	
				
				console.log("Connection-result.live",result.live);
				console.log("Connection-result.online",result.online);
				
				client.emit(server_key,result);
				sem.leave();
			});
		});
	
		client.on('disconnect', function ()
		{
			sem.take(function()
			{
				console.log("disconnect",id_client);
				result.online = _.reject(result.online,function(item){ return item.id== id_client;});
				result.live = _.reject(result.live,function(item){ return item.id== id_client;});
				
				console.log("Disconnection-result.live",result.live);
				console.log("Disconnection-result.online",result.online);
				
				client.emit(server_key,result);
				sem.leave();
			});  	
		});
	
		client.on('moving', function(data)
		{
			sem.take(function()
			{
				console.log("moving",id_client);
				result.live=_.reject(result.live,function(item){ return item.id == id_client;});
				result.live.push({id:id_client, time:new Date().getTime()});
				
				console.log("Moving-result.live",result.live);
				console.log("Moving-result.online",result.online);


				sem.leave();
			});
		});
		
		var eraseMoving = function()
		{
			sem.take(function()
			{
				var now= new Date().getTime();
				
				var m_item = _.find(result.live,function(item){ return item.id == id_client;});
				
				if(!_.isUndefined(m_item) && now - m_item.time >refresh)
				{
					result.live = _.reject(result.live,function(item){ return item.id == id_client;});
				}
				client.emit(server_key,result);
				
				console.log("eraseMoving-result.live",result.live);
				console.log("eraseMoving-result.online",result.online);
				
				sem.leave();
				setTimeout( eraseMoving, timer);
			});   
		}
		setTimeout( eraseMoving, timer); 
		
	});

}

	server.listen(porta); 


module.exports = {
	Run:run,
	Config:setConf
};


