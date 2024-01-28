'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Result from '@/components/Result'

interface response {
    videoId: string,
    url: string,
    title: string,
    description: string,
    image: string,
    ago: string,
    views: number,
    artist: string,
    artistUrl: string,
  }

const Start = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [data, setData] = useState<response[]>([])
    const [loading, setLoading] = useState(true)
    
    const fetchData = async (query : string) => {
        fetch('/api/search', {
            method : 'POST',
            headers : {
                'Content-Type' : 'text/plain'
            },
            body : query,
        }).then((response) => response.json())
        .then((results) => {
            setData(results)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData('#trendingmusic')
    }, [])

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData(inputValue);
        setLoading(true)
    }
    return (
        <div className="w-11/12 h-full px-6 py-10 bg-neutral rounded-xl max-sm:w-full max-sm:px-2">
            <form method='post' onSubmit={handleSubmit} className="flex w-full">
                <input name='search' value={inputValue} onChange={handleInput} type="text" placeholder="Search or Paste the URL for your Favourite Music" className="input input-primary border-none focus:outline-none w-full max-sm:input-sm" />
                <button className="ml-2 btn btn-primary w-[10rem] max-sm:w-[4rem] max-sm:btn-sm">Search</button>
            </form>
            <div className="w-full h-full mt-4 rounded-xl bg-gray-700 overflow-x-scroll" id='results-area'>
                { loading ? (
                    <div className='flex items-center justify-center w-full h-full'>
                    <span className='w-12 h-full loading loading-dots bg-primary'></span>
                    </div>
                ) : (
                    data.map((result) => ( 
                        <Result key={result.videoId} {...result} />
                    ))
                ) }
            </div>
        </div>
    )
}

export default Start