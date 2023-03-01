import type { LinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { replace } from '../helpers.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const compareCompact: LinkifyTransformer = (text: string, repo: string) => {
    const replacerFull = (value, item) => replace(value, item, template('compare', `${ item[1] }/${ item[2] }`, item[3], item[4]))
    const replacerShort = (value, item) => replace(value, item, template('compare', repo, item[1], item[2]))

    text = regex(text, /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)\)/g, replacerFull)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.\-]+)\.{3}([\w\d.\-]+)/g, replacerFull)
    text = regex(text, /([\w\d.\-]+)\.{3}([\w\d.\-]+)/g, replacerShort)

    return text
}

export const compareExpand: LinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], url(repo, `${ item[1].includes(repo) ? '' : item[1] + '#' }${ item[2] }...${ item[3] }`, `${ item[1] }/compare/${ item[2] }...${ item[3] }`))

    text = regex(text, /::compare::([\w\d.\-\/]+)::([\w\d.\-]+)::([\w\d.\-]+)::/g, replacer)

    return text
}
