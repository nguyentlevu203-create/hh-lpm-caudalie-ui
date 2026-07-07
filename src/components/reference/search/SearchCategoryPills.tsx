import Link from "next/link";

interface SearchCategoryPillsProps {
  categories: string[];
}

export function SearchCategoryPills({ categories }: SearchCategoryPillsProps) {
  if (categories.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="mb-4 text-base font-medium text-primary">Categories</p>
      <ul className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <li key={`${category}-${index}`}>
            <Link
              href="#"
              className="inline-block rounded bg-primary px-3 py-1 text-sm text-white"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
