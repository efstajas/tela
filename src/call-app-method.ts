import { Request, Response, NextFunction } from 'express'
import buildCanvas from './methods/build-canvas'
import constructHandlerContext from './methods/construct-handler-context'
import { CanvasHandler, App, ConfigureHandler } from './app.types'
import { MiddlewareHandler } from './tela.types'

export default (
  appName: string,
  req: Request,
  res: Response,
  next: NextFunction,
  middlewares: MiddlewareHandler[],
  app: App
) => async (handler: CanvasHandler | ConfigureHandler) => {
  let middlewareContext = {};

  const middlewarePromises: Promise<void>[] = [];

  middlewares.forEach((middleware) => {
    middlewarePromises.push((async () => {
      middlewareContext = await Promise.resolve(middleware(req, middlewareContext))
    })())
  })

  await Promise.all(middlewarePromises);

  const handlerResult = handler(req.body, constructHandlerContext(
    appName,
    `/${appName.toLowerCase()}`,
    app,
    middlewareContext
  ))

  const result = await Promise.resolve(handlerResult)

  if (Array.isArray(result)) {
    res.send(buildCanvas(result))
  } else if ('results' in result) {
    res.send({
      results: result.results,
    })
  } else {
    res.send({
      canvas: {
        content: {
          components: result.components
        },
        stored_data: result.storedData,
        content_url: result.contentUrl
      }
    })
  }

  next()
}
