var WhoClient = function(options)
{
	this.id_client=options.id_client;
	this.url_socket=options.url_socket;
	this.refresh=options.time_refresh;

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
	}

	this.run= function()
	{
		document.addEventListener("mouseover", OnlineDetect,true);
		document.addEventListener("click", OnlineDetect,true);
		document.addEventListener("scrool", OnlineDetect, false);
		document.addEventListener("touchstart", OnlineDetect, false);
		document.addEventListener("touchmove", OnlineDetect, false);
	}

	this.stop= function()
	{
		document.removeEventListener("mouseover", OnlineDetect,true);
		document.removeEventListener("click", OnlineDetect,true);
		document.removeEventListener("scrool", OnlineDetect, false);
		document.removeEventListener("touchstart", OnlineDetect, false);
		document.removeEventListener("touchmove", OnlineDetect, false);
		socket.close()
	}

	return this;
}
