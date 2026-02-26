
const taskModal       = document.getElementById('task-modal');
const addTaskBtn      = document.getElementById('add-task-btn');
const closeTaskModal  = document.getElementById('close-task-modal');
const cancelTask      = document.getElementById('cancel-task');
const taskInput       = document.getElementById('task-input');
const category        = document.getElementById('task-priority');
const taskDate        = document.getElementById('task-due');
const taskContainer   = document.getElementById('tasks-list');
const saveTask        = document.getElementById('save-btn');
const editModal       = document.getElementById('edit-modal');
const saveEditModal   = document.getElementById('save-edit-btn');
const closeEditModal  = document.getElementById('close-edit-modal');
const cancelEditModal = document.getElementById('cancel-edit');     
const editTaskName    = document.getElementById('edit-input');
const editPriority    = document.getElementById('edit-priority'); 
const editDate        = document.getElementById('edit-due');         
let taskToUpdate = null;

/* Load nga Local Storage*/
function loadTasksFromStorage(){
    const taskJSON = localStorage.getItem('tasks');
    return taskJSON ? JSON.parse(taskJSON): [];
}
//RUAJI  NE LOCAL STORAGE//
function saveTasksToStorage(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Merr te dhenat nga DOM//
function syncTasksToStorage() {
    const allTasks = taskContainer.querySelectorAll('.task-item');
    const tasksArray = [];
    
    allTasks.forEach(task => {
        const taskData = {
            text: task.querySelector('.task-text').textContent,
            priority: task.getAttribute('data-priority'),
            dueDate: task.querySelector('.task-due').textContent.replace('📅 Due: ', ''),
            status: task.getAttribute('data-status')
        };
        tasksArray.push(taskData);
    });
    
    saveTasksToStorage(tasksArray);
}
//Shfaqi ne dom//
function displayTasksFromStorage() {
    const tasks = loadTasksFromStorage();
    taskContainer.innerHTML = '';
    tasks.forEach(taskData => {
        createTaskElement(taskData);
    });
}
// Krijo një task element (ndare nga addTask për ta ripërdorur)
function createTaskElement(taskData) {
    const task = document.createElement('div');
    task.className = 'task-item';
    
    task.setAttribute('data-priority', taskData.priority);
    task.setAttribute('data-status', taskData.status);
    if (taskData.status === 'completed') {
        task.classList.add('completed');
    }
    
    task.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${taskData.status === 'completed' ? 'checked' : ''}>
        <div class="task-content">
            <div class="task-text">${taskData.text}</div>
            <div class="task-meta">
                <span class="task-priority priority-${taskData.priority}">${taskData.priority}</span>
                <span class="task-due">📅 Due: ${taskData.dueDate}</span>
            </div>
        </div>
        <div class="task-actions">
            <button class="edit-btn" title="Edit">✏️</button>
            <button class="delete-btn" title="Delete">🗑️</button>
        </div>
    `;
    const checkbox = task.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            task.classList.add('completed');
            task.setAttribute('data-status', 'completed');
        } else {
            task.classList.remove('completed');
            task.setAttribute('data-status', 'active');
        }
        syncTasksToStorage();
    });

    taskContainer.appendChild(task);
}
addTaskBtn.addEventListener('click', () => {
    taskModal.classList.add('active');
});

closeTaskModal.addEventListener('click', () => {
    hideModal();
});

cancelTask.addEventListener('click', () => {
    hideModal();
});

function hideModal() {
    taskModal.classList.remove('active');
    taskDate.value = '';
    taskInput.value = '';
    category.value = 'medium';
}

saveTask.addEventListener('click', () => {
    addTask(); 
});

function addTask() {
    const taskData = {
        text: taskInput.value,
        priority: category.value,
        dueDate: taskDate.value,
        status: 'active'
    };
    
    createTaskElement(taskData);
    syncTasksToStorage();
    hideModal();
}


taskContainer.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        deleteBtn.closest('.task-item').remove();
         syncTasksToStorage();
    }
});
taskContainer.addEventListener('click', (event) => {
    const editBtn = event.target.closest('.edit-btn');
    if (editBtn) {
        taskToUpdate = editBtn.closest('.task-item');
        
        const currentText     = taskToUpdate.querySelector('.task-text').textContent;     
        const currentPriority = taskToUpdate.querySelector('.task-priority').textContent;              
        const currentDue      = taskToUpdate.querySelector('.task-due').textContent.replace('📅 Due: ', ''); 

        editTaskName.value  = currentText;
        editPriority.value  = currentPriority;
        editDate.value      = currentDue;

        editModal.classList.add('active');
    }
});

saveEditModal.addEventListener('click', (e) => {
    e.preventDefault();
    if (taskToUpdate) {
        taskToUpdate.querySelector('.task-text').textContent = editTaskName.value;
        const priorityEl = taskToUpdate.querySelector('.task-priority');
        priorityEl.textContent = editPriority.value;
        priorityEl.className   = `task-priority priority-${editPriority.value}`;
        taskToUpdate.setAttribute('data-priority', editPriority.value);
        taskToUpdate.querySelector('.task-due').textContent = `📅 Due: ${editDate.value}`;
          syncTasksToStorage();
        editModal.classList.remove('active');
        taskToUpdate = null;
    }
});
closeEditModal.addEventListener('click', () => {
    editModal.classList.remove('active');
    taskToUpdate = null;
});

cancelEditModal.addEventListener('click', () => {
    editModal.classList.remove('active');
    taskToUpdate = null;
});
/*filter*/
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.dataset.filter;
        filterTasks(filterValue);
    });
});

function filterTasks(filterValue) {

    const tasks = taskContainer.querySelectorAll('.task-item');
    
    console.log( filterValue);
    
    tasks.forEach(task => {
        const taskStatus   = task.getAttribute('data-status');   
        const taskPriority = task.getAttribute('data-priority'); 
        
        switch(filterValue) {
            case 'all':
                task.style.display = 'flex'; 
                break;
            
            case 'active':
                task.style.display = taskStatus === 'active' ? 'flex' : 'none';
                break;
            
            case 'completed':
                task.style.display = taskStatus === 'completed' ? 'flex' : 'none';
                break;
            
            case 'high':
                task.style.display = taskPriority === 'high' ? 'flex' : 'none';
                break;
            
            default:
                task.style.display = 'flex';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const existingCheckboxes = document.querySelectorAll('.task-checkbox');
    existingCheckboxes.forEach(checkbox => {
        const task = checkbox.closest('.task-item');
        if (!task.hasAttribute('data-status')) {
            task.setAttribute('data-status', task.classList.contains('completed') ? 'completed' : 'active');
        }
        if (!task.hasAttribute('data-priority')) {
            const priorityText = task.querySelector('.task-priority')?.textContent.trim().toLowerCase();
            task.setAttribute('data-priority', priorityText || 'medium');
        }

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                task.classList.add('completed');
                task.setAttribute('data-status', 'completed');
            } else {
                task.classList.remove('completed');
                task.setAttribute('data-status', 'active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    displayTasksFromStorage();
});