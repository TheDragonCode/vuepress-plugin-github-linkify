import { Manager } from '../manager.js'

export const tagsTransformer = Manager.create()
    .setKey('tag')
    .setCompactPatterns([
        /\[[\s\w\d`.\-]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)\)/g,
        /https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/releases\/tag\/(v?\d+\.\d+\.\d+-?\w*\.?\d*)/g,
        /(?<!:)(?<=^|\s)(v?\d+\.\d+\.\d+-?\w*\.?\d*)(?<!:)/g
    ])
    .setExpandFormat('$1/$key/$2', '$1/releases/tag/$2')
    .setExpandValueReplaces({
        2: (value: string) => value.startsWith('v') ? value.substring(1) : value
    })
