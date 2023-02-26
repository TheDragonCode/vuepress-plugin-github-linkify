import { transform } from '../node/plugins/transformers'

(() => {
    document.body.innerHTML = transform(document.body.innerHTML)
})()
