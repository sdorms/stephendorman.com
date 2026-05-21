import type { AnswersMap } from '@/lib/problem-analyzer/score'

type EvalInput = {
  problemText: string
  audienceText: string
  answers: AnswersMap
}

export const problemAnalyzerFixtures: Array<{ input: EvalInput }> = [
  {
    input: {
      problemText:
        'People don’t spend enough time with friends because it’s hard to coordinate schedules. A platform to organize social plans would help.',
      audienceText: 'People ages 18-40',
      answers: {
        customerBehavior: 'complain_no_action',
        whyNow: 'no_meaningful_change',
        icpClarity: 'everyone',
        problemFrequency: 'weekly',
        problemSeverity: 'mild_inconvenience',
        economicImpact: 'no_measurable_impact',
        currentBehavior: 'ignored',
        solutionGap: 'good_enough',
        validationEvidence: 'no_interviews',
      },
    },
  },
  {
    input: {
      problemText:
        'Getting a reliable taxi is frustrating because wait times are long, availability is uncertain, and service quality is inconsistent.',
      audienceText: 'Urban professionals who frequently use taxis',
      answers: {
        customerBehavior: 'using_workarounds',
        whyNow: 'structural_shift',
        icpClarity: 'defined_segment',
        problemFrequency: 'weekly',
        problemSeverity: 'productivity_loss',
        economicImpact: 'time_productivity_only',
        currentBehavior: 'paying_competitor',
        solutionGap: 'frustrating_but_tolerated',
        validationEvidence: 'fewer_than_ten_interviews',
      },
    },
  },
]
