import { mentionTransformer } from './mention.js'
import { pullRequestTransformer } from './pull-request.js'
import { commitTransformer } from './commit.js'
import { compareTransformer } from './compare.js'
import { treesTransformer } from './trees.js'
import { blobsTransformer } from './blobs.js'
import { tagsTransformer } from './tags.js'
import type { ManagerContract } from '../manager.js'

const transformers = [
    mentionTransformer,
    pullRequestTransformer,
    compareTransformer,
    commitTransformer,
    treesTransformer,
    blobsTransformer,
    tagsTransformer
]

export const transform = (text: string, repository: string): string => {
    Array.from(transformers, (transformer: ManagerContract) => text = transformer.setRepository(repository).setText(text).compact())
    Array.from(transformers, (transformer: ManagerContract) => text = transformer.setRepository(repository).setText(text).expand())

    return text
}
