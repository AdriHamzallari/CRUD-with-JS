//Te dhenat
const totalNotes = document.getElementById('notes-count');
const activeTask = document.getElementById('tasks-count');
const completedTasks = document.getElementById('completed-count');
const studyHours = document.getElementById('study-hours');


/*===Butonat per hapjen modalet===*/
const addNoteModal = document.getElementById('add-note-btn');
const addTaskModal = document.getElementById('add-task-btn');
/*===DOM Modalet===*/
const noteModal = document.getElementById('note-modal');
const taskModal = document.getElementById('task-modal');
/*===Ruaj Task ose Note===*/
const saveTask = document.getElementById('btn-save-task');
const saveNote = document.getElementById('btn-save-note');
const taskContainer = document.getElementById('today-tasks');
const noteContainer = document.getElementById('recent-notes');
/*Cancel Modals*/
const cancelTaskModel = document.getElementById('cancel-task');
const closeTaskModal = document.getElementById('close-task-modal');
const cancelNote = document.getElementById('cancel-note');
const closeNoteModal = document.getElementById('close-note-modal');
/*Informacioni brenda modalit*/
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const taskInput = document.getElementById('task-input');

/*Note Modal*/
addNoteModal.addEventListener('click', () => {
    showNoteModal();
    console.log("Yes");
})
cancelNote.addEventListener('click', () => {
    hideNoteModal();
    console.log("Close")
});
closeNoteModal.addEventListener('click', () =>  {
    hideNoteModal();

})
saveTask.addEventListener('click', (e) => {
    e.preventDefault();
    adDtask();
})
saveNote.addEventListener('click', (e) => {
   e.preventDefault()
    adDNote();
})
function showNoteModal(){
 noteModal.classList.add('active');
}
function hideNoteModal(){
    noteModal.classList.remove('active');
    noteContent.value = '';
    noteTitle.value = '';
}
/*Task Modal*/
cancelTaskModel.addEventListener('click', () => {
    hideTaskModal();
    console.log("Mbyll");
} );
closeTaskModal.addEventListener('click', () => {
    hideTaskModal();
});
addTaskModal.addEventListener('click', () => {
    showTaskModal();
    console.log("Works");
});

//Show the data
function displayData(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    let completedCtr = 0;
    tasks.forEach(t => {
        if(t.status === "completed"){
            completedCtr++;
        }
    });
   const activeCtr = tasks.length - completedCtr;
    totalNotes.textContent = notes.length;
    activeTask.textContent = activeCtr;
    completedTasks.textContent = completedCtr;

}
displayData();


function showTaskModal(){
    taskModal.classList.add('active');
}
function adDtask(){
    //1.Merr data e ruajtur ne localStorag dhe ruaji si array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //2.Nevoitet nje strukture e vecante per te ruajtur te dhenat ne localStorage(objekt ose array)
    const newTask = {
        text: taskInput.value,
        priority: "medium",
        dueDate: new Date().toLocaleDateString(),
        status: 'active'
    }
    tasks.push(newTask);
    //3.Ruan ne localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayRecentTasks();
    displayData();
    taskInput.value = '';

    hideTaskModal();
   

}
function displayRecentTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskContainer.innerHTML = '';
    if(tasks.length === 0){
        taskContainer.innerHTML = `
        <label class="task">
                <input type="checkbox">
                <span>Click "+ Add Task" to create your first task</span>
            </label>`;
            return;
    }
    
        tasks.forEach(t => {
                const todayTask = document.createElement('label');
        todayTask.className = 'task';
        todayTask.innerHTML = `
            <input type="checkbox" ${t.status === 'completed' ? 'checked' : ''}>
            <span>${t.text}</span>
        `;
        taskContainer.appendChild(todayTask);
    });
            
    
}
function adDNote(){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = {
        title: noteTitle.value,
        text: noteContent.value
    }
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayRecentNotes();
    displayData();
    hideNoteModal();
}
function displayRecentNotes(){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteContainer.innerHTML = '';
    notes.forEach(n => {
         const todayNote = document.createElement('div');
       todayNote.innerHTML = `
       <article class="note-card">
                    <h4>${n.title }</h4>
                    <p>${n.text}</p>
                    <span>Today</span>
                </article>
       `;
       noteContainer.appendChild(todayNote);
    })
}
function hideTaskModal(){
    taskModal.classList.remove('active');
    taskInput.value = '';
}
document.addEventListener('DOMContentLoaded', () => {
    displayData();          
    displayRecentTasks();    
   displayRecentNotes(); 
});