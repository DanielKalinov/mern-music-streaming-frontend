import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	togglePlaying,
	setRepeatCurrentSong,
	skipTrack,
	setQueue,
	setCurrentSongInfo,
} from '../../features/audioPlayerSlice';
import { IconButton } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect } from 'react';

const QueueInfo = (props) => {
	const { showQueueInfo, setShowQueueInfo } = props;

	const dispatch = useDispatch();

	const queue = useSelector((state) => state.audioPlayer.queue);
	const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
	const currentSongInfo = useSelector(
		(state) => state.audioPlayer.currentSongInfo
	);

	const [nextFromList, setNextFromList] = useState([]);

	const currentSongPosition = queue.findIndex(
		(item) => item.title == currentSongInfo.title
	);

	useEffect(() => {
		setNextFromList(queue.slice(currentSongPosition + 1, queue.length));
	}, [queue, currentSongInfo]);

	const dragItem = useRef();
	const dragOverItem = useRef();

	const dragStart = (e, position) => {
		dragItem.current = position;
	};

	const dragEnter = (e, position) => {
		dragOverItem.current = position;
	};

	const drop = (e) => {
		const copyListItems = [...nextFromList];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);

		dragItem.current = null;
		dragOverItem.current = null;

		setNextFromList(copyListItems);

		const newQueue = [...queue];

		newQueue.splice.apply(
			newQueue,
			[currentSongPosition + 1, copyListItems.length].concat(copyListItems)
		);

		dispatch(setQueue(newQueue));
	};

	return (
		<div
			className={`${showQueueInfo ? 'opacity-100' : 'opacity-0'} ${
				showQueueInfo ? 'translate-y-0' : 'translate-y-full'
			} bg-primary z-40 fixed top-0 h-full w-full [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out]`}>
			<div className='h-full flex flex-col'>
				<div className='flex justify-between items-center'>
					<IconButton
						onClick={() => {
							setShowQueueInfo(false);
						}}>
						<ExpandMoreRoundedIcon fontSize='large' />
					</IconButton>
					<div className='text-center text-xs m-auto'>
						<span className='block tracking-widest'>PLAYING FROM ALBUM</span>
						<span className='block font-bold'>Album Name</span>
					</div>
				</div>
				<div className='mb-6 px-6'>
					<span className='block mb-2 font-bold '>Now Playing</span>
					<div className='flex items-center'>
						<div className='mr-2'>
							<div className='w-[40px] h-[40px] relative'>
								{queue.map((item, index) => (
									<img
										key={index}
										src={item.albumImageUrl}
										width={40}
										height={40}
										className={`${
											currentSongPosition == index ? 'opacity-1' : 'opacity-0'
										} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md transition-opacity duration-300 ease-in-out`}
									/>
								))}
							</div>
						</div>

						<div>
							<span className='block text-sm font-semibold'>
								{currentSongInfo.title}
							</span>
							<span className='block text-sm text-inactive'>
								{currentSongInfo.artist}
							</span>
						</div>
					</div>
				</div>
				{nextFromList.length > 0 && (
					<div className='px-6'>
						<div>
							<span className='block mb-2 font-bold'>
								Next From: Album Name
							</span>
							<ul className='space-y-2'>
								{nextFromList.map((item, index) => (
									<li
										key={index}
										className='flex justify-between cursor-pointer'
										draggable
										onDragStart={(e) => dragStart(e, index)}
										onDragEnter={(e) => dragEnter(e, index)}
										onDragEnd={drop}>
										<div>
											<span className='block text-sm font-semibold'>
												{item.title}
											</span>
											<span className='block text-sm text-inactive'>
												{item.artist}
											</span>
										</div>
										<IconButton edge='end'>
											<DragHandleIcon />
										</IconButton>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
				<div className='mt-auto w-full'>
					<div className='flex justify-evenly my-4'>
						<IconButton
							disabled={currentSongPosition == 0}
							onClick={() => {
								dispatch(skipTrack('prev'));
							}}
							size='large'>
							<SkipPreviousIcon fontSize='large' />
						</IconButton>
						<IconButton
							size='large'
							className='!bg-white/10 rounded-full !transition-transform active:scale-90'
							onClick={(e) => {
								e.stopPropagation();

								if (isPlaying) {
									dispatch(togglePlaying(false));
								} else {
									dispatch(togglePlaying(true));
								}
							}}>
							{isPlaying ? (
								<PauseIcon fontSize='large' />
							) : (
								<PlayArrowIcon fontSize='large' />
							)}
						</IconButton>
						<IconButton
							disabled={currentSongPosition + 1 == queue.length}
							onClick={() => {
								dispatch(skipTrack('next'));
							}}
							size='large'>
							<SkipNextIcon fontSize='large' />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QueueInfo;
