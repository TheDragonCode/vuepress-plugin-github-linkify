import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer'

export const treesCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('tree', '#', repo, text, [
        /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/tree\/([\d\w.\-_\/]+)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/tree\/([\d\w.\-_\/]+)/g
    ]).compact()

export const treesExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('tree', '#', repo, text)
    .expand()
