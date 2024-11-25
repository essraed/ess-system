import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FileFormInputs } from "../../types/filesTypes";
import { useForm } from "react-hook-form";
import { allowedImageExtension } from "../../constants/constants";
import agent from "../../app/api/agent";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CiImageOn } from "react-icons/ci";
import { observer } from "mobx-react-lite";
import { ActionResult } from "../../types";

type Props = {
  label?: string;
  entityId: string;
  uploadImage?: (formData: FormData) => Promise<ActionResult<string>>
};

const FileForm = ({ label, entityId, uploadImage }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FileFormInputs>({
    mode: "onTouched",
  });

  const validateFiles = (value: FileList | null) => {
    if (!value || value.length === 0) {
      return "File is required.";
    }

    for (const file of Array.from(value)) {
      if (!allowedImageExtension.some((ext) => file.type.startsWith(ext))) {
        return "Only images are allowed.";
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

    formData.append("directory", "uploaded_images");
    formData.append("entityId", entityId);

      setIsLoading(true);
      const result = await uploadImage(formData);

      if (result.status === 'success') {
        toast.success(result.data);
        setIsLoading(false);
      } else {
        toast.error(result.error as string);
        setIsLoading(false);
      }
  };

  return (
    <>
     {uploadImage && <Button onPress={onOpen}>
        <CiImageOn /> {label}
      </Button>}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload image
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    type="file"
                    className="my-3"
                    variant="bordered"
                    multiple
                    {...register("file", {
                      validate: validateFiles,
                    })}
                    isInvalid={!!errors.file}
                    errorMessage={errors.file?.message as string}
                  />

                  {/* Submit button with loading indicator */}
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
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default observer(FileForm)