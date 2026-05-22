import { judgeOutput } from './judgeOutput'

export function evaluateGroundedTone(output: unknown) {
  return judgeOutput({
    name: 'grounded_tone',
    output,
    rubric: `
Score whether the output sounds like grounded founder guidance rather than AI-generated, gimmicky, over-written, or consultant-like copy.

5 = practical, calm, direct, specific, credible.
3 = mostly grounded but has some AI cadence, vague phrasing, or over-polished language.
1 = gimmicky, generic, motivational, theatrical, consultant-like, or obviously AI-written.

Penalize phrases like:
- "strategic tension"
- "customer pull"
- "materially sharper angle"
- "not just nod along"
- "narrow, learning-focused build test"

Reward:
- plain English
- direct recommendations
- founder-useful wording
- concrete examples of behavior or evidence
`,
  })
}
