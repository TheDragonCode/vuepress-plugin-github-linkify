import { Manager } from '../manager.js'

export const blobsTransformer = Manager.create()
    .setKey('blob')
    .setCompactPatterns([
        /\[[\w\d\s`]+]\(https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/blob\/([\w\d\/.\-_]+)\/?\)/g,
        /(?<!:")(?<=^|\s|>)https:\/\/github\.com\/([\w\d\-_]+)\/([\w\d\-_]+)\/blob\/([\w\d\/.\-_]+)\/?/g
    ])
