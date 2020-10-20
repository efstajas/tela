import { HandlerContext, HandlerDescription, App } from '../app.types'

export default (
  appName: string,
  path: string,
  app: App,
  middlewareContext?: any,
): HandlerContext => {
  const methods: HandlerDescription = {}
  const hooks: HandlerDescription = {}

  for (const method of Object.keys(app)) {
    if (method === 'hooks') {
      for (const hook of Object.keys(app.hooks!)) {
        hooks[hook] = {
          endpoint: `${path}/hooks/${hook.toLowerCase()}`
        }
      }
    } else {
      methods[method] = {
        endpoint: `${path}/${method.toLowerCase()}`
      }
    }
  }

  return {
    appName,
    endpoint: `${path}`,
    methods,
    hooks,
    middlewareContext
  }
}
