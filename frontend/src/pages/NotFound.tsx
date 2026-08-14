import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/sections/PageHeader'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export function NotFound() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="404"
        title="This page does not exist"
        description="The link may be out of date, or the page has not been built yet. Most of this site is still in progress."
      />
      <Section className="pb-24">
        <Button to="/">Back to home</Button>
      </Section>
    </PageContainer>
  )
}
