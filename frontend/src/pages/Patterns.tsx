import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Card, CardBody, CardTitle } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Section } from '@/components/ui/Section'
import { mockPatterns } from '@/data/mockPatterns'
import { PATTERN_STATUS_LABEL, type Pattern } from '@/types/pattern'

/**
 * Renders placeholder data from data/mockPatterns.ts.
 *
 * To read from the API instead, swap the import for `getJSON<Pattern[]>('/patterns')` from
 * lib/api.ts and add loading/error states - the backend endpoint already returns this shape.
 */
export function Patterns() {
  const patterns = mockPatterns

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Pattern library"
        title="Patterns"
        description="Each pattern names one recurring problem in the city and one solution with evidence behind it. Four patterns this cycle - depth over breadth."
      />

      <Section className="pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {patterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>

        <p className="mt-8 text-sm text-neutral-400">
          Placeholder entries. Full write-ups, evidence and implementation guidance follow once
          the research phase is complete.
        </p>
      </Section>
    </PageContainer>
  )
}

function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
    <Card className="flex flex-col gap-5">
      <PlaceholderImage label={pattern.imageAlt} aspect="video" />

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{pattern.category}</Badge>
        <Badge tone="neutral">{PATTERN_STATUS_LABEL[pattern.status]}</Badge>
      </div>

      <div className="space-y-3">
        <CardTitle className="text-xl">{pattern.name}</CardTitle>
        <CardBody>{pattern.summary}</CardBody>
      </div>
    </Card>
  )
}
