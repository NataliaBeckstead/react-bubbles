import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsLoading(true);
		setError("");
		axiosWithAuth()
			.get("/api/colors")
			.then(res => {
				setIsLoading(false);
				setColorList(res.data);
			})
			.catch(err => {
				setIsLoading(false);
				setError(`Error: ${err.response.status} ${err.response.statusText}`);
			});
  }, []);
  const updateColors = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        setColorList(res.data);
      })
  }
  useEffect(() => {
    updateColors();
  }, [])

  return (
    <>
      {isLoading && (
				<div className="loading">
					<h2>Loading Colors...</h2>
				</div>
			)}
			{!isLoading && error && <div className="error">{error}</div>}
			{!isLoading &&
        !error &&
        <>
          <ColorList colors={colorList} updateColors={updateColors} />
          <Bubbles colors={colorList} />
        </>
			}
    </>
  );
};

export default BubblePage;
