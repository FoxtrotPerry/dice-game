/**
 * Checks if a string is a valid json.
 * @param str string to check if it is a valid json.
 * @returns true if the string is a valid json, false otherwise.
 *
 * Note: `1234`, `0`, `false`, and `null` are all valid json and should return true.
 */
export const isJson = (str: string): boolean => {
    try {
        const potentialObj = JSON.parse(str);
        return typeof potentialObj === 'object' && potentialObj !== null;
    } catch (e) {
        return false;
    }
};
