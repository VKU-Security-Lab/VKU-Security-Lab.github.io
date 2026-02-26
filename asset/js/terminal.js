document.addEventListener('DOMContentLoaded', function () {
    const intro = document.getElementById('terminal-intro');
    const output = document.getElementById('terminal-output');
    const typedEl = document.getElementById('terminal-typed');
    const body = document.getElementById('terminal-body');

    if (!intro || !output || !typedEl) return;

    let inputBuffer = '';
    let history = [];
    let historyIndex = -1;
    let booted = false;

    const COMMANDS = {
        help: function () {
            return [
                '<span class="t-accent">Available commands:</span>',
                '',
                '  <span class="t-accent">help</span>          Show this help message',
                '  <span class="t-accent">about</span>         About VKU Security Lab',
                '  <span class="t-accent">members</span>       List team members',
                '  <span class="t-accent">ctf</span>           CTF competition stats',
                '  <span class="t-accent">achievements</span>  Our achievements',
                '  <span class="t-accent">links</span>         Useful links',
                '  <span class="t-accent">whoami</span>        Who are you?',
                '  <span class="t-accent">ls</span>            List site pages',
                '  <span class="t-accent">clear</span>         Clear terminal',
                '  <span class="t-accent">enter</span>         Enter the website',
            ];
        },
        about: function () {
            return [
                '<span class="t-accent">╔══════════════════════════════════════════╗</span>',
                '<span class="t-accent">║</span>        VKU SECURITY LAB — VSL           <span class="t-accent">║</span>',
                '<span class="t-accent">╚══════════════════════════════════════════╝</span>',
                '',
                '  Information Security Club of Vietnam-Korea',
                '  University of Information and Communication',
                '  Technology (VKU), Da Nang.',
                '',
                '  Founded:    <span class="t-accent">11/11/2023</span>',
                '  President:',
                '    Gen 1:    <span class="t-accent">Lê Thị Khánh Dung</span> (K20)',
                '    Gen 2:    <span class="t-accent">Phạm Minh Trí</span> (K21)',
                '    Gen 3:    <span class="t-accent">Võ Văn Bảo</span> (K22)',
                '  CTFtime:    <span class="t-accent">#131</span> global (2026) · <span class="t-accent">#13</span> Vietnam',
                '  Members:    <span class="t-accent">17+</span> active on CTFtime',
                '  CTFs:       <span class="t-accent">120+</span> competitions (2024-2026)',
                '  Website:    vku-security-lab.github.io',
                '  Training:   vsl.ce.vku.udn.vn',
                '  Discord:    discord.gg/PSvX9EwtDR',
                '',
                '  Motto: <span class="t-dim">"We can do anything as long as</span>',
                '  <span class="t-dim">we are together"</span>',
            ];
        },
        members: function () {
            return [
                '<span class="t-accent">Team Members (CTFtime):</span>',
                '',
                '  Dragon0zz    B14ckr053    d4kw1n',
                '  ph4n10m      L3op4rd      phat123xa',
                '  0xGunn       LSQUARE      armymen',
                '  boyhi74      pKa55o       maiphuongnn0',
                '  Linh         vuker        bl4ck0ut',
                '  Acacia       crysalix4',
                '',
                '  <span class="t-dim">+ many more active members across</span>',
                '  <span class="t-dim">Web, Crypto, Pwn, Rev, Forensic, Misc</span>',
            ];
        },
        ctf: function () {
            return [
                '<span class="t-accent">CTF Competition Stats:</span>',
                '',
                '  <span class="t-accent">2026</span>  Rating #131 global · #13 VN',
                '        Organized <span class="t-accent">VSL CTF 2026</span> (114 teams)',
                '        LA CTF, UofTCTF',
                '',
                '  <span class="t-accent">2025</span>  Rating #793 global · #46 VN',
                '        80+ CTFs competed including:',
                '        FooBar CTF (#25), Nowruz 1404 (#25)',
                '        pingCTF (#33), COMPFEST (#32)',
                '        SwampCTF (#102), DiceCTF (#199)',
                '        WolvCTF (#83), SECCON 14 (#279)',
                '',
                '  <span class="t-accent">2024</span>  Rating #587 global · #30 VN',
                '        RSTCON (#15), M*CTF Junior (#19)',
                '        Metared Argentina (#20), angstromCTF',
            ];
        },
        achievements: function () {
            return [
                '<span class="t-accent">Key Achievements:</span>',
                '',
                '  <span class="t-accent">[2026]</span> Organized VSL CTF 2026',
                '         114 teams · Jeopardy · weight 23.62',
                '',
                '  <span class="t-accent">[2025]</span> SVATTT 2025 — Encouragement Prize',
                '         VKU-T1 → Attack-Defend finals',
                '',
                '  <span class="t-accent">[2025]</span> Incident Response Drill Danang',
                '         3rd place',
                '',
                '  <span class="t-accent">[2025]</span> CyberFest @ DTU — 3rd place',
                '',
                '  <span class="t-accent">[2025]</span> Intl Security Conf @ DTU — 3rd',
                '',
                '  <span class="t-accent">[2025]</span> HCMUS Talent CTF — Enc. Prize',
                '',
                '  <span class="t-accent">[2025]</span> Hackathon 2025 Champion',
                '         DevSecOps Solutions VN & TouchCyber',
                '',
                '  <span class="t-accent">[2025]</span> Digital Dragons CTF 2025',
                '         146 teams · 573 participants · 28 unis',
                '         VSL.T1 & VSL.0utl4w → national finals',
                '',
                '  <span class="t-accent">[2024]</span> ASCIS 2024 (SVATTT ASEAN)',
                '         VSL.Xp10r3rs → top 20 Group A',
                '         VSL.Defenders → #11/63 Group B',
                '         Won Encouragement Prize',
                '',
                '  <span class="t-accent">[2023]</span> DDC 2023 — hosted finals at VKU',
                '         100 teams · 500 participants',
                '',
                '  <span class="t-accent">[2023]</span> Red Team Danang — 3rd place',
            ];
        },
        links: function () {
            return [
                '<span class="t-accent">Links:</span>',
                '',
                '  Website    → vku-security-lab.github.io',
                '  CTFtime    → ctftime.org/team/284373',
                '  GitHub     → github.com/VKU-Security-Lab',
                '  Training   → vsl.ce.vku.udn.vn',
                '  VSL CTF    → vsl-ctf.com',
                '  Facebook   → facebook.com/vkuseclab',
                '  Discord    → discord.gg/PSvX9EwtDR',
                '  Email      → vsl@vku.udn.vn',
            ];
        },
        whoami: function () {
            return [
                '<span class="t-accent">visitor@vsl-lab</span>',
                '',
                '  You are a guest exploring the VKU Security Lab.',
                '  Type <span class="t-accent">help</span> to see what you can do,',
                '  or <span class="t-accent">enter</span> to visit the website.',
            ];
        },
        ls: function () {
            return [
                '<span class="t-accent">drwxr-xr-x</span>  about_us/',
                '<span class="t-accent">drwxr-xr-x</span>  members/',
                '<span class="t-accent">drwxr-xr-x</span>  achievement/',
                '<span class="t-accent">drwxr-xr-x</span>  writeups/',
                '<span class="t-accent">drwxr-xr-x</span>  history/',
                '<span class="t-accent">drwxr-xr-x</span>  event/',
                '<span class="t-accent">drwxr-xr-x</span>  recruitment/',
            ];
        },
        clear: function () {
            output.innerHTML = '';
            return [];
        },
        enter: function () {
            dismiss();
            return ['<span class="t-accent">Entering the lab...</span>'];
        },
        exit: function () {
            return COMMANDS.enter();
        },
    };

    function appendLines(lines, isHtml) {
        lines.forEach(function (line) {
            var div = document.createElement('div');
            div.className = 'terminal-line';
            if (isHtml) {
                div.innerHTML = line;
            } else {
                div.textContent = line;
            }
            output.appendChild(div);
        });
        scrollToBottom();
    }

    function appendPromptLine(cmd) {
        var div = document.createElement('div');
        div.className = 'terminal-line';
        div.innerHTML = '<span class="t-accent">vsl@vku:~$</span> ' + escapeHtml(cmd);
        output.appendChild(div);
    }

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function scrollToBottom() {
        body.scrollTop = body.scrollHeight;
    }

    function processCommand(cmd) {
        var trimmed = cmd.trim().toLowerCase();
        appendPromptLine(cmd);

        if (trimmed === '') {
            scrollToBottom();
            return;
        }

        if (history.length === 0 || history[history.length - 1] !== cmd) {
            history.push(cmd);
        }
        historyIndex = history.length;

        if (trimmed.startsWith('cd ')) {
            var target = trimmed.replace('cd ', '').replace('/', '');
            var pages = ['about_us', 'member', 'members', 'achievement', 'writeups', 'history', 'event', 'recruitment'];
            if (target === 'members') target = 'member';
            if (pages.indexOf(target) !== -1) {
                appendLines(['<span class="t-accent">Navigating to /' + target + '/...</span>'], true);
                setTimeout(function () {
                    window.location.href = '/page/' + target + '/';
                }, 500);
                return;
            }
            appendLines(['cd: no such directory: ' + escapeHtml(target)], false);
            return;
        }

        var handler = COMMANDS[trimmed];
        if (handler) {
            var result = handler();
            if (result.length > 0) {
                appendLines(result, true);
            }
        } else {
            appendLines([
                'command not found: <span class="t-accent">' + escapeHtml(trimmed) + '</span>',
                'Type <span class="t-accent">help</span> for available commands.'
            ], true);
        }

        scrollToBottom();
    }

    function bootSequence() {
        var bootLines = [
            { text: '$ ./vsl --init', accent: true },
            { text: '[*] booting vsl framework v2.0...' },
            { text: '[*] loading modules: web // crypto // pwn // rev // misc' },
            { text: '[*] connecting to vku secure network...' },
            { text: '[+] status: ONLINE — CTFtime rank #131', accent: true },
            { text: '' },
            { text: 'Welcome to VKU Security Lab interactive shell.', accent: true },
            { text: 'Type "help" for commands, or "enter" to visit the site.' },
        ];

        var i = 0;
        function nextLine() {
            if (i >= bootLines.length) {
                booted = true;
                return;
            }
            var line = bootLines[i];
            var div = document.createElement('div');
            div.className = 'terminal-line' + (line.accent ? ' terminal-line--accent' : '');
            output.appendChild(div);

            var text = line.text;
            var j = 0;
            function typeChar() {
                if (j < text.length) {
                    div.textContent += text.charAt(j);
                    j++;
                    scrollToBottom();
                    setTimeout(typeChar, 10 + Math.random() * 20);
                } else {
                    i++;
                    setTimeout(nextLine, 80);
                }
            }
            typeChar();
        }
        nextLine();
    }

    function dismiss() {
        if (intro.classList.contains('terminal-intro--hidden')) return;
        intro.classList.add('terminal-intro--hidden');
        setTimeout(function () { intro.remove(); }, 650);
    }

    // Keyboard handling
    document.addEventListener('keydown', function (e) {
        if (!intro || intro.classList.contains('terminal-intro--hidden')) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            if (!booted) return;
            var cmd = inputBuffer;
            inputBuffer = '';
            typedEl.textContent = '';
            processCommand(cmd);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            inputBuffer = inputBuffer.slice(0, -1);
            typedEl.textContent = inputBuffer;
            scrollToBottom();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0 && historyIndex > 0) {
                historyIndex--;
                inputBuffer = history[historyIndex];
                typedEl.textContent = inputBuffer;
                scrollToBottom();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                inputBuffer = history[historyIndex];
                typedEl.textContent = inputBuffer;
            } else {
                historyIndex = history.length;
                inputBuffer = '';
                typedEl.textContent = '';
            }
            scrollToBottom();
        } else if (e.key === 'Escape') {
            dismiss();
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            inputBuffer += e.key;
            typedEl.textContent = inputBuffer;
            scrollToBottom();
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            COMMANDS.clear();
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            appendPromptLine(inputBuffer + '^C');
            inputBuffer = '';
            typedEl.textContent = '';
            scrollToBottom();
        }
    });

    var closeBtn = document.getElementById('terminal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dismiss();
        });
    }

    bootSequence();
});
