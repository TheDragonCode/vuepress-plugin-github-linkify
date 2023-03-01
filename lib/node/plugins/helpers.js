export const replace = (text, match, to) => {
    return text.replace(match[0], to);
    // const index: number = match['index']
    // const from: string = match[0]
    //
    // return text.slice(0, index) + to + text.slice(index + from.length)
};
