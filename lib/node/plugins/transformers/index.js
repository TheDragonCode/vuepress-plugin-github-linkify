import { usernameTransformer } from './username.js';
import { pullRequestTransformer } from './pull-request.js';
import { compareTransformer } from './compare.js';
import { commitTransformer } from './commit.js';
const transformers = [
    usernameTransformer,
    pullRequestTransformer,
    compareTransformer,
    commitTransformer
];
export const transform = (text) => {
    console.log('aaaaaaaaaa');
    Array.from(transformers, (tranformer) => text = tranformer(text));
    return text;
};
