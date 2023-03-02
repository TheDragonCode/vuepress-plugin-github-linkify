export class Replacer {
    constructor(manager) {
        this.block = ':';
        this.manager = manager;
    }
    static create(manager) {
        return new Replacer(manager);
    }
    compact() {
        this.regex(this.getPatterns(), item => this.replace(item, this.template(item)));
        return this.manager.text;
    }
    expand() {
        this.regex(this.getExpandPattern(), item => this.replace(item, this.url(item)));
        return this.manager.text;
    }
    regex(patterns, callback) {
        Array.from(patterns, (pattern) => {
            const matches = this.manager.text.matchAll(pattern);
            Array.from(matches).reverse().forEach(item => this.manager.text = callback(item));
        });
    }
    template(match) {
        let args = match[3] === undefined
            ? [this.getRepository(), match[1], match[2]]
            : [`${match[1]}/${match[2]}`, match[3], match[4]];
        return this.getBlock() + [this.getKey()].concat(args.filter(val => !!val)).join(this.getBlock()) + this.getBlock();
    }
    url(match) {
        let link = this.getFormatLink();
        let value = this.getFormatValue();
        const isSameRepository = match[1].includes(this.getRepository());
        const replaces = this.getExpandReplaces();
        const codePrefix = this.asCode() && isSameRepository ? '<code>' : '';
        const codeSuffix = this.asCode() && isSameRepository ? '</code>' : '';
        for (let i = 1; i <= 4; i++) {
            if (match[i] === undefined) {
                break;
            }
            link = link.replace('$' + i, match[i]);
            value = replaces !== undefined && replaces[i] !== undefined
                ? value.replace('$' + i, replaces[i](match[i]))
                : value.replace('$' + i, match[i]);
        }
        link = link.replace('https://github.com/', '').replace('$key', this.getKey());
        value = isSameRepository
            ? value.replace(this.getRepository(), '').replace('/$key/', this.hasForceSplitter() ? this.getSplitter() : '')
            : value.replace('/$key/', this.getSplitter());
        return `<a href="https://github.com/${link}" target="_blank" rel="noopener noreferrer">${codePrefix}${value}${codeSuffix}<ExternalLinkIcon /></a>`;
    }
    replace(match, to) {
        // return this.manager.text.replace(match[0], to)
        const index = match['index'];
        const from = match[0];
        return this.manager.text.slice(0, index) + to + this.manager.text.slice(index + from.length);
    }
    getRepository() {
        return this.manager.repository;
    }
    getBlock() {
        return this.block.repeat(2);
    }
    getKey() {
        return this.manager.key;
    }
    getPatterns() {
        return this.manager.patterns;
    }
    getFormatValue() {
        return this.manager.formatValue;
    }
    getFormatLink() {
        return this.manager.formatLink;
    }
    getSplitter() {
        return this.manager.splitter;
    }
    hasForceSplitter() {
        return this.manager.forceSplitter;
    }
    getExpandReplaces() {
        return this.manager.formatReplaces;
    }
    getExpandPattern() {
        return [new RegExp(`${this.block}{2}${this.getKey()}${this.block}{2}` +
                `([\\w\\d\\/.\\-_]+)${this.block}{2}` +
                `([\\w\\d\\/.\\-_]+)${this.block}{2}` +
                `([\\w\\d\\/.\\-_]+)?${this.block}{0,2}`, 'g')];
    }
    asCode() {
        return this.manager.asCode;
    }
}
