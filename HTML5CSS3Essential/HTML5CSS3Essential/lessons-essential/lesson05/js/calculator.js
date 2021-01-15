//LESSON 5
class Calculator {
    constructor(uiNumber, uiExpression, uiState, uiHistoryTable, uiCurrentMemory, uiMemoryTable, buttonShowMemory) {
        this.states = {
            idle: 0,
            input: 1,
            calc: 2,
            setObjExpression: 3,
            calculation: 4,
            loadHistoty: 5,
            writeHistory: 6
        };
        this.acts = {
            empty: -1,
            signPlus: 0,
            signMinus: 1,
            minus: 2,
            plus: 3,
            increment: 4,
            devide: 5,
            multiply: 6,
            percent: 7,
            squareRoot: 8,
            degreeTwo: 9,
            exponent: 10,
            hyperbola: 11
        };
        this.typesExpression = {
            empty: -1,
            act: 0,
            calculator: 1
        };
        this.kindDigital = {
            digit: 0,
            point: 1
        };
        this.calculationPriorities = {
            unary: 0,      // проценты, квадратный корень, гипербола(1/х), x**2
            extension: 1,  // число в степени y
            multiply: 2,   // умножение и деление
            pm: 3          // плюс минус
        };
        this.memoryActs = {
            clear: 0,
            read: 1,
            plus: 2,
            minus: 3,
            save: 4
        };
        this.emptyItem = {
            typeAct: this.typesExpression.empty,
            act: this.acts.empty,
            value: '',
            unary: this.acts.empty
        };
        this.uiNumber = uiNumber;
        this.uiExpression = uiExpression;
        this.uiState = uiState;
        this.uiHistoryTable = uiHistoryTable;
        this.uiCurrentMemory = uiCurrentMemory;
        this.uiMemoryTable = uiMemoryTable;
        this.buttonShowMemory = buttonShowMemory;
        //
        this.state;
        this.inputValue = '';
        this.expression = '';
        this.memory = this.getEmptyItem();
        this.objExpression = new Array();
        this.accuracy = 3;
        //
        this.setState(this.states.idle);
        this.loadHistory();
    }
    getEmptyItem() {
        return JSON.parse(JSON.stringify(this.emptyItem));
    }
    setState(state) {
        this.state = state;
        this.setUiState();
    }
    getNameState() {
        switch (this.state) {
            case this.states.idle: return 'idle';
            case this.states.input: return 'input';
            case this.states.calc: return 'calc';
            case this.states.setObjExpression: return 'set expression';
            case this.states.loadHistoty: return 'load history';
            case this.states.writeHistory: return 'write history';
            default: return '';
        }
    }
    getNameMemoryAct(act) {
        switch (act) {
            case this.memoryActs.clear: return 'clear';
            case this.memoryActs.minus: return 'minus';
            case this.memoryActs.plus: return 'plus';
            case this.memoryActs.read: return 'read';
            case this.memoryActs.save: return 'save';
            default: return '';
        }
    }
    setUiState() {
        this.uiState.textContent = this.getNameState();
    }
    setUiNumber() {
        if (this.isInputValueNumber() || this.inputValue === '-')
            this.uiNumber.textContent = this.inputValue;
        else this.uiNumber.innerHTML = '&nbsp';
    }
    setUiMemory() {
        if (this.memory.typeAct === this.typesExpression.act) {
            let strCurrentMemory = (this.memory.act === this.acts.signMinus ? '-' : '') + this.memory.value;
            this.uiCurrentMemory.textContent = strCurrentMemory;
            this.buttonShowMemory.title = strCurrentMemory;
        } else {
            this.uiCurrentMemory.textContent = '';
            this.buttonShowMemory.title = '';
        }
    }
    setUiMemoryTable(actMemory, arrFormula) {
        let time = Date.now();
        let hTime = new Date(time).toLocaleTimeString() + new Date(time).toISOString().slice(19, -1);
        let row = document.createElement('div');
        row.className = 'row';
        let cell = document.createElement('div');
        cell.className = 'cell w35prc';
        cell.textContent = hTime;
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w15prc';
        cell.textContent = this.getNameMemoryAct(actMemory);
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell cell-horizontal-left';
        cell.textContent = this.getStringExpression(arrFormula);
        row.appendChild(cell);
        this.uiMemoryTable.insertBefore(row, this.uiMemoryTable.firstChild);
    }
    loadHistory() {
        let typeLocal;
        let hDate;
        let hTime;
        let keys = new Array();
        let oldState = this.state;
        this.setState(this.states.loadHistoty);
        try {
            for (let i = 0; i < localStorage.length; i++) {
                typeLocal = localStorage.key(i).split('#')[0];
                if (typeLocal === 'CALC') {
                    keys.push(localStorage.key(i));
                }
            }
            keys.sort();
            for (let i = 0; i < keys.length; i++) {
                hDate = keys[i].split('#')[1];
                hTime = keys[i].split('#')[2];
                this.addHistoryTable(hDate, hTime, localStorage[keys[i]]);
            }
        } catch (e) {
            console.log(`error load history: ${e.message}`);
        }
        this.setState(oldState);
    }
    addHistoryTable(hDate, hTime, packExpression) {
        let unpuckExpression = packExpression.split('#');
        let formula = JSON.parse(unpuckExpression[0]);
        let result = JSON.parse(unpuckExpression[1]);
        let strFormula = this.getStringExpression(formula);
        let strResult = this.getStringExpression(result);
        let row = document.createElement('div');
        row.className = 'row';
        let cell = document.createElement('div');
        cell.className = 'cell w10prc fsize-0x7rem';
        cell.textContent = hDate;
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell w10prc fsize-0x7rem';
        cell.textContent = hTime;
        row.appendChild(cell);
        cell = document.createElement('div');
        cell.className = 'cell fsize-0x7rem cell-horizontal-left';
        cell.innerHTML = `${strFormula} = ${strResult}`;
        row.appendChild(cell);
        this.uiHistoryTable.insertBefore(row, this.uiHistoryTable.firstChild);
    }
    writeHistory(oldObjExpression) {
        let oldState = this.state;
        this.setState(this.states.loadHistoty);
        // It is executed after the action is equal.
        let hDate = new Date(Date.now()).toLocaleDateString();
        let hTime = new Date(Date.now()).toLocaleTimeString();
        let packExpression = JSON.stringify(oldObjExpression) + '#' + JSON.stringify(this.objExpression);
        try {
            localStorage.setItem(`CALC#${hDate}#${hTime}`, packExpression);
        } catch (e) {
            console.log(e);
            addHistoryTable(hDate, hTime, e.message);
        }
        this.addHistoryTable(hDate, hTime, packExpression);
        this.setState(oldState);
    }

