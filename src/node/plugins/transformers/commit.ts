import { Manager } from '../manager.js'

export const commitTransformer = Manager.create()
    .setKey('commit')
    .setAsCode()
    .setCompactPatterns([
        /<a.*href\s?=\s?"?https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})"?.*>.*<\/a>/g,
        /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/commit\/([\w\d]{40})/g,
        /[^\D\W\S:]*([\w\d]{40})(?!:)/g
    ])
    .setExpandValueReplaces({
        2: (value: string) => value.substring(0, 7)
    })
