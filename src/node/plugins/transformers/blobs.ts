import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer.js'

export const blobsCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('blob', '#', repo, text, [
        /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/blob\/([\w\d\/.\-_]+)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/blob\/([\w\d\/.\-_]+)/g
    ]).compact()

export const blobsExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('blob', '#', repo, text)
    .expand()
