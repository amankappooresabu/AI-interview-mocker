"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {
    const [interviewData, setInterviewData] = useState();
    const [WebCamEnabled, setWebCamEnabled] = useState(false);
    useEffect(() => {
        console.log(params.Interviewid);
        GetInterviewDetails();
    }, []);
    const GetInterviewDetails=async() => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.Interviewid))
        setInterviewData(result[0]);
    }
  return (
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's get started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='flex flex-col my-5 gap-5'>
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Position:</strong>{interviewData?.JobPos}</h2>
            <h2 className='text-lg'><strong>Job Decription/Tech Stack:</strong>{interviewData?.JobDesc}</h2>
            <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData?.JobExp}</h2>
            </div>
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
                <h2 className='mt-5 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
        </div>
        <div>
            {WebCamEnabled? <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{width: 600, height: 300}}
            />:
            <>
            <WebcamIcon className='h-72 w-80 my-7 p-20 bg-secondary rounded-lg border'style={{width:600}}/>
            <Button onClick={()=> setWebCamEnabled(true)} style={{width:600}} className="font-bold">Enable WebCam and Microphone</Button>
            </>
            }
        </div>

        </div>
        <div className='flex justify-end items-end'>
        <Link href={"/dashboard/interview/"+params.Interviewid+"/start"}>
        <Button>Start Interview</Button>
        </Link>
        </div>
    </div>
  )
}

export default Interview