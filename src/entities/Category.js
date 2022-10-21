export default class Category {
    constructor(data) {
        const { id, name, permalink, order, questions } = data;
        this.id = id;
        this.name = name;
        this.permalink = permalink;
        this.order = order;
        this.questions = questions;
    }
}