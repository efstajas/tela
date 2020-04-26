import * as express from 'express'
import * as bodyParser from 'body-parser'

import { App } from './app.types'
import constructHandlerContext from './methods/construct-handler-context'
import constructRouter from './methods/construct-router'
import validateApp from './methods/app-validator/validate-app'

export default class Tela {
  private server = express().use(bodyParser.json());

  public registerApp = async (appName: string, app: App) => {
    validateApp(appName, app)

    const router = constructRouter(appName, app)

    const path = `/${appName.toLowerCase()}`
    this.server.use(path, router)

    return constructHandlerContext(appName, path, app)
  }

  get expressInstance() {
    return this.server
  }

  public listen = (port: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.server.listen(port, (e) => {
        if (e) {
          reject(e)
        } else {
          resolve()
        }
      })
    })
  }
}
