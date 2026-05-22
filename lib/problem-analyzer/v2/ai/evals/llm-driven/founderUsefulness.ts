import { judgeOutput } from './judgeOutput'

export function evaluateFounderUsefulness(output: unknown) {
  return judgeOutput({
    name: 'founder_usefulness',
    output,
    rubric: `
Score whether the output would help a founder make a better decision about whether and how to proceed.

5 = highly decision-useful; clearly explains strength, constraint, and next action.
3 = directionally useful but somewhat generic, incomplete, or not decisive enough.
1 = not useful; vague, generic, misleading, or lacking actionable guidance.

Reward:
- clear read on problem strength
- advice grounded in evidence
- explicit next step
- focus on behavioral proof
- willingness to recommend reframing or moving on when appropriate

Penalize:
- generic advice
- over-optimism
- advice that does not follow from the evidence
- recommendations that are too vague to act on
`,
  })
}
