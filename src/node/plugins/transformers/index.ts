import { mentionTransformer } from './mention'
import { pullRequestTransformer } from './pull-request'
import { commitTransformer } from './commit'
import { compareTransformer } from './compare'
import { treesTransformer } from './trees'
import { blobsTransformer } from './blobs'
import { tagsTransformer } from './tags'
import type { ManagerContract } from '../manager'

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
