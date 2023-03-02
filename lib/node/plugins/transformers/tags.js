import { Manager } from '../manager.js';
export const tagsTransformer = Manager.create()
    .setKey('tag')
    .setCompactPatterns([
    /<a.*href\s?=\s?"?https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)\/?"?.*>.*<\/a>/g,
    /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)\/?\)/g,
    /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)\/?/g,
    /(?<!:)(?<=^|\s|>)(v?\d+\.\d+\.\d+-?\w*\.?\d*)(?<!:)/g
])
    .setExpandFormat('$1/$key/$2', '$1/releases/tag/$2')
    .setExpandValueReplaces({
    2: (value) => value.startsWith('v') ? value.substring(1) : value
});
