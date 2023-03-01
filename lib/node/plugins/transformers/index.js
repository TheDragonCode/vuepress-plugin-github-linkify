import { mentionCompact, mentionExpand } from './mention.js';
import { pullRequestCompact, pullRequestExpand } from './pull-request.js';
import { compareCompact, compareExpand } from './compare.js';
import { commitCompact, commitExpand } from './commit.js';
import { tagsCompact, tagsExpand } from './tags.js';
import { treesCompact, treesExpand } from './trees.js';
import { blobsCompact, blobsExpand } from './blobs.js';
const compact = [
    mentionCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact,
    treesCompact,
    blobsCompact,
    tagsCompact
];
const expand = [
    mentionExpand,
    pullRequestExpand,
    compareExpand,
    commitExpand,
    treesExpand,
    blobsExpand,
    tagsExpand
];
const resolveRepoUrl = (url) => url.replace('https://github.com/', '');
export const transform = (text, repo) => {
    Array.from(compact, (transformer) => text = transformer(text, resolveRepoUrl(repo)));
    Array.from(expand, (transformer) => text = transformer(text, resolveRepoUrl(repo)));
    return text;
};
