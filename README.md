## 🖼 Tela 

Tela is a small framework for building [Intercom Canvas Kit applications](https://developers.intercom.com/building-apps/docs/canvas-kit). Write your apps as simple classes, run a server to receive calls to your app with one line, and get your canvasses type-checked with TypeScript.

### ⬇️ Install

Simply install with npm or yarn. Tela is available on the NPM registry or GitHub Packages.

```
npm install @efstajas/tela

or

yarn add @efstajas/tela
```

### 🎬 Getting started

In Tela, you define Canvas Kit apps as simple classes that match the webhooks generated by Intercom for an app. Afterwards, you can use Tela to serve your apps with one line of code.

💡 *This guide assumes you use TypeScript — everything also works with plain JS too, but syntax may be different. You really should use TypeScript either way!*

#### 1️⃣ Create your app

Create a new file named `your-app.app.ts`. Within that, export a new class YourName that `implements App`, and return an array consisting of a single `text` component:

```ts
//your-app.app.ts
import { App, Component } from '@efstajas/tela'

export default class ExampleApp implements App {
  public initialize = (body): Component[] => {
    return [
      {
        type: 'text',
        text: 'Hello world',
        style: 'paragraph'
      }
    ]
  }
}
```

Congratulations, you just implemented your first app. `initialize` is a `handler` — and initialize specifically is required, but you can also add `configure` and `submit` handlers if you need them. For your convenience, these handlers are a bit magic: Instead of handling response sending and canvas creation manually in each handler, you simply return either an array of Components or a Promise that resolves to an array of Components directly. Tela will automatically take care of wrapping your components to create a valid canvas definition and send it back to Intercom once your handler has resolved. Anyway — let's run our new app!

In a new file `index.ts`, import your app, create a new Tela instance, and register your app:

```ts
//index.ts
import Tela from '@efstajas/tela'
import YourApp from './your-app.app.ts'

const tela = new Tela()

tela.registerApp('example-app', new YourApp())
```

The first argument to `registerApp` is your app name — please make sure it's a URL-safe string, since it'll be used as a path for the server later. If you have multiple apps, just iterate over them and register each. `registerApp` returns a promise that resolves to your new app's "context" object — you can use that to print console output during startup, for example.

Now that our app is registered, we can go ahead and start our server:

```ts
tela.listen(8000)
```

Now, go ahead and run — Congratulations, your server is now listening on port 8000. Try calling `POST /example-app/initialize`, and you'll see that you receive back a valid canvas defininion with the `text` component you defined in your `initialize handler.

### 😎 Advanced usage

#### 🤚 Handlers

In each app you can define up to three handlers: `initialize`, `submit` and `configure`. To understand what they're for, it's best to read [Intercom's documentation](https://developers.intercom.com/building-apps/docs/canvas-kit). In addition to a synchronous handler like in the Getting Started guide, you can also create asyn handlers, for example if you need to get some data for an API to create your components:

```ts
//your-app.ts
import { App, Component } from '@efstajas/tela'

export default class ExampleApp implements App {
  public initialize = async (body): Promise<Component[]> => {
    const {
      customer
    } = body
    const userId = customer.id

    const userData = await someApiService.getUser(userId)

    return [
      {
        type: 'text',
        text: `The conversation is with a user called ${userData.name}.`,
        style: 'paragraph'
      }
    ]
  }
}
```

If you need to read information that Intercom sends with the requests, worry not: The first argument for your handler is Intercom's request `body`.

#### 🌍 Handler Context

Alongside the request `body` passed from Intercom, your handler also receives a `context` object as the second argument. The context includes the current app name your handler is running in, the app's base endpoint URL and two objects `hooks` and `methods`, which you can use to find out the app's other handler's endpoints at runtime.

```ts
public initialize = (requestBody, context: HandlerContext) => {
  logger.log('Initialize request', LOGGER_NAME)

  const {
    endpoint,
    appName,
    hooks,
    methods
  } = context

  console.log(`
    This handler's path is ${endpoint}.
    It's part of app ${appName}.
  `)

  /*
  The hooks and methods objects are helpful for registering a webhook
  with one of your handlers at runtime, for example.
  Let's say that in response to an action on Intercom you want to make an
  API call that establishes a webhook to a handler in this app:

  service.createWebhook({
    url: `${hostname}${hooks.hookName.endpoint}`
  })
  */

  return [
    {
      type: 'text',
      text: 'Hello world',
      style: 'paragraph'
    }
  ]
}
```

#### 🔌 Receiving webhooks in your app

If you additionally need to receive external webhooks for your app, you can define hook handlers in a `public hooks` object:

```ts
public hooks = {
  hookName: (req, res, next, context) => {
    logger.log('Handling hookName hook', LOGGER_NAME)

    res.send(200)
    next()
  }
}
```

These handlers are defined as standard Express middleware. Each defined hook will be initialized at `/appname/hookname*`.

#### ✅ Starting the server

Of course, you can run multiple apps at the same time by calling `registerApp` multiple times before calling `listen`. Each app will be initialized at `/appname/handlername`. `registerApp` also returns a Promise that resolves to a `context` object, including the paths for all handlers that were initialized within your app.

```ts
import Tela, { HandlerContext } from '@efstajas/tela'
// Import your apps
import apps from './apps'

const tela = new Tela()

let promises: Promise<HandlerContext> = []

apps.forEach((app) => {
  promises.push(
    tela.registerApp('test', new App())
      .then((context) => {
        console.log('App initialized', context)
      })
      .catch((e) => {
        console.error(e)
      })
  )
})

await Promise.all(promises)

console.log('All apps initialized, starting server…')

tela.listen(8000).then(() => {
  console.log(`Listening at 8000`)
}).catch((e) => {
  console.error(e)
})
```

#### 🚂 Accessing the internal Express instance

If you need to add your own endpoints not part of an Intercom app to the internal server, like for example a `/health` endpoint, you can access the internal Express server instance directly. Please note that you should do this, as well as registering apps, only before calling `listen`.

```ts
import Tela from '@efstajas/tela'
import App from './app'

const tela = new Tela()

tela.expressInstance.get('/health', (req, res, next) => {
  res.send(200)
  next()
})

tela.listen(8000).then(() => {
  console.log(`Listening at 8000`)
}).catch((e) => {
  console.error(e)
})
```
