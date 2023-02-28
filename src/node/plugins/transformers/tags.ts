import { regex } from '../regex.js'
import { replace } from '../helpers.js'
import { template } from '../template.js'
import { url } from '../url.js'

export const tagsCompact = (text: string, repo: string) => {
    const replacerFull = (value, item) => replace(value, item, template('tag', `${ item[1] }/${ item[2] }`, item[3]))
    const replacerShort = (value, item) => replace(value, item, template('tag', repo, item[1]))

    text = regex(text, /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)\)/g, replacerFull)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)/g, replacerFull)
    // text = regex(text, /(?<!:)(?<=^|\s)(v?\d+\.\d+\.\d+-?\w*\.?\d*)(?<!:)/g, replacerShort)

    return text
}

export const tagsExpand = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], url(repo, `${ item[1].includes(repo) ? '' : item[1] + '#' }${ item[2].replace('v', '') }`, `${ item[1] }/releases/tag/${ item[2] }`))

    text = regex(text, /::tag::([\w\d.\-\/]+)::([\w\d.\-]+)::/g, replacer)

    return text
}
