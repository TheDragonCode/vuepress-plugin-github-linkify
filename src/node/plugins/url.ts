export const url = (value: string, link?: string) => {
    return `<a href="https://github.com/${ (link || value).replace('github.com', '') }" target="_blank" rel="noopener noreferrer">${ value } <ExternalLinkIcon /></a>`
}
