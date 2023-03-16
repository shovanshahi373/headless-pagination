import { useState, useEffect, useMemo } from "react";

import { IUsePaginationProps } from "./types";

import { buildLabels } from "./util";

import useMount from "./hooks/useMount";

const usePagination = ({
  total,
  initialPage = 1,
  perpage = 20,
  handleChange,
  maxAllowedLabels = 1,
  renderOnOnePageCount = false,
}: IUsePaginationProps) => {
  const [pageIndex, setPageIndex] = useState(
    Math.min(
      Math.max(0, Math.floor(total / perpage) - 1),
      Math.max(0, initialPage - 1)
    )
  );
  const [offset, setOffset] = useState({
    start: 0,
    end: 0,
  });

  useMount({ onMount: () => setPageIndex(0) }, perpage);

  const spreadDegree = Math.min(5, Math.floor(maxAllowedLabels));

  const pages = Math.ceil(Math.max(0, total) / perpage);

  const hasNext = total > offset.end;
  const hasPrev = offset.start > 0;

  const isValidPage = (page: number) => page >= 0 && page < pages;

  const nextPage = () => {
    if (!hasNext) return;
    const page = pageIndex + 1;
    setPageIndex(page);
    handleChange({ page, size: perpage });
  };
  const prevPage = () => {
    const page = Math.max(0, pageIndex - 1);
    setPageIndex(page);
    handleChange({ page, size: perpage });
  };

  const jumpPage = (newPage: number) => {
    const page = newPage - 1;
    if (!isValidPage(page)) return;
    setPageIndex(page);
    handleChange({ page, size: perpage });
  };

  const labels = useMemo(() => {
    if (!pages) return renderOnOnePageCount ? [pages] : [];
    return buildLabels({
      proximity: spreadDegree,
      totalPages: pages,
      currentPageIndex: pageIndex,
    });
  }, [pageIndex, pages, renderOnOnePageCount, spreadDegree]);

  useEffect(() => {
    const start = pageIndex * perpage;
    const end = Math.min(start + perpage, total);
    setOffset({
      start,
      end,
    });
  }, [pageIndex, perpage, total]);

  return {
    offset,
    pages,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    jumpPage,
    page: pageIndex + 1,
    labels,
  };
};

export default usePagination;
export interface PaginationProps
  extends Omit<ReturnType<typeof usePagination>, "offset"> {}
