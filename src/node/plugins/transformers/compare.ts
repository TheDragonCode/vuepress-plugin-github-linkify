import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer'

export const compareCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('compare', '#', repo, text, [
        /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)/g,
        /([\w\d.\-]+)\.{3}([\w\d.\-]+)/g
    ]).compact()

export const compareExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('compare', '#', repo, text)
    .expand('$1/$key/$2...$3', false)
