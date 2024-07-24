declare function hash(str: string): Promise<any>;
declare function verify(password: string, hashedPassword: string): Promise<any>;
export declare const password: {
    hash: typeof hash;
    verify: typeof verify;
};
export {};
