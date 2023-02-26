import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const simpleCompact: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = function (value, item) {
        const vendor = item[1] || ''
        const project = item[2] || ''

        return !! vendor
            ? value.replace(item[0], template('simple', vendor, project))
            : value.replace(item[0], template('simple', repo))
    }

    text = regex(text, /https:\/\/github\.com\/?([\w\d\-_]*)\/?([\w\d\-_]*)\/?/g, replacer)

    return text
}

export const simpleExpand: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = function (value, item) {
        const vendor = item[1] || ''
        const project = item[2] || ''

        return value.replace(item[0], url(`${ vendor + (!! project ? '/' + project : '') }`))
    }

    text = regex(text, /::simple::([\w\d\-_\/]*):?:?([\w\d\-_\/]*)::/g, replacer)

    return text
}
