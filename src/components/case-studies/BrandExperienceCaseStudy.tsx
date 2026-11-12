import {
  faCompass,
  faPenNib,
  faWandMagicSparkles,
  faCode,
  faMagnifyingGlass,
  faBookOpen,
  faLayerGroup,
  faRocket,
  faChartLine,
  faClone,
  faPalette,
  faGaugeHigh,
  faPenToSquare,
  faUniversalAccess,
  faMobileScreen,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Body, Card, FeatureCards, ImageSlot, Lead, ProcessSteps, RoleCard, SectionTitle, SubTitle } from "./shared";

/*
 * 04 · Brand Experience: Brand Websites & Digital Experiences.
 * An overview of this body of work. Showcase slots are left for real project
 * screenshots; no results are invented.
 */

const showcase = [
  { kind: "Corporate website", title: "Company & product site", text: "Story-led home page, product pages and a CMS the marketing team can run on its own." },
  { kind: "Product launch", title: "Launch microsite", text: "A single scroll that builds anticipation, explains the product and drives sign-ups." },
  { kind: "Campaign", title: "Campaign landing pages", text: "Fast, modular pages for paid and social campaigns, built from one kit." },
  { kind: "Personal brand", title: "Portfolio & personal sites", text: "Expressive sites where motion and type carry the personality." },
];

export default function BrandExperienceCaseStudy() {
  return (
    <div className="flex h-full flex-col px-4 py-12 lg:px-7 lg:py-20">
      <div className="space-y-24 max-w-4xl mx-auto w-full">
        {/* ===== PROJECT SUMMARY ===== */}
        <section id="project-summary" className="space-y-8 scroll-mt-8">
          <SectionTitle first>Project summary</SectionTitle>
          <div className="space-y-4 max-w-3xl">
            <Body>
              A brand's website is often the first real conversation it has with a customer. I design and ship <strong>brand websites and digital experiences</strong> that make that conversation feel unmistakably like the brand, from the first scroll to the last click.
            </Body>
            <Body>
              This work spans corporate websites, product launches, campaign pages and personal brands. Each one balances three things: <strong>a clear story</strong>, <strong>a distinctive look and feel</strong>, and <strong>a site the team can keep running</strong> without a designer on call.
            </Body>
          </div>

          <SubTitle>What I bring</SubTitle>
          <FeatureCards
            cols={4}
            items={[
              { icon: faCompass, title: "Story & structure", text: "Positioning, messaging hierarchy and site maps that guide visitors to the right next step." },
              { icon: faPenNib, title: "Visual identity on screen", text: "Turning brand guidelines into layouts, type scales, colour and imagery that work on the web." },
              { icon: faWandMagicSparkles, title: "Motion & interaction", text: "Micro-interactions and scroll moments that add personality without slowing the page." },
              { icon: faCode, title: "Build-ready handoff", text: "Responsive specs, components and CMS structure that developers and marketers can trust." },
            ]}
          />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">My Role</h2>
            <RoleCard
              title="Lead Designer"
              meta="Brand websites · landing pages · digital campaigns"
              text="I lead these projects from the first workshop to launch: shaping the story, designing the visual system and every key page, prototyping motion, and working with developers so what ships matches what was designed."
            />
          </div>
        </section>

        {/* ===== THE CHALLENGE ===== */}
        <section id="challenge" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>The Challenge</SectionTitle>
          <Lead>
            Most brand sites look fine and say little. <span className="text-brand">They blend in, slow down and go stale.</span>
          </Lead>
          <FeatureCards
            cols={2}
            items={[
              { icon: faClone, title: "Template sameness", text: "Off-the-shelf themes make different brands look interchangeable, so nothing is remembered." },
              { icon: faPalette, title: "Identity that breaks online", text: "Guidelines made for print don't say how type, colour and imagery should behave on a screen." },
              { icon: faGaugeHigh, title: "Heavy, slow pages", text: "Big visuals and effects added late make pages slow, especially on mobile networks." },
              { icon: faPenToSquare, title: "Teams can't update it", text: "When every change needs a developer, content ages and campaigns launch late." },
            ]}
          />
        </section>

        {/* ===== APPROACH ===== */}
        <section id="approach" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Approach</SectionTitle>
          <Lead>
            Start with the story, design a system, then <span className="text-brand">let motion and detail make it memorable.</span>
          </Lead>

          <SubTitle note="The same six steps, scaled to the size of the project.">Process</SubTitle>
          <ProcessSteps
            steps={[
              { icon: faMagnifyingGlass, title: "Discover", text: "Brand, audience, competitors and the one action the site must drive." },
              { icon: faBookOpen, title: "Story", text: "Messaging hierarchy, site map and page narratives." },
              { icon: faLayerGroup, title: "System", text: "Type, colour, grid, imagery and reusable sections." },
              { icon: faWandMagicSparkles, title: "Prototype", text: "Key pages and motion, tested on real devices." },
              { icon: faRocket, title: "Build & launch", text: "Handoff, QA and CMS set-up with the team." },
              { icon: faChartLine, title: "Measure", text: "Analytics, heatmaps and iteration after launch." },
            ]}
          />

          <SubTitle>Principles</SubTitle>
          <FeatureCards
            items={[
              { icon: faHeart, title: "Distinct, not decorative", text: "Every visual choice should make the brand more recognisable, not just prettier." },
              { icon: faMobileScreen, title: "Mobile and fast first", text: "Designed for a phone on a patchy network, then enhanced for larger screens." },
              { icon: faUniversalAccess, title: "Accessible by default", text: "Contrast, readable type, keyboard paths and reduced-motion support from day one." },
            ]}
          />
        </section>

        {/* ===== SHOWCASE ===== */}
        <section id="showcase" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Showcase</SectionTitle>
          <Lead>A selection of the kinds of experiences I design.</Lead>
          <div className="grid gap-6 md:grid-cols-2">
            {showcase.map((s) => (
              <Card key={s.title} className="space-y-4 !p-4">
                <ImageSlot label={`Add a screenshot of a ${s.kind.toLowerCase()} project`} />
                <div className="px-2 pb-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{s.kind}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{s.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== CONCLUSION ===== */}
        <section id="impact" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Conclusion</SectionTitle>
          <Lead>
            A good brand experience is <span className="text-brand">recognisable in a second and easy to keep alive</span> for years.
          </Lead>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Clear story", d: "Visitors understand what the brand does and what to do next within one scroll." },
              { t: "Owned by the team", d: "Marketing can publish pages and campaigns without waiting for development." },
              { t: "Built to last", d: "A system of sections and styles keeps new pages on-brand as the site grows." },
            ].map((x) => (
              <Card key={x.t} className="space-y-2">
                <FontAwesomeIcon icon={faHeart} className="size-4 text-brand" />
                <h3 className="text-lg font-semibold text-ink">{x.t}</h3>
                <p className="text-sm text-ink/70">{x.d}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
