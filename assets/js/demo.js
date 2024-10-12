// Called after form input is processed
function startConnect() {
  // Generate a random client ID
  clientID = "clientID-" + parseInt(Math.random() * 100);

  // Fetch the hostname/IP address and port number from the form
  host = document.getElementById("host").value;
  port = document.getElementById("port").value;

  // Print output for the user in the messages div
  // document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
  // document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

  // Initialize new Paho client connection
  client = new Paho.MQTT.Client(host, Number(9001), clientID);

  // Set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // client.onConnectionLost = onFailure;
  var options = {
    useSSL: false,
    userName: "mqttbroker",
    password: "mqttbroker123",
    onSuccess: onConnect,
    //onFailure:doFail,
  };
  // Connect the client, if successful, call onConnect function
  client.connect(options);
}

// Called when the client connects
function onConnect() {
  // Fetch the MQTT topic from the form
  topic = document.getElementById("topic").value;

  // Print output for the user in the messages div
  document.getElementById("connection").innerHTML = "Connected";
  document.getElementById("connection").classList.add("connected");

  // Subscribe to the requested topic
  client.subscribe(topic);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
  document.getElementById("connection").innerHTML = "Disconnected";

  if (responseObject.errorCode !== 0) {
    document.getElementById("connection").innerHTML = "Disconnected";
    document.getElementById("connection").classList.add("disconnected");
  }
}

//Called when a message arrives
// function onMessageArrived(message) {
//   // document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
//   console.log("onMessageArrived: " + message.payloadString);
//   if (message.destinationName == "test/topic1") {
//     document.getElementById("home1").innerHTML = message.payloadString;
//     document.getElementById("home1").style.fontSize = "100%";
//     document.getElementById("home1").style.color = "#FBB879";
//   }
//   if (message.destinationName == "test/topic2") {
//     document.getElementById("home2").innerHTML = message.payloadString;
//     document.getElementById("home2").style.fontSize = "100%";
//     document.getElementById("home2").style.color = "#FBB879";
//   }
//   if (message.destinationName == "test/topic3") {
//     document.getElementById("home3").innerHTML = message.payloadString;
//     document.getElementById("home3").style.fontSize = "100%";
//     document.getElementById("home3").style.color = "#FBB879";
//   }
//   if (message.destinationName == "test/topic4") {
//     document.getElementById("home4").innerHTML = message.payloadString;
//     document.getElementById("home4").style.fontSize = "100%";
//     document.getElementById("home4").style.color = "#FBB879";
//   }
// }
function publishmsg(topic, message) {
  try {
    var message1 = new Paho.MQTT.Message(message);
    message1.destinationName = topic;
    client.send(message1);
  } catch (error) {
    console.log(error);
  }
}

// Called when the disconnection button is pressed
function startDisconnect() {
  client.disconnect();
  document.getElementById("connection").innerHTML = "Disconnected";
  document.getElementById("connection").classList.add("disconnected");
}
