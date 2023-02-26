import type { GitHubLinkifyTransformer } from '../../types/transformer.js'

import { usernameCompact, usernameExpand } from './username.js'
import { pullRequestCompact, pullRequestExpand } from './pull-request.js'
import { compareCompact, compareExpand } from './compare.js'
import { commitCompact, commitExpand } from './commit.js'

const compact = [
    usernameCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact
]

const expand = [
    usernameExpand,
    pullRequestExpand,
    compareExpand,
    commitExpand
]

const resolveRepoUrl = (url: string) => url.replace('https://github.com/', '')

export const transform = (text: string, repo: string) => {
    // compact
    Array.from(compact, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    // expand
    Array.from(expand, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    return text
}
