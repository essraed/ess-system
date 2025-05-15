import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import Header from "../common/header";
import Footer from "../common/footer";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import FileForm from "../common/FileForm";
import LoadingSpinner from "../common/LoadingSpinner";

const BlogDetailsById = () => {
  const { id } = useParams();
  const {
    blogStore: { currentBlog, getBlog, uploadImageForPost },
    userStore,
  } = useStore();

  useEffect(() => {
    if (id) getBlog(id);
  }, [id, getBlog]);

  if (!currentBlog?.posts) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="main-wrapper">
      <Header />
      <div className="custom-container mx-auto px-4 py-8 mb-20">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {currentBlog.blogTitle}
        </h1>

        {currentBlog.posts.length > 0 ? (
          currentBlog.posts.map((post, index) => {
            const bgColor =
              index % 3 === 0
                ? "bg-white"
                : index % 3 === 1
                  ? "bg-gray-50"
                  : "bg-blue-50";

            const borderColor =
              index % 3 === 0
                ? "border-gray-200"
                : index % 3 === 1
                  ? "border-blue-200"
                  : "border-indigo-200";

            const roundedStyle =
              index % 3 === 0
                ? "rounded-xl"
                : index % 3 === 1
                  ? "rounded-2xl"
                  : "rounded-3xl";

            const flexDirection =
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";

            const hasImage = !!post.fileEntities?.[0]?.filePath;
            const imageSrc =
              post.fileEntities?.[0]?.filePath ??
              "assets/img/Amer Services.png";
            const imageName =
              post.fileEntities?.[0]?.fileName ?? "Centered image";
            const isCenterTitle = post.title?.toLowerCase().includes("center");

            return (
              <div
                key={post.id}
                className={`mb-2 p-0 bg-white overflow-hidden `}
                style={{ height: "750px" }}
              >
                {/* Case 1: Title includes "center" → show image centered */}
                {isCenterTitle ? (
                 <div className="relative w-[400px] h-[300px]">
                 <ImageWithBasePath
                   src={imageSrc}
                   alt={imageName}
                   className="w-full h-full object-cover rounded-xl"
                 />
                 <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded shadow">
                   <FileForm
                     entityId={post.id}
                     uploadImage={(formData) =>
                       uploadImageForPost(formData, post.id)
                     }
                   />
                 </div>
               </div>
               
                ) : !hasImage ? (
                  // Case 2: No image → show content centered
                  <div className="flex flex-col items-center justify-center text-center w-full h-full px-6 space-y-4 bg-white">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    {!/^\d+$/.test(post.content) && post.content && (
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {post.content}
                      </p>
                    )}

                    {/* Post Sections */}
                    {post.postSections && post.postSections.length > 0 && (
                      <div className="mt-1 space-y-2 border-t pt-2 w-full max-w-3xl mx-auto">
                        {post.postSections.map((section) => (
                          <div key={section.id} className="p-4 ">
                            <h3 className="text-lg font-semibold  mb-2">
                              {section.subHeader}
                            </h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {userStore.isMarketUser() && (
                      <FileForm
                        entityId={post.id}
                        uploadImage={(formData) =>
                          uploadImageForPost(formData, post.id)
                        }
                      />
                    )}
                  </div>
                ) : (
                  // Case 3: Image + content in row layout
                  <div
                    className={`flex flex-col ${flexDirection} items-center h-full`}
                  >
                    {/* Image side */}
                    <div className="w-full md:w-1/2 h-full">
                      <ImageWithBasePath
                        src={imageSrc}
                        alt={imageName}
                        className={`w-full h-auto object-cover ${roundedStyle}`}
                      />
                    </div>

                    {/* Text + uploader */}
                    <div className="w-full md:w-1/2 p-6 space-y-4 h-full overflow-y-auto">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {post.content || "No description provided."}
                      </p>

                      {/* Post Sections */}
                      {post.postSections && post.postSections.length > 0 && (
                        <div className="mt-1 space-y-4 border-t pt-4">
                          {post.postSections.map((section) => (
                            <div key={section.id} className=" p-4 ">
                              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                {section.subHeader}
                              </h3>
                              <p className="text-gray-700 whitespace-pre-wrap">
                                {section.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {userStore.isMarketUser() && (
                        <FileForm
                          entityId={post.id}
                          uploadImage={(formData) =>
                            uploadImageForPost(formData, post.id)
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No posts found for this blog.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default observer(BlogDetailsById);
