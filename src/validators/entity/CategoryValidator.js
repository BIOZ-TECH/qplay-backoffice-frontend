import StringPropertyComposition from "../StringPropertyComposition";
import NumberPropertyComposition from "../NumberPropertyComposition";
import LinkPropertyComposition from "../LinkPropertyComposition";

const properties = {
    name: new StringPropertyComposition({
        type: 'string',
        maximumLength: 30,
        canBeNull: false,
    }),
    position: new NumberPropertyComposition({
        type: 'number',
        canBeNull: false,
        minimum: 1,
    }),
    permalink: new LinkPropertyComposition({
        linkType: 'image',
    }),
    description: new StringPropertyComposition({
        type: 'string',
        maximumLength: 120,
    }),
};

export default class CategoryValidator {
    constructor(entity) {
        const { name, position, permalink, description } = entity;

        this.name = name;
        this.permalink = permalink;
        this.position = position;
        this.description = description;
    }

    validate() {
        const invalidPropertyMessages = {};

        if(!properties.name.validate(this.name)) {
            invalidPropertyMessages.name = `Por favor, ingrese un nombre de no más de ${properties.name.maximumLength} carácteres`;
        }

        if(!properties.position.validate(this.position)) {
            invalidPropertyMessages.position = 'Por favor, ingrese la posición de la categoría';
        }

        if(!properties.permalink.validate(this.permalink)) {
            invalidPropertyMessages.permalink = 'Por favor, especifique un enlace de imagen en formato jpg, jpeg o png';
        }

        if(!properties.description.validate(this.description)) {
            invalidPropertyMessages.description = `Por favor, ingrese una descripción de no más de ${properties.description.maximumLength} carácteres`;
        }

        return invalidPropertyMessages;
    }
}