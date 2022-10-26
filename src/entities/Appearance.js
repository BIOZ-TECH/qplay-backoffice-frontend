export default class Appearance {
    constructor(data) {
        const { holderId, appName, logo, header, button, inputText, appBackground, complementaryLetters, id = null } = data;
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