export default class Answer {
    constructor(data) {
        const { id, description, isCorrect } = data;

        this.id = id;
        this.description = description;
        this.isCorrect = isCorrect;
    }
}