    setObjExpression(value, isNew = false) {
        let oldState = this.state;
        this.setState(this.states.setObjExpression);
        if (isNew) {
            this.objExpression.push(value);
        }
        else if (typeof value === 'string') {
            this.objExpression[this.objExpression.length - 1].value = value;
        } else if (typeof value === 'object') {
            this.objExpression[this.objExpression.length - 1] = JSON.parse(JSON.stringify(value));
        }
        this.setUiExpression();
        this.setState(oldState);
    }
    setUiExpression() {
        let expression = this.getStringExpression(this.objExpression);
        if (expression.length === 0) {
            this.uiExpression.innerHTML = '&nbsp;';
        } else {
            this.uiExpression.innerHTML = expression;
        }
    }
    getStringExpression(arrExpession) {
        let expression = '';
        let baseNumber = 0;
        let baseAct = this.acts.empty;
        for (let i = 0; i < arrExpession.length; i++) {
            if (arrExpession[i].typeAct === this.typesExpression.act) {
                switch (arrExpession[i].act) {
                    case this.acts.signMinus:
                        if (arrExpession[i].unary === this.acts.empty) {
                            expression += '-' + arrExpession[i].value;
                        } else {
                            // Calculate unary operations and show right now
                            let value = this.getNumberItem(JSON.parse(JSON.stringify(arrExpession[i])));
                            switch (arrExpession[i].unary) {
                                case this.acts.degreeTwo:
                                    value = value * value;
                                    expression += value.toFixed(this.accuracy) + `<sub>[-${arrExpession[i].value}^2]</sub>`;
                                    break;
                                case this.acts.hyperbola:
                                    value = 1.0 / value;
                                    expression += value.toFixed(this.accuracy) + `<sub>[1/-${arrExpession[i].value}]</sub>`;
                                    break;
                                case this.acts.percent:
                                    if (arrExpession[i - 2].act === this.acts.signMinus || arrExpession[i - 2].act === this.acts.signPlus) {
                                        baseNumber = this.getNumberItem(JSON.parse(JSON.stringify(arrExpession[i - 2])));
                                        baseAct = arrExpession[i - 1].act;
                                        if (baseAct === this.acts.plus || baseAct === this.acts.minus) {
                                            value = baseNumber / 100.0 * value;
                                        } else if (baseAct === this.acts.devide || baseAct === this.acts.multiply) {
                                            value = value / 100.0;
                                        }
                                        expression += value.toFixed(this.accuracy) + `<sub>[%(-${arrExpession[i].value})]</sub>`;
                                    }
                                    break;
                                default: break;
                            }
                        }
                        break;
                    case this.acts.signPlus:
                        if (arrExpession[i].unary === this.acts.empty) {
                            expression += arrExpession[i].value;
                        } else {
                            // Calculate unary operations and show right now
                            let value = this.getNumberItem(JSON.parse(JSON.stringify(arrExpession[i])));
                            switch (arrExpession[i].unary) {
                                case this.acts.degreeTwo:
                                    value = value * value;
                                    expression += value.toFixed(this.accuracy) + `<sub>[${arrExpession[i].value}^2]</sub>`;
                                    break;
                                case this.acts.hyperbola:
                                    value = 1.0 / value;
                                    expression += value.toFixed(this.accuracy) + `<sub>[1/${arrExpession[i].value}]</sub>`;
                                    break;
                                case this.acts.percent:
                                    if (arrExpession[i - 2].act === this.acts.signMinus || arrExpession[i - 2].act === this.acts.signPlus) {
                                        baseNumber = this.getNumberItem(JSON.parse(JSON.stringify(arrExpession[i - 2])));
                                        baseAct = arrExpession[i - 1].act;
                                        if (baseAct === this.acts.plus || baseAct === this.acts.minus) {
                                            value = baseNumber / 100.0 * value;
                                        } else if (baseAct === this.acts.devide || baseAct === this.acts.multiply) {
                                            value = value / 100.0;
                                        }
                                        expression += value.toFixed(this.accuracy) + `<sub>[%${arrExpession[i].value}]</sub>`;
                                    }
                                    break;
                                case this.acts.squareRoot:
                                    value = Math.sqrt(value);
                                    expression += value.toFixed(this.accuracy) + `<sub>[√${arrExpession[i].value}]</sub>`;
                                    break;
                                default: break;
                            }
                        }
                        break;
                    case this.acts.plus: expression += ' + '; break;
                    case this.acts.minus: expression += ' - '; break;
                    case this.acts.multiply: expression += ' * '; break;
                    case this.acts.devide: expression += ' / '; break;
                    case this.acts.exponent: expression += ' ^ '; break;
                    default: break;
                }
            }
        }
        return expression;
    }
    getKindDigital(digit) {
        if (typeof digit === 'number' || typeof digit === 'object' && digit.constructor === Number) {
            return this.kindDigital.digit;
        } else if (digit === '.') {
            return this.kindDigital.point;
        } else return -1;
    }
    isInputValueDecimal() {
        return this.inputValue.indexOf('.') >= 0 ? true : false;
    }
    isInputValueNumber() {
        return !isNaN(this.inputValue) && !isNaN(parseFloat(this.inputValue));
    }
    isNumber(val) {
        return !isNaN(val) && !isNaN(parseFloat(val));
    }
    isSwitchToIdle() {
        if (!this.isInputValueNumber() && this.objExpression.length === 0)
            return true;
        else return false;
    }
    isCurrentExpressionNumber() {
        return (this.getCurrentExpression().act === this.acts.signPlus || this.getCurrentExpression().act === this.acts.signMinus) &&
            this.isNumber(this.getCurrentExpression().value);
    }
    getCurrentExpression() {
        if (this.objExpression.length > 0) {
            return this.objExpression[this.objExpression.length - 1];
        } else {
            console.log('error 001: object expression is empty');
            return this.emptyItem;
        }
    }
    changeSign() {
        if (this.getCurrentExpression().act === this.acts.signPlus) {
            this.inputValue = this.inputValue.startsWith('-') ? this.inputValue.slice(1) : this.inputValue;
        } else {
            this.inputValue = this.inputValue.startsWith('-') ? this.inputValue : '-' + this.inputValue;
        }
        this.setUiNumber();
        this.setUiExpression();
    }
    addInputValue(digit) {
        if (this.getKindDigital(digit) === this.kindDigital.digit) {
            this.inputValue += digit.toString();
        } else if (this.getKindDigital(digit) === this.kindDigital.point && !this.isInputValueDecimal()) {
            this.inputValue += digit;
        }
        this.setUiNumber();
    }
    getNumber(pos) {
        return parseFloat((this.objExpression[pos].act === this.acts.signMinus ? '-' : '') + this.objExpression[pos].value);
    }
    getNumberItem(item) {
        return parseFloat((item.act === this.acts.signMinus ? '-' : '') + item.value);
    }
    calculation(priority) {
        if (this.objExpression.length > 1) {
            let firstPos = 0;
            let secondPos = 0;
            let value = 0;
            let firstNumber = 0;
            let baseAct = this.acts.empty;
            let secondNumber = 0;
            let isPriority = false;
            for (let i = 0; i < this.objExpression.length; i++) {
                if (priority === this.calculationPriorities.unary) {
                    if (this.objExpression[i].unary !== this.acts.empty) {
                        value = this.getNumber(i);
                        switch (this.objExpression[i].unary) {
                            case this.acts.degreeTwo:
                                value = value * value;
                                break;
                            case this.acts.hyperbola:
                                value = 1.0 / value;
                                break;
                            case this.acts.percent:
                                if (this.objExpression[i - 2].act === this.acts.signMinus || this.objExpression[i - 2].act === this.acts.signPlus) {
                                    firstNumber = this.getNumber(i - 2);
                                    baseAct = this.objExpression[i - 1].act;
                                    if (baseAct === this.acts.plus || baseAct === this.acts.minus) {
                                        value = firstNumber / 100.0 * value;
                                    } else if (baseAct === this.acts.devide || baseAct === this.acts.multiply) {
                                        value = value / 100.0;
                                    }
                                }
                                break;
                            case this.acts.squareRoot:
                                value = Math.sqrt(value);
                                break;
                            default: break;
                        }
                        this.objExpression[i].unary = this.acts.empty;
                        this.objExpression[i].act = value < 0 ? this.acts.signMinus : this.acts.signPlus;
                        this.objExpression[i].value = Math.abs(value).toFixed(this.accuracy);
                        isPriority = true;
                        break;
                    }
                } else if (priority === this.calculationPriorities.extension) {
                    if (this.objExpression[i].act === this.acts.exponent) {
                        firstPos = i - 1;
                        secondPos = i + 1;
                        firstNumber = this.getNumber(firstPos);
                        secondNumber = this.getNumber(secondPos);
                        value = Math.pow(firstNumber, secondNumber);
                        this.objExpression[firstPos].act = value < 0 ? this.acts.signMinus : this.acts.signPlus;
                        this.objExpression[firstPos].value = Math.abs(value).toFixed(this.accuracy);
                        this.objExpression.splice(i, 2);
                        isPriority = true;
                        break;
                    }
                } else if (priority === this.calculationPriorities.multiply) {
                    if (this.objExpression[i].act === this.acts.devide || this.objExpression[i].act === this.acts.multiply) {
                        firstPos = i - 1;
                        secondPos = i + 1;
                        firstNumber = this.getNumber(firstPos);
                        secondNumber = this.getNumber(secondPos);
                        switch (this.objExpression[i].act) {
                            case this.acts.devide:
                                value = firstNumber / secondNumber; break;
                            case this.acts.multiply:
                                value = firstNumber * secondNumber; break;
                            default: console.log('error: trying to calculate wrong action');
                        }
                        this.objExpression[firstPos].act = value < 0 ? this.acts.signMinus : this.acts.signPlus;
                        this.objExpression[firstPos].value = Math.abs(value).toFixed(this.accuracy);
                        this.objExpression.splice(i, 2);
                        isPriority = true;
                        break;
                    }
                } else if (priority === this.calculationPriorities.pm) {
                    if (this.objExpression[i].act === this.acts.minus || this.objExpression[i].act === this.acts.plus) {
                        firstPos = i - 1;
                        secondPos = i + 1;
                        firstNumber = this.getNumber(firstPos);
                        secondNumber = this.getNumber(secondPos);
                        switch (this.objExpression[i].act) {
                            case this.acts.plus:
                                value = firstNumber + secondNumber; break;
                            case this.acts.minus:
                                value = firstNumber - secondNumber; break;
                            default: console.log('error: trying to calculate wrong action');
                        }
                        this.objExpression[firstPos].act = value < 0 ? this.acts.signMinus : this.acts.signPlus;
                        this.objExpression[firstPos].value = Math.abs(value).toFixed(this.accuracy);
                        this.objExpression.splice(i, 2);
                        isPriority = true;
                        break;
                    }
                }
            }
            if (!isPriority) priority++;
            this.calculation(priority);
        }
    }
    memoryCalculation(formula) {
        if (formula.length === 3) {
            let value = 0;
            let firstNumber = 0;
            let secondNumber = 0;
            firstNumber = this.getNumberItem(formula[0]);
            secondNumber = this.getNumberItem(formula[2]);
            switch (formula[1].act) {
                case this.acts.plus:
                    value = firstNumber + secondNumber; break;
                case this.acts.minus:
                    value = firstNumber - secondNumber; break;
                default: console.log('error: trying to memory calculate wrong action');
            }
            this.memory.typeAct = this.typesExpression.act;
            this.memory.act = value < 0 ? this.acts.signMinus : this.acts.signPlus;
            this.memory.value = Math.abs(value).toFixed(this.accuracy);
        }
    }
    // Actions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    setInputValue(digit) {
        if (this.state === this.states.idle) {
            // This means a new expression or number
            this.setState(this.states.input);
            this.addInputValue(digit);
            this.setObjExpression(
                {
                    typeAct: this.typesExpression.act,
                    act: this.acts.signPlus,
                    value: this.inputValue,
                    unary: this.acts.empty
                },
                true // isNew
            );
        } else if (this.state === this.states.input) {
            this.addInputValue(digit);
            // В формуле чило всегда положительное, а знак определяется типом действия acts.signMinus или acts.signPlus
            this.setObjExpression(this.getCurrentExpression().act === this.acts.signMinus && this.inputValue.startsWith('-') ? this.inputValue.slice(1) : this.inputValue);
        }
    }
    clear() {
        if (this.getCurrentExpression().typeAct === this.typesExpression.empty) return;
        this.inputValue = '';
        this.objExpression = new Array();
        this.setUiNumber();
        this.setUiExpression();
        if (this.isSwitchToIdle()) this.setState(this.states.idle);
    }
    clearEssential() {
        if (this.getCurrentExpression().typeAct === this.typesExpression.empty) return;
        // Check unary operation
        if (this.state === this.states.input
            && (this.getCurrentExpression().act === this.acts.signMinus || this.getCurrentExpression().act === this.acts.signPlus)
            && this.getCurrentExpression().unary !== this.acts.empty) {
            this.getCurrentExpression().unary = this.acts.empty;
        } else {
            this.inputValue = '';
            this.objExpression.pop();
            if (this.getCurrentExpression().act === this.acts.signMinus || this.getCurrentExpression().act === this.acts.signPlus) {
                // Restore actual input value
                this.inputValue = this.getCurrentExpression().value;
                this.setState(this.states.input);
            }
        }
        this.setUiNumber();
        this.setUiExpression();
        if (this.isSwitchToIdle()) this.setState(this.states.idle);
    }
    backspace() {
        if (this.state !== this.states.input) return;
        if (this.isInputValueNumber()) {
            this.inputValue = this.inputValue.slice(0, -1);
            this.setUiNumber();
            this.setObjExpression(this.getCurrentExpression().value.slice(0, -1));
            if (this.isSwitchToIdle()) this.setState(this.states.idle);
        }
    }
    sign() {
        if (this.state === this.states.idle) {
            // This means a new expression or number
            this.setState(this.states.input);
            this.setObjExpression(
                {
                    typeAct: this.typesExpression.act,
                    act: this.acts.signMinus,
                    value: '',
                    unary: this.acts.empty
                },
                true // isNew
            );
            this.changeSign();
        } else if (this.state === this.states.input) {
            let sign = -1;
            if (this.getCurrentExpression().act === this.acts.signPlus) {
                sign = this.acts.signMinus;
            } else if (this.getCurrentExpression().act === this.acts.signMinus) {
                sign = this.acts.signPlus;
            }
            if (sign === this.acts.signPlus || sign === this.acts.signMinus) {
                this.getCurrentExpression().act = sign;
                this.changeSign();
            }
        }
    }
    arithmeticOperation(act) {
        if ((this.getCurrentExpression().act === this.acts.signMinus || this.getCurrentExpression().act === this.acts.signPlus) && this.isInputValueNumber()) {
            this.setObjExpression(
                {
                    typeAct: this.typesExpression.act,
                    act: act,
                    value: '',
                    unary: this.acts.empty
                },
                true
            );
            this.inputValue = '';
            this.setUiNumber();
            this.setState(this.states.idle);
        }
    }
    unaryOperation(act) {
        if (this.state === this.states.input
            && (this.getCurrentExpression().act === this.acts.signMinus || this.getCurrentExpression().act === this.acts.signPlus)
            && this.isInputValueNumber()) {
            // Checking invalid states
            if (this.getCurrentExpression().act === this.acts.signMinus && act === this.acts.squareRoot) return;
            let pos = this.objExpression.length - 1;
            if ((act === this.acts.percent && this.objExpression.length < 3) ||
                (act === this.acts.percent && this.objExpression.length >= 3
                    && !(
                        this.objExpression[pos - 1].act === this.acts.devide
                        || this.objExpression[pos - 1].act === this.acts.multiply
                        || this.objExpression[pos - 1].act === this.acts.plus
                        || this.objExpression[pos - 1].act === this.acts.minus
                    )
                )
            ) return;
            // Action fixation
            this.getCurrentExpression().unary = act;
            this.setUiExpression();
        }
    }
    countUp() {
        if (this.objExpression.length < 3 || !this.isCurrentExpressionNumber()) return;
        let oldObjExpression = JSON.parse(JSON.stringify(this.objExpression));
        this.setState(this.states.calculation);
        let priority = this.calculationPriorities.unary;
        this.calculation(priority);
        this.inputValue = (this.getCurrentExpression().act === this.acts.signMinus ? '-' : '') + this.getCurrentExpression().value;
        this.setUiNumber();
        this.setUiExpression();
        this.setState(this.states.writeHistory);
        this.writeHistory(oldObjExpression);
        this.setState(this.states.input);
    }
    memoryClear() {
        if (this.memory.typeAct === this.typesExpression.act) {
            this.memory = this.getEmptyItem();
            this.setUiMemory();
            this.setUiMemoryTable(this.memoryActs.clear, new Array());
        }
    }
    memoryRead() {
        if (this.memory.typeAct === this.typesExpression.act && this.memory.value !== '0') {
            if (this.state === this.states.idle) {
                // This means a new expression or number
                this.setState(this.states.input);
                this.inputValue = this.memory.value;
                this.setObjExpression(
                    JSON.parse(JSON.stringify(this.memory)),
                    true // isNew
                );
            } else if (this.state === this.states.input) {
                this.inputValue = this.memory.value;
                this.setObjExpression(JSON.parse(JSON.stringify(this.memory)));
            }
            this.setUiNumber();
        }
    }
    memorySave() {
        if (this.getCurrentExpression().typeAct === this.typesExpression.empty || !this.isInputValueNumber()) return;
        this.memory = JSON.parse(JSON.stringify(this.getCurrentExpression()));
        let formula = new Array();
        formula.push(this.memory);
        this.setUiMemory();
        this.setUiMemoryTable(this.memoryActs.save, formula);
    }
    memoryPlus() {
        if (this.getCurrentExpression().typeAct === this.typesExpression.empty || !this.isInputValueNumber()) return;
        let formula = new Array();
        let currentMemory = JSON.parse(JSON.stringify(this.memory));
        if (currentMemory.typeAct === this.typesExpression.empty) {
            currentMemory.typeAct = this.typesExpression.act;
            currentMemory.act = this.acts.signPlus;
            currentMemory.value = '0';
            this.memory = JSON.parse(JSON.stringify(currentMemory));
        }
        formula.push(currentMemory);
        formula.push({
            typeAct: this.typesExpression.act,
            act: this.acts.plus,
            value: ''
        });
        formula.push(this.getCurrentExpression());
        this.memoryCalculation(formula);
        this.setUiMemory();
        this.setUiMemoryTable(this.memoryActs.plus, formula);
    }
    memoryMinus() {
        if (this.getCurrentExpression().typeAct === this.typesExpression.empty || !this.isInputValueNumber()) return;
        let formula = new Array();
        let currentMemory = JSON.parse(JSON.stringify(this.memory));
        if (currentMemory.typeAct === this.typesExpression.empty) {
            currentMemory.typeAct = this.typesExpression.act;
            currentMemory.act = this.acts.signPlus;
            currentMemory.value = '0';
            this.memory = JSON.parse(JSON.stringify(currentMemory));
        }
        formula.push(currentMemory);
        formula.push({
            typeAct: this.typesExpression.act,
            act: this.acts.minus,
            value: ''
        });
        formula.push(this.getCurrentExpression());
        this.memoryCalculation(formula);
        this.setUiMemory();
        this.setUiMemoryTable(this.memoryActs.plus, formula);
    }
    increment() {
        if (this.state === this.states.idle) {
            // This means a new expression or number
            this.setInputValue(1);
        } else if (this.state === this.states.input) {
            if (this.isCurrentExpressionNumber()) {
                let value = this.getNumberItem(this.getCurrentExpression()) + 1;
                this.getCurrentExpression().act = value < 0 ? this.acts.signMinus : this.acts.signPlus;
                this.getCurrentExpression().value = Math.abs(value).toFixed(this.accuracy);
                this.inputValue = (this.getCurrentExpression().act === this.acts.signMinus ? '-' : '') + this.getCurrentExpression().value;
            } else if ((this.getCurrentExpression().act === this.acts.signPlus || this.getCurrentExpression().act === this.acts.signMinus) &&
                !this.isNumber(this.getCurrentExpression().value)) {
                // it means that the value equals zero.
                this.getCurrentExpression().act = this.acts.signPlus;
                this.getCurrentExpression().value = '1';
            }
            this.setUiNumber();
            this.setUiExpression();
        }
    }
}

