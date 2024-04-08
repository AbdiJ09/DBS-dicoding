class NotesData {
  static searchNotes(keyword) {
    const notesData = NotesData.getNotes();
    return notesData.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  static getNotes(archived = false) {
    const notes = Object.values(localStorage).map((note) => JSON.parse(note));
    if (!notes) return [];
    const filteredNotes = notes
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      })
      .filter((note) => note.archived === archived);
    return filteredNotes;
  }

  static addNote(note) {
    const updatedNotes = [...this.getNotes(), note];
    localStorage.setItem(note.id, JSON.stringify(note));
    this.dispatchNoteUpdatedEvent(updatedNotes);
  }

  static findNote(id, archived) {
    const notes = this.getNotes(archived === "true");
    return notes.find((note) => note.id === id);
  }

  static updateNote(note) {
    const notes = this.getNotes();
    const notesArchived = this.getNotes(true);
    const index = notes.findIndex((n) => n.id === note.id);
    notes[index] = note;
    localStorage.setItem(note.id, JSON.stringify(note));
    this.dispatchNoteArchivedUpdatedEvent(notes, note, notesArchived);
  }

  static dispatchNoteUpdatedEvent(updatedNotes) {
    const event = new CustomEvent("notedUpdated", {
      detail: { notes: updatedNotes },
    });
    window.dispatchEvent(event);
  }

  static dispatchNoteArchivedUpdatedEvent(notes, note, notesArchived) {
    const event = new CustomEvent("noteArchivedUpdated", {
      detail: { notes, note, notesArchived },
    });
    window.dispatchEvent(event);
  }
}

export default NotesData;
