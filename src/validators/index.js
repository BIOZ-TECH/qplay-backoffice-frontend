const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharactersRegex = /(!|¡|"|#|\$|%|&|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|\?|¿|@|\[|\\|\]|\^|_|`|\{|\||\}|~)/;
    const MINIMUM_PASSWORD_LENGTH = 8;

    if (!password || password.length < MINIMUM_PASSWORD_LENGTH) {
        return 'Debe ser de al menos 8 caracteres';
    }

    if (!uppercaseRegex.test(password)
        || !lowercaseRegex.test(password)
        || !numberRegex.test(password)
        || !specialCharactersRegex.test(password)) {
            return 'Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial';
        }

    return '';
}

const validateStringLength = (str, maximumLenght, minimumLength = 0) => {
    return minimumLength >= str.length >= maximumLenght;
}

const validatePropertyType = (property, expectedType, canBeNull = true) => {
    if(canBeNull && !property) return true;

    if (expectedType === 'array') {
        return Array.isArray(property);
    }
    
    return typeof property === expectedType;
}

const validateYoutubeLink = (youtubeLink) => {
    const youtubeLinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;

    return youtubeLinkRegex.test(youtubeLink);
}

const validateImageLink = (imageLink) => {
    const imageLinkRegex = /http(s)?:\/\/.*\.(jpg|jpeg|png|gif)/;

    return imageLinkRegex.test(imageLink);
}