export const GithubLinkifyPlugin = () => {
    return {
        name: 'github-linkify-plugin',
        multiple: true,
        extendsPage: (page) => {
            console.log(page, page.data);
        }
    };
};
