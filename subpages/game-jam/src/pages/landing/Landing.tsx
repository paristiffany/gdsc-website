import React from 'react';
import ReactDOM from 'react-dom';

import About from './About';
import Event from './Event';
import Members from './Members';


function Landing() {
	return (
		<>
			<About />
			<Event />
			<Members />
		</>
	);
}

export default Landing;