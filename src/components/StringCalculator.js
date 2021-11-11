class StringCalculator {


    add(input) {
        const add = function (list) {
            return list.reduce((a, b) => Number(a) + Number(b))
        }
        return this.handleCalculation(input, add)
    }

    handleCalculation(input, calcuation) {
        try {
            this.handleExceptions(input)
            const list = this.convertInputToList(input);
            const result = calcuation(list);
            return result.toString();
        }
        catch (error) {
            return error;
        }
    }
    handleExceptions(input) {
        let errorMessage = ""
        const [inputNumbersStr, customSeparator] = this.removeCustomSeparator(input);
        const exceptions = [checkEmptyString, checkCommaAtEOF, checkCustomSeparatorErrors, checkForNegatives]

        exceptions.forEach(exception => {
            exception();
        });

        if (errorMessage)
            throw errorMessage;

        /* #region Exception Functions */
        function checkEmptyString() {
            if (inputNumbersStr === "")
                throw "0"
        }

        function checkCommaAtEOF() {
            if (inputNumbersStr[inputNumbersStr.length - 1] === ",")
                throw "Number expected but EOF found"
        }

        function checkCustomSeparatorErrors() {
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

        function checkForNegatives() {
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
        /* #endregion */
    }
    convertInputToList(input) {
        const [inputNumbersStr, customSeparator] = this.removeCustomSeparator(input)
        const list = this.splitString(inputNumbersStr, customSeparator);
        return list
    }
    splitString(input, customSeparator) {
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
    removeCustomSeparator(input) {
        let customSeparator = null;
        let inputNumbersStr = input

        if (input[0] === "/" & input[1] === "/") {
            customSeparator = input.substring(2, input.indexOf("\n"))
            inputNumbersStr = input.substring(input.indexOf("\n") + 1)
        }

        return [inputNumbersStr, customSeparator]
    }
}

export default StringCalculator;
