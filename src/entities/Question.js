import Feedback from "./Feedback";

export default class Question {
    constructor(data) {
        const { statement, categoryId, id = null, answers = [], feedback = null, permalink = null, imageAccessibility = '' } = data;

        this.id = id;
        this.statement = statement;
        this.answers = answers;
        this.feedback = feedback ? new Feedback(feedback) : null;
        this.permalink = permalink;
        this.categoryId = categoryId;
        this.imageAccessibility = imageAccessibility;
    }
};
