import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
 
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmDialog = ({
  onConfirm,
  title,
  description,
}: Props) => {
  const { t } = useTranslation();
  return (

<div
  className="modal new-modal fade"
  id="delete_account"
  data-keyboard="false"
  data-backdrop="static"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-body">
        <div className="delete-action">
          <div className="delete-header">
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <div className="modal-btn">
            <div className="row">
              <div className="col-6" onClick={onConfirm}>
               <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary w-100"
                >
                  Delete
                </Link>
              </div>
              <div className="col-6" >
               <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary w-100"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ConfirmDialog;