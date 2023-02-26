import type { Plugin } from '@vuepress/core'

export const githubLinkifyPlugin = (): Plugin => {
    return {
        name: 'github-linkify-plugin',
        multiple: true,

        extendsPage: (page) => {
            console.log('github linkify', page, page.data)
        }
    }
}
