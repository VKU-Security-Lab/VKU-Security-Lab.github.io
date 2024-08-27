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
            document.getElementById('time-reading').innerHTML = `<b>🕛 Time reading:</b> ${timeReading} min`;
            const tableOfContents = document.getElementById('table-of-contents');
            const dataTableOfContents = html.match(/<h[1-6].*?>.*?<\/h[1-6]>/g);
            console.log(dataTableOfContents);
            if (dataTableOfContents) {
                tableOfContents.innerHTML = "<h2>Table of Contents</h2>";
                dataTableOfContents.forEach(element => {
                    console.log(element);
                    
                    const tag = element.match(/<h[1-6]/g)[0];
                    const title = element.match(/<h[1-6].*?>(.*?)<\/h[1-6]>/)[1];
                    const id = title.toLowerCase().replace(/ /g, "").replace(/[^a-zA-Z0-9]/g, '');
                    
                    let className = '';
                    if (tag == '<h1') {
                        className = 'toc-h1';
                    }
                    else if (tag == '<h2') {
                        className = 'toc-h2';
                    } else if (tag == '<h3') {
                        className = 'toc-h3';
                    }
                    const newTag = `<a href="#${id}" class="${className}">> ${title}</a><br>`;
                    tableOfContents.innerHTML += newTag;
                    element = element.replace(tag, tag + ` id="${id}"`);
                    content.innerHTML = content.innerHTML.replace(element, element);
                });

                document.addEventListener('click', function (event) {
                    if (event.target.classList.contains('toc-h1') || event.target.classList.contains('toc-h2') || event.target.classList.contains('toc-h3')) {
                        event.preventDefault();
                        const id = event.target.href.split('#')[1];
                        const element = document.getElementById(id);

                        
                        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
                        setTimeout(() => {
                            window.scrollBy(0, -80);
                        }, 1000);
                    }
                });
            }
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
    document.getElementById('author').innerHTML = "<b>🥷 Author:</b> " + writeup.author;
    document.getElementById('date').innerHTML = "<b>📆 Date:</b> " + writeup.date;
    document.getElementById('category').innerHTML = "<b>🏷️ Tags: </b>" + writeup.tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join(' ');
    loadMarkdown(writeup.link);
}

displayWriteup();