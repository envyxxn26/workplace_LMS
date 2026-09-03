// Login page: switch between sign-in and sign-up panels.
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signInForm = document.getElementById('signInForm');

if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
}

if (signInForm) {
    signInForm.addEventListener('submit', event => {
        event.preventDefault();
        window.location.href = 'Employee/index.html';
    });
}

// Employee dashboard: load data and render dashboard sections.
if (document.getElementById('page-dashboard')) {
    // Dashboard summary cards, tasks, and ticket data.
    const stats = [
        { value: 12, label: 'My Tasks', sub: '5 Due Today' },
        { value: 8, label: 'Events', sub: 'Next: Team Meeting' },
        { value: 4, label: 'Tickets', sub: '1 High Priority' },
        { value: 3, label: 'Unread Messages', sub: 'From 2 people' }
    ];
    const allTasks = [
        { title: 'Submit Report', time: '01:00 PM - 02:00 PM' },
        { title: 'Job Order', time: '02:00 PM - 03:00 PM' },
        { title: 'Toolbox Meeting', time: '03:00 PM - 04:00 PM' },
        { title: 'Safety Inspection', time: '04:00 PM - 04:30 PM' },
        { title: 'Equipment Check', time: '04:30 PM - 05:00 PM' },
        { title: 'Team Briefing', time: '05:00 PM - 05:30 PM' },
        { title: 'Daily Progress Update', time: '05:30 PM - 06:00 PM' },
        { title: 'Review Job Orders', time: '06:00 PM - 06:30 PM' },
        { title: 'Submit Timesheet', time: '06:30 PM - 07:00 PM' },
        { title: 'Update Project Notes', time: '07:00 PM - 07:30 PM' },
        { title: 'Check Team Messages', time: '07:30 PM - 08:00 PM' },
        { title: 'End-of-Day Handover', time: '08:00 PM - 08:30 PM' },
        { title: 'Prepare Tomorrow\'s Schedule', time: '08:30 PM - 09:00 PM' },
        { title: 'Archive Completed Tasks', time: '09:00 PM - 09:30 PM' }
    ];
    const tasks = allTasks.slice(0, 3);
    const tickets = [
        { id: 'ABC34', name: 'Liam Smith', email: 'liam@gmail.com', subject: 'PC not turning on', created: '30 min ago', status: 'New' },
        { id: 'DEF56', name: 'Olivia Brown', email: 'olivia@gmail.com', subject: "Desktop won't boot up", created: '1 hour ago', status: 'Open' },
        { id: 'JKL90', name: 'Sophia Wilson', email: 'sophia@gmail.com', subject: "Phone won't turn on", created: '3 hours ago', status: 'In Progress' },
        { id: 'MNO12', name: 'James Taylor', email: 'james@gmail.com', subject: 'Monitor is blank', created: '4 hours ago', status: 'Close' }
    ];
    const statusMap = { New: 'status-new', Open: 'status-open', 'In Progress': 'status-progress', Close: 'status-close' };
    const statIcons = {
        'My Tasks': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h6M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1Z"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="m8 12 2 2 4-4M8 17h8"/></svg>',
        Events: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
        Tickets: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M8 12h8"/></svg>',
        'Unread Messages': '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>'
    };

    // Render the summary cards at the top of the dashboard.
    const statsRow = document.getElementById('statsRow');
    stats.forEach(stat => {
        const element = document.createElement('div');
        element.className = 'stat-card';
        element.innerHTML = `<div class="stat-icon">${statIcons[stat.label]}</div><div><div class="stat-value">${stat.value}</div><div class="stat-label">${stat.label}</div><div class="stat-sub">${stat.sub}</div></div>`;
        statsRow.appendChild(element);
    });

    // Render the three tasks shown in the dashboard preview.
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const element = document.createElement('div');
        element.className = 'task-item';
        element.innerHTML = `<div><div class="task-title">${task.title}</div><div class="task-time">${task.time}</div></div>`;
        taskList.appendChild(element);
    });

    // Task modal: show all tasks with pagination.
    const taskModal = document.getElementById('taskModal');
    const taskModalBackdrop = document.getElementById('taskModalBackdrop');
    const taskModalList = document.getElementById('taskModalList');
    const taskPageLabel = document.getElementById('taskPageLabel');
    const taskPrevPage = document.getElementById('taskPrevPage');
    const taskNextPage = document.getElementById('taskNextPage');
    const taskModalClose = document.getElementById('taskModalClose');
    const viewAllTasks = document.querySelector('.view-all');
    const taskPageSize = 10;
    let taskPage = 0;
    function renderTaskPage() {
        const pageCount = Math.ceil(allTasks.length / taskPageSize);
        const pageTasks = allTasks.slice(taskPage * taskPageSize, (taskPage + 1) * taskPageSize);
        taskModalList.innerHTML = pageTasks.map((task, index) => `<div class="task-modal-item"><span class="task-modal-number">${taskPage * taskPageSize + index + 1}</span><div><div class="task-title">${task.title}</div><div class="task-time">${task.time}</div></div></div>`).join('');
        taskPageLabel.textContent = `Page ${taskPage + 1} of ${pageCount}`;
        taskPrevPage.disabled = taskPage === 0;
        taskNextPage.disabled = taskPage === pageCount - 1;
    }
    function closeTaskModal() {
        taskModal.hidden = true;
        taskModalBackdrop.classList.remove('is-visible');
        document.body.classList.remove('task-modal-open');
    }
    function openTaskModal() {
        taskPage = 0;
        renderTaskPage();
        taskModal.hidden = false;
        taskModalBackdrop.classList.add('is-visible');
        document.body.classList.add('task-modal-open');
        taskModalClose.focus();
    }
    viewAllTasks.addEventListener('click', event => { event.preventDefault(); openTaskModal(); });
    taskModalClose.addEventListener('click', closeTaskModal);
    taskModalBackdrop.addEventListener('click', closeTaskModal);
    taskPrevPage.addEventListener('click', () => { if (taskPage > 0) { taskPage -= 1; renderTaskPage(); } });
    taskNextPage.addEventListener('click', () => { if (taskPage < Math.ceil(allTasks.length / taskPageSize) - 1) { taskPage += 1; renderTaskPage(); } });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !taskModal.hidden) closeTaskModal(); });

    // Dashboard ticket table.
    const ticketBody = document.getElementById('ticketBody');
    tickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${ticket.id}</td><td>${ticket.name}</td><td>${ticket.email}</td><td>${ticket.subject}</td><td>${ticket.created}</td><td><span class="status-pill ${statusMap[ticket.status]}">${ticket.status}</span></td>`;
        ticketBody.appendChild(row);
    });

    // Right-side user list grouped by availability.
    const userGroups = [
        { label: 'Active Users', count: 5, state: 'online' },
        { label: 'Idle Users', count: 5, state: 'busy' },
        { label: 'Inactive Users', count: 5, state: 'off' }
    ];
    const usersPanel = document.getElementById('usersPanel');
    userGroups.forEach(groupData => {
        const group = document.createElement('div');
        group.className = 'users-group';
        const rows = Array.from({ length: groupData.count }, (_, index) => `<div class="user-row"><div class="avatar" style="background:linear-gradient(135deg,#${(200 + index * 7).toString(16)}0000,#20233a);"><span class="status-dot ${groupData.state === 'busy' ? 'busy' : groupData.state === 'off' ? 'off' : ''}"></span></div><span>Employee</span></div>`).join('');
        group.innerHTML = `<h3>${groupData.label} - ${groupData.count}</h3>${rows}`;
        usersPanel.appendChild(group);
    });

    // Shared calendar data used by both calendar views.
    const today = { y: 2026, m: 7, d: 19 };
    const dows = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dowsFull = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
    const holidays = {
        '2026-0-1': { name: "New Year's Day", type: 'regular' },
        '2026-3-2': { name: 'Maundy Thursday', type: 'regular' },
        '2026-3-3': { name: 'Good Friday', type: 'regular' },
        '2026-3-9': { name: 'Araw ng Kagitingan', type: 'regular' },
        '2026-4-1': { name: 'Labor Day', type: 'regular' },
        '2026-5-12': { name: 'Independence Day', type: 'regular' },
        '2026-7-31': { name: 'National Heroes Day', type: 'regular' },
        '2026-10-30': { name: 'Bonifacio Day', type: 'regular' },
        '2026-11-25': { name: 'Christmas Day', type: 'regular' },
        '2026-11-30': { name: 'Rizal Day', type: 'regular' },
        '2026-7-21': { name: 'Ninoy Aquino Day', type: 'special' },
        '2026-10-1': { name: "All Saints' Day", type: 'special' },
        '2026-11-8': { name: 'Feast of the Immaculate Conception of Mary', type: 'special' },
        '2026-11-31': { name: 'Last Day of the Year', type: 'special' },
        '2026-1-17': { name: 'Chinese New Year', type: 'special' },
        '2026-3-4': { name: 'Black Saturday', type: 'special' },
        '2026-10-2': { name: "All Souls' Day", type: 'special' },
        '2026-11-24': { name: 'Christmas Eve', type: 'special' }
    };
    const holidayFor = (year, month, day) => holidays[`${year}-${month}-${day}`] || null;

    // Dashboard mini calendar.
    let calDateMini = new Date(2026, 7, 1);
    const monthLabelMini = document.getElementById('calMonthLabelMini');
    const calGridMini = document.getElementById('calGridMini');
    function renderCalendarMini() {
        calGridMini.innerHTML = '';
        dows.forEach(day => {
            const element = document.createElement('div');
            element.className = 'dow';
            element.textContent = day;
            calGridMini.appendChild(element);
        });
        const year = calDateMini.getFullYear();
        const month = calDateMini.getMonth();
        monthLabelMini.textContent = calDateMini.toLocaleString('default', { month: 'long', year: 'numeric' });
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let index = firstDay - 1; index >= 0; index--) {
            const element = document.createElement('div');
            element.className = 'day muted';
            element.textContent = daysInPrevMonth - index;
            calGridMini.appendChild(element);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const element = document.createElement('div');
            element.className = `day${year === today.y && month === today.m && day === today.d ? ' today' : ''}`;
            element.textContent = day;
            calGridMini.appendChild(element);
        }
        const remainder = (firstDay + daysInMonth) % 7;
        if (remainder) for (let day = 1; day <= 7 - remainder; day++) {
            const element = document.createElement('div');
            element.className = 'day muted';
            element.textContent = day;
            calGridMini.appendChild(element);
        }
    }
    document.getElementById('prevMonthMini').addEventListener('click', () => { calDateMini.setMonth(calDateMini.getMonth() - 1); renderCalendarMini(); });
    document.getElementById('nextMonthMini').addEventListener('click', () => { calDateMini.setMonth(calDateMini.getMonth() + 1); renderCalendarMini(); });
    renderCalendarMini();

    // Full calendar page.
    let calDateFull = new Date(2026, 7, 1);
    const calPageTitle = document.getElementById('calPageTitle');
    const calFullDow = document.getElementById('calFullDow');
    const calFullBody = document.getElementById('calFullBody');
    dowsFull.forEach(day => { const header = document.createElement('th'); header.textContent = day; calFullDow.appendChild(header); });
    function renderCalendarFull() {
        calFullBody.innerHTML = '';
        const year = calDateFull.getFullYear();
        const month = calDateFull.getMonth();
        calPageTitle.textContent = calDateFull.toLocaleString('default', { month: 'long', year: 'numeric' }).replace(' ', ', ');
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const previousYear = month === 0 ? year - 1 : year;
        const previousMonth = month === 0 ? 11 : month - 1;
        const nextYear = month === 11 ? year + 1 : year;
        const nextMonth = month === 11 ? 0 : month + 1;
        const cells = [];
        const previousMonthName = new Date(previousYear, previousMonth, 1).toLocaleString('default', { month: 'long' });
        for (let index = firstDay - 1; index >= 0; index--) cells.push({ day: new Date(year, month, 0).getDate() - index, muted: true, monthLabel: previousMonthName, y: previousYear, m: previousMonth });
        for (let day = 1; day <= daysInMonth; day++) cells.push({ day, muted: false, y: year, m: month });
        const remainder = cells.length % 7;
        const nextMonthName = new Date(nextYear, nextMonth, 1).toLocaleString('default', { month: 'long' });
        if (remainder) for (let day = 1; day <= 7 - remainder; day++) cells.push({ day, muted: true, monthLabel: nextMonthName, y: nextYear, m: nextMonth });
        for (let index = 0; index < cells.length; index += 7) {
            const row = document.createElement('tr');
            cells.slice(index, index + 7).forEach(cell => {
                const tableCell = document.createElement('td');
                tableCell.className = `cal-cell${cell.muted ? ' muted' : ''}`;
                const isToday = !cell.muted && cell.y === today.y && cell.m === today.m && cell.day === today.d;
                const holiday = cell.muted ? null : holidayFor(cell.y, cell.m, cell.day);
                if (holiday) tableCell.classList.add('holiday', `holiday-${holiday.type}`);
                tableCell.innerHTML = `<div class="cal-cell-date${isToday ? ' cal-cell-today' : ''}">${cell.muted ? `${cell.monthLabel} ${cell.day}` : cell.day}</div>${holiday ? `<div class="cal-cell-event">${holiday.name}</div>` : ''}`;
                row.appendChild(tableCell);
            });
            calFullBody.appendChild(row);
        }
    }
    document.getElementById('prevMonthFull').addEventListener('click', () => { calDateFull.setMonth(calDateFull.getMonth() - 1); renderCalendarFull(); });
    document.getElementById('nextMonthFull').addEventListener('click', () => { calDateFull.setMonth(calDateFull.getMonth() + 1); renderCalendarFull(); });
    renderCalendarFull();

    // Private files page data and file list rendering.
    const files = [
        { name: 'index.html', date: '2 Sep 2026', size: '18 KB', type: 'html' },
        { name: 'styles.css', date: '2 Sep 2026', size: '27 KB', type: 'css' },
        { name: 'script.js', date: '2 Sep 2026', size: '22 KB', type: 'js' },
        { name: 'Project Assets', date: '29 Oct 2023', size: '22 MB', type: 'folder' },
        { name: 'Meeting Notes', date: '28 Oct 2023', size: '1.1 MB', type: 'doc' },
        { name: 'Employee Info', date: '25 Oct 2023', size: '2.4 MB', type: 'xls' }
    ];
    const fileIconStyles = {
        generic: { bg: '#2F6FEB', svg: 'FILE' }, folder: { bg: '#F2994A', svg: 'FOLDER' }, html: { bg: '#E44D26', svg: 'HTML' },
        css: { bg: '#264DE4', svg: 'CSS' }, js: { bg: '#F0DB4F', color: '#2B2B1A', svg: 'JS' }, doc: { bg: '#2B579A', svg: 'DOC' }, xls: { bg: '#1FA157', svg: 'XLS' }
    };
    const filesList = document.getElementById('filesList');
    files.forEach(file => {
        const style = fileIconStyles[file.type] || fileIconStyles.generic;
        const row = document.createElement('div');
        row.className = 'file-row';
        row.innerHTML = `<div class="file-icon" style="background:${style.bg};color:${style.color || '#fff'};">${style.svg}</div><div class="file-meta"><div class="file-name">${file.name}</div><div class="file-sub">${file.date} | ${file.size}</div></div><button class="file-menu-btn" aria-label="More options"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg></button>`;
        filesList.appendChild(row);
    });

    // Full tickets page data and table rendering.
    const ticketsFull = [
        { code: 6, company: 'Othaim', start: '20/11/23', status: 'green', daysLeft: 0, issue: 'Invalid Invoices' },
        { code: 5, company: 'Burger King', start: '20/11/22', status: 'orange', daysLeft: 0, issue: 'Implementation' },
        { code: 4, company: 'McDonalds', start: '20/11/21', status: 'red', daysLeft: 7, issue: 'Install Program' },
        { code: 3, company: 'Othaim', start: '20/11/20', status: 'green', daysLeft: 0, issue: 'Invalid Invoices' },
        { code: 2, company: 'McDonalds', start: '20/11/19', status: 'green', daysLeft: 0, issue: 'Install Program' },
        { code: 3, company: 'Othaim', start: '20/11/20', status: 'green', daysLeft: 0, issue: 'Invalid Invoices' },
        { code: 6, company: 'Othaim', start: '20/11/23', status: 'green', daysLeft: 0, issue: 'Invalid Invoices' },
        { code: 3, company: 'Othaim', start: '20/11/20', status: 'green', daysLeft: 0, issue: 'Invalid Invoices' },
        { code: 6, company: 'Othaim', start: '20/11/23', status: 'green', daysLeft: 0, issue: 'Invalid Invoices' }
    ];
    const ticketsFullBody = document.getElementById('ticketsFullBody');
    ticketsFull.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${ticket.code}</td><td>${ticket.company}</td><td>${ticket.start}</td><td><span class="status-dot-cell status-${ticket.status}"></span></td><td>${ticket.daysLeft}</td><td>${ticket.issue}</td><td><button class="ticket-edit-btn" aria-label="Edit ticket">EDIT</button></td>`;
        ticketsFullBody.appendChild(row);
    });

    // Messages page: direct-message list and active conversation state.
    const directMessages = [
        { name: 'Employee', company: 'Company Name', color: '#7C6FE0', status: 'online' }, { name: 'Employee', company: 'Company Name', color: '#2ECC71', status: 'online' },
        { name: 'Employee', company: 'Company Name', color: '#3B82C4', status: 'busy' }, { name: 'Employee', company: 'Company Name', color: '#E0A32E', status: 'online' },
        { name: 'Employee', company: 'Company Name', color: '#4A7FD1', status: 'busy' }, { name: 'Employee', company: 'Company Name', color: '#D9455F', status: 'online' },
        { name: 'Roboto', company: 'Company Name', color: '#5B3FA0', status: 'online' }
    ];
    const msgDmList = document.getElementById('msgDmList');
    const msgActiveName = document.getElementById('msgActiveName');
    const msgIntroAvatar = document.getElementById('msgIntroAvatar');
    const msgIntroName = document.getElementById('msgIntroName');
    const msgIntroSubName = document.getElementById('msgIntroSubName');
    const msgInputBox = document.getElementById('msgInputBox');
    directMessages.forEach((message, index) => {
        const row = document.createElement('div');
        row.className = `msg-dm-row${index === 0 ? ' active' : ''}`;
        row.innerHTML = `<div class="msg-dm-avatar" style="background:linear-gradient(135deg, ${message.color}, #20233a);"><span class="status-dot ${message.status === 'busy' ? 'busy' : ''}"></span></div><div><div class="msg-dm-name">${message.name}</div><div class="msg-dm-sub">(${message.company})</div></div>`;
        row.addEventListener('click', () => {
            document.querySelectorAll('.msg-dm-row').forEach(item => item.classList.remove('active'));
            row.classList.add('active');
            msgActiveName.textContent = message.name;
            msgIntroName.textContent = message.name;
            msgIntroSubName.textContent = `@${message.name}`;
            msgIntroAvatar.style.background = `linear-gradient(135deg, ${message.color}, #20233a)`;
            msgInputBox.placeholder = `Message @${message.name}`;
        });
        msgDmList.appendChild(row);
    });

    // Companies page and company channel data.
    const companies = [{
        id: 'construction-1', name: 'Construction Company', gradient: ['#0E6E76', '#152A52'],
        banner: { title: 'CONSTRUCTION', sub: 'COMPANY SLOGAN' }, defaultChannel: 'departments',
        channelGroups: [
            { label: 'START HERE', channels: [{ id: 'welcome', name: 'welcome', type: 'hash' }, { id: 'announcements', name: 'announcements', type: 'megaphone', badgeCount: 2 }, { id: 'departments', name: 'departments', type: 'members' }] },
            { label: 'WORK', channels: [{ id: 'work-chat', name: 'work-chat', type: 'hash' }, { id: 'project-updates', name: 'project-updates', type: 'hash' }, { id: 'job-board', name: 'job-board', type: 'forum', badgeNew: '1 New' }, { id: 'suggestions', name: 'suggestions', type: 'forum', badgeNew: '14 New' }] },
            { label: 'VOICE CHANNELS', channels: [{ id: 'meeting-room', name: 'Meeting Room', type: 'voice' }, { id: 'huddle-room', name: 'Huddle Room', type: 'voice' }] }
        ],
        channelContent: {
            welcome: { botName: 'Batty', botTag: 'BOT', dateLabel: 'August 3, 2026', timeLabel: '08/03/2026 9:02 AM', avatarGradient: 'linear-gradient(135deg,#7C2D2D,#2A2020)', html: 'Welcome to the team workspace! Take a moment to check <span class="channel-mention">#announcements</span> for the latest updates, and drop by <span class="channel-mention">#departments</span> to see which teams are active.' },
            announcements: { botName: 'Admin', botTag: 'ADMIN', dateLabel: 'August 19, 2026', timeLabel: '08/19/2026 3:40 PM', avatarGradient: 'linear-gradient(135deg,#2F6FEB,#152A52)', html: 'Reminder: the monthly toolbox meeting is this Friday at 3:00 PM in the <span class="channel-mention">Meeting Room</span>.<br><br>Timesheets for this pay period are due by end of day Wednesday.' },
            departments: { botName: 'Batty', botTag: 'BOT', dateLabel: 'November 16, 2021', timeLabel: '11/16/2021 8:14 AM', edited: true, avatarGradient: 'linear-gradient(135deg,#7C2D2D,#2A2020)', html: 'You can select a department from the list below to add to your profile!<br><br>Please don\'t hesitate to reach out to an <span class="channel-mention">@Admin</span> if your department is not on this list - we can add it.', tags: ['I.T', 'Comissary', 'Housekeeping', 'Statistics', 'Job Order'] }
        }
    }];
    for (let index = 2; index <= 4; index++) companies.push({ ...companies[0], id: `construction-${index}` });

    // Choose the icon used for each company channel type.
    const channelIconSvg = type => {
        const icons = {
            megaphone: '<svg class="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11v2a2 2 0 0 0 2 2h1l3 5 1-5h2l8 4V6l-8 4H6a2 2 0 0 0-2 2Z"/></svg>',
            forum: '<svg class="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-4.3 7.3 8.5 8.5 0 0 1-8.4 0A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 17 0Z"/><path d="M8 10h8M8 13h5"/></svg>',
            voice: '<svg class="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4Z"/><path d="M19 5a13 13 0 0 1 0 14M15.5 8.5a7 7 0 0 1 0 7"/></svg>',
            members: '<svg class="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>'
        };
        return icons[type] || '<span class="channel-icon channel-hash">#</span>';
    };
    const companiesGrid = document.getElementById('companiesGrid');
    const pageCompanyDetail = document.getElementById('page-company-detail');
    const channelGroupsElement = document.getElementById('channelGroups');
    const channelMessagesElement = document.getElementById('channelMessages');
    const findChannel = (company, channelId) => company.channelGroups.flatMap(group => group.channels).find(channel => channel.id === channelId);

    // Render the selected channel's messages and content.
    function renderChannelContent(company, channelId) {
        const channel = findChannel(company, channelId) || { name: channelId };
        document.querySelectorAll('.channel-name-slot').forEach(element => { element.textContent = channel.name; });
        const content = company.channelContent[channelId];
        channelMessagesElement.innerHTML = content ? `<div class="channel-date-divider"><span>${content.dateLabel}</span></div><div class="channel-msg"><div class="channel-msg-avatar" style="background:${content.avatarGradient};"></div><div class="channel-msg-body"><div class="channel-msg-meta"><span class="channel-msg-author">${content.botName}</span><span class="channel-bot-tag">${content.botTag}</span><span class="channel-msg-time">${content.timeLabel}</span></div>${content.edited ? '<div class="channel-msg-edited">(edited)</div>' : ''}<div class="channel-embed"><p>${content.html}</p></div>${content.tags ? `<div class="channel-tag-row">${content.tags.map(tag => `<button class="channel-tag-btn">${tag}</button>`).join('')}</div>` : ''}</div></div>` : `<div class="channel-empty-state">This is the start of the <strong>#${channel.name}</strong> channel.</div>`;
    }

    // Render a company's channel sidebar and its default channel.
    function renderCompanyDetail(company) {
        document.getElementById('companyBannerTitle').textContent = company.banner.title;
        document.getElementById('companyBannerSub').textContent = company.banner.sub;
        document.getElementById('companyBannerCard').style.background = `linear-gradient(135deg, ${company.gradient[0]}, ${company.gradient[1]})`;
        channelGroupsElement.innerHTML = company.channelGroups.map(group => `<div class="channel-group"><div class="channel-group-label">${group.label}</div>${group.channels.map(channel => `<div class="channel-item ${channel.id === company.defaultChannel ? 'active' : ''}" data-channel="${channel.id}">${channelIconSvg(channel.type)}<span class="channel-item-name">${channel.name}</span>${channel.badgeCount ? `<span class="channel-badge">${channel.badgeCount}</span>` : ''}${channel.badgeNew ? `<span class="channel-badge-new">${channel.badgeNew}</span>` : ''}</div>`).join('')}</div>`).join('');
        channelGroupsElement.querySelectorAll('.channel-item').forEach(item => item.addEventListener('click', () => {
            channelGroupsElement.querySelectorAll('.channel-item').forEach(channelItem => channelItem.classList.remove('active'));
            item.classList.add('active');
            renderChannelContent(company, item.dataset.channel);
        }));
        renderChannelContent(company, company.defaultChannel);
    }

    // Open a company detail view when a company card is selected.
    function openCompanyDetail(company) {
        Object.values(pages).forEach(page => { if (page) page.style.display = 'none'; });
        pageCompanyDetail.style.display = '';
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector('.nav-item[data-page="Companies"]').classList.add('active');
        breadcrumb.innerHTML = `<span class="breadcrumb-link" id="breadcrumbToCompanies">COMPANIES</span> <span class="sep">/</span> ${company.name.toUpperCase()}`;
        document.getElementById('breadcrumbToCompanies').addEventListener('click', () => showPage('Companies'));
        renderCompanyDetail(company);
    }
    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `<div class="company-card-banner" style="background:linear-gradient(135deg, ${company.gradient[0]}, ${company.gradient[1]});"><div class="company-card-banner-title">${company.banner.title}</div><div class="company-card-banner-sub">${company.banner.sub}</div></div><div class="company-card-footer">${company.name.toUpperCase()}</div>`;
        card.addEventListener('click', () => openCompanyDetail(company));
        companiesGrid.appendChild(card);
    });

    // Main navigation: switch between dashboard pages.
    const pages = {
        Dashboard: document.getElementById('page-dashboard'), Companies: document.getElementById('page-companies'), Calendar: document.getElementById('page-calendar'),
        Files: document.getElementById('page-files'), Tickets: document.getElementById('page-tickets'), Messages: document.getElementById('page-messages')
    };
    const breadcrumb = document.getElementById('breadcrumb');
    function showPage(name) {
        Object.keys(pages).forEach(key => { if (pages[key]) pages[key].style.display = key === name ? '' : 'none'; });
        if (pageCompanyDetail) pageCompanyDetail.style.display = 'none';
        breadcrumb.innerHTML = `${name.toUpperCase()} <span class="sep">/</span>`;
    }
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', event => {
        event.preventDefault();
        document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        showPage(pages[item.dataset.page] ? item.dataset.page : 'Dashboard');
        closeMobileSidebar();
    }));

    // Theme toggle: restore and save the employee's dashboard preference.
    const themeToggle = document.getElementById('themeToggle');
    const themeSun = themeToggle.querySelector('.theme-sun');
    const themeMoon = themeToggle.querySelector('.theme-moon');
    const savedTheme = window.localStorage.getItem('dashboard-theme');
    function setDarkMode(isDark) {
        document.querySelector('.app').classList.toggle('dark-mode', isDark);
        themeSun.style.display = isDark ? 'none' : 'block';
        themeMoon.style.display = isDark ? 'block' : 'none';
        themeToggle.setAttribute('aria-label', isDark ? 'Enable light mode' : 'Enable dark mode');
        themeToggle.setAttribute('title', isDark ? 'Enable light mode' : 'Enable dark mode');
    }
    setDarkMode(savedTheme === 'dark');
    themeToggle.addEventListener('click', () => {
        const isDark = themeSun.style.display !== 'none';
        setDarkMode(isDark);
        window.localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
    });

    // Mobile navigation drawer behavior.
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    function closeMobileSidebar() {
        if (!sidebar || !sidebarBackdrop || !mobileMenuToggle) return;
        sidebar.classList.remove('is-open');
        sidebarBackdrop.classList.remove('is-visible');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('sidebar-open');
    }
    function toggleMobileSidebar() {
        if (!sidebar || !sidebarBackdrop || !mobileMenuToggle) return;
        const isOpen = sidebar.classList.toggle('is-open');
        sidebarBackdrop.classList.toggle('is-visible', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('sidebar-open', isOpen);
    }
    mobileMenuToggle?.addEventListener('click', toggleMobileSidebar);
    sidebarBackdrop?.addEventListener('click', closeMobileSidebar);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileSidebar(); });
}