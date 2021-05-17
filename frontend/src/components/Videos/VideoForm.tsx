import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

import { Video } from './Video';
import * as videoService from './VideoService';
import { setConstantValue } from 'typescript';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SubmitHandler = FormEvent<HTMLFormElement>;

interface Params {
	id: string;
}

const VideoForm = () => {
	const history = useHistory();
	const params = useParams<Params>();

	const inicialState = { title: '', description: '', url: '' };
	const [video, setVideo] = useState<Video>(inicialState);

	const handleChange = (e: InputChange) => {
		setVideo({ ...video, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: SubmitHandler) => {
		e.preventDefault();

		if (!params.id) {
			await videoService.createVideo(video);
			toast.success('Video added');
			setVideo(inicialState);
		} else {
			await videoService.updateVideo(params.id, video);
			toast.success('Video updated');
		}

		history.push('/');
	};

	const getVideo = async (id: string) => {
		const res = await videoService.getVideo(id);
		const { title, description, url } = res.data;
		setVideo({ title, description, url });
	};

	useEffect(() => {
		if (params.id) getVideo(params.id);
	}, []);

	return (
		<div className="row">
			<div className="col-4 mx-auto">
				<div className="card">
					<div className="card-body">
						<h3>New Video</h3>

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<input
									maxLength={23}
									type="text"
									name="title"
									placeholder="Video's title"
									className="form-control"
									onChange={handleChange}
									value={video.title}
									autoFocus
								/>
							</div>

							<div className="mb-3">
								<input
									type="text"
									name="url"
									placeholder="Video's url"
									className="form-control"
									onChange={handleChange}
									value={video.url}
								/>
							</div>

							<div className="mb-3">
								<textarea
									name="description"
									rows={3}
									className="form-control"
									placeholder="Video's description"
									onChange={handleChange}
									value={video.description}
								/>
							</div>

							{params.id ? (
								<button className="btn btn-info">
									Update Video
								</button>
							) : (
								<button className="btn btn-primary">
									Create Video
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoForm;
