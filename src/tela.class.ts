import * as express from 'express'
import * as bodyParser from 'body-parser'

import { App } from './app.types'
import constructHandlerContext from './methods/construct-handler-context'
import constructRouter from './methods/construct-router'

export default class Tela {
  private server = express().use(bodyParser.json());

  public registerApp = async (appName: string, app: App) => {
    const router = constructRouter(appName, app)

    const path = `/${appName.toLowerCase()}`
    this.server.use(path, router)

    return constructHandlerContext(appName, path, app)
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
