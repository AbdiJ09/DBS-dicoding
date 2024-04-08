class header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
      <h1>Notes App</h1>
      <div class="search-bar">
        <input
          type="text"
          name="search"
          placeholder="cari..."
          id="search"
          class="search"
        />
        <span class="search-icon"
          ><i class='bx bx-search' style='color:#ffffff' ></i></span>
      </div>
    </header>
    `;
  }
}

customElements.define("header-component", header);
