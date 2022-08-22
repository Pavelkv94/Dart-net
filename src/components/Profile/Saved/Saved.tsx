import React, { useEffect } from "react";
import s from "./Saved.module.css";

const Saved = ({ setCurrentTab, t }: any) => {

    useEffect(() => {
        setCurrentTab("saved");
    }, [setCurrentTab]);

    return <div>Saved</div>;
};

export default Saved;
