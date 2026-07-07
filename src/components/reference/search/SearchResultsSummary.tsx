interface SearchResultsSummaryProps {
  label: string;
}

export function SearchResultsSummary({ label }: SearchResultsSummaryProps) {
  return (
    <p className="mb-4 text-center text-base font-medium text-primary lg:text-left">
      {label}
    </p>
  );
}
