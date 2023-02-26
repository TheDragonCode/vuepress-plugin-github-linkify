import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const commitCompact: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], template('commit', `${ item[1] }/${ item[2] }`, item[3]))

    text = regex(text, /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})\)/g, replacer)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})/g, replacer)

    return text
}

export const commitExpand: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], url(`${ item[1] }#${ item[2].substring(0, 7) }`, `${ item[1] }/commit/${ item[2] }`))

    text = regex(text, /::commit::([\w\d\-_\/]+)::([\w\d]+)::/g, replacer)

    return text
}
