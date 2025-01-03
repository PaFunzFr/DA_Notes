let noteTitle = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let noteContainerCurrent = document.getElementById("notesContainer");
let noteContainerArchived = document.getElementById("notesContainerAchived");

let date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const time = `${hours}:${minutes}`;

currentNotes = [];
currentNotesText = [];
archivedNotes = [];
archivedNotesText = [];
deletedNotes = [];
deletedNotesText = [];

function renderInit() {
  renderNotes(currentNotes, currentNotesText, noteContainerCurrent);
  renderNotes(archivedNotes, archivedNotesText, noteContainerArchived);
}

// add notes to current notes
function addNote() {
  currentNotes.push(noteTitle.value);
  currentNotesText.push(noteText.value);
  renderNotes(currentNotes, currentNotesText, noteContainerCurrent);
  noteTitle.value = "";
  noteText.value = "";
}

// render current notes
function renderNotes(array1, array2, containerToRender) {
    containerToRender.innerHTML = "";

  // WEITERMACHEN / NACHDENKEN ÜBER:
  // HIER VIELLEICHT IF BEDINGUNG EINBINDEN
  // WENN containerToRender === achivedNotes usw. => entsprechend andere Buttons rendern!

    for (i = array1.length -1; i > -1; i--) {
        containerToRender.innerHTML += `
                <div class="note" id="singleNote">
                    <h3 class="note-title">${array1[i]}<br> 
                    <span class="date">posted on ${day}.${month}.${year} | ${time}</h3>
                    <p class="note-text">${array2[i]}</p>
                    <div class="h-line"></div>
                    ${noteButtons(i)}
                </div>`;
    }
}
// button template
function noteButtons(i) {
  return `
        <button onclick="editNote()">EDIT</button>
        <button onclick="moveToArchive(${i})">DONE</button>
        <button onclick="moveToBin()">X</button>`;
};

function moveToArchive(index) {
    renderNotesArchived(index);
    renderInit();
  };
  
// is only executed when there are existing entries in currentNotes (!= undefined)
function renderNotesArchived(index) {
  if (currentNotes[index] != undefined) { // multiple clicks were possible with undefined text in it
    archivedNotes.push(currentNotes[index]);
    archivedNotesText.push(currentNotesText[index]);
    currentNotes.splice(index, 1);
    currentNotesText.splice(index, 1);
    renderInit();
  }
}

function moveToBin() {}

function editNote() {}
