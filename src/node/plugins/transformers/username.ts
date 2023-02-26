import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'

export const usernameTransformer: GitHubLinkifyTransformer = (text: string) => {
    const replacer = (value, item) => text.replace(item[0], `::username::${ item[1] }::`)

    text = regex(text, /\[[\s`@]*[\w\d-]+[\s`]*]\(https:\/\/github\.com\/([\w\d-]+)\/?\)/g, replacer)
    text = regex(text, /@([\w\d-]+)/g, replacer)

    return text
}
