import { Request, Response, NextFunction } from 'express';
import { CanvasHandler, App } from './app.types';
declare const _default: (appName: string, req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, res: Response<any>, next: NextFunction, app: App) => (handler: CanvasHandler) => Promise<void>;
export default _default;
