export interface ManagerContract {
    key: string;
    repository: string;
    text: string;
    splitter: string;
    forceSplitter: boolean;
    patterns: Array<RegExp>;
    formatValue: string;
    formatLink: string;
    formatReplaces?: object;
    asCode: boolean;
    setRepository(name: string): Manager;
    setKey(key: string): Manager;
    setSplitter(value: string, force: boolean): Manager;
    setText(text: string): Manager;
    setCompactPatterns(patterns: RegExp | Array<RegExp>): Manager;
    setExpandFormat(value: string, link?: string): Manager;
    setExpandValueReplaces(values: object): Manager;
    setAsCode(): Manager;
    compact(): string;
    expand(): string;
}
export declare class Manager implements ManagerContract {
    key: string;
    repository: string;
    text: string;
    splitter: string;
    forceSplitter: boolean;
    patterns: Array<RegExp>;
    formatValue: string;
    formatLink: string;
    formatReplaces?: object;
    asCode: boolean;
    static create(): Manager;
    setRepository(name: string): Manager;
    setKey(key: string): Manager;
    setSplitter(value: string, force?: boolean): Manager;
    setText(text: string): Manager;
    setCompactPatterns(patterns: RegExp | Array<RegExp>): Manager;
    setExpandFormat(value: string, link?: string): Manager;
    setExpandValueReplaces(values: object): Manager;
    setAsCode(): Manager;
    compact(): string;
    expand(): string;
    private resolveReplacer;
}
