import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar/Navbar';
import VideoList from './components/Videos/VideoList';
import VideoForm from './components/Videos/VideoForm';

import 'react-toastify/dist/ReactToastify.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Navbar />

			<div className="container mt-4 ms-5">
				<Switch>
					<Route exact path="/" component={VideoList} />
					<Route exact path="/new-video" component={VideoForm} />
					<Route exact path="/update-video/:id" component={VideoForm} />
				</Switch>
				<ToastContainer />
			</div>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
