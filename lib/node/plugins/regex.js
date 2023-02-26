export const regex = (text, pattern, callback) => {
    const matches = text.matchAll(pattern);
    Array.from(matches, item => text = callback(text, item));
    return text;
};
