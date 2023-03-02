import { Replacer } from './replacer.js';
export class Manager {
    constructor() {
        this.key = 'key';
        this.repository = '';
        this.text = '';
        this.splitter = '#';
        this.forceSplitter = false;
        this.patterns = [];
        this.formatValue = '$1/$key/$2';
        this.formatLink = '$1/$key/$2';
        this.asCode = false;
    }
    static create() {
        return new Manager();
    }
    setRepository(name) {
        this.repository = name.replace('https://github.com/', '');
        return this;
    }
    setKey(key) {
        this.key = key;
        return this;
    }
    setSplitter(value, force = false) {
        this.splitter = value;
        this.forceSplitter = force;
        return this;
    }
    setText(text) {
        this.text = text;
        return this;
    }
    setCompactPatterns(patterns) {
        this.patterns = Array.isArray(patterns) ? patterns : [patterns];
        return this;
    }
    setExpandFormat(value, link) {
        this.formatValue = value;
        this.formatLink = link || value;
        return this;
    }
    setExpandValueReplaces(values) {
        this.formatReplaces = values;
        return this;
    }
    setAsCode() {
        this.asCode = true;
        return this;
    }
    compact() {
        return this.resolveReplacer().compact();
    }
    expand() {
        return this.resolveReplacer().expand();
    }
    resolveReplacer() {
        return Replacer.create(this);
    }
}
