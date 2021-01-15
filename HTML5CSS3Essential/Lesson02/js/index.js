var summaryTask = document.getElementById('summaryTask');
var summaryTaskCaption = document.getElementById('summarytaskcaption');
var tasks = document.listTasks.tasks;
var prev = null;
var isChecked = false;
var linkTaskPage = document.getElementById('linktaskpage');
var taskDescriptionAdd = document.getElementById('taskDescriptionAdd');
var taskDescriptionImg02 = document.getElementById('taskDescriptionImg02');
function loadPage() {
    isChecked = false;
    summaryTask.style.visibility = "hidden";
    summaryTaskCaption.style.display = "none";
    linkTaskPage.style.visibility = "hidden";
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].checked) {
            SetDescriptionTaskPage(tasks[i]);
        }
    }
    summaryTask.style.visibility = "visible";
    if (!isChecked) {
        summaryTaskCaption.style.display = "block";
    }
}
for (var i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function () {
        //console.log(this.value);
        if (this !== prev) {
            prev = this;
            summaryTaskCaption.style.display = "none";
            SetDescriptionTaskPage(prev);
        }
    };
}
function SetDescriptionTaskPage(prev) {
    isChecked = true;
    taskDescriptionAdd.style.display = "none";
    taskDescriptionImg02.style.display = "none";
    summaryTask.textContent = prev.value;
    linkTaskPage.style.visibility = "visible";
    switch (prev.id) {
        case "addtask": {
            linkTaskPage.href = "AdditionalTask.html";
            taskDescriptionAdd.style.display = "block";
            break;
        }
        case "task2": {
            linkTaskPage.href = "Task02.html";
            taskDescriptionImg02.style.display = "block";
            break;
        }
        default: {
            linkTaskPage.href = "#";
        }
    }
}