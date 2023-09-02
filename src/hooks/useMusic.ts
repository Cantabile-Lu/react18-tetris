export const useMusic = () => {
	const context = new AudioContext();
	fetch('./music.mp3')
		.then((response) => response.arrayBuffer())
		.then((data) => {
			context.decodeAudioData(data, (buf) => {
				const getSource = () => {
					const source = context.createBufferSource();
					source.buffer = buf;
					source.connect(context.destination);
					return source;
				};
			});
		});
	const musicStart = () => {};
	const musicGameOver = () => {};
	return { musicStart, musicGameOver };
};
