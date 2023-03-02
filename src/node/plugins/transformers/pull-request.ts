import { Manager } from '../manager'

export const pullRequestTransformer = Manager.create()
    .setKey('pull')
    .setSplitter('#', true)
    .setCompactPatterns([
        /\[[\s`#@]*\d+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/pull\/(\d+)/g,
        /#(\d+)/g
    ])
