import PropertyComposition from "./PropertyComposition";

export default class StringPropertyComposition extends PropertyComposition {
    constructor({ type, maximumLength, minimumLength = 0, canBeNull = true }) {
        super({ type, canBeNull });
        this.minimumLength = minimumLength;
        this.maximumLength = maximumLength;
    }

    validate(value) {
        const isValidType = this.validateType(value);

        if (isValidType && value) {
            return validateStringLength(value, this.maximumLength, this.minimumLength);
        }

        return isValidType;
    }

}

const validateStringLength = (str, maximumLenght, minimumLength = 0) => {
    return minimumLength <= str.length && str.length <= maximumLenght;
}