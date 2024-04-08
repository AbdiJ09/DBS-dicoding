import NotesData from "../api/notesData.js";

class FormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.form();
  }
  render() {
    this.innerHTML = `
        <button class="highlight-button"><i class='bx bx-highlight'></i></button>
        <div class="form-container">
        <form id="form">
        <div class="form-header">
        <button type="submit" class="save-button"><i class='bx bxs-save'  ></i></button>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Judul..."
              required
            />
            <button type="button" class="back-button"><i class='bx bx-arrow-back'></i></button>
        </div>

            <textarea
              name="body"
              id="body"
              cols="30"
              rows="10"
              placeholder="Tuliskan catatanmu..."
              required
            ></textarea>
          </form>
        </div>
    `;
  }

  form() {
    const form = document.querySelector("#form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formContainer = document.querySelector(".form-container");
      const titleInput = this.querySelector("#title");
      const bodyInput = this.querySelector("#body");
      const id = `notes-${new Date().getTime()}`;
      const title = titleInput.value;
      const body = bodyInput.value;
      const timestamp = new Date().toISOString();
      const newNote = {
        id,
        title,
        body,
        createdAt: timestamp,
        archived: false,
      };

      NotesData.addNote(newNote);

      formContainer.classList.remove("active");

      form.reset();
    });
  }
}

customElements.define("form-component", FormComponent);
