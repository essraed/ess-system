import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ServiceData } from "../../types/service";
import { TbVip } from "react-icons/tb";
import { COMPANY_LOCATION } from "../../environment";
import FileForm from '../common/FileForm'
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
type Props = {
  service: ServiceData;
};

const ServiceCard = ({ service }: Props) => {
  const { t } = useTranslation();
  const {
    serviceStore: { uploadImage },
    userStore,
  } = useStore();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleFavoriteToggle = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div
      className="col-lg-3 col-md-6 col-12 px-3 mb-5" 
      data-aos="fade-up"
    >
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
        <div className="p-3"> 
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-gray-800 truncate">
              <Link to={`/listings/service-details/${service.id}`}>
                {service.name}
              </Link>
            </h3>
            <p className="text-gray-500 text-xs">
              {service.createDate || "Unknown Date"}
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {service.price
              ? `${service.price} ${t("AED")}`
              : t("Price Not Available")}
          </p>
          {service.priceVIP && (
            <p className="flex items-center text-xs text-gray-700 mt-1">
              <TbVip className="mr-1 text-yellow-500" />
              {service.priceVIP} {t("AED")}
            </p>
          )}
          <div className="mt-3 flex justify-between items-center">
            <span className="text-gray-600 text-xs flex items-center"> 
              <i className="feather icon-map-pin mr-2"></i>
              {t(COMPANY_LOCATION) || "Unknown Location"}
            </span>
            <Link
              to={`/listings/service-details/${service.id}`}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition"
            >
              {t("Book Now")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ServiceCard);
