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

function getToDoItem():ToDoItem {
    let title = (<HTMLInputElement>$("title")).value;
    let dueDate = (<HTMLInputElement>$("dueDate")).value;
    let isCompleted = (<HTMLInputElement>$("isComplete")).checked;
    return new ToDoItem(title, new Date(dueDate), isCompleted);
}

function addToList():void {
    if (isValid()) {
        let item:ToDoItem = getToDoItem();
        toDoList.push(item);
        displayToDoItem(item);
    }
}

function displayToDoItem(item:ToDoItem):void {
    let displayDiv = $("display");
    let itemDiv = document.createElement("div");
    let title = document.createElement("h3");
    title.innerText = item.title;
    itemDiv.appendChild(title);
    let dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate.toString();
    itemDiv.appendChild(dueDate);
    let isComplete = document.createElement("input");
    isComplete.type = "checkbox";
    isComplete.checked = item.isComplete;
    let completeLabel = document.createElement("label");
    completeLabel.innerText = "Complete?";
    itemDiv.appendChild(completeLabel);
    itemDiv.appendChild(isComplete);
    displayDiv.appendChild(itemDiv);
}

