// DOM Elements
let noteTitle = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let currentNotesRef = document.getElementById("notesContainer");
let archivedNotesRef = document.getElementById("notesContainerArchived");

// configuring time stamp
let date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const time = `${hours}:${String(minutes).padStart(2, '0')}`;
const timeStamp = `${day}.${month}.${year} | ${time}`;

// Load notes from localStorage or initialize empty arrays
let currentNotes = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Title:`)) || [];
let currentNotesText = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Text:`)) || [];
let datePosted = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Date:`)) || [];
let archivedNotes = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Text:`)) || [];
let archivedNotesText = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Text:`)) || [];

function renderInit() {
  renderNotes(currentNotesRef, currentNotes, currentNotesText);
  renderNotes(archivedNotesRef, archivedNotes, archivedNotesText);
}

// Create new note, push to array and save to localStorage
function addNewNote() {
  if (noteTitle.value != "" || noteText.value != "") {
    currentNotes.push(noteTitle.value);
    currentNotesText.push(noteText.value);
    datePosted.push(timeStamp);
    saveToLocalStorage(currentNotesRef, currentNotes, currentNotesText);
    noteTitle.value = "";
    noteText.value = "";
    renderInit();
  }
}

function saveToLocalStorage(refContainer, title, text) {
  localStorage.setItem(`${refContainer.id} Title:`, JSON.stringify(title));
  localStorage.setItem(`${refContainer.id} Text:`, JSON.stringify(text));
  localStorage.setItem(`${refContainer.id} Date:`, JSON.stringify(datePosted));
}

// Render current notes
function renderNotes(containerToRender, title, text) {
  containerToRender.innerHTML = "";
  noteTemplate(containerToRender, title, text, datePosted);
}

function noteTemplate(containerToRender, title, text, date) {
  if (title && title.length > 0 && text && text.length > 0 && date && date.length > 0) {
    for (let i = title.length - 1; i > -1; i--) {
      containerToRender.innerHTML += `
        <div class="note" id="singleNote">
            <h3 class="note-title">${title[i]}<br> 
            <span class="date">posted on ${date[i]}</h3>
            <p class="note-text">${text[i]}</p>
            <div class="h-line"></div>
            <button class="btn-${containerToRender.id}-arc" onclick="moveToArchive(${i})">DONE</button>
            <button class="btn-${containerToRender.id}-del" onclick="moveToBin()">X</button>
        </div>`;
        checkButtonId(containerToRender);
    }
  }
}

function moveToArchive(index) {
    let clickedArchiveNote = currentNotes.splice(index, 1)[0];
    let clickedArchiveNoteText = currentNotesText.splice(index, 1)[0];
    archivedNotes.push(clickedArchiveNote);
    archivedNotesText.push(clickedArchiveNoteText);
    saveToLocalStorage(currentNotesRef, currentNotes, currentNotesText);
    saveToLocalStorage(archivedNotesRef, archivedNotes, archivedNotesText);
    renderInit();
}


function checkButtonId(buttonRef) {
  let buttonElement = document.getElementsByClassName(`btn-${buttonRef.id}-arc`);
  for (let i = 0; i < buttonElement.length; i++) {
    if(buttonElement) {
      if (buttonElement[i].className.includes("Archived")) {
        buttonElement[i].style.display = 'none';
        console.log("Archived");
      }
    }
  }
}

function moveToBin() {}

function editNote() {}

// Initialize the rendering process
renderInit();