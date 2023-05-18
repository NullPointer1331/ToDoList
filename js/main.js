var picker = datepicker("#dueDate");
picker.setMin(new Date());
window.onload = function () {
    $("addToDo").onclick = addToList;
    $("clearToDo").onclick = clearToDoItems;
    if (localStorage.getItem("ToDoList")) {
        var list = JSON.parse(localStorage.getItem("ToDoList"));
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            toDoList.push(item);
            displayToDoItem(item);
        }
    }
};
var ToDoItem = (function () {
    function ToDoItem(title, dueDate, isCompleted) {
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = isCompleted;
    }
    return ToDoItem;
}());
var toDoList = [];
function $(element) {
    return document.getElementById(element);
}
function clearToDoItems() {
    var displayDiv = $("display");
    displayDiv.innerHTML = "";
    toDoList = [];
    localStorage.clear();
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
    var isCompleted = $("isComplete").checked;
    return new ToDoItem(title, dueDate, isCompleted);
}
function addToList() {
    if (isValid()) {
        var item = getToDoItem();
        toDoList.push(item);
        displayToDoItem(item);
        localStorage.setItem("ToDoList", JSON.stringify(toDoList));
    }
}
function displayToDoItem(item) {
    var displayDiv = $("display");
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("todo");
    var title = document.createElement("h3");
    title.innerText = item.title;
    itemDiv.appendChild(title);
    var dueDate = document.createElement("p");
    dueDate.innerText = item.dueDate.toString();
    itemDiv.appendChild(dueDate);
    var isComplete = document.createElement("input");
    isComplete.type = "checkbox";
    isComplete.checked = item.isComplete;
    isComplete.id = toDoList.indexOf(item).toString();
    isComplete.onclick = function () { checkboxClick(isComplete.id); };
    itemDiv.appendChild(isComplete);
    var completeLabel = document.createElement("label");
    completeLabel.innerText = "Complete?";
    itemDiv.appendChild(completeLabel);
    displayDiv.appendChild(itemDiv);
}
function checkboxClick(id) {
    var item = toDoList[parseInt(id)];
    item.isComplete = !item.isComplete;
    localStorage.setItem("ToDoList", JSON.stringify(toDoList));
}
