interface CategoryHeadingProps {
  title: string;
  description?: string;
}

export function CategoryHeading({ title, description }: CategoryHeadingProps) {
  return (
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-normal text-primary md:text-4xl">{title}</h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
