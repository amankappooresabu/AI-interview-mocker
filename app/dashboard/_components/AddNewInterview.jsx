"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { streamChat } from '@/utils/Gemini';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';



function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPos, setJobPos] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExp, setJobExp] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {user} = useUser();
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPos, jobDesc, jobExp)
        const InputPrompt = "Job Description: " + jobPos + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExp + " . Depending on the information above, give " + process.env.NEXT_PUBLIC_INTERVIEW_COUNT + " interview questions and their answers in json format. Give questions and answers as field in json. ONLY return valid parsable JSON. Do not add comments or markdown (no triple backticks)"
        const stream = await streamChat(InputPrompt);
        let responseText = '';

        for await (const chunk of stream) {
            if (chunk.text) {
                responseText += chunk.text;
            }
        }
        const MockJsonResp = (responseText).replace('```json', '').replace('```', '')
        console.log(JSON.parse(MockJsonResp));
        if (MockJsonResp) {
            try {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: JSON.stringify(JSON.parse(MockJsonResp)),
                    JobPos: jobPos,
                    JobDesc: jobDesc,
                    JobExp: jobExp,
                    createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
                    createdAt: moment().format('DD-MM-YYYY'),
                }).returning({ mockId: MockInterview.mockId });

                console.log("The things are inserted", resp);
                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/'+resp[0].mockId);
                }
            } catch (err) {
                console.error("DB INSERT ERROR:", err);
            }

        }
        else {
            console.error("Didn't get inserted");
        }
        setLoading(false);
    }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, job description and years of experience</h2>
                                    <div className='mt-7 my-2'>
                                        <label>Job Role/Position</label>
                                        <Input placeholder='Ex. Full Stack Developer' required onChange={(event) => setJobPos(event.target.value)} />
                                    </div>
                                    <div className='my-2'>
                                        <label>Job Description</label>
                                        <Textarea placeholder='Ex. React, Angular, Node.js, MySql etc' required onChange={(event) => setJobDesc(event.target.value)} />
                                    </div>
                                    <div className='my-2'>
                                        <label>Years of Experience</label>
                                        <Input placeholder='3' type='number' max="40" required onChange={(event) => setJobExp(event.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disalbe={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className="animate-spin" />Genterating From AI
                                            </> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview