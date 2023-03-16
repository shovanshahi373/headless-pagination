export { type PaginationProps } from "./usePagination";

export interface IUsePaginationProps {
  total: number;
  perpage?: number;
  initialPage?: number;
  handleChange: (props: { page: number; size?: number }) => void;
  maxAllowedLabels?: number;
  renderOnOnePageCount?: boolean;
}
