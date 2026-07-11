/** Full-bleed hero band — structural clone of /reference/brand-story's
 * `BrandStoryHero` (a full-bleed photo, no heading overlay, same
 * `aspect-[2734/880]` crop ratio). No real Hoàng Hà / Le Petit Marseillais
 * hero photography exists yet, so this uses a plain HH-color gradient in
 * place of the reference's photo — never a Caudalie image. */
export function BrandStoryHero() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[2734/880] w-full bg-gradient-to-br from-hh-primary via-hh-primary-dark to-hh-accent"
    />
  );
}
