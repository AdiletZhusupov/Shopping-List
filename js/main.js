//  Variables
const input = document.querySelector(".input-text");
const submitBtn = document.querySelector(".btn-submit");
const ulELement = document.querySelector(".grocery-box");
const actionUpdate = document.querySelector(".action-update");
const clearItems = document.querySelector(".btn-clear");
const editBtn = document.querySelector(".btn-edit");

// This variable keeps the record of which P element is being modified
let paragraphBeingModified;
// This variable keeps the recond of which List is the delete button in;
let listTodelete;


// Functions
function informUser(message){
    if(input.value !== ""){
        actionUpdate.classList.add("green");
        actionUpdate.innerText = message;
        actionUpdate.style.visibility = "visible";
    }else{
        actionUpdate.classList.add("red");
        actionUpdate.innerText = message;
        actionUpdate.style.visibility = "visible";
    }
    setTimeout(()=>{
        actionUpdate.classList.remove("red");
        actionUpdate.classList.remove("green");
        actionUpdate.innerText = "";
        actionUpdate.style.visibility = "hidden";
    }, 2000)
};


function createListAndIconFunctions(){
    const iconDelete = document.createElement("i");
    iconDelete.classList.add("fa-solid", "fa-trash-can", "list-btn", "delete");

    const iconEdit = document.createElement("i");
    iconEdit.classList.add("fa-solid", "fa-pen-to-square", "list-btn", "edit");
    
    const paragraphItem = document.createElement("p");
    paragraphItem.classList.add("list-text");
    paragraphItem.innerText = input.value;

    const listItem = document.createElement("li");
    listItem.classList.add("list");

    listItem.append(paragraphItem, iconEdit, iconDelete);

    iconEdit.addEventListener("click", ()=>{
        paragraphBeingModified = iconEdit.previousElementSibling;
        if((iconEdit.previousElementSibling.innerText.length > 1) && (iconEdit.previousElementSibling.innerText === iconEdit.previousElementSibling.innerText.toUpperCase())){
            input.value = iconEdit.previousElementSibling.innerText;
        }else{
            input.value = iconEdit.previousElementSibling.innerText.toLowerCase();
        }
        submitBtn.style.display = "none";
        editBtn.style.display = "inline-block";
    })
    iconDelete.addEventListener("click", ()=>{
        listTodelete = iconDelete.parentElement;
        listTodelete.remove();
        showHideClear()
    })
    return listItem;
}

function showHideClear(){
    if(ulELement.children.length > 0){
        clearItems.style.display = "inline";
    }else{
        clearItems.style.display = "none";
    }
}


// Event Listeners

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(input.value !== ""){
        ulELement.appendChild(createListAndIconFunctions())
        informUser("Item Added To The List");
        showHideClear();
        input.value = "";
    }else{
        informUser("Please Enter Value");
        showHideClear();
    }

})

editBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(input.value !== ""){
        paragraphBeingModified.innerText = input.value;
        informUser("Value changed");
        showHideClear();
        submitBtn.style.display = "inline-block";
        editBtn.style.display = "none";
        input.value = "";
    }else{
        informUser("Please Enter Value");
        showHideClear();
        submitBtn.style.display = "none";
        editBtn.style.display = "inline-block";
    }
})

clearItems.addEventListener('click',()=>{
    const allLists = document.querySelectorAll(".list");
    allLists.forEach((list)=>{
        list.remove()
    });
    informUser("Empty List")
    showHideClear();
})


