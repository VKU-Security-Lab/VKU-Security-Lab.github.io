import writeupList from '/data/writeup-data.js';

var writeups = writeupList();


function displayList() {
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = '';
    writeups.forEach((file, index) => {
        const link = document.createElement('a');
        link.href = `/page/detail-writeup/?id=${file.id}`;
        link.textContent = file.link.replace('.md', '');
        link.onclick = () => loadMarkdown(file.link);
        listContainer.appendChild(link);
        listContainer.appendChild(document.createElement('br'));
    });
}

displayList();