import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { closeZone } from "../store/slices/Zone";

export default () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeZone());
  };

  useEffect(() => {
    const search = document.getElementById('search-form')
    search.addEventListener("click", handleClick, true);
    return () => {
      search.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <Fragment>
      <div className="search-form" id="search-form">
        <div className="back"/>
      </div>
    </Fragment>
  );
};
