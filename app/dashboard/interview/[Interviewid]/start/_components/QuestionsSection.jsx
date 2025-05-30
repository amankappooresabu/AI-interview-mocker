import { LightbulbIcon, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestions,activeQuestionIndex}) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else {
            alert('Text to Speech is not supported in this browser.');
        }
    }
  return mockInterviewQuestions&&(
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestions&&mockInterviewQuestions.map((question, index) => (
                <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index? 'bg-primary text-white': 'bg-secondary text-black'}`}>Question #{index+1}</h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}/>
        <div className='border rounded p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
                <LightbulbIcon/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>
                {process.env.NEXT_PUBLIC_QUESTION}
            </h2>
        </div>
    </div>
  )
}

export default QuestionsSection