// connection to backend server

let note_title_input = document.getElementById("noteTitle");
let note_test_input = document.getElementById("noteText");



fetchUrl = 'http://127.0.0.1:8000/api/notes/'

async function showNotes() {
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

async function postNote() {
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
    showNotes()

}

function emptyField() {
    return note_test_input.value.trim() === '' || note_title_input.value.trim() === '';
}

function updateButtonState() {
    document.getElementById('submitBtn').disabled = emptyField();
}

note_title_input.addEventListener('input', updateButtonState);
note_test_input.addEventListener('input', updateButtonState);

updateButtonState();


