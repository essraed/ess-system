import { Button, Input, Autocomplete, AutocompleteItem, Textarea } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';


import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { all_routes } from '../../router/all_routes';
import { UserPromptSchema, userPromptSchema } from '../../../lib/schemas/UserPromptSchema';
import handleErrors from '../../../lib/utils';
import { useStore } from '../../../app/stores/store';

const UserPromptForm = () => {
  const routes = all_routes;
  const { t } = useTranslation(); // Initialize translation hook
  const { documentStore, authorityStore: { authoritiesForDropdown, loadAuthoritiesForDropdown } } = useStore();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null);
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, setValue } = useForm<UserPromptSchema>({
      resolver: zodResolver(userPromptSchema),
      mode: 'onTouched'
  });

  // Load authorities on mount
  useEffect(() => {
      loadAuthoritiesForDropdown();
  }, [loadAuthoritiesForDropdown]);

  const onSubmit = async (data: UserPromptSchema) => {
      const result = await documentStore.getAIResult({ ...data, authorityId: selectedAuthority ?? '' });

      if (result.status === 'success') {
          toast.success(result.data);
      } else {
          setSummaryErrors(handleErrors(result.error));
      }
  };

  const handleAuthoritySelect = (authorityId: string) => {
      setSelectedAuthority(authorityId);
      setValue('authorityId', authorityId);
  };

  if (!authoritiesForDropdown) return <p>Loading...</p>

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
              {summaryErrors && (
                  <div className="bg-red-200 p-2 text-sm rounded-md">
                      {summaryErrors.map((err, idx) => (
                          <p key={idx} className="text-red-600 mb-2 text-sm">{err}</p>
                      ))}
                  </div>
              )}

              <div className='flex items-center gap-5'>
                  <Input
                      defaultValue=''
                      label={t('Name')} // Translate "Name"
                      variant='bordered'
                      {...register('name')}
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                  />
                  <Input
                      defaultValue=''
                      label={t('Email')} // Translate "Email"
                      variant='bordered'
                      {...register('email')}
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                  />
                  <Input
                      defaultValue=''
                      label={t('Address')} // Translate "Address"
                      variant='bordered'
                      {...register('address')}
                      isInvalid={!!errors.address}
                      errorMessage={errors.address?.message}
                  />
              </div>

              <div className='flex items-center gap-5'>
                  <Input
                      defaultValue=''
                      label={t('Phone')} // Translate "Phone"
                      variant='bordered'
                      {...register('phone')}
                      isInvalid={!!errors.phone}
                      errorMessage={errors.phone?.message}
                  />
                  <Input
                      defaultValue=''
                      label={t('Emirates Id')} // Translate "Emirates Id"
                      variant='bordered'
                      {...register('emiratesId')}
                      isInvalid={!!errors.emiratesId}
                      errorMessage={errors.emiratesId?.message}
                  />
                  <Autocomplete
                      label={t('External Authority')} // Translate "External Authority"
                      placeholder={t('Search an authority')} // Translate "Search an authority"
                      defaultItems={authoritiesForDropdown}
                      onSelectionChange={(key) => handleAuthoritySelect(key?.toString() as string)}
                  >
                      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                  </Autocomplete>
              </div>

              <Textarea
                  defaultValue=''
                  cols={6}
                  label={t('Brief')} // Translate "Brief"
                  variant='bordered'
                  {...register('brief')}
                  isInvalid={!!errors.brief}
                  errorMessage={errors.brief?.message as string}
              />

              <Button isLoading={isSubmitting} className='btn btn-view-custom'
                  isDisabled={!isValid} fullWidth type='submit'>
                  {t('Generate')} {/* Translate "Generate" */}
              </Button>
          </div>
      </form>
  );
};

export default observer(UserPromptForm);
