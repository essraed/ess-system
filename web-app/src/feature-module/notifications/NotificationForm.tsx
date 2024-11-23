  
 import { useStore } from "../../app/stores/store";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { Input } from "@nextui-org/react";
 import React from "react";
 import toast from "react-hot-toast";
 import { observer } from "mobx-react-lite";
 import { IoMdAddCircleOutline } from "react-icons/io";
 import { useTranslation } from "react-i18next";
 import { Link } from "react-router-dom";
 import {
   WorkingTimeSchema,
 } from "../../lib/schemas/workingTimeSchema ";
import { notificationSchema, NotificationSchema } from "../../lib/schemas/notificationSchema";
 
 const NotificationForm = () => {
   const { notificationStore, userStore } = useStore();
   const { t } = useTranslation();
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<NotificationSchema>({
     resolver: zodResolver(notificationSchema),
     mode: "onTouched",
   });
   
   const onSubmit = async (data: NotificationSchema) => {
     console.log("workin time data",data);
     const result = await notificationStore.addNotification(data);
     if (result.status === "success") {
       toast.success("Notification created successfully");
       notificationStore.loadNotifications();
     } else {
       toast.error("Error: " + result.error);
     }
   };
 
   return (
     <>
       {userStore.isAdmin() && (
         <Link
           to="#"
           data-bs-toggle="modal"
           data-bs-target="#add_card"
           className="flex items-center gap-2 btn btn-primary"
         >
           <IoMdAddCircleOutline size={20} />
           {t("Add New WorkingTime")}
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
               <h4 className="modal-title"> {t("Add New WorkingTime")}</h4>
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
              {/* Title */}
              <div className="my-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  id="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title")}
                />
                {errors.title && (
                  <div className="invalid-feedback">
                    {errors.title.message}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="my-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className={`form-control ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  {...register("message")}
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">
                    {errors.message.message}
                  </div>
                )}
              </div>

              {/* Type */}
              <div className="my-3">
                <label htmlFor="type" className="form-label">
                  Notification Type
                </label>
                <select
                  id="type"
                  className={`form-select ${errors.type ? "is-invalid" : ""}`}
                  {...register("type")}
                >
                  <option value="">Select a Type</option>
                  <option value="General">General</option>
                  <option value="Alert">Alert</option>
                  <option value="Reminder">Reminder</option>
                </select>
                {errors.type && (
                  <div className="invalid-feedback">
                    {errors.type.message}
                  </div>
                )}
              </div>

              {/* URL */}
              <div className="my-3">
                <label htmlFor="url" className="form-label">
                  More Details URL (optional)
                </label>
                <input
                  id="url"
                  className={`form-control ${errors.url ? "is-invalid" : ""}`}
                  {...register("url")}
                />
                {errors.url && (
                  <div className="invalid-feedback">
                    {errors.url.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="modal-btn">
                <button type="submit" className="btn btn-secondary w-100">
                  Create Notification
                </button>
              </div>
            </form>
          </div>
           </div>
         </div>
       </div>
     </>
   );
 };
 
 export default observer(NotificationForm);
 