import { regex } from '../regex.js';
import { replace } from '../helpers.js';
import { template } from '../template.js';
import { url } from '../url.js';
export const mentionCompact = (text, repo) => {
    const replacer = (value, item) => replace(value, item, template('mention', item[1]));
    text = regex(text, /<\s*a.+@([a-zA-Z][\w\d\-_]*).+<\/\s*a\s*>/g, replacer);
    text = regex(text, /\[[\s`@]*[\w\d\-]+[\s`]*]\(https:\/\/github\.com\/([\w\d\-]+)\/?\)/g, replacer);
    text = regex(text, /@([a-zA-Z][\w\d\-_]*)/g, replacer);
    return text;
};
export const mentionExpand = (text, repo) => {
    const replacer = (value, item) => value.replace(item[0], url(repo, `@${item[1]}`, item[1]));
    text = regex(text, /::mention::([\w\d\-_]+)::/g, replacer);
    return text;
};
