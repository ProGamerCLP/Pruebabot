declare class Chain {
    map: Map<string, number>;
    constructor();
    update(id: string, n?: number): number;
    push(id: string, time: number): number;
    get(id: string): number;
}
export default Chain;
