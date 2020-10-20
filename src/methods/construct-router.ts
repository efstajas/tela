import { Router } from 'express'
import { App } from '../app.types'
import callHook from '../call-hook'
import callAppMethod from '../call-app-method'
import { MiddlewareHandler } from '../tela.types'

export default (appName: string, app: App, middlewares: MiddlewareHandler[]) => {
  const router = Router()

  const appObject = app as {
    [key: string]: any
  }

  for (const key of Object.keys(app)) {
    switch (key) {
      case 'hooks':
        if (!app.hooks) break

        for (const hook of Object.keys(app.hooks)) {
          const path = `/hooks/${hook.toLowerCase()}`

          router.post(
            `${path}*`,
            (req, res, next) => callHook(req, res, next, appName, app)(app.hooks![hook])
          )
        }

        break
      default:
        if (
          !['initialize', 'submit', 'configure'].includes(key)
        ) break

        const path = `/${key.toLowerCase()}`

        router.post(
          path,
          (req, res, next) => callAppMethod(appName, req, res, next, middlewares, app)(appObject[key])
        )

        break
    }
  }

  return router
}
