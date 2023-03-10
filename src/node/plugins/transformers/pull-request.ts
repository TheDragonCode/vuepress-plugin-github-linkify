import { Manager } from '../manager.js'

export const pullRequestTransformer = Manager.create()
    .setKey('pull')
    .setSplitter('#', true)
    .setCompactPatterns([
        /<a.*href\s?=\s?"?https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\/?"?.*>.*<\/a>/g,
        /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\/?\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\/?/g,
        /#(\d+)/g
    ])
