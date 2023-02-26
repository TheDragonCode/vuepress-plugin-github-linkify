import { fs } from '@vuepress/utils';
import { transform } from './plugins/transformers/index.js';
export const githubLinkifyPlugin = () => ({
    name: 'github-linkify-plugin',
    multiple: true,
    onGenerated: (app) => {
        app.pages.forEach((page) => {
            const filePath = page.componentFilePath;
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(filePath, transform(content));
        });
    }
});
