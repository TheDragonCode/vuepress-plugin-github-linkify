import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer'

export const pullRequestCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('pull', '#', repo, text, [
        /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)/g,
        /#(\d+)/g
    ]).compact()

export const pullRequestExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('pull', '#', repo, text)
    .expand('$1/$key/$2', true)
