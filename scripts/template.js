
function renderNoteTemplate(note) {

    let buttonsHtml = '';

    if (note.status === 'current') {
        buttonsHtml = `
            <button onclick="moveToArchive(event, ${note.id})">to archive</button>
            <button onclick="moveToBin(event, ${note.id})">delete</button>
        `;
    } else if (note.status === 'archived') {
        buttonsHtml = `
            <button onclick="moveToCurrent(event, ${note.id})">make current</button>
            <button onclick="moveToBin(event, ${note.id})">delete</button>
        `;
    } else if (note.status === 'deleted') {
        buttonsHtml = `
            <button onclick="moveToArchive(event, ${note.id})">to archive</button>
            <button onclick="moveToCurrent(event, ${note.id})">make current</button>
            <button onclick="deleteNote(event, ${note.id})">x</button>
        `;
    }

    return `
        <div class="note" id="singleNote-${note.id}">
            <h3 class="note-title">${note.title}<br> 
            <span class="date">posted on ${note.created_at}</span></h3>
            <p class="note-text">${note.text}</p>
            <div class="h-line"></div>
            ${buttonsHtml}
        </div>
    `;
}
