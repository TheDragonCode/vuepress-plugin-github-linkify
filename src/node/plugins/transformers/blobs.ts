import type { LinkifyTransformer } from '../../types/transformer.js'
import { replace } from '../helpers.js'
import { template } from '../template.js'
import { regex } from '../regex'
import { url } from '../url'

export const blobsCompact: LinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => replace(value, item, template('blob', `${ item[1] }/${ item[2] }`, item[3]))

    text = regex(text, /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/blob\/([\w\d\/\.\-_]+)\)/g, replacer)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/blob\/([\w\d\/\.\-_]+)/g, replacer)

    return text
}

export const blobsExpand: LinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], url(repo, `${ item[1].includes(repo) ? '' : item[1] + '#' }${ item[2] }`, `${ item[1] }/blob/${ item[2] }`))

    text = regex(text, /::blob::([\w\d\-_\/]+)::([\w\d\/\.\-_]+)::/g, replacer)

    return text
}
