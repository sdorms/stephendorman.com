import { problemAnalyzerAiSchema } from '@/lib/problem-analyzer/v2/ai/schema'

type EvalResult = {
  name: string
  score: 0 | 1
  passed: boolean
  metadata: {
    errors: Array<{
      path: string
      message: string
    }>
  }
}

export function evaluateSchemaValidity(output: unknown): EvalResult {
  const result = problemAnalyzerAiSchema.safeParse(output)

  if (result.success) {
    return {
      name: 'schema_validity',
      score: 1,
      passed: true,
      metadata: {
        errors: [],
      },
    }
  }

  return {
    name: 'schema_validity',
    score: 0,
    passed: false,
    metadata: {
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    },
  }
}
