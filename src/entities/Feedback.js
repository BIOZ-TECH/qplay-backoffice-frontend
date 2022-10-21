import InflatedFeedback from "./InflatedFeedback";

export default class Feedback {
    constructor(data) {
        const { id, type, inflatedFeedback, inflatedIncorrectFeedback } = data;

        this.id = id;
        this.type = type;
        this.inflatedFeedback = inflatedFeedback ? new InflatedFeedback(inflatedFeedback) : null;
        this.inflatedIncorrectFeedback = inflatedIncorrectFeedback ? new InflatedFeedback(inflatedIncorrectFeedback) : null;
    }
}