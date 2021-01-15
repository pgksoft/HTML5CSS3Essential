abstract class TSLesson {
    protected linkTaskPage: HTMLAnchorElement;
    constructor(linkTaskPage: HTMLAnchorElement) {
        this.linkTaskPage = linkTaskPage;
    };
    abstract showDescription(item: HTMLElement);
}

class TSLesson01 extends TSLesson {
    private descriptionInd: HTMLElement;
    constructor(linkTaskPage: HTMLAnchorElement, descriptionInd: HTMLElement) {
        super(linkTaskPage);
        this.descriptionInd = descriptionInd;
    }
    showDescription(item: HTMLElement) {
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
    private descriptionAdd: HTMLElement;
    private description02: HTMLElement;
    constructor(linkTaskPage: HTMLAnchorElement, descriptionAdd: HTMLElement, description02: HTMLElement) {
        super(linkTaskPage);
        this.descriptionAdd = descriptionAdd;
        this.description02 = description02;
    }
    showDescription(item: HTMLElement) {
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
    private descriptionAdd: HTMLElement;
    private description02: HTMLElement;
    constructor(linkTaskPage: HTMLAnchorElement, descriptionAdd: HTMLElement, description02: HTMLElement) {
        super(linkTaskPage);
        this.descriptionAdd = descriptionAdd;
        this.description02 = description02;
    }
    showDescription(item: HTMLElement) {
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
    private _namePage: string;
    private _linkTaskPage: HTMLAnchorElement;
    private _summaryTask: HTMLElement;
    private _summaryTaskCaption: HTMLElement;
    private _isChecked: boolean = false;
    private _tasks: NodeList;
    private _prev: HTMLInputElement = null;
    private _lesson: TSLesson;
    constructor(
        namePage: string,
        linkTaskPage: HTMLAnchorElement,
        summaryTask: HTMLElement,
        summaryTaskCaption: HTMLElement,
        tasks: NodeList
    ) {
        this._namePage = namePage;
        this._linkTaskPage = linkTaskPage;
        this._summaryTask = summaryTask;
        this._summaryTaskCaption = summaryTaskCaption;
        this._tasks = tasks;
        this.DefinitionLesson();
        this.SetEvents();
    }

    // Methods
    LoadPage(): void {
        this._isChecked = false;
        this._summaryTask.style.visibility = "hidden";
        this._summaryTaskCaption.style.display = "none";
        this._linkTaskPage.style.visibility = "hidden";
        // Recovery show descripyion task
        for (let i = 0; i < this._tasks.length; i++) {
            if ((<HTMLInputElement>this._tasks[i]).checked) {
                this.SetDescriptionTaskPage(<HTMLInputElement>this._tasks[i]);
            }
        }
        this._summaryTask.style.visibility = "visible";
        // if description task was selected
        if (!this._isChecked) {
            this._summaryTaskCaption.style.display = "block";
        }
    }

    // Helpers
    private DefinitionLesson(): void {
        if (this._namePage === "index01") {
            this._lesson = new TSLesson01(<HTMLAnchorElement>this._linkTaskPage, document.getElementById('taskDescriptionInd'));
        } else if (this._namePage === "index02") {
            this._lesson = new TSLesson02(<HTMLAnchorElement>this._linkTaskPage, document.getElementById('taskDescriptionAdd'), document.getElementById('taskDescription02'));
        } else if (this._namePage === "index03") {
            this._lesson = new TSLesson03(<HTMLAnchorElement>this._linkTaskPage, document.getElementById('taskDescriptionAdd'), document.getElementById('taskDescription02'));
        } else if (this._namePage === "index04") {
            this._lesson = undefined;
        } else { console.log("Error definition lesson"); }
    };
    private SetEvents(): void {
        // Define OnClick event for input[radio]
        for (let i = 0; i < this._tasks.length; i++) {
            (<HTMLInputElement>this._tasks.item(i)).addEventListener('click', (e) => {
                let target: HTMLInputElement = <HTMLInputElement>e.target;
                if (target !== this._prev) {
                    this._prev = target;
                    this._summaryTaskCaption.style.display = "none";
                    this.SetDescriptionTaskPage(this._prev);
                }
            }, false);
        }
    };
    private SetDescriptionTaskPage(prev: HTMLInputElement) {
        this._isChecked = true;
        this._summaryTask.textContent = prev.value;
        this._linkTaskPage.style.visibility = "visible";
        this._lesson.showDescription(prev);
        if (!(<HTMLInputElement>document.getElementById('tabHome')).checked) {
            (<HTMLInputElement>document.getElementById('tabHome')).checked = true;
        }
    };
}

let tsLessonManagement = new TSLessonManagement(
    location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0],
    <HTMLAnchorElement>document.getElementById('linktaskpage'),
    document.getElementById('summaryTask'),
    document.getElementById('summarytaskcaption'),
    document.getElementsByName('tasks')
);

document.addEventListener('DOMContentLoaded', () => { tsLessonManagement.LoadPage(); }, false);
