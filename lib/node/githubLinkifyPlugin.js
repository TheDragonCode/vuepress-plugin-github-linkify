import { colors, fs, logger } from '@vuepress/utils';
import { transform } from './plugins/transformers/index.js';
export const githubLinkifyPlugin = ({ repo }) => {
    const plugin = {
        name: 'github-linkify-plugin',
        multiple: true,
        onPrepared: (app) => {
            app.pages.forEach((page) => {
                const filePath = page.componentFilePath;
                const content = fs.readFileSync(filePath, 'utf8');
                fs.writeFileSync(filePath, transform(content, repo));
            });
        }
    };
    if (!repo) {
        logger.warn `[${plugin.name}] ${colors.magenta('repo')} option is required`;
    }
    return plugin;
};
