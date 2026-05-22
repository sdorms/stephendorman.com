import './setup'
import { Eval } from 'braintrust'

import { generateProblemAnalysis } from '@/lib/problem-analyzer/v2/ai/generateProblemAnalysis'
import { buildProblemAnalyzerAiContext } from '@/lib/problem-analyzer/v2/ai/context'
import { evaluateSchemaValidity } from '@/lib/problem-analyzer/v2/ai/evals/deterministic/schemaValidity'
import { evaluateValidationTargetCoverage } from '@/lib/problem-analyzer/v2/ai/evals/deterministic/validationTargetCoverage'
import { evaluateForbiddenTerminology } from '@/lib/problem-analyzer/v2/ai/evals/deterministic/forbiddenTerminology'
import { problemAnalyzerFixtures } from '../lib/problem-analyzer/v2/ai/evals/datasets/problemAnalyzerFixtures.ts'
import { evaluateClarityReadability } from '@/lib/problem-analyzer/v2/ai/evals/llm-driven/clarityReadability'
import { evaluateGroundedTone } from '@/lib/problem-analyzer/v2/ai/evals/llm-driven/groundedTone'
import { evaluateFounderUsefulness } from '@/lib/problem-analyzer/v2/ai/evals/llm-driven/founderUsefulness'
import { evaluateStrategicJudgmentQuality } from '@/lib/problem-analyzer/v2/ai/evals/llm-driven/strategicJudgementQuality'

Eval('Problem Analyzer AI', {
  experimentName: 'schema-validity-v1',

  data: problemAnalyzerFixtures,

  task: async (input) => {
    return generateProblemAnalysis(input)
  },

  scores: [
    async ({ output }) => {
      const result = evaluateSchemaValidity(output)

      return {
        name: result.name,
        score: result.score,
        metadata: result.metadata,
      }
    },
    async ({ input, output }) => {
      const aiContext = buildProblemAnalyzerAiContext(input)

      const result = evaluateValidationTargetCoverage({
        output,
        validationTargets: aiContext.validationTargets,
      })

      return {
        name: result.name,
        score: result.score,
        metadata: result.metadata,
      }
    },
    async ({ output }) => {
      const result = evaluateForbiddenTerminology(output)

      return {
        name: result.name,
        score: result.score,
        metadata: result.metadata,
      }
    },
    async ({ output }) => evaluateClarityReadability(output),
    async ({ output }) => evaluateGroundedTone(output),
    async ({ output }) => evaluateFounderUsefulness(output),
    async ({ input, output }) => {
      const aiContext = buildProblemAnalyzerAiContext(input)

      return evaluateStrategicJudgmentQuality({
        input: {
          userInput: input,
          aiContext,
        },
        output,
      })
    },
  ],
})
