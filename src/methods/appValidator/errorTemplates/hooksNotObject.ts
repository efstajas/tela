export default (appName: string) =>
  `Expected 'hooks' member of app ${appName} to be object of shape { [key: string]: (req, res, next, context) => void }`
