import { Output } from 'ai'
import * as ai from 'ai'
import { openai } from '@ai-sdk/openai'
import { initLogger, traced, wrapAISDK } from 'braintrust'
import { buildProblemAnalyzerAiContext } from './context'
import { buildProblemAnalyzerUserPrompt, PROBLEM_ANALYZER_SYSTEM_PROMPT } from './prompt'

import { problemAnalyzerAiSchema } from './schema'
import type { AnswersMap } from '@/lib/problem-analyzer/score'
import { evaluateSchemaValidity } from './evals/deterministic/schemaValidity'

const MODEL = 'gpt-5.4-nano'

const logger = initLogger({
  apiKey: process.env.BRAINTRUST_API_KEY,
  projectName: process.env.BRAINTRUST_PROJECT_NAME ?? 'problem-analyzer',
  asyncFlush: false,
})

const btAI = wrapAISDK(ai)

type GenerateProblemAnalysisInput = {
  problemText: string
  audienceText?: string
  answers: AnswersMap
}

export async function generateProblemAnalysis({
  problemText,
  audienceText,
  answers,
}: GenerateProblemAnalysisInput) {
  const aiContext = buildProblemAnalyzerAiContext({
    problemText,
    audienceText,
    answers,
  })

  const aiContextJson = JSON.stringify(aiContext, null, 2)
  const prompt = buildProblemAnalyzerUserPrompt(aiContextJson)

  console.log('[problem-analyzer-ai] input', {
    problemText,
    audienceText,
    answerKeys: Object.keys(answers),
    aiContextBytes: aiContextJson.length,
    promptBytes: prompt.length,
    validationTargetCount: aiContext.validationTargets.length,
  })

  const startedAt = Date.now()

  return await traced(
    async (span) => {
      span.log({
        input: {
          problemText,
          audienceText,
          answerKeys: Object.keys(answers),
          aiContextBytes: aiContextJson.length,
          promptBytes: prompt.length,
          validationTargetCount: aiContext.validationTargets.length,
        },
        metadata: {
          feature: 'problem-analyzer',
          promptVersion: 'problem-analyzer-v2-ai-prompt-1',
          contextVersion: aiContext.version,
          model: MODEL,
        },
      })

      const result = await btAI.generateText({
        model: openai(MODEL),
        output: Output.object({
          schema: problemAnalyzerAiSchema,
        }),
        system: PROBLEM_ANALYZER_SYSTEM_PROMPT,
        prompt,
      })

      const schemaEval = evaluateSchemaValidity(result.output)

      console.log('[schema-eval]', schemaEval)

      span.log({
        output: {
          summary: result.output.summary,
          recommendationTitle: result.output.recommendation?.title,
          nextFocusTitle: result.output.nextFocus?.title,
          validationGuidanceCount: result.output.insightValidationGuidance.length,
        },
      })

      await logger.flush()

      return result.output
    },
    { name: 'problem-analyzer.generateProblemAnalysis' }
  )
}
