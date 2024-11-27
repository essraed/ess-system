import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CategoryData } from "../../types/category";
import { ActionResult } from "../../types";

type Props = {
  className?: string;
  category: CategoryData;
  uploadImage?: (formData: FormData) => Promise<ActionResult<string>>;
};
const CategoryCard = ({ category }: Props) => {
  return (
    <div className="col-lg-3 col-md-3 col-6 aos-init aos-animate wow zoomIn" data-wow-delay="0.3s" data-aos="fade-down">
      <div className="listing-item">
        <div className="listing-img">
          <div className="img-slider owl-carousel owl-loaded owl-drag">
            <div className="owl-stage-outer">
              <div className="owl-stage">
                <div className="owl-item cloned">
                  <div className="slide-images">
                    <Link to="/listing-details">
                      <ImageWithBasePath
                        src={category.filePath ?? "assets/img/placeholder.png"}
                        alt={category.name ?? "Category"}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="listing-content">
            <div className="listing-features d-flex align-items-end justify-content-between">
              <div className="list-rating">
                <h3 className="listing-title">
                  <Link to="/listing-details">{category.name ?? "Category Name"}</Link>
                </h3>
                <p>{category.description ?? "No description available."}</p>
              </div>
            </div>
            <div className="view-more-btn text-center">
              <Link to="/listing-grid" className="btn btn-secondary-new">
                View More <i className="fas fa-arrow-right ps-3"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CategoryCard;
