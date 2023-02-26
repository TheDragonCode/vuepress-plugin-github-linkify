import { regex } from '../regex.js';
import { template } from '../template';
export const simpleCompact = (text, repo) => {
    const replacer = function (value, item) {
        const vendor = item[1] || '';
        const project = item[2] || '';
        return vendor !== ''
            ? value.replace(item[0], template('simple', vendor, project))
            : value.replace(item[0], template('simple', ''));
    };
    text = regex(text, /https:\/\/github\.com\/?([\w\d\-_]*)\/?([\w\d\-_]*)\/?/g, replacer);
    return text;
};
