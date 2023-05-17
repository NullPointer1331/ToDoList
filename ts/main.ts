// @ts-ignore
const picker = datepicker("#dueDate");
picker.setMin(new Date());

window.onload = function() {
    $("addToDo").onclick = addToList;
}
class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;
    constructor(title:string, dueDate:Date, isCompleted:boolean) {
        this.title = title;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
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
    //let isCompleted = (<HTMLInputElement>$("isCompleted")).checked;
    let isCompleted = false;
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
    let itemPar = document.createElement("p");
    itemPar.innerText = item.title + " " + item.dueDate.toString() + " " + item.isCompleted;
    displayDiv.appendChild(itemPar);
}

