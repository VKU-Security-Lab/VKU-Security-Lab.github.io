import writeupList from "/data/writeup-data.js";
var writeups = writeupList();
const converter = new showdown.Converter();

function loadMarkdown(fileName) {
    fetch(`/writeups/${fileName}`)
        .then(response => response.text())
        .then(text => {
            var html = converter.makeHtml(text);
            const content = document.getElementById('content');
            var h1 = html.match(/<h1.*?>.*?<\/h1>/g)[0];
            h1 = h1.replace('<h1', '<h1 style="margin-top: 10px;"');
            html = html.replace(/<h1.*?>.*?<\/h1>/, "");
            content.innerHTML = html;
            hljs.highlightAll();
            const timeReading = Math.ceil(html.split(' ').length / 200);
            document.getElementById('time-reading').innerHTML = `<b>Time reading:</b> ${timeReading} min`;
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
    document.getElementById('title').innerHTML = writeup.title;
    document.getElementById('author').innerHTML = "<b>Author:</b> " + writeup.author;
    document.getElementById('date').innerHTML = "<b>Date:</b> " + writeup.date;
    document.getElementById('category').innerHTML = "<b>Tags: </b>" + writeup.tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join(' ');
    loadMarkdown(writeup.link);
}



displayWriteup();