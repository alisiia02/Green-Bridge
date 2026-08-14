import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/sections/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Band } from '@/components/ui/Band'
import { Card } from '@/components/ui/Card'
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
    <>
      <PageContainer>
        <PageHeader
          eyebrow="Pattern library"
          title="Patterns"
          description="Each pattern names one recurring problem in the city and one solution with evidence behind it. Four patterns this cycle - depth over breadth."
        />
      </PageContainer>

      <Band tone="soft" className="mt-16">
        <Section>
          <div className="grid gap-8 md:grid-cols-2">
            {patterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>

          <p className="mt-12 text-sm text-neutral-500">
            Placeholder entries. Full write-ups, evidence and implementation guidance follow once
            the research phase is complete.
          </p>
        </Section>
      </Band>
    </>
  )
}

function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
    <Card className="flex flex-col gap-6 p-6 md:p-8">
      <PlaceholderImage label={pattern.imageAlt} aspect="video" variant="plain" />

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{pattern.category}</Badge>
        <Badge tone="neutral">{PATTERN_STATUS_LABEL[pattern.status]}</Badge>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-semibold tracking-tight text-green-900">{pattern.name}</h3>
        <p className="leading-relaxed text-neutral-600">{pattern.summary}</p>
      </div>
    </Card>
  )
}
