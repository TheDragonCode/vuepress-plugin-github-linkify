import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer'

export const mentionCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('mention', '@', repo, text, [
        /<\s*a.+@([a-zA-Z][\w\d\-_]*).+<\/\s*a\s*>/g,
        /\[[\s`@]*[\w\d\-]+[\s`]*]\(https:\/\/github\.com\/([\w\d\-]+)\/?\)/g,
        /@([a-zA-Z][\w\d\-_]*)/g
    ]).compact()

export const mentionExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('mention', '@', repo, text)
    .expand('/$key/$2', true)
