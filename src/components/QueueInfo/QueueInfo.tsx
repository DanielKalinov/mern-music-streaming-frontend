import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	togglePlaying,
	skipTrack,
	setQueue,
	setCurrentSongPosition,
} from '../../features/audioPlayerSlice';
import { IconButton } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AudioPlayerState from '../../types/AudioPlayerState';
import Song from '../../types/Song';

const QueueInfo = (props: QueueInfoProps) => {
	const { showQueueInfo, setShowQueueInfo } = props;

	const dispatch = useDispatch();

	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const [prevQueue, setPrevQueue] = useState<Song[]>([]);
	const {
		queue,
		isPlaying,
		currentSongInfo,
		currentSongPosition,
		shuffleList,
	} = audioPlayer;

	const nextFromList = queue.slice(currentSongPosition + 1, queue.length);

	useEffect(() => {
		if (shuffleList) {
			// shuffle the queue

			setPrevQueue(queue);

			nextFromList.sort(() => 0.5 - Math.random());

			const newQueue = [...queue];
			newQueue.splice(
				currentSongPosition + 1,
				nextFromList.length,
				...nextFromList
			);

			dispatch(setQueue(newQueue));
		} else {
			// restore previous queue

			const currentSongIndex = prevQueue.findIndex(
				(item) => item._id == currentSongInfo._id
			);
			const nextFromListPrev = prevQueue.slice(
				currentSongIndex + 1,
				prevQueue.length
			);
			dispatch(setCurrentSongPosition(currentSongIndex));

			const newQueue = [...prevQueue];
			newQueue.splice(
				currentSongIndex + 1,
				nextFromListPrev.length,
				...nextFromListPrev
			);

			dispatch(setQueue(newQueue));
		}
	}, [shuffleList]);

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
					<div>
						<span className='block px-6 mb-2 font-bold'>
							Next From: Album Name
						</span>
						<DragDropContext
							onDragEnd={(e) => {
								if (!e.destination) return;

								// reorder items in nextFromList variable
								const [reorderedItem] = nextFromList.splice(e.source.index, 1);
								nextFromList.splice(e.destination.index, 0, reorderedItem);

								// insert reordered items in state
								const newQueue = [...queue];
								newQueue.splice(
									currentSongPosition + 1,
									nextFromList.length,
									...nextFromList
								);

								dispatch(setQueue(newQueue));
							}}>
							<Droppable droppableId='queue'>
								{(provided) => (
									<ul {...provided.droppableProps} ref={provided.innerRef}>
										<>
											{nextFromList.map((item, index) => (
												<Draggable
													key={item._id}
													draggableId={item._id}
													index={index}>
													{(provided, snapshot) => (
														<li
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className={`flex justify-between px-6 py-2 transition-colors duration-300 select-none ${
																snapshot.isDragging ? 'bg-secondary' : ''
															}`}>
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
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</>
									</ul>
								)}
							</Droppable>
						</DragDropContext>
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

interface QueueInfoProps {
	showQueueInfo: boolean;
	setShowQueueInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default QueueInfo;
