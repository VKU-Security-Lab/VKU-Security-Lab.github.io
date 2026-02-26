import { events } from "/data/event-data.js";

const container = document.getElementById('eventTimeline');
const filterBtns = document.querySelectorAll('.event-filter-btn');

let currentFilter = 'all';

function renderEvents(filter) {
    const filtered = filter === 'all'
        ? events
        : events.filter(e => e.type === filter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="events-empty">No events found for this category.</div>';
        return;
    }

    container.innerHTML = filtered.map(ev => {
        const linkHtml = ev.link
            ? `<a href="${ev.link}" target="_blank" class="event-card-link"><i class="fas fa-external-link-alt"></i> View details</a>`
            : '';

        const tags = ev.tags
            .map(t => `<span class="event-tag">${t}</span>`)
            .join('');

        return `
            <div class="event-item">
                <div class="event-dot event-dot--${ev.type}">
                    <i class="${ev.icon}"></i>
                </div>
                <div class="event-card">
                    <div class="event-card-header">
                        <h5 class="event-card-title">${ev.title}</h5>
                        <span class="event-card-date">${ev.date}</span>
                    </div>
                    <p class="event-card-desc">${ev.description}</p>
                    <div class="event-card-tags">${tags}</div>
                    ${linkHtml}
                </div>
            </div>`;
    }).join('');
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderEvents(currentFilter);
    });
});

renderEvents('all');
