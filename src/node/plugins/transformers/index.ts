import { usernameTransformer } from './username.js'
import { pullRequestTransformer } from './pull-request.js'
import { compareTransformer } from './compare.js'
import { commitTransformer } from './commit.js'
import type { GitHubLinkifyTransformer } from '../../types/transformer.js'

const transformers = [
    usernameTransformer,
    pullRequestTransformer,
    compareTransformer,
    commitTransformer
]

export const transform = (text: string) => {
    Array.from(transformers, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text))

    return text
}
