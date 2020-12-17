import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { PlayList } from "./playlist.js";
//create your first component
export function Home() {
	return (
		<div>
			<PlayList />
		</div>
	);
}