// Helpers <==============================================================================================================
let $ = (id) => document.getElementById(id);
function isDisplayBlock(element) {
    return element.style.display === "block" || window.getComputedStyle(element, null)["display"] === "block";
}
function showAppCacheMessage(message) {
    $('cacheMessage').textContent = `${new Date(Date.now()).toLocaleTimeString()} ${message}`;
}
function writeLog(message) {
    let row = document.createElement('div');
    row.className = 'row';
    let cell = document.createElement('div');
    cell.className = 'cell w10prc fsize-0x7rem';
    cell.textContent = new Date(Date.now()).toLocaleDateString();
    row.appendChild(cell);
    cell = document.createElement('div');
    cell.className = 'cell w10prc fsize-0x7rem';
    cell.textContent = new Date(Date.now()).toLocaleTimeString();
    row.appendChild(cell);
    cell = document.createElement('div');
    cell.className = 'cell fsize-0x7rem cell-horizontal-left';
    cell.textContent = `${message}`;
    row.appendChild(cell);
    $('logTable').insertBefore(row, $('logTable').firstChild);
    showLogPanel();
}
function onAppCache(message) {
    showAppCacheMessage(`${message}, ${getNameAppCacheStatus()}`);
    writeLog(`${message}, ${getNameAppCacheStatus()}`);
}
function getNameAppCacheStatus() {
    let names = ["Не кэшировано", "Бездействующий", "Проверка", "Загрузка", "Готовый к обновлению", "Кэш устарел"];
    return names[window.applicationCache.status];
}
function init() {
    const isSupportMsg = 'Автономные приложения поддерживаются данным браузером.';
    const notSupportMsg = 'Автономные приложения не поддерживаются данным браузером.';
    // Проверка поддержки в браузере.
    if (window.applicationCache) {
        showAppCacheMessage(isSupportMsg);
        $('manageAppCache').classList.add('b-color-palegreen');
        writeLog(isSupportMsg);
    }
    else {
        showAppCacheMessage(notSupportMsg);
        $('manageAppCache').classList.add('b-color-monza');
        writeLog(notSupportMsg);
        return;
    }

    window.applicationCache.addEventListener('checking', () => { onAppCache('Проверка обновлений.'); }, false);
    window.applicationCache.addEventListener('noupdate', () => { onAppCache('Обновления не найдены.'); }, false);
    window.applicationCache.addEventListener('obsolete', () => { onAppCache('Данные приложения устарели.'); }, false);
    window.applicationCache.addEventListener('cached', () => { onAppCache('Данные помещены в кэш.'); }, false);
    window.applicationCache.addEventListener('updateready', () => {
        window. applicationCache.swapCache();
        onAppCache('Доступна новая версия приложения.');
    }, false);
    window.applicationCache.addEventListener('error', (e) => {
        console.log('error', e);
        if (e.reason !== 'manifest') {
            showAppCacheMessage(e.message);
        }
        writeLog(e.message);
    }, false);
}
function showLogPanel(isAuto = true) {
    if (!isDisplayBlock($('logPanel'))) {
        let coords = $('appIsWorking').getBoundingClientRect();
        $('logPanel').style.left = coords.left + "px";
        $('logPanel').style.top = coords.bottom + 10 + "px";
        $('logPanel').style.display = 'block';
        $('logPanel').style.opacity = 1;
        if (isAuto) {
            setTimeout(() => { hideLogPanel(); }, 7000);
        }
    }
}
function hideLogPanel() {
    $('logPanel').style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock($('logPanel'))) $('logPanel').style.display = 'none';
    }, 450);
}
function showHistoryPanel() {
    if (!isDisplayBlock($('historyPanel'))) {
        let coords = $('logo').getBoundingClientRect();
        $('historyPanel').style.left = coords.left + 10 + "px";
        $('historyPanel').style.top = coords.bottom + 20 + "px";
        $('historyPanel').style.display = 'block';
        $('historyPanel').style.opacity = 1;
    }
}
function hideHistoryPanel() {
    $('historyPanel').style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock($('historyPanel'))) $('historyPanel').style.display = 'none';
    }, 450);
}
function showMemoryPanel() {
    if (!isDisplayBlock($('memoryPanel'))) {
        let coordsClear = $('memoryClear').getBoundingClientRect();
        let coordsShow = $('memoryShow').getBoundingClientRect();
        $('memoryPanel').style.left = coordsClear.left + Math.floor((coordsShow.left - coordsClear.left) / 2) + "px";
        $('memoryPanel').style.top = coordsClear.bottom + 14 + "px";
        $('memoryPanel').style.display = 'block';
        $('memoryPanel').style.opacity = 1;
    }
}
function hideMemoryPanel() {
    $('memoryPanel').style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock($('memoryPanel'))) $('memoryPanel').style.display = 'none';
    }, 450);
}
function showHelpPanel() {
    if (!isDisplayBlock($('helpPanel'))) {
        let coords = $('logo').getBoundingClientRect();
        $('helpPanel').style.left = coords.left + 10 + "px";
        $('helpPanel').style.top = coords.bottom + 20 + "px";
        $('helpPanel').style.display = 'block';
        $('helpPanel').style.opacity = 1;
    }
}
function hideHelpPanel() {
    $('helpPanel').style.opacity = 0;
    setTimeout(() => {
        if (isDisplayBlock($('helpPanel'))) $('helpPanel').style.display = 'none';
    }, 450);
}
function onKeyPress(e) {
    if (e.charCode === 0) {
        switch (e.keyCode) {
            case 8: imitationClick(getButton('Clear', 'Backspace')); break;
            case 27:
                if (isDisplayBlock($('logPanel'))) hideLogPanel();
                if (isDisplayBlock($('historyPanel'))) hideHistoryPanel();
                if (isDisplayBlock($('helpPanel'))) hideHelpPanel();
                if (isDisplayBlock($('memoryPanel'))) hideMemoryPanel();
                break;
            default: break;
        }
    } else {
        //writeLog(`${String.fromCharCode(e.charCode)} ${e.charCode}`);
        if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
            switch (String.fromCharCode(e.charCode)) {
                case '1': imitationClick(getButton('Digit', 'One')); break;
                case '2': imitationClick(getButton('Digit', 'Two')); break;
                case '3': imitationClick(getButton('Digit', 'Three')); break;
                case '4': imitationClick(getButton('Digit', 'Four')); break;
                case '5': imitationClick(getButton('Digit', 'Five')); break;
                case '6': imitationClick(getButton('Digit', 'Six')); break;
                case '7': imitationClick(getButton('Digit', 'Seven')); break;
                case '8': imitationClick(getButton('Digit', 'Eight')); break;
                case '9': imitationClick(getButton('Digit', 'Nine')); break;
                case '0': imitationClick(getButton('Digit', 'Zero')); break;
                case '.': imitationClick(getButton('Digit', 'Point')); break;
                case '/': imitationClick(getButton('Oper', 'Division')); break;
                case '*': imitationClick(getButton('Oper', 'Multiplication')); break;
                case '-': imitationClick(getButton('Oper', 'Minus')); break;
                case '+': imitationClick(getButton('Oper', 'Plus')); break;
                case '=': imitationClick(getButton('Equal')); break;
                default:
                    switch (e.charCode) {
                        case 104: imitationClick(getButton('History')); break;              /* h */
                        case 13: imitationClick(getButton('Equal')); break;                 /* Enter */
                        case 109: imitationClick(getButton('Memory', 'Panel')); break;      /* m */
                        case 114: imitationClick(getButton('Memory', 'Read')); break;       /* r */
                        case 115: imitationClick(getButton('Memory', 'Save')); break;       /* s */
                        case 105: imitationClick(getButton('ExtOper', 'Increment')); break; /* i */
                        case 121: imitationClick(getButton('ExtOper', 'Exponent')); break;  /* y */
                        case 101: imitationClick(getButton('Clear', 'Essensial')); break;   /* e */
                        case 99: imitationClick(getButton('Clear', 'Full')); break;         /* c */
                        default: break;
                    }
                    break;
            }
        } else if (e.shiftKey && !e.ctrlKey && !e.altKey) {
            switch (String.fromCharCode(e.charCode)) {
                case 'H': imitationClick(getButton('History')); break;
                case 'M': imitationClick(getButton('Memory', 'Panel')); break;
                case 'R': imitationClick(getButton('Memory', 'Read')); break;
                case 'S': imitationClick(getButton('Memory', 'Save')); break;
                case '+': imitationClick(getButton('ExtOper', 'Increment')); break;
                case 'I': imitationClick(getButton('ExtOper', 'Increment')); break;
                case 'Y': imitationClick(getButton('ExtOper', 'Exponent')); break;
                case '?': imitationClick(getButton('Help')); break;
                case 'E': imitationClick(getButton('Clear', 'Essensial')); break;
                case 'C': imitationClick(getButton('Clear', 'Full')); break;
                default: break;
            }
        }
    }
}
function getButton(type, act = null) {
    let buttons = document.getElementsByName('Button');
    let button;
    for (let item of buttons) {
        if (item.dataset.type === type && act === null || item.dataset.type === type && item.dataset.act === act) button = item;
    }
    return button;
}
function imitationClick(button) {
    imitationButtonActive(button);
    button.click();
}
function imitationButtonActive(button) {
    button.classList.toggle('btn-active');
    setTimeout(() => { button.classList.toggle('btn-active'); }, 100);
}
function showAccuracy(value) {
    $('accuracy').textContent = value;
}

