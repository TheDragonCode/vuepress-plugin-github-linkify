import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const pullRequestCompact: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacerFull = (value, item) => value.replace(item[0], template('pull_request', `${ item[1] }/${ item[2] }`, item[3]))
    const replacerShort = (value, item) => value.replace(item[0], template('pull_request', repo, item[1]))

    text = regex(text, /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\)/g, replacerFull)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)/g, replacerFull)
    text = regex(text, /#(\d+)/g, replacerShort)

    return text
}

export const pullRequestExpand: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], url(`${ item[1] }#${ item[2] }`, `${ item[1] }/pull/${ item[2] }`))

    text = regex(text, /::pull_request::([\w\d\-_\/]+)::([\w\d\-_]+)::/g, replacer)

    return text
}
