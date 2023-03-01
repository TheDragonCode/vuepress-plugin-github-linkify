import type { LinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { replace } from '../helpers.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const pullRequestCompact: LinkifyTransformer = (text: string, repo: string) => {
    const replacerFull = (value, item) => replace(value, item, template('pull_request', `${ item[1] }/${ item[2] }`, item[3]))
    const replacerShort = (value, item) => replace(value, item, template('pull_request', repo, item[1]))

    text = regex(text, /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\)/g, replacerFull)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)/g, replacerFull)
    text = regex(text, /#(\d+)/g, replacerShort)

    return text
}

export const pullRequestExpand: LinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], url(repo, `${ item[1] }#${ item[2] }`, `${ item[1] }/pull/${ item[2] }`))

    text = regex(text, /::pull_request::([\d\w.\-_\/]+)::([\d\w.\-_\/]+)::/g, replacer)

    return text
}
