import { mentionCompact, mentionExpand } from './mention.js';
import { pullRequestCompact, pullRequestExpand } from './pull-request.js';
import { compareCompact, compareExpand } from './compare.js';
import { commitCompact, commitExpand } from './commit.js';
const compact = [
    mentionCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact
];
const expand = [
    mentionExpand,
    pullRequestExpand,
    compareExpand,
    commitExpand
];
const resolveRepoUrl = (url) => url.replace('https://github.com/', '');
export const transform = (text, repo) => {
    // compact
    Array.from(compact, (tranformer) => text = tranformer(text, resolveRepoUrl(repo)));
    // expand
    Array.from(expand, (tranformer) => text = tranformer(text, resolveRepoUrl(repo)));
    return text;
};
