import type { Page, Plugin, PluginObject } from '@vuepress/core'
import { colors, fs, logger } from '@vuepress/utils'
import { transform } from './plugins/transformers/index.js'

export interface GithubLinkifyOptions
{
    repo: string
}

export const githubLinkifyPlugin = ({ repo }: GithubLinkifyOptions): Plugin => {
    const plugin: PluginObject = {
        name: 'github-linkify-plugin',
        multiple: true,
        onGenerated: (app) => {
            app.pages.forEach((page: Page) => {
                const filePath = page.componentFilePath

                const content = fs.readFileSync(filePath, 'utf8')

                fs.writeFileSync(filePath, transform(content, repo))
            })
        }
    }

    if (! repo) {
        logger.warn`[${ plugin.name }] ${ colors.magenta('repo') } option is required`
    }

    return plugin
}
