import { judgeOutput } from './judgeOutput'

export function evaluateClarityReadability(output: unknown) {
  return judgeOutput({
    name: 'clarity_readability',
    output,
    rubric: `
Score whether the output is immediately understandable to a founder seeing the report for the first time.

5 = clear, direct, easy to scan, low cognitive load.
3 = understandable but somewhat wordy, abstract, or dense.
1 = confusing, jargon-heavy, vague, or hard to quickly interpret.

Penalize:
- long dense sentences
- vague phrasing
- unclear subject/action
- consultant-style abstraction
- unnecessary filler

Reward:
- clear bottom-line assessment
- concrete customer behavior
- simple language
- obvious next action
`,
  })
}
