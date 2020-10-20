import { Request } from 'express'

export type MiddlewareHandler = (req: Request, middlewareContext: any) => any | Promise<any>
