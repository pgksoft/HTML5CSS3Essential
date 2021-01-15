class ControlLessons {
    constructor(
        lessons,
        btnall, imgexpandAll, imgcollapseAll, markall,
        btnallPurpose, imgexpandAllPurpose, imgcollapseAllPurpose, markallPurpose,
        btnallSummaryTask, imgexpandAllSummaryTask, imgcollapseAllSummaryTask, markallSummaryTask,
        btnallHomeWork, imgexpandAllHomeWork, imgcollapseAllHomeWork, markallHomeWork,
        btnallEverything, imgexpandAllEverything, imgcollapseAllEverything, markallEverything,
        lessonsPurpose, lessonsSummaryTask, lessonsHomeWork
    ) {
        // Definition
        this.listLessons = new Array();
        //[
        //    "Урок 01. Введение в HTML5. Основы синтаксиса и семантики, передовые методы разметки.",
        //    "Урок 02. HTML5 формы. Теги VIDEO И AUDIO.",
        //    "Урок 03. Микроданные и пользовательские данные. Геолокация. Drag and Drop.",
        //    "Урок 04. Canvas.",
        //    "Урок 05. Web Storage, Web Workers, Offline App.",
        //    "Урок 06. CSS3. Кроссбраузерные свойства. Flexbox.",
        //    "Урок 07. Web Fonts, стили для текста, колонки, счетчики, генерируемое содержимое.",
        //    "Урок 08. Псевдо-классы и градиенты.",
        //    "Урок 09. Трансформация и переходы.",
        //    "Урок 10. LESS и адаптивный дизайн."
        //];
        //
        this.titleExpandBtnAll = "Раскрыть уроки";
        this.titleCollapseBtnAll = "Свернуть уроки";
        this.titleExpandBtnAllPurpose = "Раскрыть разделы описания цели и назначения уроков";
        this.titleCollapseBtnAllPurpose = "Свернуть разделы описания цели и назначения уроков";
        this.titleExpandBtnAllSummaryTask = "Раскрыть разделы описания резюме уроков";
        this.titleCollapseBtnAllSummaryTask = "Свернуть разделы описания резюме уроков";
        this.titleExpandBtnAllHomeWork = "Раскрыть разделы описания домашнего задания уроков";
        this.titleCollapseBtnAllHomeWork = "Свернуть описания домашнего задания уроков";
        this.titleExpandBtnAllEverything = "Раскрыть все разделы описания уроков";
        this.titleCollapseBtnAllEverything = "Свернуть все разделы описания уроков";
        this.titleExpandCollapseBtnAllEverything = "Раскрыть/Свернуть все разделы описания уроков";
        //
        this.signImgBtnExpand = 0;
        this.signImgBtnCollapse = 1;
        // Init
        this.detailsLessons = lessons;
        for (let item of lessons) {
            if (item.dataset.topic) {
                this.listLessons.push(item.dataset.topic);
            }
        }
        this.btnAll = btnall; this.imgExpandAll = imgexpandAll; this.imgCollapseAll = imgcollapseAll; this.markAll = markall;
        this.btnAllPurpose = btnallPurpose; this.imgExpandAllPurpose = imgexpandAllPurpose; this.imgCollapseAllPurpose = imgcollapseAllPurpose; this.markAllPurpose = markallPurpose;
        this.btnAllSummaryTask = btnallSummaryTask; this.imgExpandAllSummaryTask = imgexpandAllSummaryTask; this.imgCollapseAllSummaryTask = imgcollapseAllSummaryTask; this.markAllSummaryTask = markallSummaryTask;
        this.btnAllHomeWork = btnallHomeWork; this.imgExpandAllHomeWork = imgexpandAllHomeWork; this.imgCollapseAllHomeWork = imgcollapseAllHomeWork; this.markAllHomeWork = markallHomeWork;
        this.btnAllEverything = btnallEverything; this.imgeEpandAllEverything = imgexpandAllEverything; this.imgCollapseAllEverything = imgcollapseAllEverything; this.markallEverything = markallEverything;
        this.detailsLessonsPurpose = lessonsPurpose;
        this.detailsLessonsSummaryTask = lessonsSummaryTask;
        this.detailsLessonsHomeWork = lessonsHomeWork;

        // Setting title for the lesson control button
        this.btnAll.title = this.titleExpandBtnAll;
        this.btnAllPurpose.title = this.titleExpandBtnAllPurpose;
        this.btnAllSummaryTask.title = this.titleExpandBtnAllSummaryTask;
        this.btnAllHomeWork.title = this.titleExpandBtnAllHomeWork;
        this.btnAllEverything.title = this.titleExpandBtnAllEverything;

        this.restoreStateOfDetails();
    }

    defineControl(menager) {
        // Define OnClick event for button "all lessons"
        this.btnAll.onclick = function (e) {
            menager.setAllExpanded(e);
        };
        // Define OnClick event for button "purpose of lessons"
        this.btnAllPurpose.onclick = function (e) {
            menager.setAllPurposeExpanded(e);
        };
        // Define OnClick event for button "summary task of lessons"
        this.btnAllSummaryTask.onclick = function (e) {
            menager.setAllSummaryTaskExpanded(e);
        };
        // Define OnClick event for button "home work of lessons"
        this.btnAllHomeWork.onclick = function (e) {
            menager.setAllHomeWorkExpanded(e);
        };
        // Define OnClick event for button "about Everything about these lessons"
        this.btnAllEverything.onclick = function (e) {
            menager.setAllEverythingExpanded(e);
        };
        // Define OnToggle event for details of lesson 
        for (let i = 0; i < this.detailsLessons.length; i++) {
            this.detailsLessons[i].ontoggle = function (e) {
                sessionStorage.setItem(`${e.target.getAttribute('name')}-${e.target.dataset.lesson}`, `${!e.target.open ? false : true}`);
                menager.setMarkBtnAll(menager.getCountExpanded(menager.detailsLessons), e);
            };
        }
        //Define OnToggle event for details of lesson purpose
        for (let i = 0; i < this.detailsLessonsPurpose.length; i++) {
            this.detailsLessonsPurpose[i].ontoggle = function (e) {
                sessionStorage.setItem(`${e.target.getAttribute('name')}-${e.target.dataset.lesson}`, `${!e.target.open ? false : true}`);
                menager.setMarkBtnAllPurpose(menager.getCountExpanded(menager.detailsLessonsPurpose), e);
            };
        }
        //Define OnToggle event for details of lesson summary task
        for (let i = 0; i < this.detailsLessonsSummaryTask.length; i++) {
            this.detailsLessonsSummaryTask[i].ontoggle = function (e) {
                sessionStorage.setItem(`${e.target.getAttribute('name')}-${e.target.dataset.lesson}`, `${!e.target.open ? false : true}`);
                menager.setMarkBtnAllSummaryTask(menager.getCountExpanded(menager.detailsLessonsSummaryTask), e);
            };
        }
        //Define OnToggle event for details of lesson home work
        for (let i = 0; i < this.detailsLessonsHomeWork.length; i++) {
            this.detailsLessonsHomeWork[i].ontoggle = function (e) {
                sessionStorage.setItem(`${e.target.getAttribute('name')}-${e.target.dataset.lesson}`, `${!e.target.open ? false : true}`);
                menager.setMarkBtnAllHomeWork(menager.getCountExpanded(menager.detailsLessonsHomeWork), e);
            };
        }

    }

    setAllExpanded(e) {
        this.expandAll();
        this.setMarkBtnAll(this.getCountExpanded(this.detailsLessons), e);
    }

    setAllPurposeExpanded(e) {
        this.expandAllPurpose(e);
        this.setMarkBtnAllPurpose(this.getCountExpanded(this.detailsLessonsPurpose), e);
    }

    setAllSummaryTaskExpanded(e) {
        this.expandAllSummaryTask(e);
        this.setMarkBtnAllSummaryTask(this.getCountExpanded(this.detailsLessonsSummaryTask), e);
    }

    setAllHomeWorkExpanded(e) {
        this.expandAllHomeWork(e);
        this.setMarkBtnAllHomeWork(this.getCountExpanded(this.detailsLessonsHomeWork), e);
    }

    setAllEverythingExpanded(e) {
        this.setAllExpanded(e);
        this.setAllPurposeExpanded(e);
        this.setAllSummaryTaskExpanded(e);
        this.setAllHomeWorkExpanded(e);
    }

    expandAll() {
        if (this.isImgDisplayBlock(this.imgExpandAll)) {
            this.setImgBtnAll(this.signImgBtnCollapse,
                this.btnAll,
                this.imgExpandAll,
                this.imgCollapseAll,
                this.titleExpandBtnAll,
                this.titleCollapseBtnAll
            );
            for (let i = 0; i < this.detailsLessons.length; i++) {
                if (!this.detailsLessons[i].open) {
                    this.detailsLessons[i].open = true;
                }
            }
        } else {
            this.setImgBtnAll(this.signImgBtnExpand,
                this.btnAll,
                this.imgExpandAll,
                this.imgCollapseAll,
                this.titleExpandBtnAll,
                this.titleCollapseBtnAll
            );
            for (let i = 0; i < this.detailsLessons.length; i++) {
                if (this.detailsLessons[i].open) {
                    this.detailsLessons[i].open = false;
                }
            }
        }
    }

    setExpandAllAfterExpandInternalDetails(e) {
        for (let i = 0; i < this.detailsLessons.length; i++) {
            if (!this.detailsLessons[i].open) {
                this.detailsLessons[i].open = true;
            }
        }
        this.setMarkBtnAll(this.getCountExpanded(this.detailsLessons), e);
    }

    expandAllPurpose(e) {
        if (this.isImgDisplayBlock(this.imgExpandAllPurpose)) {
            this.setImgBtnAll(this.signImgBtnCollapse,
                this.btnAllPurpose,
                this.imgExpandAllPurpose,
                this.imgCollapseAllPurpose,
                this.titleExpandBtnAllPurpose,
                this.titleCollapseBtnAllPurpose
            );
            for (let i = 0; i < this.detailsLessonsPurpose.length; i++) {
                if (!this.detailsLessonsPurpose[i].open) {
                    this.detailsLessonsPurpose[i].open = true;
                }
            }
            this.setExpandAllAfterExpandInternalDetails(e);
        } else {
            this.setImgBtnAll(this.signImgBtnExpand,
                this.btnAllPurpose,
                this.imgExpandAllPurpose,
                this.imgCollapseAllPurpose,
                this.titleExpandBtnAllPurpose,
                this.titleCollapseBtnAllPurpose
            );
            for (let i = 0; i < this.detailsLessonsPurpose.length; i++) {
                if (this.detailsLessonsPurpose[i].open) {
                    this.detailsLessonsPurpose[i].open = false;
                }
            }
        }
    }

    expandAllSummaryTask(e) {
        if (this.isImgDisplayBlock(this.imgExpandAllSummaryTask)) {
            this.setImgBtnAll(this.signImgBtnCollapse,
                this.btnAllSummaryTask,
                this.imgExpandAllSummaryTask,
                this.imgCollapseAllSummaryTask,
                this.titleExpandBtnAllSummaryTask,
                this.titleCollapseBtnAllSummaryTask
            );
            for (let i = 0; i < this.detailsLessonsSummaryTask.length; i++) {
                if (!this.detailsLessonsSummaryTask[i].open) {
                    this.detailsLessonsSummaryTask[i].open = true;
                }
            }
            this.setExpandAllAfterExpandInternalDetails(e);
        } else {
            this.setImgBtnAll(this.signImgBtnExpand,
                this.btnAllSummaryTask,
                this.imgExpandAllSummaryTask,
                this.imgCollapseAllSummaryTask,
                this.titleExpandBtnAllSummaryTask,
                this.titleCollapseBtnAllSummaryTask
            );
            for (let i = 0; i < this.detailsLessonsSummaryTask.length; i++) {
                if (this.detailsLessonsSummaryTask[i].open) {
                    this.detailsLessonsSummaryTask[i].open = false;
                }
            }
        }
    }

    expandAllHomeWork(e) {
        if (this.isImgDisplayBlock(this.imgExpandAllHomeWork)) {
            this.setImgBtnAll(this.signImgBtnCollapse,
                this.btnAllHomeWork,
                this.imgExpandAllHomeWork,
                this.imgCollapseAllHomeWork,
                this.titleExpandBtnAllHomeWork,
                this.titleCollapseBtnAllHomeWork
            );
            for (let i = 0; i < this.detailsLessonsHomeWork.length; i++) {
                //console.log(this.detailsLessonsHomeWork[i]);
                if (!this.detailsLessonsHomeWork[i].open) {
                    this.detailsLessonsHomeWork[i].open = true;
                }
            }
            this.setExpandAllAfterExpandInternalDetails(e);
        } else {
            this.setImgBtnAll(this.signImgBtnExpand,
                this.btnAllHomeWork,
                this.imgExpandAllHomeWork,
                this.imgCollapseAllHomeWork,
                this.titleExpandBtnAllHomeWork,
                this.titleCollapseBtnAllHomeWork
            );
            for (let i = 0; i < this.detailsLessonsHomeWork.length; i++) {
                if (this.detailsLessonsHomeWork[i].open) {
                    this.detailsLessonsHomeWork[i].open = false;
                }
            }
        }
    }

    setMarkBtnAll(countExpanded, e) {
        if (countExpanded > 0 && countExpanded < this.detailsLessons.length) {
            this.markAll.firstChild.innerHTML = `(${countExpanded})`;
            if (e.type === "toggle") {
                this.markAll.firstChild.title = this.getMarkTitle(this.detailsLessons);
            }
        } else {
            this.markAll.firstChild.innerHTML = "";
            if (countExpanded === this.detailsLessons.length && this.isImgDisplayBlock(this.imgExpandAll)) {
                this.setImgBtnAll(this.signImgBtnCollapse,
                    this.btnAll,
                    this.imgExpandAll,
                    this.imgCollapseAll,
                    this.titleExpandBtnAll,
                    this.titleCollapseBtnAll);
            } else if (countExpanded === 0 && this.isImgDisplayBlock(this.imgCollapseAll)) {
                this.setImgBtnAll(this.signImgBtnExpand,
                    this.btnAll,
                    this.imgExpandAll,
                    this.imgCollapseAll,
                    this.titleExpandBtnAll,
                    this.titleCollapseBtnAll);
            }
        }
    }

    setMarkBtnAllPurpose(countExpanded, e) {
        if (countExpanded > 0 && countExpanded < this.detailsLessonsPurpose.length) {
            this.markAllPurpose.firstChild.innerHTML = `(${countExpanded})`;
            if (e.type === "toggle") {
                this.markAllPurpose.firstChild.title = this.getMarkTitle(this.detailsLessonsPurpose);
            }
        } else {
            this.markAllPurpose.firstChild.innerHTML = "";
            if (countExpanded === this.detailsLessonsPurpose.length && this.isImgDisplayBlock(this.imgExpandAllPurpose)) {
                this.setImgBtnAll(this.signImgBtnCollapse,
                    this.btnAllPurpose,
                    this.imgExpandAllPurpose,
                    this.imgCollapseAllPurpose,
                    this.titleExpandBtnAllPurpose,
                    this.titleCollapseBtnAllPurpose
                );
            } else if (countExpanded === 0 && this.isImgDisplayBlock(this.imgCollapseAllPurpose)) {
                this.setImgBtnAll(this.signImgBtnExpand,
                    this.btnAllPurpose,
                    this.imgExpandAllPurpose,
                    this.imgCollapseAllPurpose,
                    this.titleExpandBtnAllPurpose,
                    this.titleCollapseBtnAllPurpose
                );
            }
        }
    }

    setMarkBtnAllSummaryTask(countExpanded, e) {
        if (countExpanded > 0 && countExpanded < this.detailsLessonsSummaryTask.length) {
            this.markAllSummaryTask.firstChild.innerHTML = `(${countExpanded})`;
            if (e.type === "toggle") {
                this.markAllSummaryTask.firstChild.title = this.getMarkTitle(this.detailsLessonsSummaryTask);
            }
        } else {
            this.markAllSummaryTask.firstChild.innerHTML = "";
            this.markAllSummaryTask.firstChild.title = "";
            if (countExpanded === this.detailsLessonsSummaryTask.length && this.isImgDisplayBlock(this.imgExpandAllSummaryTask)) {
                this.setImgBtnAll(this.signImgBtnCollapse,
                    this.btnAllSummaryTask,
                    this.imgExpandAllSummaryTask,
                    this.imgCollapseAllSummaryTask,
                    this.titleExpandBtnAllSummaryTask,
                    this.titleCollapseBtnAllSummaryTask
                );
            } else if (countExpanded === 0 && this.isImgDisplayBlock(this.imgCollapseAllSummaryTask)) {
                this.setImgBtnAll(this.signImgBtnExpand,
                    this.btnAllSummaryTask,
                    this.imgExpandAllSummaryTask,
                    this.imgCollapseAllSummaryTask,
                    this.titleExpandBtnAllSummaryTask,
                    this.titleCollapseBtnAllSummaryTask
                );
            }
        }
    }

    setMarkBtnAllHomeWork(countExpanded, e) {
        if (countExpanded > 0 && countExpanded < this.detailsLessonsHomeWork.length) {
            this.markAllHomeWork.firstChild.innerHTML = `(${countExpanded})`;
            if (e.type === "toggle") {
                this.markAllHomeWork.firstChild.title = this.getMarkTitle(this.detailsLessonsHomeWork);
            }
        } else {
            this.markAllHomeWork.firstChild.innerHTML = "";
            if (countExpanded === this.detailsLessonsHomeWork.length && this.isImgDisplayBlock(this.imgExpandAllHomeWork)) {
                this.setImgBtnAll(this.signImgBtnCollapse,
                    this.btnAllHomeWork,
                    this.imgExpandAllHomeWork,
                    this.imgCollapseAllHomeWork,
                    this.titleExpandBtnAllHomeWork,
                    this.titleCollapseBtnAllHomeWork
                );
            } else if (countExpanded === 0 && this.isImgDisplayBlock(this.imgCollapseAllHomeWork)) {
                this.setImgBtnAllHomeWork(this.signImgBtnExpand,
                    this.btnAllHomeWork,
                    this.imgExpandAllHomeWork,
                    this.imgCollapseAllHomeWork,
                    this.titleExpandBtnAllHomeWork,
                    this.titleCollapseBtnAllHomeWork
                );
            }
        }
    }

    getCountExpanded(details) {
        let count = 0;
        for (let k = 0; k < details.length; k++) {
            if (details[k].open) {
                count++;
            }
        }
        return count;
    }

    getMarkTitle(details) {
        let title = "";
        for (let i = 0; i < details.length; i++) {
            if (details[i].open) {
                title += i === 0 ? this.listLessons[i] : "\n" + this.listLessons[i];
            }
        }
        return title;
    }

    setImgBtnAll(sign, btn, imgExpand, imgCollapse, titleExpand, titleCollapse) {
        if (sign === this.signImgBtnExpand) {
            imgCollapse.style.display = "none";
            imgExpand.style.display = "block";
            btn.title = titleExpand;
        } else if (sign === this.signImgBtnCollapse) {
            imgCollapse.style.display = "block";
            imgExpand.style.display = "none";
            btn.title = titleCollapse;
        }
    }

    isImgDisplayBlock(btnImg) {
        return btnImg.style.display === "block" || window.getComputedStyle(btnImg, null)["display"] === "block";
    }

    restoreStateOfDetails() {
        let isOpen = false;
        let typeDetails;
        let numberLesson;
        let items;
        for (let i = 0; i < sessionStorage.length; i++) {
            [typeDetails, numberLesson, isOpen] = [sessionStorage.key(i).split('-')[0], sessionStorage.key(i).split('-')[1], sessionStorage[sessionStorage.key(i)] === 'true'];
            switch (typeDetails) {
                case 'lesson': items = this.detailsLessons; break;
                case 'descriptionPurpose': items = this.detailsLessonsPurpose; break;
                case 'summaryTask': items = this.detailsLessonsSummaryTask; break;
                case 'homeWork': items = this.detailsLessonsHomeWork; break;
                default: items = undefined;
            }
            if (isOpen && items !== undefined) {
                for (let item of items) {
                    if (item.dataset.lesson && item.dataset.lesson === numberLesson) {
                        if (!item.open) {
                            item.open = isOpen;
                        }
                        break;
                    }
                }
            }
        }
    }

} // class ControlLessons

