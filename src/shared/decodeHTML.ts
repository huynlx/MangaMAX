const entities = require("entities");

const decodeHTMLEntity = (str?: string): string => {
    return entities.decodeHTML(str);
}

export default decodeHTMLEntity
