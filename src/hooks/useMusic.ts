import { useEffect, useRef, useState } from 'react';

export const useMusic = () => {
	const context = new AudioContext();
	const [source, setSource] = useState<AudioBufferSourceNode>();
	useEffect(() => {
		fetch('./music.mp3')
			.then((response) => response.arrayBuffer())
			.then((data) => {
				context.decodeAudioData(data).then((buf) => {
					// 创建source源。
					const bufferSource = context.createBufferSource();
					bufferSource.buffer = buf;
					bufferSource.connect(context.destination);
					setSource(bufferSource);
				});
			});
	}, []);
	const killStart = () => {
		context.resume().then((resolve) => {
			console.log(`🚀🚀🚀🚀🚀-> in useMusic.ts on 22`, resolve);
		});
	};
	const musicStart = () => {};
	const musicGameOver = () => {};
	return { musicStart, musicGameOver };
};
