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

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
