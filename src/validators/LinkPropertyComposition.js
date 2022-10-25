import PropertyComposition from "./PropertyComposition";

export default class LinkPropertyComposition extends PropertyComposition {
    constructor({ linkType, canBeNull = true }) {
        super({ type: 'string', canBeNull });
        this.linkType = linkType;
    }

    validate(value) {
        const isValidType = super.validateType(value);
        
        if (isValidType && value) {
            return this.linkType === 'image' ? validateImageLink(value) : validateYoutubeLink(value);
        }

        return isValidType;
    }

}

const validateImageLink = (imageLink) => {
    const imageLinkRegex = /http(s)?:\/\/.*\.(jpg|jpeg|png|gif)/;

    return imageLinkRegex.test(imageLink);
}

const validateYoutubeLink = (youtubeLink) => {
    const youtubeLinkRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;

    return youtubeLinkRegex.test(youtubeLink);
}