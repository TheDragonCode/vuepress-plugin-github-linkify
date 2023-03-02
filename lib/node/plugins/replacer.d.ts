import type { ManagerContract } from './manager';
export declare class Replacer {
    private manager;
    private block;
    constructor(manager: ManagerContract);
    static create(manager: ManagerContract): Replacer;
    compact(): string;
    expand(): string;
    private regex;
    private template;
    private url;
    private replace;
    private getRepository;
    private getBlock;
    private getKey;
    private getPatterns;
    private getFormatValue;
    private getFormatLink;
    private getSplitter;
    private hasForceSplitter;
    private getExpandReplaces;
    private getExpandPattern;
    private asCode;
}
