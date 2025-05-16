import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ServiceData } from "../../types/service";
import FileForm from "../common/FileForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { Divider } from "@nextui-org/react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
type Props = {
  service: ServiceData;
  id: string | undefined;
};

const ServiceCard = ({ service, id }: Props) => {
  const { t } = useTranslation();
  const {
    serviceStore: { uploadImage },
    userStore,
  } = useStore();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="col-lg-3 col-md-6 col-12 px-3 mb-5" data-aos="fade-up">
      {/* Wrap the entire card in a Link component */}
      <Link to={`/listings/service-details/${service.id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300 block">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-center items-center"></div>
        {/* {userStore.isAdmin() && (
          <div
            className="position-absolute top-0 end-0 mt-2 mr-5"
            style={{ zIndex: 10 }}
          >
            <FileForm
              entityId={service.id}
              uploadImage={(formData) => uploadImage(formData, id)}
            />
          </div>
        )} */}
        {/* <div className="relative overflow-hidden rounded-t-lg">
          <Link to={`/listings/service-details/${service.id}`}>
          {service.fileEntities &&
                      service.fileEntities.length > 0 ? (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src={
                            !service.fileEntities[0]?.filePath
                              ? "assets/img/Amer Services.png"
                              : service.fileEntities[0].filePath
                          }
                          alt={service.name ?? "Service"}
                          className="img-fluid"
                        />
                      ) : (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src="assets/img/Amer Services.png"
                          alt={service.name ?? "Service"}
                          className="img-fluid"
                        />
                      )}
          </Link>
        </div>  */}
        <div className="relative p-3 flex flex-col gap-2">
          {/* Price Box Positioned Absolutely */}

          {/* Service Name */}
          <div className="p-3 flex flex-col justify-between max-h-40 gap-2 ">
            {/* Service Name */}
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-900 break-words">
                <Link to={`/listings/service-details/${service.id}`}>
                  {service.name}
                </Link>
              </div>
            </div>

            <Divider className="border-t-2 border-dashed border-[#1b6f77] my-6" />




            {/* Price at Bottom Center */}
            <div className="flex justify-center mt-auto">
              <Link
                className="text-black text-sm font-semibold"
                to={`/listings/service-details/${service.id}`}
              >
                <div className="bg-white py-2 px-3 text-center">
                  {service.price
                    ? `${service.price} ${t("AED")}`
                    : t("Price Not Available")}
                </div>
              </Link>
            </div>
          </div>

          {/* <div className="flex justify-between-new items-center">
            <Link
              to={`/listings/service-details/${service.id}`}
              className="flex px-3 py-1.5 bg-blue-5000 text-white rounded hover:bg-blue-600 transition justify-center"
            >
              <div>{t("Book Now")}</div>
            </Link>

            <p className="text-gray-900 text-sm mt-1 border p-2 rounded">
              {service.price
                ? `${service.price} ${t("AED")}`
                : t("Price Not Available")}
            </p>
          </div> */}
        </div>
      </div>
      </Link>   
    </div>
  );
};

export default observer(ServiceCard);