export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
