'use client'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { GiBriefcase } from 'react-icons/gi'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/store'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import handleErrors from '@/lib/utils'
import Link from 'next/link'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import GenerateAiResult from './GenerateAiResult'
import UserPromptForm from './UserPromptForm'

const CreateIndex = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [summaryErrors, setSummaryErrors] = useState<string[] | null>(null)
  const { documentStore, documentStore: { brief, aiGeneratedResult, authorityId }, userStore} = useStore();

  const handleSaveDocument = async () => {
    const formData = new FormData();
    formData.append('brief', brief as string);
    formData.append('aiResult', aiGeneratedResult as string);
    formData.append('authorityId', authorityId as string);

    const result = await documentStore.addDocument(formData);

    if (result.status === 'success') {
      toast.success(result.data);
      router.push('/documents');
    } else {
      setSummaryErrors(handleErrors(result.error));
    }
  };

  const isRTL = userStore.language === 'ar';

  return (
    <Card className='rounded-none p-10' >
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-row items-center gap-3'>
          <GiBriefcase size={40} />
          <h1 className='text-3xl font-semibold'>{t('Generate ChatGPT Result')}</h1>
        </div>
      </CardHeader>
      <CardBody className='flex flex-col gap-10'>
        {summaryErrors && (
          <div className="bg-red-200 p-2 text-sm rounded-md">
            {summaryErrors.map((err, idx) => (
              <p key={idx} className="text-red-600 mb-2 text-sm">{err}</p>
            ))}
          </div>
        )}

        <UserPromptForm />
        <GenerateAiResult />
        <div className='flex items-center gap-5 justify-between'>
          <Link className='flex items-center align-middle gap-2 text-blue-700' href='/documents'>
            <IoIosArrowRoundBack 
            style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
            size={30} /> {t('Back')}
          </Link>
          <Button
            className='w-5'
            isDisabled={!brief && !aiGeneratedResult} color='primary' type='submit'
            onClick={handleSaveDocument}>{t('Save')}</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default observer(CreateIndex);
