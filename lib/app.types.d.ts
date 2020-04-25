import { Request, Response, NextFunction } from 'express';
import { Component } from './intercom.types';
export interface HandlerContext {
    endpoint: string;
    appName: string;
    methods: HandlerDescription;
    hooks: HandlerDescription;
}
export declare type HandlerDescription = {
    [key: string]: {
        endpoint: string;
    };
};
export declare type Handler = (req: Request, res: Response, next: NextFunction, context: HandlerContext) => Promise<void> | void;
export declare type CanvasHandler = (body: object, context: HandlerContext) => Promise<Component[]> | Component[];
export interface App {
    initialize: CanvasHandler;
    submit?: CanvasHandler;
    configure?: CanvasHandler;
    hooks?: {
        [key: string]: Handler;
    };
}
