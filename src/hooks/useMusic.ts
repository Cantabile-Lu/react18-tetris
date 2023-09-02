import { useEffect, useState } from 'react';

export const useMusic = () => {
	const context = new AudioContext();
	const [source, setSource] = useState<() => AudioBufferSourceNode>();
	useEffect(() => {
		fetch('./music.mp3')
			.then((response) => response.arrayBuffer())
			.then((data) => {
				context.decodeAudioData(data).then((buf) => {
					const getSource = () => {
						// 创建source源。
						const source = context.createBufferSource();
						source.buffer = buf;
						source.connect(context.destination);
						return source;
					};

					setSource(() => getSource);
				});
			});
	}, []);

	const musicStart = () => {
		if (source) {
			source().start(0, 3.7202, 3.6224);
		}
	};
	const musicGameOver = () => {};
	return { musicStart, musicGameOver };
};
