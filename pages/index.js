import React, { useState,useEffect } from "react";
import Image from 'next/image'
import useSWR from "swr";
import Router from "next/router";

import PlaceHolderImage from "../public/placeholder.png";
export default function Home() {
  // Local data set
  const [localData,setLocalData] = useState([])
  // For showing seats
  const [initialChar] = useState('A');


  // fetching data
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const fetchExamData = useSWR("https://3a178515-5a1f-4da4-b47b-b9e825f92625.mock.pstmn.io/getExam/", fetcher);
  let examData = [fetchExamData.data];

  // routing to next page
  const routeExam = (data) => {
    Router.push({ pathname: `/exam/${data?.title}`, query: data }, `/exam/${data?.title}`)
  }

  // Local data set
  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem('userData')) || [])   
  }, [])
  
  return (
    <div className="mainarea">
      <h1 className='main_heading'>All Exams</h1>

      {!fetchExamData.data ? <>Loading...</> :
        <div className="all_exam_grid">
          {examData.map((data, index) => (
            <div className="exam" key={index}
              onClick={(e) => routeExam(data)}
            >
              <div className='exam_image_container'>
                <Image className='exam_image'
                  src={data?.image} alt="" width={300} height={200} placeholder='blur'
                  blurDataURL={PlaceHolderImage} />
              </div>
              <div className='exam_info_container'>
                <h6 className='exam_year_bar'>{data?.year}</h6>
                <h3 className='exam_title'>{data?.title}</h3>
                <p className='exam_time' suppressHydrationWarning>{Date(data?.exam_date)}</p>
              </div>
            </div>
          ))}
        </div>}
        {localData.length > 0 && (
          <>
        <h1 className='main_heading'>All Seats Booked</h1>
        {localData.map((data,idx)=>(
          <p key={idx}>{`${idx++}>`} {`Name - ${data.name},Age - ${data.age},Gender - ${data.gender},Seat Number - ${String.fromCharCode(initialChar.charCodeAt() + data.savedSeats.colIndex)}${data.savedSeats.rowIndex}`}</p>
        ))}
        </>
        )}
    </div>
  )
}
