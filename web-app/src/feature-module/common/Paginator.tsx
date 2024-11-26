import React from "react";
import { PaginationData } from "../../types/pagination";
import { Pagination } from "@nextui-org/react";

type Props = {
  handleGetNext: (page: number) => void;
  pagination: PaginationData | null;
};

const Paginator = ({ pagination, handleGetNext }: Props) => {
  // const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div>
        {pagination && (
          <div dir="ltr" className="flex w-full justify-center">
            <Pagination
              color="primary"
              isCompact 
              showControls
              showShadow
              page={pagination.pageNumber}
              total={pagination.pageCount}
              onChange={(page) => handleGetNext(page)}
            />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Paginator;
