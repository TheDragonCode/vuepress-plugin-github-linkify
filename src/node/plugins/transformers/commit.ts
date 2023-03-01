import type { LinkifyTransformer } from '../../types/transformer.js'
import { Replacer } from '../replacer'

export const commitCompact: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('commit', '#', repo, text, [
        /<a.*href\s?=\s?"?https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})"?.*>.*<\/a>/g,
        /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})/g,
        /[^\D\W\S:]*([\w\d]{40})[^:]/g
    ]).compact()

export const commitExpand: LinkifyTransformer = (text: string, repo: string) => Replacer
    .create('commit', '#', repo, text)
    .expand()
