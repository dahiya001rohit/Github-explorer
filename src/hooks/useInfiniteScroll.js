import { useState, useEffect, useRef, useCallback } from "react";

export const ITEMS_PER_LOAD = 6;

export function useInfiniteScroll(repos) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [visibleRepos, setVisibleRepos] = useState([]);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  // reset when repos changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [repos]);

  // update visible slice
  useEffect(() => {
    setVisibleRepos(repos.slice(0, visibleCount));
  }, [visibleCount, repos]);

  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) => {
              if (prev < repos.length) return prev + ITEMS_PER_LOAD;
              return prev;
            });
          }
        },
        { root: null, threshold: 0.1 } // ← root: null = viewport
      );

      observerRef.current.observe(node);
    },
    [repos.length]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return {
    visibleRepos,
    sentinelRef,
    scrollContainerRef,
    hasMore: visibleCount < repos.length,
  };
}