import NotesData from "../api/notesData.js";
class listNote extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    const { id, title, body, date, archived } = this.dataset;
    this.innerHTML = `
    <div class="note">
      <div class="note-header">
        <span class="note-title">${title}</span>
        <span id="note-archived" data-id="${id}" data-archived="${archived}" class="note-archived">
        <i data-id="${id}" data-archived="${archived}" class='bx bx-archive-in'></i>
  
        </span>
      </div>
      <div class="note-body">
        <p>${body}</p>
      </div>
      <div class="note-footer">
        <span class="note-date">${date}</span>
      </div>
    </div>
    `;

    this.handleChangeArchive();
  }
  connectedCallback() {
    this.render();
  }
  handleChangeArchive() {
    const btnArchive = this.querySelector("#note-archived");
    btnArchive.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = event.target.dataset.id;
      const archived = event.target.dataset.archived;
      const note = NotesData.findNote(id, archived);
      note.archived = !note.archived;
      NotesData.updateNote(note);
    });
  }
}

customElements.define("note-component", listNote);
