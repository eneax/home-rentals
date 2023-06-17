"use client";

import { useRouter } from "next/navigation";

import Heading from "@/components/heading";
import Button from "@/components/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subtitle = "Try adjusting your filter for better results.",
  showReset = false,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 items-center justify-center">
      <Heading title={title} subtitle={subtitle} center />

      {showReset && (
        <div className="w-48 mt-4">
          <Button
            label="Reset filters"
            outline
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
