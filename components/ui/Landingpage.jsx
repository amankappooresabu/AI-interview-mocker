'use client'
import Header from '@/app/dashboard/_components/header'
import { Brain, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/app/dashboard/page'

function Landingpage() {
    const router = useRouter();
    const goDashboard=()=>{
        router.push('/dashboard')
    }
    return (
        <div className="min-h-screen bg-gray-50" style={{
            backgroundImage: `
                linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
        }}>
            <Header />
            
            {/* Hero Section */}
            <div className='py-20 text-center max-w-4xl mx-auto px-6'>
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-8">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">AI-Powered Interview Practice</span>
                </div>
                
                <h1 className='text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tigh'>
                    Your Personal 
                    <span className="text-primary"> AI Interview</span> Coach
                </h1>
                
                <h2 className='mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                    Double your chances of landing that dream job with our AI-powered interview preparation platform
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Button onClick={goDashboard} size="lg" className="bg-primary hover:bg-purple-950 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            
                
                </div>
            </div>
            
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Get personalized feedback and practice in a realistic interview environment
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <Brain className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Questions</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Get tailored interview questions based on your job role and experience level, powered by advanced AI technology.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100">
                        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Feedback</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Receive instant feedback on your answers with detailed ratings and improvement suggestions.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100">
                        <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <Users className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Multiple Industries</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Practice for various roles across different industries with customized question sets.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landingpage