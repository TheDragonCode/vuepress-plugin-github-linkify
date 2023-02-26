import type { GitHubLinkifyTransformer } from '../../types/transformer.js'
import { regex } from '../regex.js'

export const simpleCompact: GitHubLinkifyTransformer = (text: string, repo: string) => {
    const replacer = (value, item) => value.replace(item[0], item[1] || undefined, item[2] || undefined)

    text = regex(text, /https:\/\/github\.com\/?([\w\d\-_]*)\/?([\w\d\-_]*)\/?/g, replacer)

    return text
}
