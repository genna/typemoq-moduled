﻿import { IThrows } from './IThrows';
import { IVerifies } from './IVerifies';
import { IFuncN } from '../Common';

    export interface IReturns<T, TResult> {
        returns(valueFunction: IFuncN<any, TResult>): IReturnsResult<T>;
        callBase(): IReturnsResult<T>;
    }

    export interface IReturnsResult<T> extends IVerifies {
    }

    export interface IReturnsThrows<T, TResult> extends IReturns<T, TResult>, IVerifies, IThrows {
    }
