export const templateSeparator = '::';
export const template = (key, ...args) => {
    return templateSeparator + [key].concat(args).join(templateSeparator) + templateSeparator;
};
