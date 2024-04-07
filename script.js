window.on = (e,f) => window.addEventListener(e,f)
let loading = document.createElement("div");

// Apply CSS styles to center the div
loading.style.position = "fixed";
loading.style.top = "50%";
loading.style.left = "50%";
loading.style.transform = "translate(-50%, -50%)";
loading.style.padding = "12px"
loading.innerHTML = "loading... (<span id='i'>0</span>%)"
loading.style.border = "2px solid black";

document.body.appendChild(loading);

var xhr = new XMLHttpRequest();
xhr.open('GET', '/page.html', true);
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    document.getElementById('i').innerText = ((event.loaded / event.total) * 100).toFixed(2)
  }
};
xhr.onload = function() {
  if (xhr.status === 200) {
    setTimeout(function() {
      console.log('Download complete');
      loading.remove()
      window.document.write(xhr.responseText);
    }, 100)
  } else {
    console.error('Request failed with status:', xhr.status);
  }
};
xhr.send();

window.on('done', () => {
  setTimeout(function() {
    loading.remove()
  }, 100)
})