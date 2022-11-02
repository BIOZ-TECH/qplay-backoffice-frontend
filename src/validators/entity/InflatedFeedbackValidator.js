import StringPropertyComposition from "../StringPropertyComposition";
import LinkPropertyComposition from "../LinkPropertyComposition";

const properties = {
    statement: new StringPropertyComposition({
        type: 'string',
        maximumLength: 160,
        canBeNull: false,
    }),
    videoPermalink: new LinkPropertyComposition({
        linkType: 'video',
    }),
    imagePermalink: new LinkPropertyComposition({
        linkType: 'image',
    }),
};

export default class InflatedFeedbackValidator {
    constructor(entity) {
        const { statement, type, videoPermalink = null, imagePermalink = null } = entity;
        
        this.statement = statement;
        this.videoPermalink = videoPermalink;
        this.imagePermalink = imagePermalink;
        this.type = type;
    }

    validate() {
        const invalidPropertyMessages = {};

        if(!properties.statement.validate(this.statement)) {
            invalidPropertyMessages.statement = `Por favor, ingrese un texto a mostrar como feedback de no más de ${properties.statement.maximumLength} carácteres`;
        }

        properties.imagePermalink.canBeNull = !(this.type === 'text-and-image');

        if(!properties.imagePermalink.validate(this.imagePermalink)) {
            invalidPropertyMessages.imagePermalink = 'Por favor, especifique un enlace de imagen en formato jpg, jpeg o png';
        }

        properties.videoPermalink.canBeNull = !(this.type === 'text-and-video');

        if(!properties.videoPermalink.validate(this.videoPermalink)) {
            invalidPropertyMessages.videoPermalink = 'Por favor, especifique un enlace de video de Youtube';
        }

        return invalidPropertyMessages;
    }
}