import { regex } from '../regex.js';
export const commitTransformer = (text) => {
    const replacer = (value, item) => text.replace(item[0], `::commit::${item[1]}/${item[2]}::${item[3]}::`);
    text = regex(text, /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})\)/g, replacer);
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})/g, replacer);
    return text;
};
