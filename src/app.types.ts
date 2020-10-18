import { Request, Response, NextFunction } from 'express'
import { Component } from './intercom.types'

export interface HandlerContext {
  endpoint: string
  appName: string
  methods: HandlerDescription
  hooks: HandlerDescription
}

export type HandlerDescription = {
  [key: string]: {
    endpoint: string
  }
}

export type Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
  context: HandlerContext
) => Promise<void> | void

export type CanvasHandler = (
  body: object,
  context: HandlerContext
) => Promise<Component[] | HandlerResult> | Component[] | HandlerResult

export type ConfigureHandler = (
  body: object,
  context: HandlerContext,
) => Promise<Component[] | HandlerResult | ConfigurationResult> | Component[] | HandlerResult | ConfigurationResult

export interface HandlerResult {
  components: Component[],
  storedData?: {
    [key: string]: string
  },
  contentUrl?: string
}

export interface ConfigurationResult {
  results: {
    [key: string]: any
  }
}
export interface App {
  initialize: CanvasHandler,
  submit?: CanvasHandler,
  configure?: ConfigureHandler,
  hooks?: {
    [key: string]: Handler
  }
}
