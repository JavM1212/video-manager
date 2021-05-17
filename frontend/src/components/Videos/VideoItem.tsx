import React from 'react';
import { Video } from './Video';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';

import * as videoService from './VideoService';
import './VideoItem.css';

interface Props {
	video: Video;
	loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
	const history = useHistory();

	const handleDelete = async (id: string) => {
		await videoService.deleteVideo(id);
		loadVideos();
	};

	return (
		<div className="col-md-4 mb-3 ">
			<div
				className="card card-body h-100 rounded video-card"
				style={{ cursor: 'pointer' }}
			>
				<div className="d-flex justify-content-between">
					<h2
						onClick={() =>
							history.push(`/update-video/${video._id}`)
						}
					>
						{video.title}{' '}
					</h2>
					<div onClick={() => video._id && handleDelete(video._id)}>
						<button className="btn btn-danger flex-grow-1 rounded">
							Delete
						</button>
					</div>
				</div>
				<p className="w-100">{video.description}</p>
				<div className="d-flex h-100 align-items-end">
					<ReactPlayer url={video.url} />
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
