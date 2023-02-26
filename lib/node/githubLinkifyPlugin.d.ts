import type { Plugin } from '@vuepress/core';
export interface GithubLinkifyOptions {
    repo: string;
}
export declare const githubLinkifyPlugin: ({ repo }: GithubLinkifyOptions) => Plugin;
