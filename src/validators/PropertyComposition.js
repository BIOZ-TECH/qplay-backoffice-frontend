export default class PropertyComposition {
    constructor({ type, canBeNull = true }) {
        this.type = type;
        this.canBeNull = canBeNull;
    }

    validateType(value) {
        if(!value) {
            return this.canBeNull ? true : false;
        }
    
        if (this.type === 'array') {
            return Array.isArray(value);
        }
        
        return typeof value === this.type;
    }

    validate(value) {
        return this.validateType(value);
    }
}