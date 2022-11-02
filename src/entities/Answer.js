export default class Answer {
    constructor(data) {
        const { description, id = null, isCorrect = false } = data;

        this.id = id;
        this.description = description;
        this.isCorrect = isCorrect;
    }
}
