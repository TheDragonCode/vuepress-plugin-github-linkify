import { Manager } from '../manager.js';
export const treesTransformer = Manager.create()
    .setKey('tree')
    .setCompactPatterns([
    /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/tree\/([\d\w.\-_\/]+)\)/g,
    /(?<!:")(?<=^|\s)https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/tree\/([\d\w.\-_\/]+)/g
]);
