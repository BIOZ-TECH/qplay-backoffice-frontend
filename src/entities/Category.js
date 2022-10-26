export default class Category {
    constructor(data) {
        const { name, position, id = null, permalink = null, questions = [], description = null } = data;
        this.id = id;
        this.name = name;
        this.permalink = permalink;
        this.position = position;
        this.description = description;
        this.questions = questions;
    }
}