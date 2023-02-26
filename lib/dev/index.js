import { transform } from '../node/plugins/transformers';
(() => {
    const repo = 'https://github.com/Laravel-Lang/common';
    document.body.innerHTML = transform(document.body.innerHTML, repo);
})();
