declare function is(str: string): 2 | 0 | 1;
export declare const emoji: {
    is: typeof is;
    stringify: (data: {
        name: string;
        id: string;
    }) => string;
};
export {};
