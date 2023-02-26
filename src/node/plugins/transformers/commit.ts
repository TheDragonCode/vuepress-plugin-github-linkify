import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { template } from '../template'

export const commitCompact: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], template('commit', `${ item[1] }/${ item[2] }`, item[3].substring(0, 7)))

    text = regex(text, /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})\)/g, replacer)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})/g, replacer)

    return text
}
