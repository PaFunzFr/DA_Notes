// connection to backend server

const note_title_input = document.getElementById("noteTitle");
const note_test_input = document.getElementById("noteText");
const status_container = ['current', 'archived', 'deleted'];

let notes = [];


fetchUrl = 'http://127.0.0.1:8000/api/notes/'

async function showNotes() {
    let notes = [];
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        result.forEach((result) => {
            notes.push(result)
        })
        renderNotesNew(notes)
        console.log(notes);

        
    } catch (error) {
        console.error(error.message);
    }
}

async function renderNotesNew(notes) {
    document.getElementById('current').innerHTML = '';
    document.getElementById('archived').innerHTML = '';
    document.getElementById('deleted').innerHTML = '';

    notes.forEach(note => {
        const container = document.getElementById(note.status);
        container.innerHTML += renderNoteTemplate(note);
    });
}


async function changeStatus(status, id) {
    if (!status_container.includes(status)) {
        console.error("Illegal Status:", status);
        return;
    }
    try {
        const response = await fetch(`${fetchUrl}${id}/`);
        if (!response.ok) {
            throw new Error(`Error while loading Note with ID ${id}`);
        }

        const current_note = await response.json();
        current_note.status = status
    
        const patch_response = await fetch(`${fetchUrl}${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(current_note)
        });

        if (!patch_response.ok) {
            throw new Error(`Error while loading note ${id}`);
        }

        console.log(`Status changed to: ${status}`);
        showNotes();

    } catch (error) {
        console.error(error.message);
    }
}

async function deleteNote(id) {
    try {
        const response = await fetch(`${fetchUrl}${id}/`);
        if (!response.ok) {
            throw new Error(`Error while loading Note with ID ${id}`);
        }

        const current_note = await response.json();
    
        const patch_response = await fetch(`${fetchUrl}${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(current_note)
        });

        if (!patch_response.ok) {
            throw new Error(`Error while loading note ${id}`);
        }

        showNotes();

    } catch (error) {
        console.error(error.message);
    }
}

async function createNote(id) {
    const data = { 
        "title": note_title_input.value.trim(),
        "text": note_test_input.value.trim()
    };

    if (data.text.trim() == 0 || data.title.trim() == 0) {
        alert("Please fill in all fields");
        return
    }

    let response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // data that is posted
    });

    let result = await response.json();
    console.log(result);
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
    
    showNotes()

}

function emptyFieldCheck() {
    return note_test_input.value.trim() === '' || note_title_input.value.trim() === '';
}

function updateButtonState() {
    document.getElementById('submitBtn').disabled = emptyFieldCheck();
}

note_title_input.addEventListener('input', updateButtonState);
note_test_input.addEventListener('input', updateButtonState);

updateButtonState();


async function deleteAssigneeFromNote(noteId, assigneeId) {
    const response = await fetch(`${fetchUrl}${noteId}/`);
    const current_note = await response.json();

    // take all ids except those who shall be deleted
    const updatedAssignees = current_note.assignees
        .map(user => user.id) // array of all assignees
        .filter(id => id !== assigneeId); // array of all assignees except the one to be deleted

    const patch_response = await fetch(`${fetchUrl}${noteId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ assignee_ids: updatedAssignees })
    });

    if (!patch_response.ok) {
        throw new Error(`Error while updating note ${noteId}`);
    }

    showNotes();
}