import { DocumentModel } from '@/types/Document'
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import Link from 'next/link';
import React from 'react'
import parse from 'html-react-parser'; 

type Props = {
    document: DocumentModel | null | undefined;
}

const DocumentCard = ({ document }: Props) => {
    return (
        <Card fullWidth className='w-56'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row items-center gap-3'>
                        <h4 className='text-3xl font-semibold'>{document?.brief}</h4>
                    </div>
                </div>
            </CardHeader>
            
           <Divider />

            <CardBody className='flex flex-col gap-10 justify-between h-full'>
                <p className='text-lg'>
                    {document?.aiResult && document?.aiResult?.length > 50
                        ? `${parse(document.aiResult.slice(0, 50))}...`
                        : parse(document?.aiResult ?? '')}
                </p>
                <div className='mt-auto flex gap-2'>
                    <Button className='w-full' as={Link} href={`/documents/details/${document?.id}`} color='secondary'>View</Button>
                    <Button className='w-full' as={Link} href={`/documents/update/${document?.id}`} color='primary'>Update</Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default DocumentCard
