import { regex } from '../regex.js';
import { template } from '../template.js';
import { url } from '../url.js';
export const compareCompact = (text, repo) => {
    const replacerFull = (value, item) => value.replace(item[0], template('compare', `${item[1]}/${item[2]}`, item[3], item[4]));
    const replacerShort = (value, item) => value.replace(item[0], template('compare', repo, item[1], item[2]));
    text = regex(text, /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.\.\.([\w\d.\-]+)\)/g, replacerFull);
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.\.\.([\w\d.\-]+)/g, replacerFull);
    text = regex(text, /([\w\d.\-]+)\.{3}([\w\d.\-]+)/g, replacerShort);
    return text;
};
export const compareExpand = (text, repo) => {
    const replacer = (value, item) => value.replace(item[0], url(repo, `${item[1].includes(repo) ? '' : item[1] + '#'}${item[2]}...${item[3]}`, `${item[1]}/compare/${item[2]}...${item[3]}`));
    text = regex(text, /::compare::([\w\d.\-\/]+)::([\w\d.\-]+)::([\w\d.\-]+)::/g, replacer);
    return text;
};
