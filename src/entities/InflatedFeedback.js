export default class InflatedFeedback {
    constructor(data) {
        const { statement, id = null, type= 'only-text', videoPermalink = null, imagePermalink = null } = data;
        
        this.id = id;
        this.type = type;
        this.statement = statement;
        this.videoPermalink = videoPermalink;
        this.imagePermalink = imagePermalink;
    }
}
