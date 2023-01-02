import React, { useEffect, useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { skipTrack, togglePlaying } from '../../features/audioPlayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import SongInfo from '../SongInfo/SongInfo';

const AudioControlsPanel = ({ setSeekCurrentTime }) => {
	const [showSongInfo, setShowSongInfo] = useState(false);
	const [showQueue, setShowQueue] = useState(false);
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
				<div className='overflow-hidden flex flex-col items-center bg-primary rounded-xl rounded-b-3xl panelShadow border solid border-slate-700'>
					<div
						className='relative flex items-center justify-between w-full'
						onClick={() => setShowSongInfo(true)}>
						<div className='flex items-center'>
							<div className='p-2'>
								<div className='w-[40px] h-[40px] relative'>
									{queue.map((item, index) => (
										<img
											key={index}
											src={item.albumImageUrl}
											width={40}
											height={40}
											className={`${
												currentSongInfo.position == index
													? 'opacity-1'
													: 'opacity-0'
											} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md transition-opacity duration-300 ease-in-out`}
										/>
									))}
								</div>
							</div>

							<div>
								<span className='block text-sm font-bold'>
									{currentSongInfo.title}
								</span>
								<span className='block text-sm text-inactive'>
									{currentSongInfo.artist}
								</span>
							</div>
						</div>
						<div className='flex'>
							<IconButton
								disabled={currentSongInfo.position == 0}
								onClick={(e) => {
									e.stopPropagation();

									dispatch(skipTrack('prev'));
								}}>
								<SkipPreviousIcon />
							</IconButton>
							<IconButton
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
							<IconButton
								disabled={currentSongInfo.position + 1 == queue.length}
								onClick={(e) => {
									e.stopPropagation();

									dispatch(skipTrack('next'));
								}}>
								<SkipNextIcon />
							</IconButton>
						</div>
					</div>
					<div className='px-2 !w-full !h-full'>
						<div className='h-0.5 w-full bg-secondary'>
							<div
								ref={staticProgressBarRef}
								className='h-0.5 w-0 bg-accent transition-all duration-300 ease-in-out'
							/>
						</div>
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
				setSeekCurrentTime={setSeekCurrentTime}
				setShowQueue={setShowQueue}
			/>
		</>
	);
};

export default AudioControlsPanel;
