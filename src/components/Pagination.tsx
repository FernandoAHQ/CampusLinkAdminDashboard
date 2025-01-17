import { Pagination } from "flowbite-react";

type Props = {
  currentPage: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setCurrentPage: Function;
  totalPages: number;
};

export function Paginator({ currentPage, setCurrentPage, totalPages }: Props) {
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
