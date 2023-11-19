import './Results.css';
import Result from '../result/Result';
import React, {useEffect, useState} from "react"
import axios from 'axios';
import useSWR from 'swr'

function Results() {

  const {data} = useSWR('/api/gyms', () => fetch('http://localhost:8080/api/gyms/').then(res => res.json()))

  return (
    <div className="results-div"> 
      <div className="results-list">
        {data?.map(result => (
          <Result 
            key={result.gymName}
            documentId={result.documentId}
            gymName={result.gymName}
            gymAddress={result.gymAddress} 
            gymRating={result.gymRating}
          />
          ))}
      </div>
    </div>
  );
}

export default Results;
