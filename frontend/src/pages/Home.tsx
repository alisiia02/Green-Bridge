import { PageContainer } from '@/components/layout/PageContainer'
import { Hero } from '@/components/sections/Hero'
import { UnderConstructionNotice } from '@/components/sections/UnderConstructionNotice'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardTitle } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Section } from '@/components/ui/Section'
import { SITE } from '@/constants/site'

const TEASERS = [
  {
    title: 'About the project',
    body: 'Who we are, why urban green space quality is the problem we picked, and how the research is being carried out.',
    to: '/about',
    linkLabel: 'Read about us',
    imageLabel: 'Project image coming soon',
  },
  {
    title: 'The pattern library',
    body: 'Each pattern names one recurring problem and one evidence-backed solution, written to be usable without a specialist to translate it.',
    to: '/patterns',
    linkLabel: 'Browse patterns',
    imageLabel: 'Pattern image coming soon',
  },
  {
    title: 'Built on shinrin-yoku',
    body: 'Forest bathing has measurable effects on stress and immune function. Our question is how much of that survives the move into a city.',
    to: '/patterns',
    linkLabel: 'See the evidence',
    imageLabel: 'Research image coming soon',
  },
]

export function Home() {
  return (
    <PageContainer>
      <div className="pt-8 md:pt-12">
        <Hero
          eyebrow="HZ Honours Programme"
          title={SITE.name}
          description={SITE.intro}
          imageLabel="Header image coming soon"
          actions={
            <>
              <Button to="/patterns" size="lg">
                Explore the patterns
              </Button>
              <Button to="/about" variant="outline" size="lg">
                About the project
              </Button>
            </>
          }
        />
      </div>

      <Section className="pb-4">
        <UnderConstructionNotice />
      </Section>

      <Section
        title="What will be here"
        description="A preview of the three parts of the site. The layout is final; the content is not."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {TEASERS.map((teaser) => (
            <Card key={teaser.title} className="flex flex-col gap-5 p-6">
              <PlaceholderImage label={teaser.imageLabel} aspect="video" />
              <div className="flex flex-1 flex-col gap-3">
                <CardTitle>{teaser.title}</CardTitle>
                <CardBody className="flex-1 text-sm">{teaser.body}</CardBody>
                <Button to={teaser.to} variant="ghost" size="sm" className="self-start px-0 hover:bg-transparent hover:text-green-600">
                  {teaser.linkLabel} &rarr;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </PageContainer>
  )
}
