// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer
const remote = require('electron').remote;

let axios = require('axios');

const apiUrl = (term) => {
    return `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;
};

let searchBar = document.getElementById('search');
searchBar.onkeypress = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        if (searchBar.value === "")
            return;

        // loading
        document.getElementById('img-show')
                .setAttribute('src', 'imgs/loading.gif');

        axios.get(apiUrl(searchBar.value), {})
            .then((res) => {
                document.getElementById('img-show')
                        .setAttribute('src', res.data.data[0].images.original.url);
            }).catch((err) => {
                document.getElementById('img-show')
                        .setAttribute('src', "imgs/error.png");
                console.log(err);
            });
    }
};

ipc.on("showSurprise", (event, data) => {
    if (document.getElementById('secretSection').style.display == "none"){
        document.getElementById('secretSection').style.display = "flex";
	} else {
		document.getElementById('secretSection').style.display = "none";
	}
})

document.getElementById("min-btn").addEventListener("click", function (e) {
    var win = remote.getCurrentWindow();
    win.minimize();
});

document.getElementById("max-btn").addEventListener("click", function (e) {
    var win = remote.getCurrentWindow();
    if (!win.isMaximized()) {
        win.maximize();
    } else {
        win.unmaximize();
    }
});

document.getElementById("close-btn").addEventListener("click", function (e) {
    var win = remote.getCurrentWindow();
    win.close();
});
