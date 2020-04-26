import { App } from '../../app.types'
import missingMethodTemplate from './errorTemplates/missingMethod'
import hooksNotObjectTemplate from './errorTemplates/hooksNotObject'
import handlerNotFunctionTemplate from './errorTemplates/handlerNotFunction'
import hookNotFunctionTemplate from './errorTemplates/hookNotFunction'

export default (appName: string, app: App) => {
  const requiredMembers = ['initialize']
  const optionalMembers = ['submit', 'configure', 'hooks']
  const possibleMembers = requiredMembers.concat(optionalMembers)

  const appMethods = Object.keys(app)

  // check if all required methods are present

  requiredMembers.forEach((key: string) => {
    if (!appMethods.includes(key)) {
      throw new Error(missingMethodTemplate(appName, key))
    }
  })

  // Check if members are of expected type

  const appAsAny = (app as any)

  possibleMembers.forEach((key: string) => {
    const memberType = typeof appAsAny[key]

    if (appAsAny[key]) {
      switch (key) {
        case 'hooks':
          if (memberType !== 'object') {
            throw new Error(hooksNotObjectTemplate(appName))
          }

          Object.keys(appAsAny.hooks).forEach((h: string) => {
            if (typeof appAsAny.hooks[h] !== 'function') {
              throw new Error(hookNotFunctionTemplate(appName, h))
            }
          })
          break
        default:
          if (memberType !== 'function') {
            throw new Error(handlerNotFunctionTemplate(appName, key))
          }
          break
      }
    }
  })
}
