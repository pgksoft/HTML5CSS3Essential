class AdvancedLesson {
    constructor(linkTaskPage) {
        this.linkTaskPage = linkTaskPage;
    }
    ;
}
class AdvancedLesson01 extends AdvancedLesson {
    constructor(linkTaskPage, descriptionAdd, description02) {
        super(linkTaskPage);
        this.descriptionAdd = descriptionAdd;
        this.description02 = description02;
    }
    showDescription(item) {
        this.descriptionAdd.style.display = "none";
        this.description02.style.display = "none";
        switch (item.id) {
            case "addtask": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "AdditionalTask.html";
                }
                this.descriptionAdd.style.display = "block";
                break;
            }
            case "task2": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "Task2.aspx";
                }
                this.description02.style.display = "block";
                break;
            }
            default: {
                this.linkTaskPage.href = "#";
            }
        }
    }
}
class AdvancedLesson02 extends AdvancedLesson {
    constructor(linkTaskPage, description01, description02, description03) {
        super(linkTaskPage);
        this.description01 = description01;
        this.description02 = description02;
        this.description03 = description03;
    }
    showDescription(item) {
        this.description01.style.display = "none";
        this.description02.style.display = "none";
        this.description03.style.display = "none";
        switch (item.id) {
            case "task1": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "Task01.html";
                }
                this.description01.style.display = "block";
                break;
            }
            case "task2": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "Task02.html";
                }
                this.description02.style.display = "block";
                break;
            }
            case "task3": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "Task03.html";
                }
                this.description03.style.display = "block";
                break;
            }
            default: {
                this.linkTaskPage.href = "#";
            }
        }
    }
}
class AdvancedLesson03 extends AdvancedLesson {
    constructor(linkTaskPage, descriptionAdd) {
        super(linkTaskPage);
        this.descriptionAdd = descriptionAdd;
    }
    showDescription(item) {
        this.descriptionAdd.style.display = "none";
        switch (item.id) {
            case "addtask": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "AddTask.html";
                }
                this.descriptionAdd.style.display = "block";
                break;
            }
            default: {
                this.linkTaskPage.href = "#";
            }
        }
    }
}
class AdvancedLessonManagement {
    constructor(namePage, linkTaskPage, summaryTask, summaryTaskCaption, tasks) {
        this._isChecked = false;
        this._prev = null;
        this._namePage = namePage;
        this._linkTaskPage = linkTaskPage;
        this._summaryTask = summaryTask;
        this._summaryTaskCaption = summaryTaskCaption;
        this._tasks = tasks;
        this.DefinitionLesson();
        this.SetEvents();
    }
    LoadPage() {
        this._isChecked = false;
        this._summaryTask.style.visibility = "hidden";
        this._summaryTaskCaption.style.display = "none";
        this._linkTaskPage.style.visibility = "hidden";
        for (let i = 0; i < this._tasks.length; i++) {
            if (this._tasks[i].checked) {
                this.SetDescriptionTaskPage(this._tasks[i]);
            }
        }
        this._summaryTask.style.visibility = "visible";
        if (!this._isChecked) {
            this._summaryTaskCaption.style.display = "block";
        }
    }
    DefinitionLesson() {
        if (this._namePage === "index01") {
            this._lesson = new AdvancedLesson01(this._linkTaskPage, document.getElementById('taskDescriptionAdd'), document.getElementById('taskDescription02'));
        }
        else if (this._namePage === "index02") {
            this._lesson = new AdvancedLesson02(this._linkTaskPage, document.getElementById('taskDescription01'), document.getElementById('taskDescription02'), document.getElementById('taskDescription03'));
        }
        else if (this._namePage === "index03") {
            this._lesson = new AdvancedLesson03(this._linkTaskPage, document.getElementById('taskDescriptionAdd'));
        }
        else if (this._namePage === "index04") {
            this._lesson = undefined;
        }
        else {
            console.log("Error definition lesson");
        }
    }
    ;
    SetEvents() {
        for (let i = 0; i < this._tasks.length; i++) {
            this._tasks.item(i).addEventListener('click', (e) => {
                let target = e.target;
                if (target !== this._prev) {
                    this._prev = target;
                    this._summaryTaskCaption.style.display = "none";
                    this.SetDescriptionTaskPage(this._prev);
                }
            }, false);
        }
    }
    ;
    SetDescriptionTaskPage(prev) {
        this._isChecked = true;
        this._summaryTask.textContent = prev.value;
        this._linkTaskPage.style.visibility = "visible";
        this._lesson.showDescription(prev);
        if (!document.getElementById('tabHome').checked) {
            document.getElementById('tabHome').checked = true;
        }
    }
    ;
}
let advancedLessonManagement = new AdvancedLessonManagement(location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0], document.getElementById('linktaskpage'), document.getElementById('summaryTask'), document.getElementById('summarytaskcaption'), document.getElementsByName('tasks'));
document.addEventListener('DOMContentLoaded', () => { advancedLessonManagement.LoadPage(); }, false);
//# sourceMappingURL=indexAdvancedLesson.js.map