const devDesktop = 'Desktop';
const devTablet = 'Tablet';
const devMobile = 'Mobile';
localStorage.setItem('device', `${device.desktop() ? devDesktop : device.tablet() ? devTablet : device.mobile() ? devMobile : false}`);
let manageLessons = new ControlLessons(
    document.getElementsByClassName("details-lesson"),
    document.getElementById("all"), document.getElementById("imgExpandAll"), document.getElementById("imgCollapseAll"), document.getElementById("markAll"),
    document.getElementById("allPurpose"), document.getElementById("imgExpandAllPurpose"), document.getElementById("imgCollapseAllPurpose"), document.getElementById("markAllPurpose"),
    document.getElementById("allSummaryTask"), document.getElementById("imgExpandAllSummaryTask"), document.getElementById("imgCollapseAllSummaryTask"), document.getElementById("markAllSummaryTask"),
    document.getElementById("allHomeWork"), document.getElementById("imgExpandAllHomeWork"), document.getElementById("imgCollapseAllHomeWork"), document.getElementById("markAllHomeWork"),
    document.getElementById("allEverything"), document.getElementById("imgExpandAllEverything"), document.getElementById("imgCollapseAllEverything"), document.getElementById("markAllEverything"),
    document.getElementsByName("descriptionPurpose"),
    document.getElementsByName("summaryTask"),
    document.getElementsByName("homeWork")
);
manageLessons.defineControl(manageLessons);


