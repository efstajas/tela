import { Component } from '../intercom.types';

export default (components: Component[]) => {
  if (!Array.isArray(components)) throw new Error(
    'Expected array of components to be returned by handler.'
  )

  return {
    canvas: {
      content: {
        components
      }
    }
  }
}
