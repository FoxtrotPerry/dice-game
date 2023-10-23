import { isJson } from './jsonUtils';

/**
 * Safely gets a value from local storage. Can return json or string values.
 * @param key the key to get the value of.
 * @returns the value of the key in local storage, or null if the key does not exist.
 */
export const getLocalStorageItem = <T extends string | null | Record<string, unknown>>(key: string) => {
    const item = localStorage.getItem(key);
    if (item && isJson(item)) {
        return JSON.parse(item) as T;
    }
    return (item as T | null) ?? null;
};

/**
 * Sets a value in local storage. Automatically
 * @param key the key to assign the value to.
 * @param value the value to store in local storage.
 */
export const setLocalStorageItem = (key: string, value: unknown) => {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
