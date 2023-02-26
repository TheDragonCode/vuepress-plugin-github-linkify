import { usernameTransformer } from './username'
import { pullRequestTransformer } from './pull-request'
import { compareTransformer } from './compare'
import { commitTransformer } from './commit'
import type { GitHubLinkifyTransformer } from '../../types/transformer'

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
