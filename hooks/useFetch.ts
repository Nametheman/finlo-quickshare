import { useCallback, useState } from "react";

type AsyncFunction<T, A extends any[]> = (...args: A) => Promise<T>;

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useFetch<T = any, A extends any[] = any[]>(
  asyncFunction: AsyncFunction<T, A>
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (...args: A): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await asyncFunction(...args);
        setState({ data: result, error: null, loading: false });
        return result;
      } catch (err: any) {
        // Handle Supabase and generic errors
        const errorMessage =
          err?.message ||
          err?.error_description || // Some Supabase functions use this
          "Something went wrong. Please try again.";
        setState({ data: null, error: errorMessage, loading: false });
        return null;
      }
    },
    [asyncFunction]
  );

  return {
    ...state,
    execute,
  };
}
