declare function is(id: string): boolean;
declare function add(id: string): void;
export declare const cooldown: {
    is: typeof is;
    add: typeof add;
    map: Map<any, any>;
};
export {};
