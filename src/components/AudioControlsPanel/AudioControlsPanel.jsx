import React, { useEffect, useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { togglePlaying } from '../../features/audioPlayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import SongInfo from '../SongInfo/SongInfo';

const AudioControlsPanel = () => {
	const [showSongInfo, setShowSongInfo] = useState(false);
	const [rangeInputValue, setRangeInputValue] = useState(0);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const duration = useSelector((state) => state.audioPlayer.duration);
	const audioProgressValue = useSelector(
		(state) => state.audioPlayer.audioProgressValue
	);
	const queue = useSelector((state) => state.audioPlayer.queue);
	const currentSongInfo = useSelector(
		(state) => state.audioPlayer.currentSongInfo
	);

	const dispatch = useDispatch();

	const staticProgressBarRef = useRef();
	const songInfoRef = useRef();

	useEffect(() => {
		setRangeInputValue(audioProgressValue);

		const percent = (audioProgressValue / duration) * 100;

		if (staticProgressBarRef.current) {
			staticProgressBarRef.current.style.width = `${percent}%`;
		}
	}, [audioProgressValue]);

	useEffect(() => {
		showSongInfo
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [showSongInfo]);

	return (
		<>
			<div
				className={`${
					Object.keys(currentSongInfo).length > 0
						? 'translate-y-0'
						: 'translate-y-full'
				} fixed bottom-0 w-full p-2 transition-all duration-300 ease-in-out`}>
				<div className='overflow-hidden flex flex-col items-center bg-primary rounded-xl rounded-b-3xl backdrop-blur-md border solid border-primary'>
					<div
						className='flex items-center justify-between w-full'
						onClick={() => setShowSongInfo(true)}>
						<div className='flex items-center'>
							<div className='p-2 z-10 bg-primary'>
								<img
									src={currentSongInfo.albumImageUrl}
									width={40}
									height={40}
									className='rounded-md'
								/>
							</div>

							<div
								className='flex absolute left-14 transition-all duration-200 ease-in-out'
								style={{
									width:
										songInfoRef.current &&
										songInfoRef.current.clientWidth * queue.length,
									transform: `translateX(-${
										songInfoRef?.current?.clientWidth * currentSongInfo.position
									}px)`,
								}}>
								{queue.map((item, index) => {
									return (
										<div
											ref={songInfoRef}
											key={index}
											className='transition-all duration-1000 ease-in-out'
											style={{
												width: window.innerWidth,
												opacity: currentSongInfo.position == index ? 1 : 0,
											}}>
											<span className='block text-sm font-bold'>
												{item.title}
											</span>
											<span className='block text-sm text-inactive'>
												{item.artist}
											</span>
										</div>
									);
								})}
							</div>
						</div>
						<div className='flex bg-primary z-10'>
							<IconButton
								size='large'
								edge='end'
								onClick={(e) => e.stopPropagation()}>
								<FavoriteBorderIcon />
							</IconButton>
							<IconButton
								size='large'
								onClick={(e) => {
									e.stopPropagation();

									if (isPlaying) {
										dispatch(togglePlaying(false));
									} else {
										dispatch(togglePlaying(true));
									}
								}}>
								{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
							</IconButton>
						</div>
					</div>
					<div className='h-0.5 w-full bg-secondary'>
						<div
							ref={staticProgressBarRef}
							className='h-0.5 w-0 bg-accent transition-all duration-300 ease-in-out'
						/>
					</div>
					<div className='flex justify-evenly w-full p-1 bg-primary rounded-b-3xl'>
						<IconButton>
							<HomeIcon fontSize='medium' />
						</IconButton>
						<IconButton className='!text-inactive'>
							<SearchIcon fontSize='medium' />
						</IconButton>
						<IconButton className='!text-inactive'>
							<LibraryMusicIcon fontSize='medium' />
						</IconButton>
					</div>
				</div>
			</div>

			<SongInfo
				showSongInfo={showSongInfo}
				setShowSongInfo={setShowSongInfo}
				rangeInputValue={rangeInputValue}
				setRangeInputValue={setRangeInputValue}
			/>
		</>
	);
};

export default AudioControlsPanel;
