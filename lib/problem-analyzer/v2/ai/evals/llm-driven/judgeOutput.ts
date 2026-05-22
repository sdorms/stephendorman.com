// model/judgeOutput.ts

import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const judgeSchema = z.object({
  score: z.number().min(1).max(5),
  rationale: z.string(),
})

export async function judgeOutput({
  name,
  rubric,
  output,
}: {
  name: string
  rubric: string
  output: unknown
}) {
  const result = await generateObject({
    model: openai('gpt-5.4-mini'),
    schema: judgeSchema,
    system: `
You are evaluating AI-generated product analysis for a founder-facing problem validation tool.

Score from 1 to 5.

Be strict but fair.
Do not reward sounding sophisticated.
Reward clarity, specificity, groundedness, and decision usefulness.
Return only the structured score and rationale.
`,
    prompt: `
Evaluation name:
${name}

Rubric:
${rubric}

Output to evaluate:
${JSON.stringify(output, null, 2)}
`,
  })

  return {
    name,
    score: result.object.score / 5,
    metadata: {
      rawScore: result.object.score,
      rationale: result.object.rationale,
    },
  }
}
