// DOM Elements
let noteTitle = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let currentNotesRef = document.getElementById("current");
let archivedNotesRef = document.getElementById("archived");
let deletedNotesRef = document.getElementById("deleted");

// configuring time stamp
let date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const time = `${hours}:${String(minutes).padStart(2, '0')}`;
const timeStamp = `${day}.${month}.${year} | ${time}`;

// load notes from localStorage / initialize empty arrays
let currentNotes = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Title:`)) || [];
let currentNotesText = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Text:`)) || [];
let datePosted = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Date:`)) || [];
let archivedNotes = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Text:`)) || [];
let archivedNotesText = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Text:`)) || [];
let deletedNotes = JSON.parse(localStorage.getItem(`${deletedNotesRef.id} Text:`)) || [];
let deletedNotesText = JSON.parse(localStorage.getItem(`${deletedNotesRef.id} Text:`)) || [];

function renderInit() {
  renderNotes(currentNotesRef, currentNotes, currentNotesText);
  renderNotes(archivedNotesRef, archivedNotes, archivedNotesText);
  renderNotes(deletedNotesRef, deletedNotes, deletedNotesText);
}

// create new note, push to array and save to localStorage
function addNewNote() {
  if (noteTitle.value != "" && noteText.value != "") {
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

function updateLocalStorage() {
  saveToLocalStorage(currentNotesRef, currentNotes, currentNotesText);
  saveToLocalStorage(archivedNotesRef, archivedNotes, archivedNotesText);
  saveToLocalStorage(deletedNotesRef, deletedNotes, deletedNotesText);
}
// Render current notes
function renderNotes(containerToRender, title, text) {
  containerToRender.innerHTML = ``;
  noteTemplate(containerToRender, title, text, datePosted);
}

function noteTemplate(containerToRender, title, text, date) {
  if (title.length && text.length && date.length) {
    for (let i = title.length - 1; i > -1; i--) {
      containerToRender.innerHTML += `
        <div class="note" id="singleNote">
            <h3 class="note-title">${title[i]}<br> 
            <span class="date">posted on ${date[i]}</h3>
            <p class="note-text">${text[i]}</p>
            <div class="h-line"></div>
            <button class="btn-${containerToRender.id}-cur" onclick="moveToCurrent(event, ${i})">make current</button>
            <button class="btn-${containerToRender.id}-arc" onclick="moveToArchive(event, ${i})">to archive</button>
            <button class="btn-${containerToRender.id}-del" onclick="moveToBin(event, ${i})">X</button>
        </div>`;
        checkCurButtons(containerToRender);
        checkArcButtons(containerToRender);
    }
  }
}

function moveToCurrent(event, index) {
  if (event.target.className.includes("archived")) {
    moveNote(archivedNotes, archivedNotesText, index, currentNotes, currentNotesText);
  }
  if (event.target.className.includes("deleted")) {
    moveNote(deletedNotes, deletedNotesText, index, currentNotes, currentNotesText)
  }
}

function moveToArchive(event, index) {
  if (event.target.className.includes("current")) {
    moveNote(currentNotes, currentNotesText, index, archivedNotes, archivedNotesText);
  }
  if (event.target.className.includes("deleted")) {
    moveNote(deletedNotes, deletedNotesText, index, archivedNotes, archivedNotesText);
  }
}

function moveToBin(event, index) {
  if (event.target.className.includes("current")) {
    moveNote(currentNotes, currentNotesText, index, deletedNotes, deletedNotesText);
  }
  if (event.target.className.includes("archived")) {
    moveNote(archivedNotes, archivedNotesText, index, deletedNotes, deletedNotesText);
  }
  if (event.target.className.includes("deleted")) {
    deleteNote(deletedNotes, deletedNotesText, index)
  }
}

function moveNote(arrayRef1, arrayRef2, index, arrayTarget1, arrayTarget2) {
  let clickedNoteTitle = arrayRef1.splice(index, 1)[0];
  let clickedNoteText = arrayRef2.splice(index, 1)[0];
  arrayTarget1.push(clickedNoteTitle);
  arrayTarget2.push(clickedNoteText);
  updateLocalStorage()
  renderInit();
}

function deleteNote(arrayRef1, arrayRef2, index) {
  arrayRef1.splice(index, 1)[0];
  arrayRef2.splice(index, 1)[0];
  updateLocalStorage()
  renderInit();
}

function checkArcButtons(buttonRef) {
  let buttonElementArc = document.getElementsByClassName(`btn-${buttonRef.id}-arc`);
  for (let i = 0; i < buttonElementArc.length; i++) {
    if(buttonElementArc) {
      if (buttonElementArc[i].className.includes("archived")) {
        buttonElementArc[i].style.display = 'none';
      }
    }
  }
}

function checkCurButtons(buttonRef) {
  let buttonElementArc = document.getElementsByClassName(`btn-${buttonRef.id}-cur`);
  for (let i = 0; i < buttonElementArc.length; i++) {
    if(buttonElementArc) {
      if (buttonElementArc[i].className.includes("current")) {
        buttonElementArc[i].style.display = 'none';
      }
    }
  }
}
// Initialize the rendering process
renderInit();