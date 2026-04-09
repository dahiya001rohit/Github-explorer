import { useState, useEffect, useRef, useCallback } from "react";

export const ITEMS_PER_LOAD = 6;

export function useInfiniteScroll(repos) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [visibleRepos, setVisibleRepos] = useState([]);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  // Reset visible count when repos array changes (new user selected)
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [repos]);

  // Update visible repos slice whenever count or repos changes
  useEffect(() => {
    setVisibleRepos(repos.slice(0, visibleCount));
  }, [visibleCount, repos]);

  // Callback ref for sentinel — sets up observer when element mounts
  const sentinelRef = useCallback(
    (node) => {
      // Disconnect previous observer
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
        { root: scrollContainerRef.current, threshold: 0.1 }
      );

      observerRef.current.observe(node);
    },
    [repos.length]
  );

  // Cleanup observer on unmount
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


