export default class Category {
    constructor(data) {
        const { id, name, permalink, position, questions, description } = data;
        this.id = id;
        this.name = name;
        this.permalink = permalink;
        this.position = position;
        this.description = description;
        this.questions = questions;
    }
}