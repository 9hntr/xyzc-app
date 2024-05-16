"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchUsers, getUserFollowing } from "@/app/api-hooks";
import { debounce } from "lodash";
import { GripHorizontal, Search } from "lucide-react";
import { CategoryList } from "./CategoryList";
import { FeaturedCreators } from "./FeaturedCreators";
import { UserCard, GridType, CategoryTitle } from "@/types";
import { TabSlider } from "./TabSlider";
import { Dots2x2 } from "@/app/Components/icons/Dots2x2";
import { categories } from "@/lib/constants";

let tabs: {
  id: GridType;
  label: () => JSX.Element;
}[] = [
  {
    id: 1,
    label: () => (
      <GripHorizontal
        className="cursor-pointer transition duration-150 hover:scale-105"
        size={20}
      />
    ),
  },
  {
    id: 2,
    label: () => (
      <Dots2x2 className="ml-1 mt-0.5 flex cursor-pointer transition duration-150 hover:scale-105" />
    ),
  },
];

export const Explore = ({ category }: { category: string }) => {
  const defaultCategory: number = category
    ? categories.findIndex((c) => c === category) + 1
    : 0;
  let [activeTab, setActiveTab] = useState<GridType>(1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([
    defaultCategory,
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<UserCard[]>([]);

  const { data: following, isFetching: fetchingFollowing } = useQuery({
    queryKey: ["following"],
    queryFn: getUserFollowing,
  });

  const {
    status: fetchingUsersStatus,
    data: paginatedUsers,
    refetch: refetchUsers,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["paginatedUsers"],
    queryFn: ({ pageParam = 1 }) =>
      fetchUsers({
        query: searchQuery,
        categories: selectedCategories.includes(0) ? [] : selectedCategories,
        limit: 6,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5min
  });

  useEffect(() => {
    const debouncedFetchUsers = debounce(() => {
      refetchUsers();
    }, 150);

    debouncedFetchUsers();

    return () => debouncedFetchUsers.cancel();
  }, [refetchUsers, searchQuery, selectedCategories]);

  const { ref: reloadNextItems, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (paginatedUsers) {
      const newUsers: UserCard[] = [];
      paginatedUsers.pages.forEach((page) => newUsers.push(...page.users));

      if (newUsers.length < 6) setUsers(newUsers);
      else setUsers([...newUsers, ...Array(8).fill(null)]);
    }
  }, [paginatedUsers]);

  const gridTypeMap = {
    1: () => (
      <FeaturedCreators
        following={following}
        fetchingFollowing={fetchingFollowing}
        className="flex h-auto w-full flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
        fetchingUsersStatus={fetchingUsersStatus}
        users={users}
      />
    ),
    2: () => (
      <FeaturedCreators
        following={following}
        fetchingFollowing={fetchingFollowing}
        className="flex h-auto w-full flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]"
        fetchingUsersStatus={fetchingUsersStatus}
        users={users}
      />
    ),
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "/" && searchInputRef.current)
        searchInputRef.current.focus();
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [category, selectedCategories]);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const hdlSearchInput = (event: any) => {
    if (event.target.value === "/") return;

    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative mx-4 my-8 flex flex-col">
      <div className="mb-6 mt-4">
        <h1 className="text-left text-4xl font-bold">Explore creators</h1>
      </div>

      <CategoryList
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <div className="mb-8 flex w-full items-center justify-center gap-x-2">
        <div className="flex w-full rounded-xl border-2 border-gray-100 bg-background px-3 py-2 hover:border-gray-200 dark:border-secondary md:w-full">
          <span className="md:text-md flex select-none items-center justify-center pl-1 pr-3 text-xs font-bold text-primary">
            <Search size={15} />
          </span>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={searchInputRef}
            value={searchQuery}
            onChange={hdlSearchInput}
            type="text"
            placeholder="Search by Users"
            className="text-md w-full border-none bg-transparent text-primary outline-none focus:outline-none"
          />
          <div className="ml-3 mr-1 flex select-none items-center justify-center rounded-lg bg-secondary px-3">
            <span className="md:text-md text-xs font-semibold text-muted-foreground">
              {isInputFocused ? "esc" : "/"}
            </span>
          </div>
        </div>
        <div className="hidden h-full basis-1/3 flex-row rounded-xl border-2 border-secondary bg-secondary bg-none dark:border-secondary md:flex md:basis-1/6">
          <TabSlider
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      {gridTypeMap[activeTab]()}
      <span
        className="absolute bottom-[80vh] h-px w-full opacity-0"
        ref={reloadNextItems}
      />
    </div>
  );
};
