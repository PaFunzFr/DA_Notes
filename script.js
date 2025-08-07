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
const currentNotes = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Title:`)) || [];
const currentNotesText = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Text:`)) || [];
const datePosted = JSON.parse(localStorage.getItem(`${currentNotesRef.id} Date:`)) || [];
const archivedNotes = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Title:`)) || [];
const archivedNotesText = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Text:`)) || [];
const dateArchived = JSON.parse(localStorage.getItem(`${archivedNotesRef.id} Date:`)) || [];
const deletedNotes = JSON.parse(localStorage.getItem(`${deletedNotesRef.id} Title:`)) || [];
const deletedNotesText = JSON.parse(localStorage.getItem(`${deletedNotesRef.id} Text:`)) || [];
const dateDeleted = JSON.parse(localStorage.getItem(`${deletedNotesRef.id} Date:`)) || [];

// initialize notes
function renderInit() {
  renderNotes(currentNotesRef, currentNotes, currentNotesText, datePosted);
  renderNotes(archivedNotesRef, archivedNotes, archivedNotesText, dateArchived);
  renderNotes(deletedNotesRef, deletedNotes, deletedNotesText, dateDeleted);
}

// create new note, push to array and save to localStorage
function addNewNote() {
  if (noteTitle.value != "" && noteText.value != "") {
    currentNotes.push(noteTitle.value);
    currentNotesText.push(noteText.value);
    datePosted.push(timeStamp);
    saveToLocalStorage(currentNotesRef, currentNotes, currentNotesText, datePosted);
    noteTitle.value = "";
    noteText.value = "";
    renderInit();
  }
}

// save Elements to localStorage
function saveToLocalStorage(refContainer, title, text, date) {
  localStorage.setItem(`${refContainer.id} Title:`, JSON.stringify(title));
  localStorage.setItem(`${refContainer.id} Text:`, JSON.stringify(text));
  localStorage.setItem(`${refContainer.id} Date:`, JSON.stringify(date));
}

function updateLocalStorage() {
  saveToLocalStorage(currentNotesRef, currentNotes, currentNotesText, datePosted);
  saveToLocalStorage(archivedNotesRef, archivedNotes, archivedNotesText, dateArchived);
  saveToLocalStorage(deletedNotesRef, deletedNotes, deletedNotesText, dateDeleted);
}
// Render current notes
function renderNotes(containerToRender, title, text, date) {
  containerToRender.innerHTML = ``;
  noteTemplate(containerToRender, title, text, date);
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
    moveNote(archivedNotes, archivedNotesText, dateArchived, index, currentNotes, currentNotesText, datePosted);
  }
  if (event.target.className.includes("deleted")) {
    moveNote(deletedNotes, deletedNotesText, dateDeleted, index, currentNotes, currentNotesText, datePosted)
  }
}

function moveToArchive(event, index) {
  if (event.target.className.includes("current")) {
    moveNote(currentNotes, currentNotesText, datePosted, index, archivedNotes, archivedNotesText, dateArchived);
  }
  if (event.target.className.includes("deleted")) {
    moveNote(deletedNotes, deletedNotesText, dateDeleted, index, archivedNotes, archivedNotesText, dateArchived);
  }
}

function moveToBin(event, index) {
  if (event.target.className.includes("current")) {
    moveNote(currentNotes, currentNotesText, datePosted, index, deletedNotes, deletedNotesText, dateDeleted);
  }
  if (event.target.className.includes("archived")) {
    moveNote(archivedNotes, archivedNotesText, dateArchived, index, deletedNotes, deletedNotesText, dateDeleted);
  }
  if (event.target.className.includes("deleted")) {
    deleteNote(deletedNotes, deletedNotesText, dateDeleted, index)
  }
}

function moveNote(arrayRef1, arrayRef2, dateRef, index, arrayTarget1, arrayTarget2, dateRefTarget) {
  let clickedNoteTitle = arrayRef1.splice(index, 1)[0];
  let clickedNoteText = arrayRef2.splice(index, 1)[0];
  let clickedNoteDate = dateRef.splice(index, 1)[0];
  arrayTarget1.push(clickedNoteTitle);
  arrayTarget2.push(clickedNoteText);
  dateRefTarget.push(clickedNoteDate);
  updateLocalStorage()
  renderInit();
}

// function deleteNote(arrayRef1, arrayRef2, dateRef, index) {
//   arrayRef1.splice(index, 1)[0];
//   arrayRef2.splice(index, 1)[0];
//   dateRef.splice(index, 1)[0];
//   updateLocalStorage()
//   renderInit();
// }

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
  let buttonElementCur = document.getElementsByClassName(`btn-${buttonRef.id}-cur`);
  for (let i = 0; i < buttonElementCur.length; i++) {
    if(buttonElementCur) {
      if (buttonElementCur[i].className.includes("current")) {
        buttonElementCur[i].style.display = 'none';
      }
    }
  }
}

renderInit();