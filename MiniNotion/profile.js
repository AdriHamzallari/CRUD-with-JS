


    // Modal functionality
    const profileModal = document.getElementById('profile-modal');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const cancelProfile = document.getElementById('cancel-profile');
//Actual data
    const profileName = document.getElementById('name');
    const profileEmail = document.getElementById('email');
    const profileUni = document.getElementById('university');
    const profileMajor = document.getElementById('major');
    const profileYear = document.getElementById('year');
    const timeJoined = document.getElementById('joined');
    const notesCtr = document.getElementById('profile-note');
    const taskCtr = document.getElementById('profile-task');
    const hoursCtr = document.getElementById('profile-hours');
//Edit Data
    const closeModal = document.getElementById('close-profile-modal');
    const cancelModal = document.getElementById('cancel-profile');
    const saveEdit = document.getElementById('save-changes');
    const editName = document.getElementById('edit-name');
    const editRole = document.getElementById('edit-role');
    const editEmail = document.getElementById('edit-email');
    const editUniversity = document.getElementById('edit-university');
    const editMajor = document.getElementById('edit-major');
    //LocalStorage
     let myProfile = JSON.parse(localStorage.getItem('profile')) || {};
function saveProfileToStorage(myProfile){
    localStorage.setItem('profile', JSON.stringify(myProfile) );
}

function loadProfileFromStorage() {
    const data = localStorage.getItem('profile');
    myProfile = data ? JSON.parse(data) : {};
    return myProfile;
}
function displayProfile() {
    profileName.textContent = myProfile.name || '';
    profileEmail.textContent = myProfile.email || '';
    profileMajor.textContent = myProfile.major || '';
    profileUni.textContent = myProfile.uni || '';
}
displayProfile();
closeProfileModal.addEventListener('click', () => {
        closModal();
})

cancelProfile.addEventListener('click', () => {
        closModal();
    });

    // Avatar edit button
    const editAvatarBtn = document.querySelector('.edit-avatar');
editAvatarBtn.addEventListener('click', () => {
        alert('Avatar upload functionality would be implemented here!');
    });
    //Edit Mode
    editProfileBtn.addEventListener('click', () => {
openEditModal();
    })
 
   
function openEditModal(){
    
     editName.value = myProfile.name || '';
    editEmail.value = myProfile.email || '';
    editUniversity.value = myProfile.uni || '';
    editMajor.value = myProfile.major || '';
    profileModal.classList.add('active');
   
}
function saveProfileChanges(){

    const newData = {
        name: editName.value,
        email: editEmail.value,
        uni: editUniversity.value,
        major: editMajor.value
    }
    
    profileName.textContent = newData.name
    profileEmail.textContent = newData.email;
    profileUni.textContent = newData.uni;
    profileMajor.textContent = newData.major;
    myProfile = newData;
    console.log(newData);
    closModal();
    saveProfileToStorage(newData);
    displayProfile()

    
}
saveEdit.addEventListener('click', (e) => {
    e.preventDefault();
    saveProfileChanges();
})
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
    notesCtr.textContent = notes.length;
    taskCtr.textContent = completedCtr;
    hoursCtr.textContent = 2;

}
displayData();
function closModal(){
 profileModal.classList.remove('active');
}