// Init
let calc = new Calculator($('number'), $('expression'), $('state'), $('historyTable'), $('currentMemory'), $('memoryTable'), getButton('Memory', 'Panel'));
showAccuracy($('rangeAccuracy').value);
calc.accuracy = Number($('rangeAccuracy').value);

// Define manage <==================================================================================================================
window.addEventListener("load", init, false);
$('logPanel').addEventListener('mouseleave', () => {
    hideLogPanel();
}, false);
window.addEventListener('scroll', () => {
    hideLogPanel();
    hideHistoryPanel();
    hideMemoryPanel();
    hideHelpPanel();
}, false);
window.addEventListener('resize', () => {
    hideLogPanel();
    hideHistoryPanel();
    hideMemoryPanel();
    hideHelpPanel();
}, false);
$('appIsWorking').addEventListener('click', () => {
    if (isDisplayBlock($('logPanel'))) {
        hideLogPanel();
    } else {
        showLogPanel(false);
    }
}, false);
$('refresh').addEventListener('click', () => {
    try {
        window.applicationCache.update();
    } catch (e) {
        window.applicationCache.onerror();
    }
}, false);
$('status').addEventListener('click', () => {
    showAppCacheMessage(`${getNameAppCacheStatus()}`);
    writeLog(`${getNameAppCacheStatus()}`);
}, false);

