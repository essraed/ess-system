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
  const { serviceStore: { uploadImage }, userStore } = useStore();
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));

  // Handling favorite item selection (for example)
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="col-lg-4 col-md-6 col-12 w-1/3 px-2" data-aos="fade-down">
      <div className="listing-item">
        <div className="listing-img">
          <Link to={`/listings/service-details/${service.id}`}>
            <ImageWithBasePath
              lazyLoad={true}
              src={service.filePath || "assets/img/cars/car-03.jpg"}
              className="img-fluid h-[401px] w-[550px]"
              alt={service.name}
            />
          </Link>
          <div
            className="fav-item justify-content-end"
            key={service.id} // Using service ID as the key
            onClick={() => handleItemClick(7)}
          >
            {userStore.isAdmin() && <FileForm entityId={service.id} uploadImage={uploadImage} />}
          </div>
          <span className="featured-text">{service.categoryName}</span>
        </div>
        <div className="listing-content">
          <div className="listing-features d-flex align-items-end justify-content-between">
            <div className="list-rating">

              <h3 className="listing-title">
                <Link to={`/listings/service-details/${service.id}`}>{service.name}</Link>
              </h3>

            </div>
            <div className="list-km">
              <span className="km-count">
                <ImageWithBasePath
                  lazyLoad={true}
                  src="assets/img/icons/map-pin.svg"
                  alt="location"
                />
                {service.createDate && <p className="p-1">{service.createDate}</p>}
              </span>
            </div>
          </div>
          <div className="listing-details-group">
            <ul>
              {/* Add the relevant details for the service */}
              <li>
                <span>
                  <ImageWithBasePath
                    lazyLoad={true}
                    src="assets/img/icons/car-parts-05.svg"
                    alt="Manual"
                  />
                </span>
                <p>{service.price ? `${service.price} ${t('AED')}` : "Price N/A"}</p>{" "}
                {/* Display the price */}
              </li>
              {service.priceVIP &&
                <li>
                  <span>
                    <TbVip />
                  </span> 
                  <p>{service.priceVIP} {t('AED')}</p>
                </li>
              }
            </ul>
          </div>
          <div className="listing-location-details">
            <div className="listing-price">
              <span>
                <i className="feather icon-map-pin" />
              </span>
              {t(COMPANY_LOCATION) || "Unknown Location"}
            </div>
            <div className="listing-price">
              <h6>
                {service.price ? `$${service.price} ` : "Price Not Available"}{" "}
                <span></span>
              </h6>
            </div>
          </div>
          <div className="listing-button">
            <Link to={`/listings/service-details/${service.id}`} className="btn btn-order">
              <span>
                <i className="feather icon-calendar me-2" />
              </span>
              {t('Book Now')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ServiceCard);
