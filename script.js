let noteTitle = document.getElementById('noteTitle');
let noteText = document.getElementById('noteText');
let noteContainerCurrent = document.getElementById('notesContainer');

currentNotes = [];
currentNotesText = [];
archivedNotes = [];
archivedNotesText = [];
deletedNotes = [];
deletedNotesText = [];

function addNote() {
    currentNotes.push(noteTitle.value);
    currentNotesText.push(noteText.value);
    renderNotes(currentNotes, currentNotesText);
}


let date = new Date();
const day = date.getDate();
const month = date.getMonth() +1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const time = `${hours}:${minutes}`;

function renderNotes(array1, array2) {
    noteContainerCurrent.innerHTML = '';
    for (i = 0; i < currentNotes.length; i++) {
        noteContainerCurrent.innerHTML += `
            <div class="note" id="singleNote">
            <h3 class="note-title">${array1[i]}<br>posted on  
            <span class="date">${day}.${month}.${year}</span> | 
            <span class="time">${time}</h3>
            <p class="note-text">${array2[i]}</p>
            <div class="h-line"></div>
            <button>EDIT</button>
            <button>X</button>
            </div>
        `
        };
}