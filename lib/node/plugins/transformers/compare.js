import { Manager } from '../manager.js';
export const compareTransformer = Manager.create()
    .setKey('compare')
    .setCompactPatterns([
    /<a.*href\s?=\s?"?https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)\/?"?.*>.*<\/a>/g,
    /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)\)/g,
    /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)/g,
    /([\w\d.\-]+)\.{3}([\w\d.\-]+)/g
])
    .setExpandFormat('$1/$key/$2...$3');
