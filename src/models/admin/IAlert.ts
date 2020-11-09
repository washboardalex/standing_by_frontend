export type AlertCondition = 'greaterThan' | 'lessThan';

export interface IAlert {
    coin: string,
    type: 'price',
    condition: AlertCondition
    value: number
}
