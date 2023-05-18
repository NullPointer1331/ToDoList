// @ts-ignore
const picker = datepicker("#dueDate");
picker.setMin(new Date());

window.onload = function() {
    $("addToDo").onclick = addToList;
}

class ToDoItem {
    title:string;
    dueDate:Date;
    isComplete:boolean;
    constructor(title:string, dueDate:Date, isCompleted:boolean) {
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = isCompleted;
    }
}

let toDoList:ToDoItem[] = [];

function $(element:string):any{
    return document.getElementById(element); 
}

/**
 * Check if form data is valid
 */
function isValid():boolean {
    let title = (<HTMLInputElement>$("title")).value;
    let dueDate = (<HTMLInputElement>$("dueDate")).value;
    return isTextPresent("title", "Please enter a title") && isTextPresent("dueDate", "Please enter a due date");
}

/**
 * Returns true if the textbox with the given id has a value, false otherwise.
 * @param id The id of the textbox to validate
 * @param errMsg The message to display in the span element next to the textbox
 */
function isTextPresent(id:string, errMsg:string):boolean {
    let txtBox:HTMLInputElement = $(id);
    let txtBoxValue:string = txtBox.value;
    let errSpan:HTMLElement = <HTMLElement>txtBox.nextElementSibling;
    if (txtBoxValue == "") {
        errSpan.innerText = errMsg;
        return false;
    }
    errSpan.innerText = "*";
    return true;
}

/**
 * This method returns a ToDoItem object created from the form data
 * @returns A ToDoItem object created from the form data
 */
function getToDoItem():ToDoItem {
    let title = (<HTMLInputElement>$("title")).value;
    let dueDate = (<HTMLInputElement>$("dueDate")).value;
    let isCompleted = (<HTMLInputElement>$("isComplete")).checked;
    return new ToDoItem(title, new Date(dueDate), isCompleted);
}

/**
 * This method adds a ToDoItem to the ToDoList array and displays it on the web page
 */
function addToList():void {
    if (isValid()) {
        let item:ToDoItem = getToDoItem();
        toDoList.push(item);
        displayToDoItem(item);
    }
}

/**
 * This method adds a representation of a ToDoItem to the display div
 * @param item The ToDoItem to display
 */
function displayToDoItem(item:ToDoItem):void {
    let displayDiv = $("display");
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("todo");

    let title = document.createElement("h3");
    title.innerText = item.title;
    itemDiv.appendChild(title);

    let dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate.toString();
    itemDiv.appendChild(dueDate);

    let isComplete = document.createElement("input");
    isComplete.type = "checkbox";
    isComplete.checked = item.isComplete;
    isComplete.id = toDoList.indexOf(item).toString();
    isComplete.onclick = function() {checkboxClick(isComplete.id)};
    itemDiv.appendChild(isComplete);

    let completeLabel = document.createElement("label");
    completeLabel.innerText = "Complete?";
    itemDiv.appendChild(completeLabel);
    displayDiv.appendChild(itemDiv);
}

/**
 * This method toggles the isComplete property of the corresponding ToDoItem object
 * @param id The id of the checkbox that was clicked
 */
function checkboxClick(id:string):void {
    let item:ToDoItem = toDoList[parseInt(id)];
    item.isComplete = !item.isComplete;
}