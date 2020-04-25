import { Request, Response, NextFunction } from 'express'
import constructHandlerContext from './methods/construct-handler-context'
import { Handler, App } from './app.types'

export default (
  req: Request,
  res: Response,
  next: NextFunction,
  appName: string,
  app: App
) => (hookHandler: Handler) => {
  hookHandler(req, res, next, constructHandlerContext(
    appName,
    `${appName.toLowerCase()}`,
    app
  ))
}
