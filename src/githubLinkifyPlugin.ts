import type { Plugin } from '@vuepress/core'

export type RenderPlaceFunction = (info: string) => string

export const GithubLinkify = (): Plugin => {
    return {
        name: 'github-linkify',
        multiple: true,

        extendsPage: (page) => {
            console.log(page, page.data)
        }
    }
}
