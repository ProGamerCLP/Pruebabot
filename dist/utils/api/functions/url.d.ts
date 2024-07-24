declare function imageTest(url: string): Promise<boolean>;
declare function test(url: string): Promise<boolean>;
export declare const url: {
    test: typeof test;
    imageTest: typeof imageTest;
};
export {};
