import React from 'react'
import Image from 'next/image'
import ButtonGroup from '@/components/Buttons'

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

const Result = (response: response) => {

  const formatNumber = (n : number) => {
    if (n >= 10000000) {
      return (n / 10000000).toFixed(2) + ' Cr';
    } else if (n >= 100000) {
      return (n / 100000).toFixed(2) + ' Lakh';
    } else if (n >= 1000) {
      return (n / 1000).toFixed(2) + ' K';
    } else {
      return n;
    }
  }
  return (
    <div className='w-full h-auto flex rounded-xl py-2 px-3 max-sm:py-2 max-sm:px-2'>
      <div className='relative w-1/6 max-sm:w-1/5 h-24 max-sm:h-16 self-center'>
        <Image sizes='512px' fill className='object-cover rounded-lg'  src={response.image} alt='Youtube-Audio'></Image>
      </div>
      <div className='ml-4 max-sm:ml-2 w-4/5 mt-2 overflow-x-scroll'>
        <p className='max-md:text-sm font-bold'>{response.title}</p>
        <div className='flex mt-2'>
          <a href={response.artistUrl} target='_blank' rel="noopener noreferrer" className='link-accent link-hover link text-sm mr-1 flex max-sm:text-xs'><span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#747fff" className="w-5 h-5">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
          </span>{response.artist}</a>
          <p className='text-sm mr-3 flex max-sm:text-xs'><span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#747fff" className="w-5 h-5">
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
            </svg>
          </span>{response.ago}</p>
          <p className='text-sm mr-3 flex max-sm:text-xs'><span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#747fff" className="w-5 h-5">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
            </svg>
          </span>{formatNumber(response.views)}</p>
        </div>
        <div id='description' className='text-sm mt-1 max-sm:text-xs'>
          {response.description}
        </div>
        <ButtonGroup {...response} />
      </div>
    </div>
  )
}

export default Result