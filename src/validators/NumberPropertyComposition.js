import PropertyComposition from "./PropertyComposition";

export default class NumberPropertyComposition extends PropertyComposition {
    constructor({ type, minimum = 0, canBeNull = true }) {
        super({ type, canBeNull });
        this.minimum = minimum;
    }

    validate(value) {
        const isValidType = this.validateType(value);

        if (isValidType && !!value) {
            return value >= this.minimum;
        }

        return isValidType;
    }

}