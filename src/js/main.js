import NotesData from "../api/notesData.js";
import "../components/header.js";
import "../components/listNote.js";
import "../components/archivedNote.js";
import "../components/form.js";
import notesData from "../api/listNotes.js";

const searchInput = document.querySelector("#search");
const notesContainer = document.querySelector(".notes");
const archiveNote = document.querySelector("archived-note");
const archivedNotesContainer = document.querySelector(
  "archived-note .archived"
);
const archiveButton = document.querySelector(".archived-button");
const highlightButton = document.querySelector(".highlight-button");
const formContainer = document.querySelector(".form-container");
const buttonBack = document.querySelector(".back-button");

document.addEventListener("DOMContentLoaded", () => {
  setDataLocalStorage();
  displayInitialNotes();
  setupNoteUpdatedEventListener();
  setupNoteArchivedUpdatedEventListener();
  displayArchivedNotes();
});

const displayInitialNotes = () => {
  if (NotesData.getNotes().length) {
    displayNotes(NotesData.getNotes());
  }
};

const setupNoteUpdatedEventListener = () => {
  window.addEventListener("notedUpdated", () => {
    displayNotes(NotesData.getNotes());
  });
};

const setupNoteArchivedUpdatedEventListener = () => {
  window.addEventListener("noteArchivedUpdated", (event) => {
    const { notes, note, notesArchived } = event.detail;
    const newlyArchivedNote = notes.find((note) => note.archived);
    if (newlyArchivedNote) {
      displayNotesArchived([newlyArchivedNote]);
      archiveNote.removeAttribute("hidden");
      displayNotes(NotesData.getNotes());
    } else {
      const newlyUnarchivedNote = notesArchived.find((n) => n.id === note.id);
      if (newlyUnarchivedNote) {
        const updatedNotesArchived = notesArchived.filter(
          (n) => n.id !== note.id
        );
        if (updatedNotesArchived.length === 0) {
          archiveNote.setAttribute("hidden", true);
        }
        archivedNotesContainer.innerHTML = "";
        displayNotesArchived(updatedNotesArchived);
        displayNotes(NotesData.getNotes());
      }
    }
  });
};

const displayArchivedNotes = () => {
  if (NotesData.getNotes(true).length) {
    displayNotesArchived(NotesData.getNotes(true));
  } else {
    archiveNote.setAttribute("hidden", true);
  }
};
const setDataLocalStorage = () => {
  if (!Object.values(localStorage).length) {
    notesData.forEach((note) =>
      localStorage.setItem(note.id, JSON.stringify(note))
    );
  }
};
archiveButton.addEventListener("click", () => {
  archivedNotesContainer.classList.toggle("active");
});

buttonBack.addEventListener("click", () => {
  formContainer.classList.remove("active");
  form.classList.remove("active");
});
const form = document.querySelector("#form");
highlightButton.addEventListener("click", () => {
  formContainer.classList.add("active");
  form.classList.add("active");
});
const displayNotes = (notesList) => {
  notesContainer.innerHTML = "";

  notesList.forEach((note) => {
    const date = new Date(note.createdAt);
    const formattedDate = date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const noteElement = document.createElement("note-component");
    noteElement.dataset.id = note.id;
    noteElement.dataset.title = note.title;
    noteElement.dataset.body = note.body;
    noteElement.dataset.date = formattedDate;
    noteElement.dataset.archived = note.archived;
    notesContainer.appendChild(noteElement);
  });
};

const displayNotesArchived = (notesList) => {
  notesList.forEach((note) => {
    const date = new Date(note.createdAt);
    const formattedDate = date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const noteElement = document.createElement("note-component");
    noteElement.dataset.id = note.id;
    noteElement.dataset.title = note.title;
    noteElement.dataset.body = note.body;
    noteElement.dataset.date = formattedDate;
    noteElement.dataset.archived = note.archived;
    archivedNotesContainer.appendChild(noteElement);
  });
};

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.trim();
  const filteredNotes =
    searchText !== ""
      ? NotesData.searchNotes(searchText)
      : NotesData.getNotes();

  if (searchText !== "" && filteredNotes.length === 0) {
    notesContainer.innerHTML = ` <div class="notFound">
        <img src="./src/assets/note.png" alt="" />
        <h1>Catatan tidak ditemukan</h1>
      </div>`;
  }
  if (searchText === "") {
    const notFound = document.querySelector(".notFound");
    notFound.remove();

    displayNotes(filteredNotes);
  }
});
