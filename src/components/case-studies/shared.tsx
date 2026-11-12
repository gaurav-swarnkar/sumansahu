import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import sumansahuImage from "../../imports/Main/suman_sahu.png";

/* Building blocks shared by the newer case-study pages, so titles and common
 * sections look the same across projects. */

export function SectionTitle({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return <h1 className={`text-4xl font-bold text-ink mb-8 ${first ? "" : "mt-20"}`}>{children}</h1>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl text-2xl font-semibold leading-snug text-ink">{children}</p>;
}

export function SubTitle({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold text-ink mt-12 mb-6">{children}</h2>
      {note && <p className="text-base text-ink/60 max-w-3xl">{note}</p>}
    </div>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return <p className="text-base leading-relaxed text-ink/80">{children}</p>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 ${className}`}>{children}</div>;
}

export function IconChip({ icon }: { icon: IconDefinition }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
      <FontAwesomeIcon icon={icon} className="size-5" />
    </span>
  );
}

export function FeatureCards({ items, cols = 3 }: { items: { icon: IconDefinition; title: string; text: ReactNode }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-4 ${grid}`}>
      {items.map((i) => (
        <Card key={i.title} className="space-y-3">
          <IconChip icon={i.icon} />
          <h3 className="text-lg font-semibold text-ink">{i.title}</h3>
          <p className="text-sm leading-relaxed text-ink/70">{i.text}</p>
        </Card>
      ))}
    </div>
  );
}

export function RoleCard({ title, meta, text }: { title: string; meta: string; text: ReactNode }) {
  return (
    <Card className="space-y-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="size-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-lilac-100 shadow-lg ring-2 ring-brand/20">
          <img src={sumansahuImage} alt="Suman Sahu" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{title}</p>
          <h3 className="text-2xl font-bold text-ink">Suman Sahu</h3>
          <p className="text-sm text-ink/60">{meta}</p>
        </div>
      </div>
      <Body>{text}</Body>
    </Card>
  );
}

/** A slot for real project imagery; shows a tidy placeholder until an image is supplied. */
export function ImageSlot({ src, label, aspect = "aspect-[16/10]" }: { src?: string; label: string; aspect?: string }) {
  return src ? (
    <img src={src} alt={label} className={`${aspect} w-full rounded-xl object-cover`} />
  ) : (
    <div className={`${aspect} flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/15 bg-canvas text-ink/40`}>
      <FontAwesomeIcon icon={faImage} className="size-6" />
      <span className="px-4 text-center text-xs font-medium">{label}</span>
    </div>
  );
}

export function ProcessSteps({ steps }: { steps: { icon: IconDefinition; title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-2xl p-4 bg-white shadow-sm ring-1 ring-ink/5">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand text-white">
              <FontAwesomeIcon icon={s.icon} className="size-4" />
            </span>
            <span className="text-xs font-semibold text-brand">0{i + 1}</span>
          </div>
          <p className="mt-3 font-semibold text-ink">{s.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink/60">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
