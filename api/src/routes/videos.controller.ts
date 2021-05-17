import { RequestHandler, Request, Response } from 'express';

import Video from './Video';

export const getVideos: RequestHandler = async (req, res) => {
	const videos = await Video.find(req.body.url);

	res.json(videos);
};

export const getVideo: RequestHandler = async (req, res) => {
	try {
		const videoFound = await Video.findById(req.params.id);
		if (!videoFound) return res.status(204).json();
		res.json(videoFound);
	} catch (error) {
		res.json(error);
	}
};

export const createVideo: RequestHandler = async (req, res) => {
	const videoFounded = await Video.findOne({ url: req.body.url });

	if (videoFounded)
		return res.status(301).json({ message: 'Url already exists' });

	const video = new Video(req.body);
	const savedVideo = await video.save();

	res.json(savedVideo);
};

// export const updateVideo: RequestHandler = async (req, res) => {
// 	try {
// 		console.log(req.body);
// 		const videoFound = await Video.findByIdAndUpdate(
// 			req.params.id,
// 			req.body,
// 			{ new: true }
// 		);
// 		if (!videoFound) return res.status(204).json();
// 		res.json(videoFound);
// 	} catch (error) {
// 		res.json(error);
// 	}
// };

export const updateVideo: RequestHandler = async (
	req: Request,
	res: Response
) => {
	console.log(req.body);
	const videoUpdated = await Video.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	if (!videoUpdated) {
		return res.status(204).json();
	}

	return res.json(videoUpdated);
};

export const deleteVideo: RequestHandler = async (req, res) => {
	try {
		const videoFound = await Video.findByIdAndDelete(req.params.id);
		if (!videoFound) return res.status(204).json();
		res.json(videoFound);
	} catch (error) {
		res.json(error);
	}
};
