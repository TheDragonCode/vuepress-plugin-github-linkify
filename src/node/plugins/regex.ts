export const regex = (text: string, pattern: RegExp, callback): string => {
    const matches = text.matchAll(pattern)

    Array.from(matches, item => text = callback(text, item))

    return text
}
