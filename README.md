# Who-Online (o-O)
**Who-Online (o-O)** tracks the on-line users in your NodeJS application. The package is using **socket.io** lib. For each tracked user, the *live* and *online* status and the last access are stored. There are three actors in the **Who-Online (o-O)** architecture:

* **Server**: manage the data of tracked  **UserAsClient** and dispact the information to the  **UserAsServer**
* **UserAsClient**: identify the tracked client
* **UserAsServer**: receive the information by the **Server**

The **Server** sends the **UserAsClient**'s information to the **UserAsServer** as an array composed of three objects: 

* **live**: list of json objects of live users, users are active on the web-page 
* **online**: list of json objects of logged users, users can be idle
* **last**: list of json objects with last access users informartion 

`{live:[{...}], online:[{...}], last:[{...}]}`


Each object of these lists is composed of a client-id and the timestamp (millisecs).

`{id:client-ID,timestamp:..long..}`

## Installation
``npm install https://github.com/Arfius/who-online.git``

## Usage
### Nodejs Server
``` javascript
var whoonline = require('who-online');
var options=
{
	timer:5000, // millisec 
	refresh:10000, // millisec after that a user state passes to idle 
	port:4200, // socke.io port 
	server_key:"my_key_server" // unique id for the server
}
whoonline.Config(options);
whoonline.Run();
```
### Web-Client-Page
``` javascript
<script src="/socket.io-client/dist/socket.io.js"></script>
<script src="/who-online/who-client.js"></script>
  
var options = 
{
	id_client:"client-ID", //unique Client id
	url_socket:"http://localhost:4200", //endPoint Socket
	time_refresh:5000, //millisec
}
var whoclient = WhoClient(options);
whoclient.run();
```
### Web-Server-Page
``` javascript
<script src="/socket.io-client/dist/socket.io.js"></script>
<script src="/who-online/who-server.js"></script>
        
var callback= function(value){
	/*
		code here
		
		value.online => array of logged users
		value.last   =>   array of last access 
		value.live   =>   array of live users
	*/
	
 };
		
var options = 
{
	id_client:"server-"+new Date().getTime(),
	url_socket:"http://localhost:4200",
	time_refresh:5000,
	server_key:"my_key_server" //server_key
	output:callback // 
}
var whoserver = WhoServer(options);
whoserver.run();
``` 
## Example
Check Directory example for a complete example.
Socket.io is running on port 4200, wherease the server on the 4201.

``cd example``

``npm install``

``node example.js``

``http://localhost:4201`` > WebClient

``http://localhost:4201/server`` > WebServer
