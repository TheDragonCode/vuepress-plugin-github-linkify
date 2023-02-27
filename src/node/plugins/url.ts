export const url = (value: string, link?: string) => {
    link = (link || value).replace('https://github.com/', '')

    return `<a href="https://github.com/${ link }" target="_blank" rel="noopener noreferrer">${ value } <ExternalLinkIcon /></a>`
}
