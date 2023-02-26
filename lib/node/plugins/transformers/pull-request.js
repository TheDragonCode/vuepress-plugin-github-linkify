import { regex } from '../regex.js';
export const pullRequestTransformer = (text) => {
    const replacerFull = (value, item) => text.replace(item[0], `::pull_request::${item[1]}/${item[2]}::${item[3]}::`);
    const replacerShort = (value, item) => text.replace(item[0], `::pull_request_short::BASE_NAMESPACE::${item[1]}`);
    text = regex(text, /\[[\s`#]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\)/g, replacerFull);
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)/g, replacerFull);
    text = regex(text, /(#\d+)/g, replacerShort);
    return text;
};
