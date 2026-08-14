import { PageContainer } from '@/components/layout/PageContainer'
import { Hero } from '@/components/sections/Hero'
import { SplitRow } from '@/components/sections/SplitRow'
import { UnderConstructionNotice } from '@/components/sections/UnderConstructionNotice'
import { Band } from '@/components/ui/Band'
import { Button } from '@/components/ui/Button'
import { FeatureItem } from '@/components/ui/FeatureItem'
import { Section } from '@/components/ui/Section'
import { BookIcon, ChartIcon, ClockIcon, CoinIcon } from '@/components/ui/icons'
import { SITE } from '@/constants/site'
import heroImage from '@/assets/Yamanashi902_1.jpeg'

const QUALITIES = [
  {
    icon: BookIcon,
    label: 'Evidence-based',
    description: 'Every pattern carries the research it rests on.',
  },
  {
    icon: ClockIcon,
    label: 'Fast to build',
    description: 'Designed for four-year governance cycles, not twenty.',
  },
  { icon: CoinIcon, label: 'Low cost', description: 'Built to survive a constrained budget.' },
  {
    icon: ChartIcon,
    label: 'Measurable',
    description: 'Stated outcomes you can actually check afterwards.',
  },
]

export function Home() {
  return (
    <>
      <Hero
        eyebrow={SITE.programme}
        title={SITE.name}
        description={SITE.intro}
        image={heroImage}
        imageAlt="Morning light through a moss-covered forest floor in Yamanashi, Japan"
        actions={
          <>
            <Button to="/patterns" size="lg">
              Explore the patterns
            </Button>
            <Button to="/about" variant="outline-light" size="lg">
              About the project
            </Button>
          </>
        }
      />

      <Band tone="green">
        <UnderConstructionNotice />
      </Band>

      <PageContainer>
        <Section
          eyebrow="What we're building"
          title="A pattern library, not a report"
          description="Two halves of the same argument: what to build, and why it works."
        >
          <div className="space-y-20 md:space-y-28">
            <SplitRow
              eyebrow="The patterns"
              title="One problem, one solution, evidence attached"
              body="Each pattern names a recurring problem in the city and a solution that has worked somewhere real. Written so a municipal officer can open it in a meeting without reading twelve papers first."
              imageLabel="Pattern image"
              actions={
                <Button to="/patterns" variant="ghost" className="px-0 hover:bg-transparent">
                  Browse the patterns &rarr;
                </Button>
              }
            />

            <SplitRow
              reverse
              eyebrow="The research"
              title="Forest bathing, brought into the city"
              body="Shinrin-yoku has measurable effects on stress, blood pressure and immune function. Almost all of that evidence comes from forests outside cities. Our question is how much of it survives the move inside one."
              imageLabel="Research image"
              actions={
                <Button to="/about" variant="ghost" className="px-0 hover:bg-transparent">
                  How we work &rarr;
                </Button>
              }
            />
          </div>
        </Section>
      </PageContainer>

      <Band tone="soft">
        <Section
          centered
          eyebrow="What makes a pattern"
          title="Four things every pattern has to be"
        >
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
            {QUALITIES.map((quality) => (
              <FeatureItem
                key={quality.label}
                icon={quality.icon}
                label={quality.label}
                description={quality.description}
              />
            ))}
          </div>
        </Section>
      </Band>
    </>
  )
}
