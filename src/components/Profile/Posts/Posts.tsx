import React, { useEffect } from "react";
import s from "./Posts.module.css";

const Posts = ({setCurrentTab, t}:any) => {

    useEffect(() => {
        setCurrentTab('posts')
    }, [setCurrentTab]);

    return <div>Posts</div>;
};

export default Posts;
