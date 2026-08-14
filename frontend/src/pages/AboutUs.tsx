import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/sections/PageHeader'
import { SplitRow } from '@/components/sections/SplitRow'
import { Band } from '@/components/ui/Band'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Section } from '@/components/ui/Section'
import { PLACEHOLDER_TEXT, SITE } from '@/constants/site'

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

const TEAM = SITE.team.map((name) => ({
  name,
  role: 'Placeholder role',
  bio: PLACEHOLDER_TEXT.short,
}))

export function AboutUs() {
  return (
    <>
      <PageContainer>
        <PageHeader
          eyebrow="About us"
          title="Two students, one question about cities"
          description="Green Bridge is an HZ Honours Programme project asking how the measurable benefits of forest bathing can be brought into the everyday green spaces of European cities."
        />

        <Section>
          <SplitRow
            eyebrow="Why this project"
            title="Green space is treated as leftover land"
            body={PLACEHOLDER_TEXT.medium}
            imageLabel="Project image"
          />
        </Section>
      </PageContainer>

      <Band tone="soft">
        <Section
          eyebrow="How we work"
          title="The same four steps for every pattern"
          description="So each one arrives with the same kind of backing behind it."
        >
          <ol className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {APPROACH.map((item) => (
              <li key={item.step} className="border-l-2 border-green-300 pl-6">
                <span className="text-sm font-semibold tracking-[0.16em] text-green-500">
                  {item.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-green-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      </Band>

      <PageContainer>
        <Section
          eyebrow="The team"
          title="Who is behind this"
          description="Placeholder profiles. Photos and real bios will replace these."
        >
          <div className="grid gap-12 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div key={member.name} className="space-y-5">
                <PlaceholderImage
                  label="Photo"
                  aspect="portrait"
                  variant="plain"
                  className="max-w-[16rem]"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-green-900">{member.name}</h3>
                  <p className="text-sm uppercase tracking-[0.14em] text-neutral-400">
                    {member.role}
                  </p>
                  <p className="max-w-md leading-relaxed text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </PageContainer>
    </>
  )
}
