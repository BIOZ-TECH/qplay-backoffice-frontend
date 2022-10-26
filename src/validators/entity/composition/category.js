import LinkPropertyComposition from "../../LinkPropertyComposition";
import NumberPropertyComposition from "../../NumberPropertyComposition";
import StringPropertyComposition from "../../StringPropertyComposition";

const CategoryProperties = {
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

export default CategoryProperties;
