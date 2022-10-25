import InflatedFeedback from "./InflatedFeedback";

export default class Feedback {
    constructor(data) {
        const { type, id = null, inflatedFeedback = null, inflatedIncorrectFeedback = null } = data;

        this.id = id;
        this.type = type;
        this.inflatedFeedback = inflatedFeedback ? new InflatedFeedback(inflatedFeedback) : null;
        this.inflatedIncorrectFeedback = inflatedIncorrectFeedback ? new InflatedFeedback(inflatedIncorrectFeedback) : null;
    }
}