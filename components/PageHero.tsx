import type { ReactNode } from "react";

type Props = { title: string; intro?: ReactNode; children?: ReactNode; aside?: ReactNode };

/** The warm-grey band at the top of each inner page: H1 plus one sentence. */
export function PageHero({ title, intro, children, aside }: Props) {
  return (
    <section className="bg-surface-alt py-10 md:py-16">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[720px]">
            <h1 className="font-display text-[36px] font-bold leading-[1.1] md:text-[52px]">{title}</h1>
            {intro && <p className="mt-4 text-[17px] text-muted md:text-[19px]">{intro}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}
