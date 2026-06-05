import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const strategicJudgmentSchema = z.object({
  score: z.number().min(1).max(5),
  verdictQuality: z.enum(['good', 'mixed', 'poor']),
  recommendationQuality: z.enum(['good', 'mixed', 'poor']),
  nextStepQuality: z.enum(['good', 'mixed', 'poor']),
  rationale: z.string(),
  missingNuance: z.array(z.string()),
  suggestedLogicImprovements: z.array(z.string()),
})

export async function evaluateStrategicJudgmentQuality({
  input,
  output,
}: {
  input: unknown
  output: unknown
}) {
  const result = await generateObject({
    model: openai('gpt-5.4-mini'),
    maxOutputTokens: 1500,
    schema: strategicJudgmentSchema,
    system: `
You are an expert startup advisor evaluating the strategic quality of a founder-facing problem analysis report.

Your job is not to judge writing quality. Your job is to judge whether the strategic reasoning and founder guidance are substantively good.

Evaluate whether the report gives a founder sound guidance about:
- the strength of the problem
- the main strategic constraint
- whether to build, validate, refine, reconsider, or move on
- the highest-leverage next action
- what evidence should be collected next

Be strict. Many plausible-sounding recommendations are not strategically useful.

Reward:
- clear founder decision support
- advice grounded in the actual evidence
- correct interpretation of demand, urgency, frequency, economic impact, timing, audience clarity, incumbent strength, and validation depth
- appropriate skepticism when evidence is weak
- willingness to recommend reframing or abandoning weak ideas
- actionable validation strategy
- prioritization of behavioral evidence over opinions

Penalize:
- advice that is too optimistic
- advice that is too conservative
- generic validation advice
- recommendations that do not follow from the evidence
- missing important strategic constraints
- over-weighting weak evidence such as complaints or interviews
- under-weighting strong evidence such as customer spend, urgency, switching behavior, measurable economic pain, or active workarounds
- recommendations that sound sophisticated but are not decision-useful

Focus especially on whether the deterministic evaluation system appears to be missing important strategic nuance or logic distinctions that could materially improve recommendation quality.

If the current logic appears directionally correct, it is acceptable for missingNuance and suggestedLogicImprovements to be empty or minimal.

Do not invent critique purely to appear insightful.

Return at most 2 missingNuance items.

Return at most 3 suggestedLogicImprovements items. 

Only include genuinely high-leverage observations.

Do not repeat the same critique across multiple fields unless materially adding new insight.

Focus on critique of the evaluation framework itself, not alternative startup ideas or adjacent opportunities.

rationale:
- 2 sentences maximum
- prioritize the single most important strengths and weaknesses
- Avoid exhaustive review of every section.
- Do not summarize the entire report.
- Prefer high-information-density critique.
- Focus on what materially affects founder decision quality.

missingNuance:
- Identify strategic nuance the current evaluation may underweight, oversimplify, or fail to distinguish clearly enough.
- Focus on nuance that could materially change the recommendation, interpretation, or confidence.
- Prefer business/behavioral nuance over writing critique.
- This field critiques the reasoning quality of the evaluation itself, not the wording.
- Prefer identifying missing distinctions over inventing entirely new dimensions.

Good examples:
- “The framework may overweight interview count relative to demonstrated customer spend.”
- “The analysis does not distinguish between mild consumer inconvenience and workflow-critical operational pain.”
- “The evaluation treats broad audiences negatively even when urgency and switching signals are unusually strong.”
- “The framework does not distinguish between tolerated friction and painful operational dependency.”

suggestedLogicImprovements:
- Suggest concrete improvements to the deterministic evaluation system itself.
- Focus on implementable improvements to:
  - scoring logic
  - weighting
  - signal interpretation
  - missing distinctions
  - behavioral evidence interpretation
  - context generation
- Recommendations should be specific enough that a product engineer or PM could reasonably implement them.
- Prefer improving interpretation quality over expanding taxonomy unnecessarily.

Good examples:
- “Add a distinction between high-frequency pain and high-cost infrequent pain.”
- “Separate willingness-to-pay evidence from general validation evidence.”
- “Differentiate between passive dissatisfaction and active workaround creation.”
- “Track whether existing solutions are tolerated because switching costs are high versus because the pain is weak.”
- “Weight demonstrated switching behavior more heavily than interview count.”

Avoid:
- generic writing feedback
- prompt wording suggestions
- vague comments like ‘improve the recommendation’
- speculative startup advice
- inventing critique without evidence
`,
    prompt: `
Input:
${JSON.stringify(input, null, 2)}

Generated report:
${JSON.stringify(output, null, 2)}

Return your evaluation.
`,
  })
  console.log(result.usage)
  return {
    name: 'strategic_judgment_quality',
    score: result.object.score / 5,
    metadata: result.object,
  }
}
