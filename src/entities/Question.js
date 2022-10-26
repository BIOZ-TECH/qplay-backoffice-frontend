import StringPropertyComposition from "../validators/StringPropertyComposition";
import LinkPropertyComposition from "../validators/LinkPropertyComposition";
import Feedback from "./Feedback";

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

export default class Question {
    constructor(data) {
        const { statement, categoryId, id = null, answers = [], feedback = null, permalink = null } = data;

        this.id = id;
        this.statement = statement;
        this.answers = answers;
        this.feedback = feedback ? new Feedback(feedback) : null;
        this.permalink = permalink;
        this.categoryId = categoryId;
    }
};
