import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

const ServiceDetailSidebar = () => {
  return (
    <div className="col-lg-4 theiaStickySidebar">
      <div className="stickybar">

        <div className="review-sec extra-service mt-0">
          <div className="review-header">
            <h4>Listing Owner Details</h4>
          </div>
          <div className="owner-detail">
            <div className="owner-img">
              <Link to="#">
                <ImageWithBasePath

                  lazyLoad={true} src="assets/img/logo.svg" alt="User" />
              </Link>
              <span className="badge-check">
                <ImageWithBasePath
                  lazyLoad={true} src="assets/img/logo.svg" alt="User" />
              </span>
            </div>
            <div className="reviewbox-list-rating">
              <h5>
                <Link to={""}>Emirates Secretarial Services</Link>
              </h5>
              <p>
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <span> (5.0)</span>
              </p>
            </div>
          </div>
          <ul className="booking-list">
            <li>
              Email
              <span>info@example.com</span>
            </li>
            <li>
              Phone Number
              <span>
                <a href="tel:0523412595">05 234 12 595</a>
              </span>
            </li>
            <li>
              Location
              <span>Next to Karama Post Office, Dubai, UAE</span>
            </li>
          </ul>
          <div className="message-btn">
            <Link to="#" className="btn btn-order">
              Message to owner
            </Link>
            <Link to="#" className="chat-link">
              <i className="fa-brands fa-whatsapp" />
              Chat Via Whatsapp
            </Link>
          </div>
        </div>

        <div className="review-sec share-car mt-0">
          <div className="review-header">
            <h4>Area</h4>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28901.292484086762!2d55.27690550729217!3d25.276987292230905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c5c34cb655b%3A0x4b3091a8eaad071b!2sDubai%2C%20UAE!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
            className="iframe-video"
          />
        </div>

        <div className="review-sec share-car mt-0 mb-0">
          <div className="review-header">
            <h4>Share</h4>
          </div>
          <ul className="nav-social">
            <li>
              <Link to="#">
                <i className="fa-brands fa-facebook-f fa-facebook fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-instagram fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-behance fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fa-brands fa-pinterest-p fi-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-twitter fi-icon" />{" "}
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-linkedin fi-icon" />
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetailSidebar;
