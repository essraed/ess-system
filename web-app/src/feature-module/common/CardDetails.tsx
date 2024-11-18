// PaymentDetails.js
import React from "react";
import { formatDateTime, separateCamelCase } from "../../lib/utils";
import { Img_Server_Path } from "../../environment";

type Props = {
  data: any;
};

const CardDetails = ({ data }: Props) => {
  if (!data) return <h1>Loading ......</h1>;

  return (
    <div className="invoice-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card-body">
              <div className="payment-details">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    {data.pictureUrl && (
                      <img
                        src={`${Img_Server_Path}${data.pictureUrl}`}
                        alt={data.name}
                        style={{ maxWidth: "100%", height: "70%" }}
                      />
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="invoice-total-box">
                      <div className="invoice-total-inner">
                        {Object.keys(data).map(
                          (key) =>
                            key !== "pictureUrl" &&
                            key !== "id" &&
                            key !== "serviceOptions" &&
                            data[key] !== "" && // Skip rendering 'image' as part of the dynamic data list
                            (key === "createDate" || key === "updateDate" ? (
                              <p key={key}>
                                {separateCamelCase(key)}:{" "}
                                <span>{formatDateTime(data[key])}</span>
                              </p>
                            ) : (
                              <p key={key}>
                                {separateCamelCase(key)}:{" "}
                                <span>{data[key]}</span>
                              </p>
                            ))
                        )}

                        {/* Render serviceOptions if they exist */}
                        {data.serviceOptions && data.serviceOptions.length > 0 && (
                          <div className="service-options">
                            <h4>Service Options:</h4>
                            {data.serviceOptions.map((option: any, index: number) => (
                              <div key={index} className="service-option-item">
                                <p >
                                  Name:<span>{option.name}</span> -{" "}<br/>
                                  Description:<span>{option.description ? option.description : "No description"}{" "}</span>
                                  <br />
                                  Additional Fee: <span>{option.additionalFee}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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

export default CardDetails;
