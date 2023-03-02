import { Replacer } from './replacer.js'

export interface ManagerContract
{
    key: string
    repository: string
    text: string

    splitter: string
    forceSplitter: boolean

    patterns: Array<RegExp>

    formatValue: string
    formatLink: string
    formatReplaces?: object

    asCode: boolean

    setRepository(name: string): Manager

    setKey(key: string): Manager

    setSplitter(value: string, force: boolean): Manager

    setText(text: string): Manager

    setCompactPatterns(patterns: RegExp | Array<RegExp>): Manager

    setExpandFormat(value: string, link?: string): Manager

    setExpandValueReplaces(values: object): Manager

    setAsCode(): Manager

    compact(): string

    expand(): string
}

export class Manager implements ManagerContract
{
    public key: string = 'key'
    public repository: string = ''
    public text: string = ''

    public splitter: string = '#'
    public forceSplitter: boolean = false

    public patterns: Array<RegExp> = []

    public formatValue: string = '$1/$key/$2'
    public formatLink: string = '$1/$key/$2'
    public formatReplaces?: object

    public asCode: boolean = false

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

    setAsCode(): Manager
    {
        this.asCode = true

        return this
    }

    compact(): string
    {
        return this.resolveReplacer().compact()
    }

    expand(): string
    {
        return this.resolveReplacer().expand()
    }

    private resolveReplacer(): Replacer
    {
        return Replacer.create(this)
    }
}
