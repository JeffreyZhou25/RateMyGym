import React, {useEffect} from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import "./gym.css";
import { useParams } from "react-router-dom";
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json())

function Gym() {
    const { documentID } = useParams();
    const url = 'http://localhost:8080/api/Gym/' + documentID;
    // const {data} = useSWR('/', () => fetch(url).then(res => res.json()))
    const {data} = useSWR(url, fetcher)

    // const Home = () => {
    //     const { documentID } = useParams();
    //     const [data, setData] = useState(null);
    //     const url = 'http://localhost:8080/api/gym/' + documentID;
    
    //     useEffect(() => {
    //         useSWR('/', () => fetch(url))
    //         .then((res) => res.json())
    //         .then((data) => setData(data));
    // }, []);

    if (!data) {
        return null
    }

    return(
        <div className='gym-div'> 
             <div className = " in-content">
                <div className = "gym-header">
                    <h1>{data.gymName}</h1>
                    <h3>{data.address}</h3>
                </div>
                <div className = "gym-body">
                    <h2 className="gym-category">Diversity: 
                        <div class="slidecontainer">
                                <input type="range" min="1" max="5" value={data.diversityRating} class="slider" id="myRange"></input>
                        </div>
                    </h2>

                        <p className="gym-category-description">Of gender, age, LGBTQ+</p>
                    <h2 className="gym-category">Dedication: 
                    <div class="slidecontainer">
                            <input type="range" min="1" max="5" value={data.dedicateRating} class="slider" id="myRange"></input>
                        </div>
                    </h2>
                        <p className="gym-category-description">Average gym goers or competitive bodybuilders?</p>
                    <h2 className="gym-category">Sense of Community: 
                        <div class="slidecontainer">
                            <input type="range" min="1" max="5" step='0.1' value={data.communityRating} class="slider" id="myRange"></input>
                        </div>
                    </h2>
                        <p className="gym-category-description">Friendly and supportive of each others goals</p>
                <NavLink className='result-link' to={`/Rating/${encodeURIComponent(documentID)}`}>
                         <button className="gym-button">Rate this Gym</button>
                </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Gym;