﻿import * as _ from 'lodash';

export class PropertyRetriever {

    static getOwnEnumerables(obj: any) {
        return this._getPropertyNames(obj, true, false, this._enumerable);
        // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
    }

    static getOwnNonenumerables(obj: any) {
        return this._getPropertyNames(obj, true, false, this._notEnumerable);
    }

    static getOwnEnumerablesAndNonenumerables(obj: any) {
        return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
        // Or just use: return Object.getOwnPropertyNames(obj);
    }

    static getPrototypeEnumerables(obj: any) {
        return this._getPropertyNames(obj, false, true, this._enumerable);
    }

    static getPrototypeNonenumerables(obj: any) {
        return this._getPropertyNames(obj, false, true, this._notEnumerable);
    }

    static getPrototypeEnumerablesAndNonenumerables(obj: any) {
        return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
    }

    static getOwnAndPrototypeEnumerables(obj: any) {
        return this._getPropertyNames(obj, true, true, this._enumerable);
        // Or could use unfiltered for..in
    }

    static getOwnAndPrototypeNonenumerables(obj: any) {
        return this._getPropertyNames(obj, true, true, this._notEnumerable);
    }

    static getOwnAndPrototypeEnumerablesAndNonenumerables(obj: any) {
        return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
    }

    // Private static property checker callbacks
    private static _enumerable(obj: any, prop: any): boolean {
        return obj.propertyIsEnumerable(prop);
    }

    private static _notEnumerable(obj: any, prop: any): boolean {
        return !obj.propertyIsEnumerable(prop);
    }

    private static _enumerableAndNotEnumerable(obj: any, prop: any): boolean {
        return true;
    }

    private static _getPropertyNames(
        obj: any, iterateSelfBool: boolean, iteratePrototypeBool: boolean, includePropCb: (obj: any, prop: any) => boolean):
        Array<{ name: string; desc: PropertyDescriptor }> {

        let result: Array<{ name: string; desc: PropertyDescriptor }> = [];

        do {
            if (iterateSelfBool) {

                let props = Object.getOwnPropertyNames(obj);
                _.forEach(props, prop => {
                    let duplicate = _.find(result, p => p.name === prop);

                    if (!duplicate && includePropCb(obj, prop)) {
                        let propDesc = Object.getOwnPropertyDescriptor(obj, prop);
                        result.push({ name: prop, desc: propDesc });
                    }
                });
            }

            if (!iteratePrototypeBool) {
                break;
            }

            iterateSelfBool = true;

        } while (obj = Object.getPrototypeOf(obj));

        return result;
    }

}
