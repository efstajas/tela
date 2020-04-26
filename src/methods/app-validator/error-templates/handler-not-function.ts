export default (appName: string, methodName: string) =>
  `Expected handler ${methodName} of app ${appName} to be function that returns Promise<Component[]> or Component[]`
