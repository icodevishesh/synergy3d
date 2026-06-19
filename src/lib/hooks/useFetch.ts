import { useState, useEffect, useRef } from 'react';

interface FetchOptions extends RequestInit {
  skipCache?: boolean;
}

const memoryCache: Record<string, any> = {};

export function useFetch<T>(url: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cacheKey = useRef(url);

  useEffect(() => {
    cacheKey.current = url;
    
    if (!options?.skipCache && memoryCache[url]) {
      setData(memoryCache[url]);
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    setIsLoading(true);

    fetch(url, { ...options, signal: abortController.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        memoryCache[url] = json;
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error, setData };
}
