
export const findFolder = (folders=[], folderId) =>
folders.find((folder) => folder.id === folderId);

export const findNote = (notes=[], noteId) =>
notes.find((note) => note.id === Number(noteId));

export const getNotesForFolder = (notes=[], folderId) => {
return !folderId
  ? notes
  : notes.filter((note) => note.id_folder === parseInt(folderId));
}

export const countNotesForFolder = (notes = [], folderId) =>
  notes.filter((note) => note.id_folder === Number(folderId)).length;
