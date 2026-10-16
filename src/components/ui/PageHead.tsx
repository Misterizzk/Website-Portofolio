import type { ReactNode } from "react";

export function PageHead({ crumb, title, aside }: { crumb: string; title: string; aside?: ReactNode }) {
  return (
    <section className="head">
      <div>
        <p className="crumb">
          Portfolio / <b>{crumb}</b>
        </p>
        <h1>{title}</h1>
      </div>
      {aside}
    </section>
  );
}
