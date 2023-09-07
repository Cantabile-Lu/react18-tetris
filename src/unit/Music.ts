export class Music {
	readonly #context: AudioContext;
	#getSource: (() => AudioBufferSourceNode) | undefined;
	url: string;
	constructor(path: string) {
		console.log(`🚀🚀🚀🚀🚀-> in Music.ts on 6`, 'Music类方法执行');
		this.url = path;
		this.#context = new AudioContext();
		this.getMusic().then((fn) => {
			this.#getSource = fn;
			this.start();
		});
	}
	async getMusic() {
		if (this.#context) {
			const response = await fetch('./music.mp3');
			const data = await response.arrayBuffer();
			const buf = await this.#context.decodeAudioData(data);
			// 创建source源
			return (): AudioBufferSourceNode => {
				const bufferSource = this.#context.createBufferSource();
				bufferSource.buffer = buf;
				bufferSource.connect(this.#context.destination);
				return bufferSource;
			};
		}
	}
	start() {
		this.#getSource!().start(0, 3.7202, 3.6224);
	}

	fall() {
		this.#getSource!().start(0, 1.2558, 0.3546);
	}

	clear() {
		this.#getSource!().start(0, 0, 0.7675);
	}

	gameOver() {
		this.#getSource!().start(0, 8.1276, 1.1437);
	}

	rotate() {
		this.#getSource!().start(0, 2.2471, 0.0807);
	}

	move() {
		this.#getSource!().start(0, 2.9088, 0.1437);
	}
}
