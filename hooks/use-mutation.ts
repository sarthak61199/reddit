import { tryCatch } from "@/hooks/try-catch";
import { MutationOptions, MutationResult, Response } from "@/types";
import { useTransition } from "react";

export function useMutation(): MutationResult {
  const [isPending, startTransition] = useTransition();

  const mutate = <TData>(
    mutationFn: () => Promise<Response<TData>>,
    options: MutationOptions<Response<TData>>
  ) => {
    const { onSuccess, onError } = options;

    startTransition(async () => {
      const { response, error } = await tryCatch(mutationFn());

      if (error || !response?.success) {
        const errorMessage =
          error?.message || response?.message || "An error occurred";

        onError(errorMessage);
        return;
      }

      onSuccess(response);
    });
  };

  return {
    mutate,
    isPending,
  };
}
