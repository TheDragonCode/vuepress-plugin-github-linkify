import { Manager } from '../manager'

export const mentionTransformer = Manager.create()
    .setKey('mention')
    .setSplitter('@', true)
    .setCompactPatterns([
        /<\s*a.+@([a-zA-Z][\w\d\-_]*).+<\/\s*a\s*>/g,
        /\[[\s`@]*[\w\d\-]+[\s`]*]\(https:\/\/github\.com\/([\w\d\-]+)\/?\)/g,
        /@([a-zA-Z][\w\d\-_]*)/g
    ])
    .setExpandFormat('/$key/$2', '$2')
