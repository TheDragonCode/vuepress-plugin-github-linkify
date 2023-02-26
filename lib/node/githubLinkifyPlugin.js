export const githubLinkifyPlugin = () => {
    return {
        name: 'github-linkify-plugin',
        multiple: true,
        extendsPage: (page) => {
            console.log('github linkify', page, page.data);
        }
    };
};
