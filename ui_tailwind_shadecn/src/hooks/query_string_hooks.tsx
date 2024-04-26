import { useEffect, useState } from 'react';

export function useQueryString(key: string): string | null {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramValue = queryParams.get(key);
    setValue(paramValue);
  }, [key]);

  return value;
}