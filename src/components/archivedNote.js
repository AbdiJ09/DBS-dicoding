class archivedNote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        <div class="archived-notes">
          <button class="archived-button"><i class='bx bxs-archive-in'></i> Archived</button>
          <div class="archived"></div>
        </div>
    `;
  }
}

customElements.define("archived-note", archivedNote);
