import writeupList from '/data/writeup-data.js';
const writeupListData = writeupList();

function displayList(writeups) {
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = '';

    writeups.forEach(writeup => {
        const item = document.createElement('a');
        item.classList.add('list-group-item', 'list-group-item-action');
        item.href = `/page/detail-writeup/?id=${writeup.id}`;

        const banner = document.createElement('img');
        banner.src = `/images/writeups/${writeup.banner}`; // Ensure the path is correct
        banner.alt = 'Writeup Image';

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('writeup-info');

        const title = document.createElement('div');
        title.classList.add('writeup-title');
        title.textContent = writeup.title;

        const description = document.createElement('div');
        description.classList.add('writeup-description');
        description.textContent = writeup.description;

        const meta = document.createElement('div');
        meta.classList.add('writeup-meta');
        meta.textContent = `Published on ${writeup.date} by ${writeup.author}`;

        // Tag display
        const tags = document.createElement('div');
        tags.classList.add('writeup-tags');
        writeup.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('badge', 'badge-primary', 'badge-pill');
            tagElement.textContent = tag;
            tags.appendChild(tagElement);
        });

        console.log(tags);
        

        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        infoDiv.appendChild(meta);
        infoDiv.appendChild(tags);

        item.appendChild(banner);
        item.appendChild(infoDiv);

        listContainer.appendChild(item);
    });
}

// Get all tags of writeups and display them in the dropdown
function displayTags() {
    const tags = writeupList().reduce((acc, writeup) => {
        writeup.tags.forEach(tag => {
            if (!acc.includes(tag)) {
                acc.push(tag);
            }
        });
        return acc;
    }, []);

    const tagContainer = document.getElementById('tagFilter');
    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagContainer.appendChild(option);
        
    });
}

// Get all years of writeups and display them in the dropdown
function displayYears() {
    const years = writeupList().reduce((acc, writeup) => {
        const year = writeup.date.split('/')[2];
        
        if (!acc.includes(year)) {
            acc.push(year);
        }
        return acc;
    }, []);

    const yearContainer = document.getElementById('yearFilter');
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearContainer.appendChild(option);
    });
}

// Filter writeups based on selected tag
function filterWriteup() {
    const selectedTag = document.getElementById('tagFilter').value;
    const selectedYear = document.getElementById('yearFilter').value;
    const filteredWriteups = writeupList().filter(writeup =>
        (selectedTag === 'all' || writeup.tags.includes(selectedTag)) &&
        (selectedYear === 'all' || writeup.date.split('/')[2] === selectedYear)
    );
    displayList(filteredWriteups);
}

window.filterWriteup = filterWriteup;

displayYears();

displayTags();

displayList(writeupListData);