// Calculator
$('rangeAccuracy').addEventListener('change', () => {
    showAccuracy($('rangeAccuracy').value);
    calc.accuracy = Number($('rangeAccuracy').value);
}, false);
$('rangeAccuracy').addEventListener('input', () => {
    showAccuracy($('rangeAccuracy').value);
    calc.accuracy = Number($('rangeAccuracy').value);
}, false);
$('historyPanel').addEventListener('mouseleave', () => {
    hideHistoryPanel();
}, false);
getButton('History').addEventListener('click', () => {
    if (isDisplayBlock($('historyPanel'))) {
        hideHistoryPanel();
    } else {
        showHistoryPanel();
    }
}, false);
$('body').addEventListener('keypress', (e) => { onKeyPress(e); }, false);
$('body').addEventListener('keydown', (e) => { onKeyPress(e); }, false);
getButton('Help').addEventListener('click', () => {
    if (isDisplayBlock($('helpPanel'))) {
        hideHelpPanel();
    } else {
        showHelpPanel();
    }
}, false);
$('helpPanel').addEventListener('mouseleave', () => {
    hideHelpPanel();
}, false);
getButton('Memory', 'Clear').addEventListener('click', (e) => {
    calc.memoryClear();
}, false);
getButton('Memory', 'Read').addEventListener('click', (e) => {
    calc.memoryRead();
}, false);
getButton('Memory', 'Plus').addEventListener('click', (e) => {
    calc.memoryPlus();
}, false);
getButton('Memory', 'Minus').addEventListener('click', (e) => {
    calc.memoryMinus();
}, false);
getButton('Memory', 'Save').addEventListener('click', (e) => {
    calc.memorySave();
}, false);
getButton('Memory', 'Panel').addEventListener('click', (e) => {
    if (isDisplayBlock($('memoryPanel'))) {
        hideMemoryPanel();
    } else {
        showMemoryPanel();
    }
}, false);
$('memoryPanel').addEventListener('mouseleave', () => {
    hideMemoryPanel();
}, false);
getButton('ExtOper', 'Percent').addEventListener('click', (e) => {
    calc.unaryOperation(calc.acts.percent);
}, false);
getButton('ExtOper', 'Square-root').addEventListener('click', (e) => {
    calc.unaryOperation(calc.acts.squareRoot);
}, false);
getButton('ExtOper', 'Degree-two').addEventListener('click', (e) => {
    calc.unaryOperation(calc.acts.degreeTwo);
}, false);
getButton('ExtOper', 'Exponent').addEventListener('click', (e) => {
    calc.arithmeticOperation(calc.acts.exponent);
}, false);
getButton('ExtOper', 'Hyperbola').addEventListener('click', (e) => {
    calc.unaryOperation(calc.acts.hyperbola);
}, false);
getButton('ExtOper', 'Increment').addEventListener('click', (e) => {
    calc.increment();
}, false);
getButton('Digit', 'One').addEventListener('click', (e) => {
    calc.setInputValue(1);
}, false);
getButton('Digit', 'Two').addEventListener('click', (e) => {
    calc.setInputValue(2);
}, false);
getButton('Digit', 'Three').addEventListener('click', (e) => {
    calc.setInputValue(3);
}, false);
getButton('Digit', 'Four').addEventListener('click', (e) => {
    calc.setInputValue(4);
}, false);
getButton('Digit', 'Five').addEventListener('click', (e) => {
    calc.setInputValue(5);
}, false);
getButton('Digit', 'Six').addEventListener('click', (e) => {
    calc.setInputValue(6);
}, false);
getButton('Digit', 'Seven').addEventListener('click', (e) => {
    calc.setInputValue(7);
}, false);
getButton('Digit', 'Eight').addEventListener('click', (e) => {
    calc.setInputValue(8);
}, false);
getButton('Digit', 'Nine').addEventListener('click', (e) => {
    calc.setInputValue(9);
}, false);
getButton('Digit', 'Zero').addEventListener('click', (e) => {
    calc.setInputValue(0);
}, false);
getButton('Oper', 'Sign').addEventListener('click', (e) => {
    calc.sign();
}, false);
getButton('Digit', 'Point').addEventListener('click', (e) => {
    calc.setInputValue('.');
}, false);
getButton('Oper', 'Division').addEventListener('click', (e) => {
    calc.arithmeticOperation(calc.acts.devide);
}, false);
getButton('Oper', 'Multiplication').addEventListener('click', (e) => {
    calc.arithmeticOperation(calc.acts.multiply);
}, false);
getButton('Oper', 'Minus').addEventListener('click', (e) => {
    calc.arithmeticOperation(calc.acts.minus);
}, false);
getButton('Oper', 'Plus').addEventListener('click', (e) => {
    calc.arithmeticOperation(calc.acts.plus);
}, false);
getButton('Equal').addEventListener('click', (e) => {
    calc.countUp();
}, false);
getButton('Clear', 'Essensial').addEventListener('click', (e) => {
    calc.clearEssential();
}, false);
getButton('Clear', 'Full').addEventListener('click', (e) => {
    calc.clear();
}, false);
getButton('Clear', 'Backspace').addEventListener('click', (e) => {
    calc.backspace();
}, false);