import { Replacer } from './replacer'

export interface ManagerContract
{
    setRepository(name: string): Manager

    setKey(key: string): Manager

    setSplitter(value: string, force: boolean): Manager

    setText(text: string): Manager

    setCompactPatterns(patterns: RegExp | Array<RegExp>): Manager

    setExpandFormat(value: string, link?: string): Manager

    setExpandValueReplaces(values: object): Manager

    compact(): string

    expand(): string
}

export class Manager implements ManagerContract
{
    public key?: string
    public splitter: string = '#'
    public repository?: string
    public text?: string
    public forceSplitter: boolean = false
    public patterns: Array<RegExp> = []
    public formatValue: string = '$1/$key/$2'
    public formatLink: string = '$1/$key/$2'
    public formatReplaces?: object

    static create(): Manager
    {
        return new Manager()
    }

    setRepository(name: string): Manager
    {
        this.repository = name.replace('https://github.com/', '')

        return this
    }

    setKey(key: string): Manager
    {
        this.key = key

        return this
    }

    setSplitter(value: string, force: boolean = false): Manager
    {
        this.splitter = value
        this.forceSplitter = force

        return this
    }

    setText(text: string): Manager
    {
        this.text = text

        return this
    }

    setCompactPatterns(patterns: RegExp | Array<RegExp>): Manager
    {
        this.patterns = Array.isArray(patterns) ? patterns : [patterns]

        return this
    }

    setExpandFormat(value: string, link?: string): Manager
    {
        this.formatValue = value
        this.formatLink = link || value

        return this
    }

    setExpandValueReplaces(values: object): Manager
    {
        this.formatReplaces = values

        return this
    }

    compact(): string
    {
        return Replacer
            .create(this.key, this.splitter, this.repository, this.text, this.patterns)
            .compact()
    }

    expand(): string
    {
        return Replacer
            .create(this.key, this.splitter, this.repository, this.text)
            .expand(this.formatValue, this.forceSplitter, this.formatLink, this.formatReplaces)
    }
}
