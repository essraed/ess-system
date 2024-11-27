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
import { CompanyLocation } from "../../environment";
import FileForm from '../common/FileForm'
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
type Props = {
  service: ServiceData;
};

const ServiceCard = ({ service }: Props) => {

  const {serviceStore: {uploadImage}, userStore} = useStore();

  const routes = all_routes;
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
          <span className="featured-text">{service.name}</span>
        </div>
        <div className="listing-content">
          <div className="listing-features d-flex align-items-end justify-content-between">
            <div className="list-rating">
             
              <h3 className="listing-title">
                <Link to={`/listings/service-details/${service.id}`}>{service.name}</Link>
              </h3>
              <div className="list-rating">
                {/* Assuming `service.rate` is a numeric value representing the rating out of 5 */}
                {[...Array(5)].map((_, index) => {
                  // Check if the index is less than the whole number part of the rating
                  const fullStar = index < Math.floor(service.rate);
                  // Check if the index is equal to the decimal part of the rating (for half star)
                  const halfStar =
                    index === Math.floor(service.rate) &&
                    service.rate % 1 >= 0.5;

                  return (
                    <i
                      style={halfStar ? { color: "#ff9409" } : {}}
                      key={index}
                      className={`fas ${fullStar ? "fa-star filled" : "fa-star"} ${halfStar ? "fa-solid fa-star-half-stroke text-yellow-500" : ""}`} // Dynamically fill based on the rate
                    />
                  );
                })}
                <span>({service.rate})</span>{" "}
                {/* <span>({service.rate}) 150 Reviews</span>{" "} */}
                {/* Show actual rating value from the service */}
              </div>
            </div>
            <div className="list-km">
              <span className="km-count">
                <ImageWithBasePath
                  src="assets/img/icons/map-pin.svg"
                  alt="location"
                />
                {service.createDate &&
                  new Date(service.createDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="listing-details-group">
            <ul>
              {/* Add the relevant details for the service */}
              <li>
                <span>
                  <ImageWithBasePath
                    src="assets/img/icons/car-parts-05.svg"
                    alt="Manual"
                  />
                </span>
                <p>{service.price ? `$${service.price}` : "Price N/A"}</p>{" "}
                {/* Display the price */}
              </li>
              <li>
                <span>
                  <TbVip />
                </span>
                <p>
                  {service.priceVIP
                    ? `$${service.priceVIP}`
                    : "Price N/A"}
                </p>
              </li>
            </ul>
          </div>
          <div className="listing-location-details">
            <div className="listing-price">
              <span>
                <i className="feather icon-map-pin" />
              </span>
              {CompanyLocation || "Unknown Location"}
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
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer (ServiceCard);
