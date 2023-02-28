import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { replace } from '../helpers.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const treesCompact: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => replace(value, item, template('tree', `${ item[1] }/${ item[2] }`, `${ item[3] }`))

    text = regex(text, /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/tree\/([\d\w.\-_\/]+)\)/g, replacer)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/tree\/([\d\w.\-_\/]+)/g, replacer)

    return text
}

export const treesExpand: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => replace(value, item, url(repo, `${ item[1].includes(repo) ? '' : item[1] + '#' }${ item[2] }`, `${ item[1] }/tree/${ item[2] }`))

    text = regex(text, /::tree::([\d\w.\-_\/]+)::([\d\w.\-_\/]+)::/g, replacer)

    return text
}
