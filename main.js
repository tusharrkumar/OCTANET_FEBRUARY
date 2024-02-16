const inputBox = document.querySelector('#input');
const addButton = document.querySelector('.addBtn');
const notesListWrapper = document.querySelector('.notes_list_wrapper');
const errorMessage = document.querySelector('.error-message');


let currentEditedNote = null;

// creating or adding new notes

const createNewNoteItem = (getCurrentNote) => {
    const li = document.createElement('li');
    const p = document.createElement('p');

    p.textContent = getCurrentNote;
    li.appendChild(p);

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('btn', 'editBtn');
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('btn', 'deleteBtn');
    li.appendChild(deleteBtn);

    return li;
}


const saveNotesToStorage = (getCurrentNote) => {
    let notesList;

    if(localStorage.getItem('notes') === null) {
        notesList = [];
    }else {
        notesList = JSON.parse(localStorage.getItem('notes'));
    }

    notesList.push(getCurrentNote)
    localStorage.setItem('notes', JSON.stringify(notesList));
}


const addNewNote = () => {
    const extractInputText = inputBox.value.trim();
    if(extractInputText.length <= 0){
        errorMessage.textContent = "Input Can'ot Be Empty !!! You Must Type Some Text For Proceed"
        return false;
    }

    if(addButton.innerText === 'Edit Note'){
        handelEditCurrentNote(currentEditedNote.target.previousElementSibling.innerHTML)
        currentEditedNote.target.previousElementSibling.innerHTML = extractInputText
        addButton.innerText = 'Add Note'
        inputBox.value = '';
        errorMessage.textContent = '';
    }else {
        const newNoteItem = createNewNoteItem(extractInputText);
        notesListWrapper.appendChild(newNoteItem);
        inputBox.value = "";
        errorMessage.textContent = '';


        saveNotesToStorage(extractInputText);
    }

    
}

const fetchAllNotes = () => {
    let notesList;

    if(localStorage.getItem('notes') === null) {
        notesList = [];
    }else {
        notesList = JSON.parse(localStorage.getItem('notes'));

        notesList.forEach(value => {
            const extractLi = createNewNoteItem(value);
            notesListWrapper.appendChild(extractLi);
        })
    }
}

const handelEditCurrentNote = (currentNote) => {
    let notes = JSON.parse(localStorage.getItem('notes'));
    let index = notes.indexOf(currentNote);

    notes[index] =inputBox.value;
    localStorage.setItem('notes', JSON.stringify(notes));
}


const handelDeleteNotes = (currentNote) => {
    let notesList;

    if(localStorage.getItem('notes') === null) {
        notesList = [];
    }else {
        notesList = JSON.parse(localStorage.getItem('notes'));
    }

    let currentNoteText = currentNote.children[0].innerHTML;
    let index = notesList.indexOf(currentNoteText);


    notesList.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesList));
}     


const handelEditDeleteNote = (event) => {
    if(event.target.innerHTML === 'Delete'){
        notesListWrapper.removeChild(event.target.parentElement);
        handelDeleteNotes(event.target.parentElement);
    }

    if(event.target.innerHTML === 'Edit'){
        inputBox.value = event.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addButton.innerText = "Edit Note";
        currentEditedNote = event;
    }
}


document.addEventListener("DOMContentLoaded", fetchAllNotes);
addButton.addEventListener('click',addNewNote);
notesListWrapper.addEventListener("click", handelEditDeleteNote);

