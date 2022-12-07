import "./PostTile.scss";
import image from "../../assets/images/placeholder.jpg";
import Redirect from "../../assets/images/Redirect.png";
import React, { useState, useEffect } from "react";

interface Props {
  title: string; 
  score: number; 
  time: number; 
  by: string; 
  url: string;
  author: string;
}

export default function PostTile(props: Props) {
  const [date, setDate] = useState<string | null>(null);
  const [karmaScore, setKarmaScore] = useState<number | null>(null);

  useEffect(() => {

    async function getKarmaScore() {
      fetch(`https://hacker-news.firebaseio.com/v0/user/${props.author}.json`)
        .then((response) => response.json())
        .then((data) => {
          setKarmaScore(data.karma);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    function convertUnixTime(){
      var date = new Date(props.time * 1000);
      setDate(date.toLocaleDateString("default"));
    }

    convertUnixTime();
    getKarmaScore();
  }, [props.time, props.author]);





  return (
    <div className="post-card-container" >
      <img src={image} alt="Awesome post" className="post-card-image"></img>
      <div className="post-card-text-container">
        <p className="post-card-user">
          Posted by u/{props.by} {"["}{karmaScore}{"]"} {"|"} Published: {date} 
        </p>
        <h3 className="post-card-title">{props.title}</h3>
      </div>
      <p className="post-card-score">Score: {props.score}</p>
      <a className="post-card-cta-button" href={props.url}>
        Read more 
        <img src={Redirect} alt="redirect" className="post-card-cta-img"></img>
      </a>
    </div>
  );
}
