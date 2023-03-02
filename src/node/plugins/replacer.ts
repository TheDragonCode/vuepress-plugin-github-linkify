import type { ManagerContract } from './manager'

export class Replacer
{
    private manager: ManagerContract
    private block: string = ':'

    constructor(manager: ManagerContract)
    {
        this.manager = manager
    }

    static create(manager: ManagerContract): Replacer
    {
        return new Replacer(manager)
    }

    compact(): string
    {
        this.regex(this.getPatterns(), item => this.replace(item, this.template(item)))

        return this.manager.text
    }

    expand(): string
    {
        this.regex(this.getExpandPattern(), item => this.replace(item, this.url(item)))

        return this.manager.text
    }

    private regex(patterns: Array<RegExp>, callback): void
    {
        Array.from(patterns, (pattern: RegExp) => {
            const matches = this.manager.text.matchAll(pattern)

            Array.from(matches, item => this.manager.text = callback(item))
        })
    }

    private template(match: Array<string>): string
    {
        let args = match[3] === undefined
            ? [this.getRepository(), match[1], match[2]]
            : [`${ match[1] }/${ match[2] }`, match[3], match[4]]

        return this.getBlock() + [this.getKey()].concat(
            args.filter(val => !! val)
        ).join(this.getBlock()) + this.getBlock()
    }

    private url(match: Array<string>): string
    {
        let link: string = this.getFormatLink()
        let value: string = this.getFormatValue()

        const replaces = this.getExpandReplaces()

        const codePrefix: string = this.asCode() ? '<code>' : ''
        const codeSuffix: string = this.asCode() ? '</code>' : ''

        for (let i = 1; i <= 4; i++) {
            if (match[i] === undefined) {
                break
            }

            link = link.replace('$' + i, match[i])

            value = replaces !== undefined && replaces[i] !== undefined
                ? value.replace('$' + i, replaces[i](match[i]))
                : value.replace('$' + i, match[i])
        }

        link = link.replace('https://github.com/', '').replace('$key', this.getKey())

        value = match[1].includes(this.getRepository())
            ? value.replace(this.getRepository(), '').replace('/$key/', this.hasForceSplitter() ? this.getSplitter() : '')
            : value.replace('/$key/', this.getSplitter())

        return `<a href="https://github.com/${ link }" target="_blank" rel="noopener noreferrer">${ codePrefix }${ value }${ codeSuffix }<ExternalLinkIcon /></a>`
    }

    private replace(match: Array<string>, to: string): string
    {
        return this.manager.text.replace(match[0], to)
        // const index: number = match['index']
        // const from: string = match[0]
        //
        // return text.slice(0, index) + to + text.slice(index + from.length)
    }

    private getRepository(): string
    {
        return this.manager.repository
    }

    private getBlock(): string
    {
        return this.block.repeat(2)
    }

    private getKey(): string
    {
        return this.manager.key
    }

    private getPatterns(): Array<RegExp>
    {
        return this.manager.patterns
    }

    private getFormatValue(): string
    {
        return this.manager.formatValue
    }

    private getFormatLink(): string
    {
        return this.manager.formatLink
    }

    private getSplitter(): string
    {
        return this.manager.splitter
    }

    private hasForceSplitter(): boolean
    {
        return this.manager.forceSplitter
    }

    private getExpandReplaces(): object | undefined
    {
        return this.manager.formatReplaces
    }

    private getExpandPattern(): Array<RegExp>
    {
        return [new RegExp(
            `${ this.block }{2}${ this.getKey() }${ this.block }{2}` +
            `([\\w\\d\\/.\\-_]+)${ this.block }{2}` +
            `([\\w\\d\\/.\\-_]+)${ this.block }{2}` +
            `([\\w\\d\\/.\\-_]+)?${ this.block }{0,2}`,
            'g'
        )]
    }

    private asCode(): boolean
    {
        return this.manager.asCode
    }
}
