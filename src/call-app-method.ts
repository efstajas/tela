import { Request, Response, NextFunction } from 'express'
import buildCanvas from './methods/build-canvas'
import constructHandlerContext from './methods/construct-handler-context'
import { CanvasHandler, App, ConfigureHandler } from './app.types'

export default (
  appName: string,
  req: Request,
  res: Response,
  next: NextFunction,
  app: App
) => async (handler: CanvasHandler | ConfigureHandler) => {
  const handlerResult = handler(req.body, constructHandlerContext(
    appName,
    `/${appName.toLowerCase()}`,
    app
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
