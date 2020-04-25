import { App } from './app.types';
export default class Tela {
    registerApp: (appName: string, app: App) => Promise<import("./app.types").HandlerContext>;
    listen: (port: number) => Promise<void>;
}
