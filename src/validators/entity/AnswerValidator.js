import StringPropertyComposition from "../StringPropertyComposition";

const properties = {
    description: new StringPropertyComposition({
        type: 'string',
        maximumLength: 50,
        canBeNull: false,
    }),
};

export default class AnswerValidator {
    constructor(entity) {
        const { description } = entity;

        this.description = description;
    }

    validate() {
        const invalidPropertyMessages = {};

        if(!properties.description.validate(this.description)) {
            invalidPropertyMessages.description = `La descripción debe ser un texto de no más de ${properties.description.maximumLength} carácteres`;
        }

        return invalidPropertyMessages;
    }
}