import StringPropertyComposition from "../StringPropertyComposition";
import LinkPropertyComposition from "../LinkPropertyComposition";

const properties = {
    appName: new StringPropertyComposition({
        type: 'string',
        maximumLength: 30,
        canBeNull: false,
    }),
    logo: new LinkPropertyComposition({
        linkType: 'image',
        canBeNull: false,
    }),
};

export default class AppearanceValidator {
    constructor(entity) {
        const { appName, logo } = entity;
        
        this.appName = appName;
        this.logo = logo;
    }

    validate() {
        const invalidPropertyMessages = {};

        if(!properties.appName.validate(this.appName)) {
            invalidPropertyMessages.appName = `Por favor, ingrese un nombre de aplicación de no más de ${properties.appName.maximumLength} carácteres`;
        }

        if(!properties.logo.validate(this.logo)) {
            invalidPropertyMessages.logo = 'Por favor, especifique el enlace de su logo de aplicación en formato jpg, jpeg o png';
        }



        return invalidPropertyMessages;
    }
}