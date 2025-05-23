import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite"; // or remove if using Redux
import { useStore } from "../../app/stores/store"; // adjust to your store path
import Header from "../common/header";
import Footer from "../common/footer";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialsViewList = () => {
  const {
    testimonialStore: { testimonials, loadTestimonials },
  } = useStore();

  useEffect(() => {
    loadTestimonials();
    AOS.init({ duration: 1200, once: true });
  }, [loadTestimonials]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <>
        <Header />
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mt-4">No Testimonials Yet</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="main-wrapper">
        <div className="custom-container mx-auto px-4 py-8 testimonials-section">
          <div className="testimonial-group">
            <div className="row flex flex-wrap -mx-3">
              {testimonials.map((review, index) => (
                <div
                  key={index}
                  className="col-lg-6 col-12 px-3 mb-6 flex"
                  data-aos="fade-down"
                  data-aos-duration={1200}
                  data-aos-delay={800 + index * 100}
                >
                  <div className="card flex-fill bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative w-full p-6">
                    <p className="text-gray-800 italic mb-4">
                      &ldquo;{review.message}&rdquo;
                    </p>
                    <h6 className="text-lg font-semibold text-right text-[#0f8992]">
                      - {review.customerName}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination (static example) */}
          <div
            className="row mt-8"
            data-aos="fade-down"
            data-aos-duration={1200}
            data-aos-delay={900}
          >
            {/* <div className="col-lg-12 flex justify-center">
              <nav>
                <ul className="pagination flex space-x-2">
                  <li className="previtem">
                    <Link className="page-link px-3 py-1 border rounded" to="#">
                      <i className="fas fa-arrow-left me-2" /> Prev
                    </Link>
                  </li>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <li key={page} className="page-item">
                      <Link
                        className={`page-link px-3 py-1 border rounded ${
                          page === 2 ? "active bg-[#0f8992] text-white" : ""
                        }`}
                        to="#"
                      >
                        {page}
                        {page === 2 && <span className="visually-hidden">(current)</span>}
                      </Link>
                    </li>
                  ))}
                  <li className="nextlink">
                    <Link className="page-link px-3 py-1 border rounded" to="#">
                      Next <i className="fas fa-arrow-right ms-2" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
          {/* /Pagination */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default observer(TestimonialsViewList);
