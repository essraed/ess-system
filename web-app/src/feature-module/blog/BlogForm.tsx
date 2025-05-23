// BlogForm.tsx

import { useStore } from "../../app/stores/store";
import { blogSchema, BlogSchema } from "../../lib/schemas/BlogSchema";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Subsection component moved out to avoid hooks in loops
const PostSectionFields = ({
  nestIndex,
  control,
  register,
  errors,
}: {
  nestIndex: number;
  control: any;
  register: any;
  errors: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `posts.${nestIndex}.postSections`,
  });

  const { t } = useTranslation();

  return (
    <>
      <h6>{t("Subsections")}</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 p-2 border rounded bg-white">
          <Input
            {...register(`posts.${nestIndex}.postSections.${index}.subHeader`)}
            placeholder={t("Subheader")}
            className="mb-2"
            isInvalid={
              !!errors?.posts?.[nestIndex]?.postSections?.[index]?.subHeader
            }
            errorMessage={
              errors?.posts?.[nestIndex]?.postSections?.[index]?.subHeader
                ?.message
            }
          />
          <Textarea
            {...register(`posts.${nestIndex}.postSections.${index}.content`)}
            placeholder={t("Subsection Content")}
            isInvalid={
              !!errors?.posts?.[nestIndex]?.postSections?.[index]?.content
            }
            errorMessage={
              errors?.posts?.[nestIndex]?.postSections?.[index]?.content
                ?.message
            }
          />
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => remove(index)}
          >
            {t("Remove Subsection")}
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => append({ subTitle: "", content: "" })}
      >
        {t("Add Subsection")}
      </button>
    </>
  );
};

const BlogForm = () => {
  const { blogStore, userStore } = useStore();
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    mode: "onTouched",
    defaultValues: {
      posts: [],
    },
  });

  const {
    fields: postFields,
    append: appendPost,
    remove: removePost,
  } = useFieldArray({
    control,
    name: "posts",
  });

  const onSubmit = async (data: BlogSchema) => {
    const result = await blogStore.addBlog(data);
    if (result.status === "success") {
      toast.success("Blog created successfully");
    } else {
      toast.error("Error: " + result.error);
    }
  };

  return (
    <>
      {(userStore.isMarketUser()||userStore.isMarketingManager()||userStore.isAdmin()) && (
        <Link
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#add_card"
          className="flex items-center gap-2 btn btn-primary"
        >
          <IoMdAddCircleOutline size={20} />
          {t("Add New Blog")}
        </Link>
      )}

      <div
        className="modal new-modal fade"
        id="add_card"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{t("Add New Blog")}</h4>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  className="my-3"
                  label={t("Blog Name")}
                  variant="bordered"
                  {...register("blogtitle")}
                  isInvalid={!!errors.blogtitle}
                  errorMessage={errors.blogtitle?.message}
                />

                <Textarea
                  className="my-3"
                  label={t("Blog Content")}
                  variant="bordered"
                  {...register("blogcontent")}
                  isInvalid={!!errors.blogcontent}
                  errorMessage={errors.blogcontent?.message}
                />

                <div className="my-4">
                  <h5>{t("Posts")}</h5>
                  {postFields.map((postField, postIndex) => (
                    <div
                      key={postField.id}
                      className="mb-4 border p-3 rounded bg-gray-50"
                    >
                      <Input
                        {...register(`posts.${postIndex}.title`)}
                        placeholder={t("Post Title")}
                        className="mb-2"
                        isInvalid={!!errors.posts?.[postIndex]?.title}
                        errorMessage={
                          errors.posts?.[postIndex]?.title?.message
                        }
                      />
                      <Textarea
                        {...register(`posts.${postIndex}.content`)}
                        placeholder={t("Post Content")}
                        className="mb-3"
                        isInvalid={!!errors.posts?.[postIndex]?.content}
                        errorMessage={
                          errors.posts?.[postIndex]?.content?.message
                        }
                      />

                      <PostSectionFields
                        nestIndex={postIndex}
                        control={control}
                        register={register}
                        errors={errors}
                      />

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removePost(postIndex)}
                      >
                        {t("Remove Post")}
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      appendPost({ title: "", content: "", postSections: [] })
                    }
                  >
                    {t("Add Post")}
                  </button>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {t("Create Blog")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(BlogForm);