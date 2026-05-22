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
  {
    input: {
      problemText:
        'People struggle to decide what restaurant to go to. There should be a better way to discover and choose places to eat.',
      audienceText: 'Urban consumers looking for restaurants with friends or partners',
      answers: {
        customerBehavior: 'complain_no_action',
        whyNow: 'no_meaningful_change',
        icpClarity: 'everyone',
        problemFrequency: 'weekly',
        problemSeverity: 'mild_inconvenience',
        economicImpact: 'no_measurable_impact',
        currentBehavior: 'poorly_solved',
        solutionGap: 'good_enough',
        validationEvidence: 'no_interviews',
      },
    },
  },
  {
    input: {
      problemText:
        'Developers need a faster, more accessible way to build and run code without local environment setup. A browser-based IDE would simplify development.',
      audienceText: 'Developers and coding students working across multiple devices',
      answers: {
        customerBehavior: 'using_workarounds',
        whyNow: 'structural_shift',
        icpClarity: 'defined_segment',
        problemFrequency: 'daily',
        problemSeverity: 'productivity_loss',
        economicImpact: 'time_productivity_only',
        currentBehavior: 'paying_competitor',
        solutionGap: 'good_enough',
        validationEvidence: 'ten_plus_interviews',
      },
    },
  },
  {
    input: {
      problemText:
        'Developers spend significant time writing, debugging, and navigating code. This slows development and increases cognitive load. There should be a faster way to write and understand code.',
      audienceText: 'Professional software developers and engineering teams',
      answers: {
        customerBehavior: 'using_workarounds',
        whyNow: 'structural_shift',
        icpClarity: 'extremely_specific_niche',
        problemFrequency: 'daily',
        problemSeverity: 'productivity_loss',
        economicImpact: 'clear_cost_increase',
        currentBehavior: 'paying_competitor',
        solutionGap: 'frustrating_but_tolerated',
        validationEvidence: 'ten_plus_interviews',
      },
    },
  },
]
