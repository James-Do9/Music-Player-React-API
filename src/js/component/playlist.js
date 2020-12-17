import React from "react";
/*  Create an array of objects to keep track of information on the songs,
Create a loop that displays the index numbers of the songs + 1 (reasoning for +1 is because index starts at 0) the loop must also display the name of the author and title ,
Make 1 button with .play() .pause() that toggles
Make 2 onclick buttons that either goes back to the beginning of the song and one that skips the song
Make a footer with the buttons with bootstrap with "fixed-bottom"*/
export class PlayList extends React.Component {
	constructor() {
		super();
		this.player = null;
		this.state = {
			songs: [
				{
					title: "South Park",
					id: "south-park",
					author: "Kyle",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
				},
				{
					title: "Thunder Cats",
					id: "thundercats",
					author: "Moonra",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Profesor",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			],
			currentSong: 0
		};
	}
	playSong = i => {
		this.state.songs.map((song, index) => {
			if (index == i) {
				this.player.src = song.url;
				this.player.play();
				this.setState({ currentSong: index });
			} else if (i > index) {
				index = -1;
				this.setState({ currentSong: index });
				this.player.play();
			}
		});
		this.playButton.style.display = "none";
		this.pauseButton.style.display = "inline";
	};

	pauseSong = i => {
		this.state.songs.map((song, index) => {
			if (index == i) {
				this.player.src = song.url;
				this.player.pause();
			}
		});
		this.playButton.style.display = "inline";
		this.pauseButton.style.display = "none";
	};

	shuffle = () => {
		var randomizer = Math.floor(Math.random() * this.state.songs);
		this.setState({ currentSong: randomizer });
		this.player.play();
	};

	render() {
		return (
			<div>
				<ol className="list-group list-group-flush">
					{this.state.songs.map((song, index) => {
						return (
							<li className="list-group-item list" key={index}>
								<span ref={el => (this.playSideButton = el)}>
									<i
										onClick={() => this.playSong(index)}
										className="fas fa-play-circle"
									/>
								</span>
								<span style={{ display: "none" }}>
									<i
										onClick={() => this.pauseSong(index)}
										className="fas fa-pause-circle"
									/>
								</span>
								{index + 1 + "."}{" "}
								{song.author + " - " + song.title}
							</li>
						);
					})}
				</ol>
				<div className="fixed-bottom buttonBar">
					<span>
						<a
							onClick={() =>
								this.playSong(this.state.currentSong - 1)
							}>
							<i className="fas fa-caret-square-left" />
						</a>
					</span>
					<span ref={el => (this.playButton = el)}>
						<a
							onClick={() =>
								this.playSong(this.state.currentSong)
							}>
							<i className="fas fa-play-circle" />
						</a>
					</span>
					<span
						style={{ display: "none" }}
						ref={el => (this.pauseButton = el)}>
						<a
							onClick={() =>
								this.pauseSong(this.state.currentSong)
							}>
							<i className="fas fa-pause-circle" />
						</a>
					</span>
					<span>
						<a
							onClick={() =>
								this.playSong(this.state.currentSong + 1)
							}>
							<i className="fas fa-caret-square-right" />
						</a>
					</span>
					<audio
						src={this.state.songs[0].url}
						ref={el => (this.player = el)}
						controls
					/>
				</div>
			</div>
		);
	}
}
//Can you set a button to set a state? Ex: when clicking the button, it'll set the state to "paused" or "play"
//If else statements on the state of musicState? If musicState == "pause" then .paused()
