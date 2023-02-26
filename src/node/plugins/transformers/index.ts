import type { GitHubLinkifyTransformer } from '../../types/transformer.js'

import { usernameCompact, usernameExpand } from './username.js'
import { pullRequestCompact, pullRequestExpand } from './pull-request.js'
import { compareCompact, compareExpand } from './compare.js'
import { commitCompact, commitExpand } from './commit.js'
import { simpleCompact, simpleExpand } from './simple.js'

const compact = [
    usernameCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact,
    simpleCompact
]

const expand = [
    usernameExpand,
    pullRequestExpand,
    compareExpand,
    commitExpand,
    simpleExpand
]

const resolveRepoUrl = (url: string) => url.replace('https://github.com/', '')

export const transform = (text: string, repo: string) => {
    // compact
    Array.from(compact, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    // expand
    Array.from(expand, (tranformer: GitHubLinkifyTransformer) => text = tranformer(text, resolveRepoUrl(repo)))

    return text
}
