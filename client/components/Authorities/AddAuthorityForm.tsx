'use client';
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, user } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthoritySchema, authoritySchema } from '@/lib/schemas/authoritySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '@/stores/store';
import toast from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const AddAuthorityForm = () => {
  const { authorityStore, userStore } = useStore();
  const { t } = useTranslation();

  const [isModalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<AuthoritySchema>({
    resolver: zodResolver(authoritySchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: AuthoritySchema) => {
    const result = await authorityStore.createAuthority(data);
    if (result.status === 'success') {
      toast.success('Authority created successfully');
      setModalOpen(false);
    } else {
      toast.error('Error: ' + result.error);
    }
  };

  function handleModalOpen() {
    if (!userStore.isAdmin()) {
      toast.error('Un authorized')
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
      <Button onPress={() => handleModalOpen()} color="primary">
        <IoMdAddCircleOutline size={24} />
        {t('Add New Authority')}
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="lg">
        <ModalContent>
          <ModalHeader className="text-center">
          {t('Add New Authority')}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label={t('Authority Name')}
                variant="bordered"
                {...register('name')}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onPress={() => setModalOpen(false)}> {t('Cancel')}</Button>
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
               {t('Create Authority')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default observer(AddAuthorityForm);
