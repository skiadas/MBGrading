function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener);
  xhr.addEventListener("error", () => console.log("Oops"));
  xhr.open("GET", document.URL);
  xhr.responseType = "document";
  xhr.send();
}
setInterval(loadData, 1000);

function reqListener() {
  const downloadedMessages = this.responseXML.querySelector("#messages");
  document.querySelector("#messages").replaceWith(downloadedMessages);
}
