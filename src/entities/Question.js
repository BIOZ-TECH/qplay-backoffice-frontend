import Feedback from "./Feedback";

export default class Question {
    constructor(data) {
        const { id, statement, answers, feedback, permalink, categoryId } = data;

        this.id = id;
        this.statement = statement;
        this.answers = answers;
        this.feedback = feedback ? new Feedback(feedback) : null;
        this.permalink = permalink;
        this.categoryId = categoryId;
    }
};
