/*
			\|/ MQTTerra

 * @ Authors: Andre Schlichting & Kaue Cano 
 * @ Create Time: 2019-06-25 21:01:19
 * @ Modified by: canokaue
 * @ Modified time: 2019-06-26 09:46:53

*/

var notification = false;
var temperatura;
connection = false;

// Notification options
Notification.requestPermission().then(function(result) {
    console.log(result);
  });

const not_img = "icons/alert.png";
const not_title = "Warning!";
const not_body = "Your reservoir is running low.";

function getURLResource(path)
{
    // notice that index.html is the launchpath of your app
    var url = window.location.href.replace("index.html", "");

    return url + path;

};

// In your case you can do something like that:
var not_ico_url = getURLResource(not_img);

//console.log(not_ico_url);

// Called on CONNECT click
function clicks(){
//function startConnect() {
// Generate a random client ID
clientID = "clientID-" + parseInt(Math.random() * 100);
client = new Paho.MQTT.Client("tailor.cloudmqtt.com", Number(33191), clientID);

//if (connection = true) {
 // Print output for the user in the messages div
  //  document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
   // document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';
    
//}
//else
   
  //  client.disconnect();
    //document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';

// Initialize new Paho client connection
 //client = new Paho.MQTT.Client("mqtt://ftaylsiy:dyygblVZaO0l@postman-01.cloudmqtt.com", Number(17841), clientID);


// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
    useSSL: true,
    userName : "gquwdgpz",
    password : "aqnkJeRXgZQ9",
    onSuccess:onConnect,
    onFailure:doFail,
}
// Connect the client, if successful, call onConnect function
client.connect(options);
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    //topic = "#";
    console.log("Connected");
    // Print output for the user in the messages div
    // document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe("#");
  
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

/*

// Called when a message arrives - using switch case (bugged)
function onMessageArrived(message) {
    switch (message.destinationName) {
        case '/topic/temperature':
            document.getElementById("temperature").innerHTML = message.payloadString;
            document.getElementById("temperature").style.fontSize = "300%";
        case '/topic/humidity':
            document.getElementById("humidity").innerHTML = message.payloadString;
            document.getElementById("humidity").style.fontSize = "300%";
        default:
            console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName);
        
    }

*/
function onMessageArrived(message) {
      console.log("onMessageArrived: " + message.payloadString);
    if (message.destinationName == 'topic/front/door') {
            document.getElementById("temperature").innerHTML = message.payloadString + '°C';
            document.getElementById("temperature").style.fontSize = "300%"; 
            //console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); 
        }
            
    else if (message.destinationName == 'topic/back/door') {
            document.getElementById("humidity").innerHTML = message.payloadString + '%';
            document.getElementById("humidity").style.fontSize = "300%"; 
            console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); 
        }

    else if (message.destinationName == 'topic/front/door') {
        document.getElementById("plant1").innerHTML = message.payloadString;
        document.getElementById("plant1").style.fontSize = "300%"; 
        console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); 
    }

    else if (message.destinationName == 'topic/drip') {
        document.getElementById("distance").innerHTML = message.payloadString;
        document.getElementById("distance").style.fontSize = "200%"; 
        console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); 
        if  (message.payloadString == '1'){
            document.getElementById("page_title").innerHTML = "(!) Drip Irrigation";
             console.log("NOTIFICATION");
             new Notification(not_title, { body: not_body, icon: not_ico_url });
             notification = true;
           
                
        }
        else {document.getElementById("page_title").innerHTML = "Drip Irrigation";} }
    
    else if (message.destinationName == 'topic/front/switch') {
        document.getElementById("relaystatus").innerHTML = message.payloadString;
        document.getElementById("relaystatus").style.fontSize = "300%"; 
        console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); 
    }
        if (message.payloadString == 'ON') {
            document.getElementById("relay_color").className = "style6";
            document.getElementById("io").innerHTML = "Close --";
        }
        else if (message.payloadString == 'OFF') {
            document.getElementById("relay_color").className = "style7";
            document.getElementById("io").innerHTML = "Open \\|/";
        }
    }
    /*console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName);
    document.getElementById("messages").innerHTML = '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    document.getElementById("temperature").innerHTML = message.payloadString + '°C';
    document.getElementById("humidity").innerHTML = message.payloadString + '%';*/


// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML = '<span>Disconnected</span><br/>';
}

function relay() {
    
    message = new Paho.MQTT.Message("ON");
    message.destinationName = "topic/front/switch";
    client.send(message);

  }

  function doFail(e){
    console.log(e);
  }