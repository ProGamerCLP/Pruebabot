declare function isValidImage(url: string): Promise<boolean>;
declare function isValid(url: string): Promise<boolean>;
export declare const url: {
    isValid: typeof isValid;
    isValidImage: typeof isValidImage;
};
export {};
