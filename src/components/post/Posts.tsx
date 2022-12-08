import PostTile from "./PostTile";
import "./Posts.scss";
import React, { useState, useEffect } from "react";

interface Post {
  map: any;
  by: string;
  descendants: number; 
  id: number;
  kids:[];
  score: number; 
  time: number;
  title: string; 
  url: string;
}

interface Ids {
  number: number;
}

export default function Posts() {

  const [posts, setPosts] = useState<Post | null >(null);
  useEffect(() => {
   fetchPostIds();
  }, []);

  async function fetchPostIds(){
    console.log("1: Fetch Ids")

    async function fetchPosts(ids:Ids[]) {
    
      const arrayOfPosts: {}[] = [];
      console.log("2: Fetch posts")
      for (const id of ids) {
        await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => response.json())
          .then((data) => {
            arrayOfPosts.push(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      if (arrayOfPosts.length === 0) {
        return;
      }
      sortPostsByScore(arrayOfPosts);
    }
  
    function sortPostsByScore(posts: any){
      console.log("3: Sort posts")

      posts.sort((a: Post, b: Post) => {
        return b.score - a.score;
      });
      setPosts(posts);
    }

    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((response) => response.json())
    .then((data) => {
      const ids = data.slice(0, 10);
      fetchPosts(ids);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  return (
    <div className="posts-container">
      {posts && posts.map((post: { title: string; id: number; score: number; time: number; by: string; url: string; }) => {
        return (
          <div key={post.id}>
          <PostTile 
            title={post.title}  
            score={post.score} 
            time={post.time} 
            author={post.by} 
            url={post.url}
            by={post.by}
          ></PostTile>
          </div>
        );
      })}
    </div>
  );
}
