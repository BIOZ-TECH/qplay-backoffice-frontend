import StringPropertyComposition from "../StringPropertyComposition";
import LinkPropertyComposition from "../LinkPropertyComposition";

const properties = {
    statement: new StringPropertyComposition({
        type: 'string',
        maximumLength: 160,
        canBeNull: false,
    }),
    permalink: new LinkPropertyComposition({
        linkType: 'image',
    }),
};

export default class QuestionValidator {
    constructor(entity) {
        const { statement, answers, feedback, permalink = null } = entity;

        this.statement = statement;
        this.permalink = permalink;
        this.feedback = feedback;
        this.answers = answers;
    }

    validate() {
        const invalidPropertyMessages = {};

        if(!properties.statement.validate(this.statement)) {
            invalidPropertyMessages.statement = `Por favor, ingrese una pregunta de no más de ${properties.statement.maximumLength} carácteres`;
        }

        if(!properties.permalink.validate(this.permalink)) {
            invalidPropertyMessages.permalink = 'Por favor, especifique un enlace de imagen en formato jpg, jpeg o png';
        }

        if(!this.answers || !Array.isArray(this.answers)  || this.answers.length < 2) {
            invalidPropertyMessages.answers = 'Por favor, especifique al menos dos respuestas, debiendo ser una sola de ellas la respuesta correcta';
        }

        if(!this.feedback || !this.feedback.type) {
            invalidPropertyMessages.feedbackType = 'Por favor, especifique la cantidad de feedbacks de la pregunta';
        }

        return invalidPropertyMessages;
    }
}