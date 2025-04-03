document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    addTaskToUI(taskText);
    saveTask(taskText);
    input.value = "";
}

function addTaskToUI(text) {
    let li = document.createElement("li");
    li.draggable = true;
    li.innerHTML = `${text} <button class="delete" onclick="removeTask(this)">❌</button>`;
    li.ondragstart = drag;
    document.getElementById("taskList").appendChild(li);
}

function saveTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(button) {
    let li = button.parentElement;
    let text = li.innerText.replace("❌", "").trim();
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToUI);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerHTML);
}
