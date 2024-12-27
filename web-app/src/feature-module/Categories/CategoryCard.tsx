import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CategoryData } from "../../types/category";
import FileForm from "../common/FileForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  category: CategoryData;
};
const CategoryCard = ({ category }: Props) => {
  const { t } = useTranslation();
  const {
    userStore: { isAdmin, language },
    categoryStore: { uploadImage },
  } = useStore();

  const isRTL = language === "ar";

  console.log("image", category.fileEntities);

  return (
    <div
      className="col-lg-3 col-md-3 col-6 aos-init aos-animate wow zoomIn"
      data-wow-delay="0.3s"
      data-aos="fade-down"
    >
      <div className="listing-item position-relative">
        {/* Top-right FileForm */}
        {uploadImage && isAdmin() && (
          <div
            className="position-absolute top-0 end-0 m-2"
            style={{ zIndex: 10 }}
          >
            <FileForm
              label=""
              entityId={category.id}
              uploadImage={uploadImage}
            />
          </div>
        )}

        <div className="listing-img">
          <div className="img-slider owl-carousel owl-loaded owl-drag">
            <div className="owl-stage-outer">
              <div className="owl-stage">
                <div className="owl-item cloned">
                  <div className="slide-images">
                    <Link to={`/services/${category.id}`}>
                      {category.fileEntities &&
                      category.fileEntities.length > 0 ? (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src={
                            !category.fileEntities[0]?.filePath
                              ? "assets/img/Amer Services.png"
                              : category.fileEntities[0].filePath
                          }
                          alt={category.name ?? "Category"}
                          className="img-fluid"
                        />
                      ) : (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src="assets/img/Amer Services.png"
                          alt={category.name ?? "Category"}
                          className="img-fluid"
                        />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link to={`/services/${category.id}`}>
            <div className="listing-content">
              <div className="listing-features d-flex align-items-end justify-content-between">
                <div className="list-rating">
                  <h3 className="listing-title">
                    <Link to="/listing-details">
                      {category.name ?? "Category Name"}
                    </Link>
                  </h3>
                  {/* <p>{category.description ?? "No description available."}</p> */}
                </div>
              </div>
              <div className="view-more-btn text-center">
                <Link
                  to={`/services/${category.id}`}
                  className="btn btn-secondary-new"
                >
                  {t("View Services")}{" "}
                  <i
                    className="fas fa-arrow-right ps-3"
                    style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                  ></i>
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(CategoryCard);
