import { usernameTransformer } from './username';
import { pullRequestTransformer } from './pull-request';
import { compareTransformer } from './compare';
import { commitTransformer } from './commit';
const transformers = [
    usernameTransformer,
    pullRequestTransformer,
    compareTransformer,
    commitTransformer
];
export const transform = (text) => {
    Array.from(transformers, (tranformer) => text = tranformer(text));
    return text;
};
