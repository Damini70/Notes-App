import React, { useEffect, useState, useRef } from 'react';
import { userData } from '@/lib/infiniteScrollData';

export default function InfiniteScroll() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const limit = 25;

  const getPaginatedData = (data: any[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return data.slice(startIndex, endIndex);
  };

  // Load initial data
  useEffect(() => {
    const initialData = getPaginatedData(userData, page.current, limit);
    setData(initialData);
    if (initialData.length < limit) {
      setHasMore(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 10) {
        loadMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const loadMoreData = () => {
    setLoading(true);
    const nextPage = page.current + 1;
    const moreData = getPaginatedData(userData, nextPage, limit);

    setTimeout(() => {
      if (moreData.length > 0) {
        setData(prev => [...prev, ...moreData]);
        page.current = nextPage;
        if (moreData.length < limit) setHasMore(false);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 500); // Simulate async delay
  };

  return (
    <div style={{ padding: '1rem' }}>
      {data.map((item: any, index) => (
        <h1 key={index}>{item?.name}</h1>
      ))}

      {loading && <p>Loading...</p>}
      {!hasMore && <p style={{ color: 'gray' }}>No more data to load.</p>}
    </div>
  );
}
