import { mentionTransformer } from './mention';
import { pullRequestTransformer } from './pull-request';
import { commitTransformer } from './commit';
import { compareTransformer } from './compare';
import { treesTransformer } from './trees';
import { blobsTransformer } from './blobs';
import { tagsTransformer } from './tags';
const transformers = [
    mentionTransformer,
    pullRequestTransformer,
    compareTransformer,
    commitTransformer,
    treesTransformer,
    blobsTransformer,
    tagsTransformer
];
export const transform = (text, repository) => {
    Array.from(transformers, (transformer) => text = transformer.setRepository(repository).setText(text).compact());
    Array.from(transformers, (transformer) => text = transformer.setRepository(repository).setText(text).expand());
    return text;
};
