

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";

interface Props {
  modalId: string;
}

const CategoryDetails = ({ modalId }: Props) => {
  const { t } = useTranslation();
  const {
    categoryStore: { currentCategory },
  } = useStore();

  // if (!currentCategory) return <p>loading .....</p>;

  return (
    <div
      className="modal new-modal fade"
      id={modalId}
      data-keyboard="false"
      data-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered z-50">
        <div className="modal-content">
          <div className="modal-body">
            <div className="max-w-5xl mx-auto m-3 space-y-6">
              {/* Service Information Section */}
              <div className="p-6">
                <div className="flex items-center gap-5 justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Category Details
                  </h3>
                </div>
                <Divider />
                <div className="mt-4 grid grid-cols-2 gap-6">
                  {currentCategory?.name && (
                    <div>
                      <p className="font-medium text-gray-700">Name:</p>
                      <p className="text-gray-600">{currentCategory?.name}</p>
                    </div>
                  )}
                  {currentCategory?.createDate && (
                    <div>
                      <p className="font-medium text-gray-700">Create Date:</p>
                      <p className="text-gray-600">
                        {currentCategory?.createDate?.toString()}
                      </p>
                    </div>
                  )}
                  {currentCategory?.createdBy && (
                    <div>
                      <p className="font-medium text-gray-700">Created By:</p>
                      <p className="text-gray-600">{currentCategory.createdBy}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center mt-4">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CategoryDetails);
