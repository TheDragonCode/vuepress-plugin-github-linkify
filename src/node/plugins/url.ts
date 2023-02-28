export const url = (repo: string, value: string, link?: string) => {
    link = (link || value).replace('https://github.com/', '')
    value = value.replace(repo + '/', '').replace(repo, '').trim()

    return `<a href="https://github.com/${ link }" target="_blank" rel="noopener noreferrer">${ value }<ExternalLinkIcon /></a>`
}
