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
			currentSong: 0,
			musicVolume: 50
		};
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(jsonifiedResponse =>
				this.setState({ songs: jsonifiedResponse })
			)
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	playSong = i => {
		this.state.songs.map((song, index) => {
			if (index == i) {
				this.player.src =
					"https://assets.breatheco.de/apis/sound/" +
					this.state.songs[index].url;
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

	repeat = i => {
		this.setState({ currentSong: i });
	};

	setVolume = e => {
		this.player.volume = e.target.value / 100;
	};
	mutePlayer = () => {
		this.soundButton.style.display = "none";
		this.muteButton.style.display = "inline";
		this.setState({ musicVolume: 0 });
		//this.player.muted = true;
	};
	unMutePlayer = () => {
		this.soundButton.style.display = "inline";
		this.muteButton.style.display = "none";
		//this.player.muted = false;
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
								{index + 1 + "."} {song.name}
							</li>
						);
					})}
				</ol>
				<div className="fixed-bottom buttonBar">
					<span>
						<a onClick={() => this.shuffle()}>
							<i className="fas fa-random" />
						</a>
					</span>
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
					<span>
						<a onClick={() => this.repeat(this.state.currentSong)}>
							<i className="fas fa-redo" />
						</a>
					</span>
					<span ref={element => (this.soundButton = element)}>
						<a onClick={() => this.mutePlayer()}>
							<i
								style={{
									position: "absolute",
									right: "270px",
									top: "15px"
								}}
								className="fas fa-volume-up"
							/>
						</a>
					</span>
					<span ref={element => (this.muteButton = element)}>
						<a onClick={() => this.unMutePlayer()}>
							<i
								style={{
									display: "none",
									position: "absolute",
									right: "270px",
									top: "15px"
								}}
								className="fas fa-volume-mute"
							/>
						</a>
					</span>
					<input
						id="volume-control"
						type="range"
						min="0"
						max="100"
						step="1"
						value={this.state.musicVolume}
						onInput={e => this.setVolume(e)}
						onChange={e =>
							this.setState({ musicVolume: e.target.value })
						}
					/>

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
//Work on line 134 for the shuffle function, work on line 173 for the repeat function, both are not working atm.
//Get the volume button to toggle to muted and unmuted on lines 177-201
