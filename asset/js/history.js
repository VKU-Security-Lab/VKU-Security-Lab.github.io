import { timelineData } from '/data/history-data.js'; 

document.addEventListener("DOMContentLoaded", function () {
    const timelineContainer = document.querySelector('.timeline');

    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item', 'row');
        timelineItem.style.opacity = 0; 

        timelineItem.innerHTML = `
            <div class="col">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <span class="badge bg-primary">${item.time}</span>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);

        setTimeout(() => {
            timelineItem.style.transition = 'opacity 0.5s ease-in-out';
            timelineItem.style.opacity = 1;
        }, index * 800);
    });
});
