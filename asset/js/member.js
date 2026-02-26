import memberList from "/data/member-data.js";

const members = memberList();

const ROLE_LABELS = {
    president: 'President',
    'co-founder': 'Co-Founder',
    manager: 'Manager',
    designer: 'Designer',
    developer: 'Developer',
    web: 'Web',
    pwn: 'Pwn',
    crypto: 'Crypto',
    reverse: 'Reverse',
    forensic: 'Forensic',
    forensics: 'Forensic',
    misc: 'Misc',
    network: 'Network',
    cloud: 'Cloud',
};

function roleOrder(role) {
    const order = ['president', 'co-founder', 'manager', 'web', 'pwn', 'crypto', 'reverse', 'forensic', 'forensics', 'network', 'cloud', 'misc', 'designer', 'developer'];
    const idx = order.indexOf(role);
    return idx === -1 ? 99 : idx;
}

function renderCard(member) {
    const imgSrc = member.imgSrc
        ? `/images/member/${member.imgSrc}`
        : '/images/member/avatar-default.png';

    const roles = [...member.role]
        .sort((a, b) => roleOrder(a) - roleOrder(b))
        .map(r => `<span class="role-badge role-badge--${r}">${ROLE_LABELS[r] || r}</span>`)
        .join('');

    const motto = member.description
        ? `<p class="member-motto">"${member.description}"</p>`
        : '<p class="member-motto">Lowkey Hacker</p>';

    const githubLink = member.github
        ? `<a href="${member.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`
        : '';

    const mailLink = member.mail
        ? `<a href="mailto:${member.mail}" title="Email"><i class="fas fa-envelope"></i></a>`
        : '';

    return `
        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
            <div class="member-card">
                <div class="member-avatar-wrap">
                    <img class="member-avatar" src="${imgSrc}" alt="${member.alias}" loading="lazy">
                </div>
                <div class="member-info">
                    <h5 class="member-alias">${member.alias}</h5>
                    <p class="member-fullname">${member.fullname}</p>
                    <div class="member-roles">${roles}</div>
                    ${motto}
                    <div class="member-socials">
                        ${githubLink}
                        ${mailLink}
                    </div>
                </div>
            </div>
        </div>`;
}

function displayMembers(list) {
    const container = document.getElementById('membersList');
    const countEl = document.getElementById('memberCount');

    if (list.length === 0) {
        container.innerHTML = '<div class="members-empty">No members found matching filters.</div>';
    } else {
        container.innerHTML = list.map(renderCard).join('');
    }

    if (countEl) {
        countEl.innerHTML = `Showing <span>${list.length}</span> member${list.length !== 1 ? 's' : ''}`;
    }
}

function filterMembers() {
    const selectedYear = document.getElementById('yearFilter').value;
    const selectedRole = document.getElementById('roleFilter').value;
    const filtered = members.filter(m =>
        (selectedYear === 'all' || m.year.includes(parseInt(selectedYear))) &&
        (selectedRole === 'all' || m.role.includes(selectedRole))
    );
    displayMembers(filtered);
}

window.filterMembers = filterMembers;

displayMembers(members);
