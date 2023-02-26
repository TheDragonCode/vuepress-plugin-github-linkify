export const url = (value, link) => {
    return `<a href="https://github.com/${(link || value).replace('github.com', '')}" target="_blank" rel="noopener noreferrer">${value} <ExternalLinkIcon /></a>`;
};
