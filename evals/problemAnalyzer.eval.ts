import './setup'
import { Eval } from 'braintrust'

import { generateProblemAnalysis } from '@/lib/problem-analyzer/v2/ai/generateProblemAnalysis'
import { evaluateSchemaValidity } from '@/lib/problem-analyzer/v2/ai/evals/deterministic/schemaValidity'
import { problemAnalyzerFixtures } from './problemAnalyzerFixtures.ts'

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
  ],
})
