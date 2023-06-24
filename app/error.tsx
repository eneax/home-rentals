"use client";

import * as React from "react";

import EmptyState from "@/components/empty-state";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Error"
      subtitle="An error occurred. Please try again later."
    />
  );
};

export default ErrorState;
