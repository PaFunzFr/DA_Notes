
function formatedDateTime(input) {
    return new Date(input).toLocaleString();
}
function renderNoteTemplate(note) {

    let buttonsHtml = '';

    if (note.status === 'current') {
        buttonsHtml = `
            <button onclick="changeStatus('archived', ${note.id})">to archive</button>
            <button onclick="changeStatus('deleted', ${note.id})">delete</button>
        `;
    } else if (note.status === 'archived') {
        buttonsHtml = `
            <button onclick="changeStatus('current', ${note.id})">make current</button>
            <button onclick="changeStatus('deleted', ${note.id})">delete</button>
        `;
    } else if (note.status === 'deleted') {
        buttonsHtml = `
            <button onclick="changeStatus('archived', ${note.id})">to archive</button>
            <button onclick="changeStatus('current', ${note.id})">make current</button>
            <button onclick="deleteNote(${note.id})">x</button>
        `;
    }

    return `
        <div class="note" id="singleNote-${note.id}">
            <section class="note-header">
                        <h3 class="note-title">${note.title}</h3>
                        <div class="assignees">${assignees(note)}</div>
            </section>

            <span class="date">posted on ${formatedDateTime(note.created_at)}</span>
            <p class="note-text">${note.text}</p>
            <div class="h-line"></div>
            ${buttonsHtml}
        </div>
    `;
}

function assignees(note) {
    const assignees = note.assignees;
    let html = '';
    if (!assignees) return;
    for (const user of assignees) {
        html += `<p onclick="deleteAssigneeFromNote(${note.id}, ${user.id})">${user.name.split(' ')[0]}</p>`;
    }
    return html;
}

