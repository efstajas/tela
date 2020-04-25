import { Request, Response, NextFunction } from 'express';
import { Handler, App } from './app.types';
declare const _default: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, res: Response<any>, next: NextFunction, appName: string, app: App) => (hookHandler: Handler) => void;
export default _default;
