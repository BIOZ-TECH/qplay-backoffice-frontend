export default class Appearance {
    constructor(data) {
        const { id, holderId, appName, logo, header, button, inputText, appBackground, complementaryLetters } = data;
        this.id = id;
        this.holderId = holderId;
        this.appName = appName;
        this.logo = logo;
        this.header = header;
        this.button = button;
        this.inputText = inputText;
        this.appBackground = appBackground;
        this.complementaryLetters = complementaryLetters;
    }
}