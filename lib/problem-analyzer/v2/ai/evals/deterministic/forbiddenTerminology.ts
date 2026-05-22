type EvalResult = {
  name: string
  score: 0 | 1
  passed: boolean
  metadata: {
    matches: Array<{
      term: string
      field: string
      count: number
    }>
  }
}

const FORBIDDEN_TERMS = [
  'primaryRisk',
  'timing_window_risk',
  'validation posture',
  'build posture',
  'deterministic verdict',
  'strategic tension',
]

function flattenOutputText(
  value: unknown,
  path = 'output'
): Array<{ field: string; text: string }> {
  if (typeof value === 'string') {
    return [{ field: path, text: value }]
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenOutputText(item, `${path}.${index}`))
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      flattenOutputText(nestedValue, `${path}.${key}`)
    )
  }

  return []
}

function countOccurrences(text: string, term: string) {
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(escapedTerm, 'gi')
  return text.match(regex)?.length ?? 0
}

export function evaluateForbiddenTerminology(output: unknown): EvalResult {
  const textFields = flattenOutputText(output)

  const matches = textFields.flatMap(({ field, text }) =>
    FORBIDDEN_TERMS.flatMap((term) => {
      const count = countOccurrences(text, term)

      if (count === 0) {
        return []
      }

      return [
        {
          term,
          field,
          count,
        },
      ]
    })
  )

  const passed = matches.length === 0

  return {
    name: 'forbidden_terminology',
    score: passed ? 1 : 0,
    passed,
    metadata: {
      matches,
    },
  }
}
