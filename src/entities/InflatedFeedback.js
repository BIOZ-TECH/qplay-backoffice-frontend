export default class InflatedFeedback {
    constructor(data) {
        const { id, statement, videoPermalink, imagePermalink } = data;
        
        this.id = id;
        this.statement = statement;
        this.videoPermalink = videoPermalink;
        this.imagePermalink = imagePermalink;
    }
}
