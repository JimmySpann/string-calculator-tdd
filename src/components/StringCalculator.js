class StringCalculator {

    // public
    add(input) {
        return this._handleCalculation(input, this._addAction)
    }

    // private
    _addAction(list) {
        return list.reduce((a, b) => Number(a) + Number(b))
    }

    _handleCalculation(input, calcuation) {
        try {
            let list = new Input().getList(input);
            return calcuation(list).toString();
        }
        catch (error) {
            return error;
        }
    }

}

class Input
{
    exceptionHandler

    constructor()
    {
        this.exceptionHandler = new ExceptionHandler();
    }

    // public
    getList(input) {
        const [inputNumbersStr, customSeparator] = this._getCustomSeparatorAndListStr(input)
        this.exceptionHandler.handle(inputNumbersStr, customSeparator)
        const list = this._splitString(inputNumbersStr, customSeparator);
        return list
    }

    // private
    _splitString(input, customSeparator) {
        let result;

        if (customSeparator) {
            result = splitByCustomSeparator();
        }
        else {
            result = splitByDefaultSeparators();
        }

        return result;

        /* #region functions */
        function splitByCustomSeparator() {
            input = input.substring(input.indexOf("\n"));
            return input.split(customSeparator);
        }
        function splitByDefaultSeparators() {
            let result = [];
            let lastSeparator = 0;

            for (let i = 0; i < input.length; i++) {
                if (input[i] === ',' || input[i] === '\n') {
                    result.push(input.substring(lastSeparator, i));
                    lastSeparator = i + 1;
                }
            }
            result.push(input.substring(lastSeparator));

            return result
        }
        /* #endregion */
    }
    _getCustomSeparatorAndListStr(input) {
        let customSeparator = null;
        let inputNumbersStr = input

        if (input[0] === "/" & input[1] === "/") {
            customSeparator = input.substring(2, input.indexOf("\n"))
            inputNumbersStr = input.substring(input.indexOf("\n") + 1)
        }

        return [inputNumbersStr, customSeparator]
    }
}

class ExceptionHandler
{
    inputNumbersStr = ""
    customSeparator = ""
    errorMessage = ""

    // public
    handle(inputNumbersStr, customSeparator) {
        this.inputNumbersStr = inputNumbersStr;
        this.customSeparator = customSeparator;

        let errorMessage = ""
        const exceptions = [this._checkEmptyString, this._checkCommaAtEOF, this._checkCustomSeparatorErrors, this._checkForNegatives]

        exceptions.forEach(exception => {
            exception(inputNumbersStr, customSeparator);
        });

        if (errorMessage)
            throw errorMessage;
    }

    // private
    _checkEmptyString(inputNumbersStr, customSeparator) {
        if (inputNumbersStr === "")
            throw "0"
    }
    
    _checkCommaAtEOF(inputNumbersStr, customSeparator) {
        if (inputNumbersStr[inputNumbersStr.length - 1] === ",")
            throw "Number expected but EOF found"
    }
    
    _checkCustomSeparatorErrors(inputNumbersStr, customSeparator) {
        if (customSeparator) {
            if (inputNumbersStr.includes(','))
                throw `'${customSeparator}' expected but ',' found at position ${inputNumbersStr.indexOf(',')}`
            if (isCustomSeparatorAtEOF())
                throw "Number expected but EOF found"
        }
    
        function isCustomSeparatorAtEOF() {
            if (inputNumbersStr.indexOf(customSeparator, inputNumbersStr.length - customSeparator.length) === -1)
                return false
            else
                return true
        }
    }
    
    _checkForNegatives(inputNumbersStr, customSeparator) {
        const hasNegative = function () {
            return inputNumbersStr.includes("-")
        }
    
        if (hasNegative()) {
            let message = "Negative not allowed : -"
            let nextNegativeIndex = 0
            function hasMoreNegatives() {
                if (inputNumbersStr.indexOf("-", nextNegativeIndex) !== -1)
                    return true
    
                else
                    return false
            }
    
            function getNextNegative() {
                nextNegativeIndex = inputNumbersStr.indexOf("-", nextNegativeIndex) + 1
                const number = inputNumbersStr[nextNegativeIndex]
                return number
            }
    
            let number = getNextNegative()
    
            message += number
            while (hasMoreNegatives()) {
                message += ", -"
                number = getNextNegative()
                message += number
            }
            throw message
        }
    }
}

export default StringCalculator;
