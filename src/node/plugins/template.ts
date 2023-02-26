export const templateSeparator = '::'

export const template = (key: string, ...args: string[]) => {
    return templateSeparator + [key].concat(args).join(templateSeparator) + templateSeparator
}
