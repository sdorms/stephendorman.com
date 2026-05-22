type ValidationTarget = {
  insightId: string
}

type AiOutputWithValidationGuidance = {
  insightValidationGuidance?: Array<{
    insightId: string
    nextFocus: string
  }>
}

type EvalResult = {
  name: string
  score: 0 | 1
  passed: boolean
  metadata: {
    expectedCount: number
    actualCount: number
    missingInsightIds: string[]
    extraInsightIds: string[]
    duplicateInsightIds: string[]
  }
}

export function evaluateValidationTargetCoverage({
  output,
  validationTargets,
}: {
  output: AiOutputWithValidationGuidance
  validationTargets: ValidationTarget[]
}): EvalResult {
  const expectedIds = validationTargets.map((target) => target.insightId)
  const actualIds = output.insightValidationGuidance?.map((item) => item.insightId) ?? []

  const expectedSet = new Set(expectedIds)
  const actualSet = new Set(actualIds)

  const missingInsightIds = expectedIds.filter((id) => !actualSet.has(id))
  const extraInsightIds = actualIds.filter((id) => !expectedSet.has(id))

  const seen = new Set<string>()
  const duplicateInsightIds = actualIds.filter((id) => {
    if (seen.has(id)) return true
    seen.add(id)
    return false
  })

  const passed =
    expectedIds.length === actualIds.length &&
    missingInsightIds.length === 0 &&
    extraInsightIds.length === 0 &&
    duplicateInsightIds.length === 0

  return {
    name: 'validation_target_coverage',
    score: passed ? 1 : 0,
    passed,
    metadata: {
      expectedCount: expectedIds.length,
      actualCount: actualIds.length,
      missingInsightIds,
      extraInsightIds,
      duplicateInsightIds,
    },
  }
}
