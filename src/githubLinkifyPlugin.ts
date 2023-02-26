import type { Plugin } from '@vuepress/core'

export const GithubLinkifyPlugin = (): Plugin => {
    return {
        name: 'github-linkify-plugin',
        multiple: true,

        extendsPage: (page) => {
            console.log(page, page.data)
        }
    }
}
