export interface Pagination {
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  perPage: number;
  isLastPage: boolean;
}
