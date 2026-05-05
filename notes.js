
    // Modal functionality
    const body = document.getElementById('body');
    const noteModal = document.getElementById('note-modal');
    const addNoteBtn = document.getElementById('add-note-btn');
    const closeNoteModal = document.getElementById('close-note-modal');
    const cancelNote = document.getElementById('cancel-note');
    const noteTitle = document.getElementById('note-title');
    const noteCategory = document.getElementById('note-category');
    const noteContent = document.getElementById('note-content');
    const notesContainer = document.getElementById('notes-grid');
    const saveBtn = document.getElementById('save-btn');
    /*Edit Modal */
    const editModal = document.getElementById('note-edit-modal');
    const cancelEdit = document.getElementById('cancel-edit-btn');
    const closeEdit = document.getElementById('close-note-edit');
    const titleEdit = document.getElementById('note-edit-title');
    const categoryEdit = document.getElementById('note-edit-category');
    const contentEdit = document.getElementById('note-edit-content');
    const saveEditBtn = document.getElementById("save-edit-btn");
    let myNotes = JSON.parse(localStorage.getItem('notes')) || [];
let noteIdBeingEdited = null;
    function loadNotesFromStorage(){
      let myNotes = localStorage.getItem('notes');
      return myNotes ? JSON.parse(myNotes): [];  
    }
    function saveNotesToStorage(){
        localStorage.setItem('notes', JSON.stringify(myNotes));
    }

    addNoteBtn.addEventListener('click', () => {
        noteModal.classList.add('active');
    });

    closeNoteModal.addEventListener('click', () => {
        hideNoteModal();
    });

    cancelNote.addEventListener('click', () => {
        hideNoteModal();
    });
    saveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addNotes();
    });
function hideNoteModal(){
    noteModal.classList.remove('active');
    noteTitle.value = '';
    noteCategory.selectedIndex = 0;
    noteContent.value = '';
}
function renderNote(myNotes){
     const notes = document.createElement('div');
        notes.dataset.id = myNotes.id;
  notes.className = 'note-card';
  notes.innerHTML = `
                <div class="note-header">
                    <h3>${myNotes.title}</h3>
                    <div class="note-actions">
                        <button class="edit-btn" title="Edit">✏️</button>
                        <button class="delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
                <p>${myNotes.content}</p>
                <div class="note-footer">
                    <span class="note-category">${myNotes.category}</span>
                    <span>${myNotes.currentDate}</span>
                </div>
            
`;
notesContainer.appendChild(notes);
}

myNotes.forEach(note => renderNote(note));
function addNotes(){
    const newNote = {
        id: Date.now(),
        title: noteTitle.value,
        content: noteContent.value,
        category: noteCategory.value,
        currentDate : new Date().toLocaleDateString()
    }
    myNotes.push(newNote);
renderNote(newNote);
saveNotesToStorage();
hideNoteModal();
}
//*Fshi notes*///*Edito notes*/
notesContainer.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        const card = deleteBtn.closest('.note-card');
        const idToDelete = Number(card.dataset.id);
        myNotes = myNotes.filter(note => note.id !== idToDelete);
        card.remove();
        saveNotesToStorage();
        }
    if(event.target.closest('.edit-btn')){
         const card = event.target.closest('.note-card');
    const id = Number(card.dataset.id);
        const noteToEdit = myNotes.find(n => n.id === id);
        if(noteToEdit){
           noteIdBeingEdited = id; 
            titleEdit.value = noteToEdit.title;
            contentEdit.value = noteToEdit.content;
            categoryEdit.value = noteToEdit.category;
            editModal.classList.add('active');
        }  
    }
});
document.getElementById('save-edit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(Array.isArray(myNotes))
    const index = myNotes.findIndex(n => Number(n.id) === Number(noteIdBeingEdited));
    if (index !== -1) {
        myNotes[index].title = titleEdit.value;
        myNotes[index].content = contentEdit.value;
        myNotes[index].category = categoryEdit.value;
        saveNotesToStorage();
        notesContainer.innerHTML = ''; 
        myNotes.forEach(note => renderNote(note));
        
        editModal.classList.remove('active');
        noteIdBeingEdited = null;
    }
});
function hideEditModal(){
   editModal.classList.remove('active');
}
cancelEdit.addEventListener('click', () => {
   hideEditModal();
});
closeEdit.addEventListener('click', () => {
    hideEditModal();
})
const searchInput = document.getElementById('search-notes');
//SEARCH
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const allCards = document.querySelectorAll('.note-card');
    allCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';  
        }
    });
});
notesContainer.addEventListener('click', (event) => {
    if(event.target.closest('.edit-btn') || event.target.closest('.delete-btn')){
        return;
    }
    const note = event.target.closest('.note-card')
   const id = Number(note.dataset.id);
    const noteData = myNotes.find(n => n.id === id);
console.log(noteData);
 showFullNote(noteData)
} )
function  showFullNote(noteData) {
     
    if (!noteData) return;

    const newDiv = document.createElement('div');
    newDiv.className = 'modal';
    newDiv.classList.add('active'); 
    newDiv.innerHTML = `
         <div class="modal-content modal-large">
        <div class="modal-header">
            <h2 id="view-note-title">${noteData.title}</h2>
            <button class="close-btn" id="close-view-note">&times;</button>
        </div>
        <div class="note-view-body">
            <div class="note-meta">
                <span class="note-date" id="view-note-date">${noteData.currentDate}</span>
                <span class="note-category" id="view-note-category">${noteData.category}</span>
            </div>
            <div class="note-content-display" id="view-note-content">
               ${noteData.content}
            </div>
        </div>
        <div class="modal-actions">

            <button class="btn btn-primary" id="close-view-note-btn">Close</button>
        </div>
    </div>
        `;

    document.body.appendChild(newDiv);

    // Add listeners to the new dynamic buttons
    const closeActions = () => newDiv.remove();
    newDiv.querySelector('#close-view-note').addEventListener('click', closeActions);
    newDiv.querySelector('#close-view-note-btn').addEventListener('click', closeActions);
}


