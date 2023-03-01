export class Replacer
{
    private readonly repository: string
    private readonly splitter
    private text: string
    private readonly patterns: RegExp | Array<RegExp> | undefined
    private readonly key: string
    private readonly firstItem: string | undefined
    private readonly secondItem: string | undefined
    private readonly separator = '::'

    constructor(key: string, splitter: string, repository: string, text: string, patterns?: RegExp | Array<RegExp>, firstItem?: string, secondItem?: string)
    {
        this.key = key
        this.splitter = splitter
        this.repository = repository
        this.text = text
        this.patterns = patterns
        this.firstItem = firstItem
        this.secondItem = secondItem
    }

    static create(key: string, splitter: string, repository: string, text: string, pattern?: RegExp | Array<RegExp>, firstItem?: string, secondItem?: string): Replacer
    {
        return new Replacer(key, splitter, repository, text, pattern, firstItem, secondItem)
    }

    compact(): string
    {
        this.regex(this.getPatterns(), item => this.replace(item, this.template(item)))

        return this.text
    }

    expand(format: string = '$1/$key/$2', forceSplitter: boolean = false, pattern?: RegExp): string
    {
        const patterns = pattern !== undefined ? [pattern] : [new RegExp(`${this.separator}${this.key}${this.separator}([\\w\\d\\/.\\-_]+)${this.separator}([\\w\\d\\/.\\-_]+)${this.separator}`, 'g')]

        this.regex(patterns, item => this.replace(item, this.url(item, format, forceSplitter)))

        return this.text
    }

    private regex(patterns: Array<RegExp>, callback): void
    {
        Array.from(patterns, (pattern: RegExp) => {
            const matches = this.text.matchAll(pattern)

            Array.from(matches, item => this.text = callback(item))
        })
    }

    private template(match: Array<string>): string
    {
        let args = match[3] === undefined
            ? [this.repository, match[1], match[2]]
            : [`${ match[1] }/${ match[2] }`, match[3], match[4]]

        console.log()

        return this.separator + [this.key].concat(
            args.filter(val => !! val)
        ).join(this.separator) + this.separator
    }

    private url(match: Array<string>, format: string, forceSplitter: boolean = false): string
    {
        let link = format
        let value = format

        for (let i = 1; i <= 4; i++) {
            if (match[i] === undefined) {
                break
            }

            link = link.replace('$' + i, match[i])
            value = value.replace('$' + i, match[i])
        }

        link = link.replace('https://github.com/', '').replace('$key', this.key)

        value = match[1].includes(this.repository)
            ? value.replace(this.repository, '').replace('/$key/', forceSplitter ? this.splitter : '')
            : value.replace('/$key/', this.splitter)

        return `<a href="https://github.com/${ link }" target="_blank" rel="noopener noreferrer">${ value }<ExternalLinkIcon /></a>`
    }

    private replace(match: Array<string>, to: string): string
    {
        return this.text.replace(match[0], to)
        // const index: number = match['index']
        // const from: string = match[0]
        //
        // return text.slice(0, index) + to + text.slice(index + from.length)
    }

    private getPatterns(): Array<RegExp>
    {
        if (this.patterns === undefined) {
            throw Error('The "patterns" parameter is required')
        }

        return Array.isArray(this.patterns) ? this.patterns : [this.patterns]
    }
}
