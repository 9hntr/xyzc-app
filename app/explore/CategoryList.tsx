import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import React, { Fragment } from "react";
import { fetchCategories } from "@/app/api-hooks";

export const CategoryList = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const allCategoriesId = 0;
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const hdlSelectCategory = (categoryId: number) => {
    let updatedcategories: number[] = [];

    if (categoryId === allCategoriesId) {
      setSelectedCategories([allCategoriesId]);
      return;
    }

    if (selectedCategories.includes(categoryId)) {
      updatedcategories = selectedCategories.filter((id) => id !== categoryId);
    } else updatedcategories = [...selectedCategories, categoryId];

    updatedcategories = updatedcategories.filter(
      (id) => id !== allCategoriesId
    );

    if (!updatedcategories.length) updatedcategories = [allCategoriesId];

    setSelectedCategories(updatedcategories);
  };

  return (
    <div className="mb-4 flex w-full items-center justify-center">
      <div
        onClick={() => hdlSelectCategory(0)}
        className={`flex w-full cursor-pointer items-center justify-center rounded-3xl border-2 bg-background px-4 py-2 ${
          selectedCategories.includes(0)
            ? "border-primary font-bold text-primary"
            : "border-muted-primary text-muted-foreground hover:border-gray-200"
        }`}
      >
        <span className="text-sm">All</span>
      </div>
      <Carousel className="h-10 w-4/5 pl-2 md:w-11/12 md:pl-4">
        <CarouselContent className="pl-4">
          {categories?.length ? (
            categories?.map(({ id, title }) => (
              <CarouselItem key={id} className="basis-auto pl-[4px]">
                <div
                  onClick={() => hdlSelectCategory(id)}
                  className={`flex w-full cursor-pointer items-center justify-center rounded-3xl border-2 bg-background px-4 py-2 ${
                    selectedCategories.includes(id)
                      ? "border-primary font-bold text-primary"
                      : "border-muted-primary  text-muted-foreground hover:border-gray-200"
                  }`}
                >
                  <span className="text-sm">{title}</span>
                </div>
              </CarouselItem>
            ))
          ) : (
            <Fragment>
              {Array.from({ length: 16 }).map((_, index) => (
                <CarouselItem key={index} className="basis-auto pl-[4px]">
                  <div className="relative flex w-full cursor-pointer items-center justify-center rounded-3xl px-4 py-2">
                    <span className="invisible px-6">_</span>
                    <Skeleton className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-3xl bg-secondary" />
                  </div>
                </CarouselItem>
              ))}
            </Fragment>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
