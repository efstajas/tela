export default (appName: string, hookName: string) =>
  `Expected hook ${hookName} of app ${appName} to be function like (req, res, next, context) => void`
