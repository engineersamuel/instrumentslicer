export type MyGroup = {
    count: number;
    absGain: number;
    fluctuation: number;
    fluctuationPercentage: number;
    sumIndex: number;
    avgIndex: number;
    percentageGain: number;
};

export type MyOtherGroup = {
    days: number; 
    total: number;
    avg: number;
};

export type NdxModel = {
    date: Date;
    month: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    oi: number;
};