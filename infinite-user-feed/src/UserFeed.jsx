import React, { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import UserCard from "./UserCard";

const USERS_PER_PAGE = 10;

const fetchUsers = async (skip = 0) => {
  try {
    const res = await axios.get(
      `https://tech-test.raintor.com/api/users/GetUsersList?take=${USERS_PER_PAGE}&skip=${skip}`
    );
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

const UserFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 0 }) => fetchUsers(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.total) return undefined;
      const nextSkip = pages.length * USERS_PER_PAGE;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const loadMoreRef = useRef();

  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "20px",
    });

    const current = loadMoreRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
      observer.disconnect();
    };
  }, [handleIntersection]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="user-feed">
        <div className="user-feed__loading">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="user-feed">
        <div className="user-feed__error">
          <h3>❌ Error Loading Users</h3>
          <p>{error?.message || "Something went wrong while fetching users."}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data?.pages?.length) {
    return (
      <div className="user-feed">
        <div className="user-feed__empty">
          <h3>⚠️ No Users Found</h3>
          <p>No user data is currently available.</p>
        </div>
      </div>
    );
  }

 
  const loadedUsers = data.pages.reduce((total, page) => total + (page.users?.length || 0), 0);

  return (
    <div className="user-feed">
      <div className="user-feed__header">
        <h2>Users Directory</h2>
      
      </div>

      <div className="user-feed__list">
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.users?.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div className="user-feed__loading-more">
          <div className="loading-spinner loading-spinner--small"></div>
          <p>Loading more users...</p>
        </div>
      )}

      {/* Load more trigger */}
      <div 
        ref={loadMoreRef} 
        className="user-feed__load-trigger"
        aria-hidden="true"
      />

      {/* End of list indicator */}
      {!hasNextPage && loadedUsers > 0 && (
        <div className="user-feed__end">
          <p>🎉 You've reached the end of the list!</p>
        </div>
      )}
    </div>
  );
};

export default UserFeed;