import type { GitHubLinkifyTransformer } from '../../types/transformer.js'

import { mentionCompact, mentionExpand } from './mention.js'
import { pullRequestCompact, pullRequestExpand } from './pull-request.js'
import { compareCompact, compareExpand } from './compare.js'
import { commitCompact, commitExpand } from './commit.js'
import { tagsCompact, tagsExpand } from './tags.js'
import { treesCompact, treesExpand } from './trees.js'

const compact = [
    mentionCompact,
    pullRequestCompact,
    compareCompact,
    commitCompact,
    treesCompact,
    tagsCompact
]

const expand = [
    mentionExpand,
    pullRequestExpand,
    compareExpand,
    commitExpand,
    treesExpand,
    tagsExpand
]

const resolveRepoUrl = (url: string) => url.replace('https://github.com/', '')

export const transform = (text: string, repo: string) => {
    Array.from(compact, (transformer: GitHubLinkifyTransformer) => text = transformer(text, resolveRepoUrl(repo)))
    Array.from(expand, (transformer: GitHubLinkifyTransformer) => text = transformer(text, resolveRepoUrl(repo)))

    return text
}
