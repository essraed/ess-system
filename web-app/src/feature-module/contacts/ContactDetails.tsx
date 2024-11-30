

import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";

interface Props {
  modalId: string;
}

const ContactDetails = ({ modalId }: Props) => {
  // const { t } = useTranslation();

  const {
    contactStore: { currentContact },
  } = useStore();

  // if (!currentContact) return <p>loading .....</p>;

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
                    Contact Details
                  </h3>
                </div>
                <Divider />
                <div className="mt-4 grid grid-cols-2 gap-6">
                  {currentContact?.name && (
                    <div>
                      <p className="font-medium text-gray-700">Name:</p>
                      <p className="text-gray-600">{currentContact?.name}</p>
                    </div>
                  )}
                  {currentContact?.subject && (
                    <div>
                      <p className="font-medium text-gray-700">Subject:</p>
                      <p className="text-gray-600">{currentContact?.subject}</p>
                    </div>
                  )}
                  {currentContact?.phone && (
                    <div>
                      <p className="font-medium text-gray-700">Phone:</p>
                      <p className="text-gray-600">{currentContact?.phone}</p>
                    </div>
                  )}
                  {currentContact?.email && (
                    <div>
                      <p className="font-medium text-gray-700">Email:</p>
                      <p className="text-gray-600">{currentContact?.email}</p>
                    </div>
                  )}
                  {currentContact?.isBussinesSetup && (
                    <div>
                      <p className="font-medium text-gray-700">Is Business Setup:</p>
                      <p className="text-gray-600">{(currentContact?.isBussinesSetup)?"Yes":"No"}</p>
                    </div>
                  )}
                  {currentContact?.createDate && (
                    <div>
                      <p className="font-medium text-gray-700">Create Date:</p>
                      <p className="text-gray-600">
                        {currentContact?.createDate?.toString()}
                      </p>
                    </div>
                  )}
                </div>
                <Divider/>
                <div>
                {currentContact?.message && (
                    <div>
                      <p className="font-medium text-gray-700">Message:</p>
                      <p className="text-gray-600">{currentContact?.message}</p>
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

export default observer(ContactDetails);
