import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ServiceData } from "../../types/service";
import { TbVip } from "react-icons/tb";
import FileForm from '../common/FileForm'
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { Divider } from "@nextui-org/react";
type Props = {
  service: ServiceData;
};

const ServiceCard = ({ service }: Props) => {
  const { t } = useTranslation();
  const {
    serviceStore: { uploadImage },
    userStore,
  } = useStore();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    

    <div
      className="col-lg-3 col-md-6 col-12 px-3 mb-5"
      data-aos="fade-up"
    >
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center items-center">
     
          </div>
        <div className="relative overflow-hidden rounded-t-lg">
          <Link to={`/listings/service-details/${service.id}`}>
            <ImageWithBasePath
              lazyLoad={true}
              src={service.filePath || "assets/img/cars/car-03.jpg"}
              className="w-full h-48 object-cover"
              alt={service.name}
            />
          </Link>
          {userStore.isAdmin() && (
            <div className="absolute bottom-4 right-4">
              <FileForm entityId={service.id} uploadImage={uploadImage} />
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col gap-2">
          {/* <div className="flex justify-center items-center">
            <div className="text-lg font-semibold text-slate-900">
              <Link to={`/listings/service-details/${service.id}`}>
                {service.name}
              </Link>
            </div>
          </div> */}
          <Divider />
          <div className="flex justify-between-new items-center">
            <Link
              to={`/listings/service-details/${service.id}`}
              className="flex px-3 py-1.5 bg-blue-5000 text-white rounded hover:bg-blue-600 transition justify-center"
            >
              <div>
                {t("Book Now")}
              </div>
            </Link>
            {/* <p className="text-gray-900 text-sm mt-1 border p-2 rounded">
              {service.price
                ? `${service.price} ${t("AED")}`
                : t("Price Not Available")}
            </p> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ServiceCard);
