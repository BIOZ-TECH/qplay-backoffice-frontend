export default class GameplaySettings {
    constructor(data) {
        const { progressOn, examOn, id = null } = data;
        this.id = id;
        this.progressOn = progressOn;
        this.examOn = examOn;
    }
}