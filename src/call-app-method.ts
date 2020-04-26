import { Request, Response, NextFunction } from 'express'
import buildCanvas from './methods/build-canvas'
import constructHandlerContext from './methods/construct-handler-context'
import { CanvasHandler, App } from './app.types'

export default (
  appName: string,
  req: Request,
  res: Response,
  next: NextFunction,
  app: App
) => async (handler: CanvasHandler) => {
  const handlerResult = handler(req.body, constructHandlerContext(
    appName,
    `/${appName.toLowerCase()}`,
    app
  ))

  const components = await Promise.resolve(handlerResult)

  res.send(buildCanvas(components))
  next()
}
