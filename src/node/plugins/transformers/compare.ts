import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'

export const compareTransformer: GitHubLinkifyTransformer = (text: string) => {
    const replacerFull = (value, item) => text.replace(item[0], `::compare::${ item[1] }/${ item[2] }::${ item[3] }::${ item[4] }::`)
    const replacerShort = (value, item) => text.replace(item[0], `::compare_short::BASE_NAMESPACE::${ item[1] }::${ item[2] }::`)

    text = regex(text, /\[[\s\w\d`.-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.-]+)\.\.\.([\w\d.-]+)\)/g, replacerFull)
    text = regex(text, /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/compare\/([\w\d.-]+)\.\.\.([\w\d.-]+)/g, replacerFull)
    text = regex(text, /([\w\d.-]+)\.\.\.([\w\d.-]+)/g, replacerShort)

    return text
}
