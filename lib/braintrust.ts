import { initLogger, wrapAISDK } from 'braintrust'
import * as ai from 'ai'

let initialized = false

export function initBraintrust() {
  if (initialized) return

  if (process.env.BRAINTRUST_API_KEY) {
    initLogger({
      projectName: process.env.BRAINTRUST_PROJECT_NAME ?? 'problem-analyzer',
      apiKey: process.env.BRAINTRUST_API_KEY,
    })
  }

  initialized = true
}

export const tracedAi = wrapAISDK(ai)
