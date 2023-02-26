import { regex } from '../regex.js';
import { template } from '../template';
export const compareCompact = (text, repo) => {
    const replacerFull = (value, item) => value.replace(item[0], template('compare', `${item[1]}/${item[2]}`, item[3], item[4]));
    const replacerShort = (value, item) => value.replace(item[0], template('compare_short', repo, item[1], item[2]));
    text = regex(text, /\[[\s\w\d`.-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.-]+)\.\.\.([\w\d.-]+)\)/g, replacerFull);
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.-]+)\.\.\.([\w\d.-]+)/g, replacerFull);
    text = regex(text, /([\w\d.-]+)\.\.\.([\w\d.-]+)/g, replacerShort);
    return text;
};
