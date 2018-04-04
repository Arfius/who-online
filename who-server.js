var WhoServer = function(options)
{
	this.id_client=options.id_client;
	this.url_socket=options.url_socket;
	this.refresh=options.time_refresh;
	this.server_key=options.server_key;
	

	var socket = io.connect(this.url_socket);
	var last_call=new Date().getTime();
	var self = this;
	socket.on('connect', function(data)
	{    	
		socket.emit('join', self.id_client);
	});

	var OnlineDetect = function (event) {
	
		var now=new Date().getTime();
			
		if(now-last_call>self.refresh)
		{
			socket.emit('moving',event);
			last_call=now;
		}
	};
	
	socket.on(this.server_key, function(data)
	{   
		options.output=data
		console.log("options.output",options.output);
	});
	

	this.run= function()
	{
		document.addEventListener("mouseover", OnlineDetect);
		document.addEventListener("click", OnlineDetect);
		document.addEventListener("scrool", OnlineDetect, false);
		document.addEventListener("touchstart", OnlineDetect, false);
		document.addEventListener("touchmove", OnlineDetect, false);
	}
	
	return this;
}