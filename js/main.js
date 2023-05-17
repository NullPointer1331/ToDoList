var picker = datepicker("#dueDate");
picker.setMin(new Date());
window.onload = function () {
    $("addToDo").onclick = addToList;
};
var ToDoItem = (function () {
    function ToDoItem(title, dueDate, isCompleted) {
        this.title = title;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
    return ToDoItem;
}());
var toDoList = [];
function $(element) {
    return document.getElementById(element);
}
function isValid() {
    var title = $("title").value;
    var dueDate = $("dueDate").value;
    return isTextPresent("title", "Please enter a title") && isTextPresent("dueDate", "Please enter a due date");
}
function isTextPresent(id, errMsg) {
    var txtBox = $(id);
    var txtBoxValue = txtBox.value;
    var errSpan = txtBox.nextElementSibling;
    if (txtBoxValue == "") {
        errSpan.innerText = errMsg;
        return false;
    }
    errSpan.innerText = "*";
    return true;
}
function getToDoItem() {
    var title = $("title").value;
    var dueDate = $("dueDate").value;
    var isCompleted = false;
    return new ToDoItem(title, new Date(dueDate), isCompleted);
}
function addToList() {
    if (isValid()) {
        var item = getToDoItem();
        toDoList.push(item);
        displayToDoItem(item);
    }
}
function displayToDoItem(item) {
    var displayDiv = $("display");
    var itemPar = document.createElement("p");
    itemPar.innerText = item.title + " " + item.dueDate.toString() + " " + item.isCompleted;
    displayDiv.appendChild(itemPar);
}
