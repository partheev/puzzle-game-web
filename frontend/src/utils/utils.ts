export const compareArrays = (
    array1: number[] | string[],
    array2: number[] | string[]
) => {
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
};

export const arrayToString = (stringArray: string[]) => {
    let result = '';

    stringArray.forEach((v) => (result += v));
    return result;
};
