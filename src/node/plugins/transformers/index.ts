import type { GitHubLinkifyTransformer } from '../../types/transformer.js'

import { usernameCompact, usernameExpand } from './username.js'
import { pullRequestCompact } from './pull-request.js'
import { compareCompact } from './compare.js'
import { commitCompact } from './commit.js'
import { simpleCompact } from './simple.js'

const compact = [
    usernameCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact,
    simpleCompact
]

const expand = [
    usernameExpand
]

const resolveRepoUrl = (url: string) => url.replace('https://github.com/', '')

export const transform = (text: string, repo: string) => {
    // compact
    Array.from(compact, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    // expand
    Array.from(expand, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    return text
}
