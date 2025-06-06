"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import ReacordAnswerSection from './_components/ReacordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(() => {
        GetInterviewDetails();
    }, []);
    useEffect(() => {
    }, [interviewData]);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.Interviewid))
        const jsonMockResp = JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp);
        setMockInterviewQuestions(jsonMockResp);
        setInterviewData(result[0]);

    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
                {/* Questions */}
                <QuestionsSection mockInterviewQuestions={mockInterviewQuestions.interviewQuestions}
                    activeQuestionIndex={activeQuestionIndex}
                />

                {/* Video and Audio recording */}
                {interviewData && (
                    <ReacordAnswerSection
                        mockInterviewQuestions={mockInterviewQuestions.interviewQuestions}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                    />
                )}


            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous question</Button>}
                {activeQuestionIndex!=4&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next question</Button>}
                {activeQuestionIndex==4&&
                <Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}>
                    <Button>End Interview</Button>
                </Link>}
            


            </div>
        </div>
    )
}

export default StartInterview
