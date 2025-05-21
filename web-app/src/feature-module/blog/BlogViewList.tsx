import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import Header from "../common/header";
import Footer from "../common/footer";
import FileForm from "../common/FileForm";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import LoadingSpinner from "../common/LoadingSpinner";

const BlogDetails = () => {
  const {
    blogStore: { uploadImage, blogs, loadBlogs },
    userStore,
  } = useStore();

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  if(!blogs?.length){
    return (<>
    <Header/>
      <div className="text-center py-10">
      <h2 className="text-xl font-semibold mt-4">No Blogs Yet</h2>
    </div>
    <Footer/>
    </>)
  
  }

  return (
    <>
      <Header />
      <div className="custom-container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold mb-6 text-center">Our Blog</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            >
              {userStore.isMarketUser() && (
                <div className="absolute top-2 right-2 z-10">
                  <FileForm
                    entityId={blog.id}
                    uploadImage={(formData) => uploadImage(formData, blog.id)}
                  />
                </div>
              )}
              {blog.fileEntities && blog.fileEntities.length > 0 ? (
               <div className="w-">
               <ImageWithBasePath
                 lazyLoad={true}
                 src={
                   !blog.fileEntities[0]?.filePath
                     ? "assets/img/Amer Services.png"
                     : blog.fileEntities[0].filePath
                 }
                 alt={blog.blogTitle ?? "Blog"}
                 className="w-full h-auto object-contain"
               />
             </div>
              ) : (
                <div className="w-full">
                <ImageWithBasePath
                  lazyLoad={true}
                  src="assets/img/Amer Services.png"
                  alt={blog.blogTitle ?? "Blog"}
                  className="w-full h-auto object-contain"
                />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.blogTitle}
                </h2>
                <p className="text-gray-600 text-base mb-4 line-clamp-3">
                  {blog.blogContent}
                </p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="text-[#0f8992] hover:underline font-medium"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default observer(BlogDetails);
