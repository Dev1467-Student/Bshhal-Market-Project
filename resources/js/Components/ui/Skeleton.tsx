import { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-none",
  circular: "rounded-full",
  rectangular: "rounded-none",
};

export default function Skeleton({
  variant = "rectangular",
  className = "",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse bg-gray-200",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className = "" }: ProductCardSkeletonProps) {
  return (
    <div
      className={[
        "flex flex-col border border-gray-200 bg-white",
        className,
      ].join(" ")}
      aria-label="Loading product"
      aria-busy="true"
    >
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
        <Skeleton className="mt-1 h-6 w-24" />
      </div>
    </div>
  );
}

export interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({
  count = 8,
  className = "",
}: ProductGridSkeletonProps) {
  return (
    <div
      className={[
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      ].join(" ")}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
