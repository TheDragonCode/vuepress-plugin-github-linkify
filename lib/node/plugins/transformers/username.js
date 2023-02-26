import { regex } from '../regex';
export const usernameTransformer = (text) => {
    const replacer = (value, item) => text.replace(item[0], `::username::${item[1]}::`);
    text = regex(text, /\[[\s`@]*[\w\d-]+[\s`]*]\(https:\/\/github\.com\/([\w\d-]+)\/?\)/g, replacer);
    text = regex(text, /@([\w\d-]+)/g, replacer);
    return text;
};
