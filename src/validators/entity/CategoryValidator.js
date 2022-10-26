import CategoryProperties from "./composition/category";

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

        if(!CategoryProperties.name.validate(this.name)) {
            invalidPropertyMessages.name = `Por favor, ingrese un nombre de no más de ${CategoryProperties.name.maximumLength} carácteres`;
        }

        if(!CategoryProperties.position.validate(this.position)) {
            invalidPropertyMessages.position = 'Por favor, ingrese la posición de la categoría';
        }

        if(!CategoryProperties.permalink.validate(this.permalink)) {
            invalidPropertyMessages.permalink = 'Por favor, especifique un enlace de imagen en formato jpg, jpeg o png';
        }

        if(!CategoryProperties.description.validate(this.description)) {
            invalidPropertyMessages.description = `Por favor, ingrese una descripción de no más de ${CategoryProperties.description.maximumLength} carácteres`;
        }

        return invalidPropertyMessages;
    }
}