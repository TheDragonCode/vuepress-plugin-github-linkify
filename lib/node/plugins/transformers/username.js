import { regex } from '../regex.js';
import { template } from '../template';
export const usernameCompact = (text, repo) => {
    const replacer = (value, item) => value.replace(item[0], template('username', item[1]));
    text = regex(text, /\[[\s`@]*[\w\d-]+[\s`]*]\(https:\/\/github\.com\/([\w\d-]+)\/?\)/g, replacer);
    text = regex(text, /@([a-zA-Z][\w\d-_]*)/g, replacer);
    return text;
};
