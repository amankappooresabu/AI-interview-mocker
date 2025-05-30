"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { streamChat } from '@/utils/Gemini'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


function ReacordAnswerSection({mockInterviewQuestions, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ));

  }, [results]);

  useEffect(() => {
    if (!isRecording&&userAnswer?.length > 10){
      UpdateUserAnswer();
    }
  },[userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
    }
    else {
      startSpeechToText();
    }
  }
  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackprompt = 'Question: ' + mockInterviewQuestions[activeQuestionIndex]?.question + ' Answer:' + userAnswer + 'Depending on the question and the particular answer given by the user provide a rating and feedback as area of improvement if any in just 3-5 lines. It should be in JSON format with rating field and feedback field'
    const result = await streamChat(feedbackprompt);

    let responseText = '';

    for await (const chunk of result) {
      if (chunk.text) {
        responseText += chunk.text;
      }
    }
    const MockJsonResp = (responseText).replace('```json', '').replace('```', '')
    console.log(MockJsonResp);
    const JsonFeedbackResponse = JSON.parse(MockJsonResp);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestions[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResponse?.feedback,
      rating: JsonFeedbackResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    })
    if (resp) {
      toast('Your answer has been saved successfully');
      setUserAnswer('');
      setResults([]);
    }
    setLoading(false);
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            width: '100%',
            height: 300,
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={loading} variant="outline" className='my-10' onClick={StartStopRecording}>
        {isRecording ?
          <h2 className='text-red-600 flex gap-2'>
            <Mic />Stop Recording
          </h2>
          :
          <h2 className='flex gap-2 text-primary font-bold'>
            <Mic />Start Recording
          </h2>}</Button>

    </div>
  )
}

export default ReacordAnswerSection