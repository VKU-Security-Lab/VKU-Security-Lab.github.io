import writeupList from "/data/writeup-data.js";
var writeups = writeupList();
const converter = new showdown.Converter();

function loadMarkdown(fileName) {
    fetch(`/writeups/${fileName}`)
        .then(response => response.text())
        .then(text => {
            const html = converter.makeHtml(text);
            document.getElementById('content').innerHTML = html;
        }).catch(error => {
            console.error('Error loading the markdown file:', error);
        });
}

function displayWriteup() {
    const parameters = new URLSearchParams(window.location.search);
    const idWriteup = parameters.get("id");
    const writeup = writeups.find(_ => _.id == idWriteup);
    if (!writeup) {
        document.getElementById('content').innerHTML = 'Writeup not found';
        return;
    }
    loadMarkdown(writeup.link);
}

displayWriteup();