abstract class AdvancedLesson {
    protected linkTaskPage: HTMLAnchorElement;
    constructor(linkTaskPage: HTMLAnchorElement) {
        this.linkTaskPage = linkTaskPage;
    };
    abstract showDescription(item: HTMLElement);
}

class AdvancedLesson01 extends AdvancedLesson {
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
    private description01: HTMLElement;
    private description02: HTMLElement;
    private description03: HTMLElement;
    constructor(linkTaskPage: HTMLAnchorElement, description01: HTMLElement, description02: HTMLElement, description03: HTMLElement) {
        super(linkTaskPage);
        this.description01 = description01;
        this.description02 = description02;
        this.description03 = description03;
    }
    showDescription(item: HTMLElement) {
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

class AdvancedLessonManagement {
    private _namePage: string;
    private _linkTaskPage: HTMLAnchorElement;
    private _summaryTask: HTMLElement;
    private _summaryTaskCaption: HTMLElement;
    private _isChecked: boolean = false;
    private _tasks: NodeList;
    private _prev: HTMLInputElement = null;
    private _lesson: AdvancedLesson;
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
            this._lesson = new AdvancedLesson01(
                <HTMLAnchorElement>this._linkTaskPage,
                document.getElementById('taskDescriptionAdd'),
                document.getElementById('taskDescription02')
            );
        } else if (this._namePage === "index02") {
            this._lesson = new AdvancedLesson02(
                <HTMLAnchorElement>this._linkTaskPage,
                document.getElementById('taskDescription01'),
                document.getElementById('taskDescription02'),
                document.getElementById('taskDescription03')
            );
        } else if (this._namePage === "index03") {
            //this._lesson = new TSLesson03(<HTMLAnchorElement>this._linkTaskPage, document.getElementById('taskDescriptionAdd'), document.getElementById('taskDescription02'));
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

let advancedLessonManagement = new AdvancedLessonManagement(
    location.pathname.split("/")[location.pathname.split("/").length - 1].split(".")[0],
    <HTMLAnchorElement>document.getElementById('linktaskpage'),
    document.getElementById('summaryTask'),
    document.getElementById('summarytaskcaption'),
    document.getElementsByName('tasks')
);

document.addEventListener('DOMContentLoaded', () => { advancedLessonManagement.LoadPage(); }, false);