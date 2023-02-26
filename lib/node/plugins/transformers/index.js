import { usernameCompact } from './username.js';
import { pullRequestCompact } from './pull-request.js';
import { compareCompact } from './compare.js';
import { commitCompact } from './commit.js';
import { simpleCompact } from './simple.js';
const transformers = [
    usernameCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact,
    simpleCompact
];
const resolveRepoUrl = (url) => url.replace('https://github.com/', '');
export const transform = (text, repo) => {
    Array.from(transformers, (tranformer) => text = tranformer(text, resolveRepoUrl(repo)));
    return text;
};
