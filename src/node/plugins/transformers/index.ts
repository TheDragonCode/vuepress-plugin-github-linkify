import type { GitHubLinkifyTransformer } from '../../types/transformer.js'

import { usernameCompact } from './username.js'
import { pullRequestCompact } from './pull-request.js'
import { compareCompact } from './compare.js'
import { commitCompact } from './commit.js'
import { simpleCompact } from './simple.js'

const transformers = [
    usernameCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact,
    simpleCompact
]

const resolveRepoUrl = (url: string) => url.replace('https://github.com/', '')

export const transform = (text: string, repo: string) => {
    Array.from(transformers, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    return text
}
