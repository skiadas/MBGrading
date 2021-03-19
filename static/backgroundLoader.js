function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener);
  xhr.addEventListener("error", () => console.log("Oops"));
  xhr.open("GET", document.URL);
  xhr.responseType = "document";
  xhr.timeout = 5000;
  xhr.send();
}

setInterval(loadData, 5000);

function reqListener() {
  const downloadedMessages = this.responseXML.querySelector("#messages");
  document.querySelector("#messages").replaceWith(downloadedMessages);
}
