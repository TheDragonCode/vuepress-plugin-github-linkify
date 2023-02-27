export const url = (repo, value, link) => {
    link = (link || value).replace('https://github.com/', '');
    value = value.replace(repo + '/', '').replace(repo, '');
    return `<a href="https://github.com/${link}" target="_blank" rel="noopener noreferrer">${value} <ExternalLinkIcon /></a>`;
};
