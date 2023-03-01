import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer'

export const tagsCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('tag', 'v', repo, text, [
        /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)/g
        // /(?<!:)(?<=^|\s)(v?\d+\.\d+\.\d+-?\w*\.?\d*)(?<!:)/g
    ]).compact()

export const tagsExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('tag', 'v', repo, text)
    .expand('$1/releases/tag/$2', true)
