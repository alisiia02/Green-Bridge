import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/sections/PageHeader'
import { Card, CardBody, CardTitle } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Section } from '@/components/ui/Section'
import { PLACEHOLDER_TEXT, SITE } from '@/constants/site'

const TEAM = SITE.team.map((name) => ({
  name,
  role: 'Placeholder role',
  bio: PLACEHOLDER_TEXT.short,
}))

const APPROACH = [
  {
    step: '01',
    title: 'Literature review',
    body: 'Identify candidate patterns through peer-reviewed research, expert books, and documented urban green space projects.',
  },
  {
    step: '02',
    title: 'Data gathering',
    body: 'Collect evidence for each candidate: real implementations, measurable outcomes, and the conditions they depend on.',
  },
  {
    step: '03',
    title: 'Expert interviews',
    body: 'Talk to planners, designers and municipality staff to check the patterns against real budgets and governance cycles.',
  },
  {
    step: '04',
    title: 'Pattern creation',
    body: 'Write each one up in a fixed format: problem, solution, evidence, conditions, and measurable benefits.',
  },
]

export function AboutUs() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="About us"
        title="Two students, one question about cities"
        description="Green Bridge is an HZ Honours Programme project asking how the measurable benefits of forest bathing can be brought into the everyday green spaces of European cities."
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <PlaceholderImage label="Project image coming soon" aspect="square" />
          <Card className="space-y-4 p-8">
            <CardTitle className="text-xl">Why this project</CardTitle>
            <CardBody>{PLACEHOLDER_TEXT.medium}</CardBody>
            <CardBody>{PLACEHOLDER_TEXT.medium}</CardBody>
          </Card>
        </div>
      </Section>

      <Section
        title="How we work"
        description="The same four steps run for every pattern we develop, so each one arrives with the same kind of backing."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {APPROACH.map((item) => (
            <Card key={item.step} className="space-y-3">
              <span className="text-sm font-semibold text-green-400">{item.step}</span>
              <CardTitle>{item.title}</CardTitle>
              <CardBody className="text-sm">{item.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="The team"
        description="Placeholder profiles. Photos and real bios will replace these."
        className="pb-20"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {TEAM.map((member) => (
            <Card key={member.name} className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <PlaceholderImage
                label="Photo"
                aspect="square"
                className="w-full shrink-0 p-3 sm:w-32"
              />
              <div className="space-y-2">
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-neutral-400">{member.role}</p>
                <CardBody className="text-sm">{member.bio}</CardBody>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </PageContainer>
  )
}
