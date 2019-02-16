var db = new PouchDB("pouchchat");

//IMPORTANT: CONFIGURE remoteCouch with your own details
var remoteCouch = "https://couch.edhbr.fr/test_pouch";

db.info(function(err, info) {
  console.log("db.changes", info);
  db.changes({
    since: info.update_seq,
    live: true
  }).on("change", readMessages);
});

var syncDom = document.getElementById("sync-wrapper");
var newChatName = document.getElementById("chat-name");
var newChatMessage = document.getElementById("chat-message");
var addMessageButton = document.getElementById("new-message-button");

function addMessage() {
  console.log("addMessage");
  var message = {
    _id: new Date().toISOString(), //required
    name: newChatName.value,
    content: newChatMessage.value
  };

  db.put(message, function callback(err, result) {
    if (!err) {
      console.log("Successfully added message " + message.content);
      newChatMessage.value = "";
    }
  });
}

function readMessages() {
  console.log("readMessages");
  db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
    redrawUI(doc.rows);
  });
}

function redrawUI(messages) {
  console.log("redrawUI");
  var ul = document.getElementById("chat-messages");
  ul.innerHTML = "";
  messages.forEach(function(message) {
    var li = document.createElement("li");
    var pName = document.createElement("p");
    var pMessage = document.createElement("p");

    pName.textContent = message.doc.name;
    pMessage.textContent = message.doc.content;
    pName.className = "text-danger";

    li.appendChild(pName);
    li.appendChild(pMessage);
    li.className = "list-group-item";
    ul.appendChild(li);
  });
}

function sync() {
  console.log("sync");
  syncDom.setAttribute("data-sync-state", "syncing");
  var opts = {
    live: true,
    retry: true,
    complete: syncError
  };
  db.sync(remoteCouch, opts);
}

function syncError() {
  console.log("syncError");
  console.log("data-sync-error");
  syncDom.setAttribute("data-sync-state", "error");
}

if (remoteCouch) {
  sync();
}

addMessageButton.addEventListener("click", addMessage);
readMessages();
