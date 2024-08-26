import memberList from "/data/member-data.js";

const members = memberList();

function displayMembers(members) {
    const container = document.getElementById('membersList');
    container.innerHTML = '';
    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = 'col-md-4 mb-4';
        memberElement.innerHTML = `
            <div class="card">
                <img src="${member.imgSrc ? `/images/member/${member.imgSrc}` : "/images/member/avatar-default.png"}" class="card-img-top" alt="${member.name}">
                <div class="card-body">
                    <h5 class="card-title">${member.name}</h5>
                    <div class="card-text">${member.description}</div>
                    <div class="card-role">${member.role.map(role => role.toUpperCase()).join(', ')}</div>
                    <div class="icon-links">
                        <a href="${member.github}" target="_blank"><img src="/images/github.png" alt="GitHub" class="icon-info"></a>
                        <a href="mailto:${member.mail}"><img src="/images/mail.png" alt="Email" class="icon-info"></a>
                    </div>
                </div>
            </div>`;
        container.appendChild(memberElement);
    });
}

function filterMembers() {
    const selectedYear = document.getElementById('yearFilter').value;
    const selectedRole = document.getElementById('roleFilter').value;
    const filteredMembers = members.filter(member =>
        (selectedYear === 'all' || member.year.includes(parseInt(selectedYear))) &&
        (selectedRole === 'all' || member.role.includes(selectedRole))
    );
    displayMembers(filteredMembers);
}

window.filterMembers = filterMembers;

displayMembers(members);