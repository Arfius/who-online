# Who-Online 
Nodejs Lib to check online users.

## Installation
``npm install https://github.com/Arfius/who-online.git``

## Usage
### Nodejs Server
``` javascript
var whoonline = require('who-online');
var options=
{
	timer:5000,
	refresh:10000,
	port:4200,
	server_key:"my_key_server"
}
whoonline.Config(options);
whoonline.Run();
```
### Web-Client
``` javascript
<script>
	var options = 
	{
		id_client:"client-"+new Date().getTime(), //idClient
		url_socket:"http://localhost:4200", //endPoint Socket
		time_refresh:5000, //millisec
	}
	var whoclient = WhoClient(options);
	whoclient.run();
</script>
```
### Web-Server
``` javascript
<script>
	var options = 
	{
		id_client:"server-"+new Date().getTime(),
		url_socket:"http://localhost:4200",
		time_refresh:5000,
		server_key:"my_key_server" //server_key
	}
	var whoserver = WhoServer(options);
	whoserver.run();
	//watch whoserver.output for data
</script>
``` 
## Example
Check Directory example for a complete example

``cd example``

``npm install``

``node example.js``

``http://localhost:4201`` > WebClient

``http://localhost:4201/server`` > WebServer
