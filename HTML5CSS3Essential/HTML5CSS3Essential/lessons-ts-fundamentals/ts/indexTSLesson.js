class TSLesson {
    constructor(linkTaskPage) {
        this.linkTaskPage = linkTaskPage;
    }
    ;
}
class TSLesson01 extends TSLesson {
    constructor(linkTaskPage, descriptionInd) {
        super(linkTaskPage);
        this.descriptionInd = descriptionInd;
    }
    showDescription(item) {
        this.descriptionInd.style.display = "none";
        switch (item.id) {
            case "indtask": {
                if (!this.linkTaskPage.dataset.iamworking) {
                    this.linkTaskPage.href = "IndependentTask.html";
                }
                this.descriptionInd.style.display = "block";
                break;
            }
            default: {
                this.linkTaskPage.href = "#";
            }
        }
    }
}
class TSLesson02 extends TSLesson {
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
                    this.linkTaskPage.href = "Task2.html";
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
class TSLesson03 extends TSLesson {
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
                    this.linkTaskPage.href = "Task2.html";
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
class TSLessonManagement {
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
            this._lesson = new TSLesson01(this._linkTaskPage, document.getElementById('taskDescriptionInd'));
        }
        else if (this._namePage === "index02") {
            this._lesson = new TSLesson02(this._linkTaskPage, document.getElementById('taskDescriptionAdd'), document.getElementById('taskDescription02'));
        }
        else if (this._namePage === "index03") {
            this._lesson = new TSLesson03(this._linkTaskPage, document.getElementById('taskDescriptionAdd'), document.getElementById('taskDescription02'));
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
let tsLessonManagement = new TSLessonManagement(location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0], document.getElementById('linktaskpage'), document.getElementById('summaryTask'), document.getElementById('summarytaskcaption'), document.getElementsByName('tasks'));
document.addEventListener('DOMContentLoaded', () => { tsLessonManagement.LoadPage(); }, false);
//# sourceMappingURL=indexTSLesson.js.map