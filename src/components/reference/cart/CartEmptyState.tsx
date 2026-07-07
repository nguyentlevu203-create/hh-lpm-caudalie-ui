interface CartEmptyStateProps {
  onGoBackShopping?: () => void;
}

export function CartEmptyState({ onGoBackShopping }: CartEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-xl text-primary">Your cart is empty</p>
      <p className="mt-3 text-base text-muted-foreground">
        Looks like you haven&apos;t added any items to the bag yet. Start
        shopping to fill it in.
      </p>
      {onGoBackShopping && (
        <button
          type="button"
          onClick={onGoBackShopping}
          className="mt-6 w-full rounded-md bg-primary px-6 py-3 text-base text-primary-foreground"
        >
          Go back shopping
        </button>
      )}
    </div>
  );
}
