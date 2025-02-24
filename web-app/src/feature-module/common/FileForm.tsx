import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FileFormInputs } from "../../types/filesTypes";
import { useForm } from "react-hook-form";
import {
  allowedImageExtension,
  allowedTextsExtension,
} from "../../constants/constants";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CiImageOn } from "react-icons/ci";
import { observer } from "mobx-react-lite";
import { ActionResult } from "../../types";

type Props = {
  label?: string;
  entityId: string;
  uploadImage?: (formData: FormData) => Promise<ActionResult<string>>;
  onUploadComplete?: () => void;
};

const FileForm = ({ label, entityId, uploadImage, onUploadComplete }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FileFormInputs>({
    mode: "onTouched",
  });

  const validateFiles = (value: FileList | null) => {
    if (!value || value.length === 0) {
      return "File is required.";
    }

    for (const file of Array.from(value)) {
      const isImage = allowedImageExtension.some((ext) =>
        file.type.startsWith(ext)
      );
      const isText = allowedTextsExtension.includes(file.type);

      if (!isImage && !isText) {
        return "Only images or text files (PDF, Word, Text) are allowed.";
      }
    }
    return true;
  };

  const onSubmit = async (data: FileFormInputs) => {
    if (!uploadImage) return;

    const formData = new FormData();
    Array.from(data.file).forEach((file) => {
      formData.append("Files", file);
    });

    const isImage = allowedImageExtension.some((ext) =>
      data.file[0].type.startsWith(ext)
    );
    const directory = isImage ? "seed/image/" : "seed/files/";

    formData.append("directory", directory);
    formData.append("entityId", entityId);

    if (data.number === "1" || data.number === "2") {
      formData.append("number", data.number.toString());
    }

    setIsLoading(true);
    const result = await uploadImage(formData);

    if (result.status === "success") {
      onUploadComplete && onUploadComplete();
      toast.success(result.data);
    } else {
      toast.error(result.error as string);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button 
        onPress={onOpen} 
        className=" text-white font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-600 transition-all"
      >
        <CiImageOn className="text-lg" /> {label || "Upload File"}
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        backdrop="blur"
        placement="center"
        className="p-6"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-lg font-semibold text-gray-800">
                Upload Document
              </ModalHeader>
              
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  <Input
                    type="file"
                    variant="bordered"
                    multiple
                    className="w-full"
                    {...register("file", { validate: validateFiles })}
                    isInvalid={!!errors.file}
                    errorMessage={errors.file?.message as string}
                  />

                  {!onUploadComplete && (
                    <Autocomplete
                      label="Select Number"
                      className="w-full"
                      {...register("number", {
                        validate: (value) => {
                          if (!value) return true;
                          return value === "1" || value === "2" ? true : "Please select 1 or 2.";
                        },
                      })}
                      onSelectionChange={(value) => setValue("number", value || "")}
                    >
                      <AutocompleteItem key="1" value="1">1</AutocompleteItem>
                      <AutocompleteItem key="2" value="2">2</AutocompleteItem>
                    </Autocomplete>
                  )}

                  {errors.number && (
                    <p className="text-red-500 text-sm">{errors.number.message}</p>
                  )}

                  <Button
                    type="submit"
                    className="btn btn-secondary w-100"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? t("Uploading...") : t("Upload File")}
                  </Button>
                </form>
              </ModalBody>

              {/* <ModalFooter className="flex justify-end">
                <Button 
                  color="danger" 
                  variant="flat" 
                  className="font-semibold py-2 px-4"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default observer(FileForm);
