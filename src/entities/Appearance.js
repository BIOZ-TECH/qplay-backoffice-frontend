export default class Appearance {
    constructor(data) {
        const { holderId, appName, logo, headerAndButtons, selectableAnswers, backgrounds, letters, id = null } = data;
        this.id = id;
        this.holderId = holderId;
        this.appName = appName;
        this.logo = logo;
        this.headerAndButtons = headerAndButtons;
        this.selectableAnswers = selectableAnswers;
        this.backgrounds = backgrounds;
        this.letters = letters;
    }
}