export default class GameplaySettings {
    constructor(data) {
        const { progressOn, examsOn, id = null } = data;
        this.id = id;
        this.progressOn = progressOn;
        this.examsOn = examsOn;
    }
}