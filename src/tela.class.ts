import * as express from 'express'
import * as bodyParser from 'body-parser'

import { App } from './app.types'
import constructHandlerContext from './methods/construct-handler-context'
import constructRouter from './methods/construct-router'
import validateApp from './methods/app-validator/validate-app'
import { MiddlewareHandler } from './tela.types'

export default class Tela {
  private server = express().use(bodyParser.json({ limit: '50mb' }));

  private middlewares: MiddlewareHandler[] = [];

  public registerApp = async (appName: string, app: App) => {
    validateApp(appName, app)

    const router = constructRouter(appName, app, this.middlewares)

    const path = `/${appName.toLowerCase()}`
    this.server.use(path, router)

    return constructHandlerContext(appName, path, app)
  }

  public registerMiddleware(handler: MiddlewareHandler): void {
    this.middlewares.push(handler)
  }

  get expressInstance() {
    return this.server
  }

  public listen = (port: number): Promise<void> => {
    return new Promise((resolve: () => void, reject: (arg0: any) => void) => {
      this.server.listen(port, (e: any) => {
        if (e) {
          reject(e)
        } else {
          resolve()
        }
      })
    })
  }
}
