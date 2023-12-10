import React, { useEffect, useState } from 'react';
import {
	togglePlaying,
	skipTrack,
	setQueue,
	setCurrentTrackPosition,
} from '../../features/audioPlayerSlice';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import { IconButton } from '@mui/material';
import {
	ExpandMoreRounded,
	DragHandle,
	PlayArrow,
	Pause,
	SkipNext,
	SkipPrevious,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Track from '../../types/Track';
import WaveAnimation from '../WaveAnimation';
import Image from '../Image';

const QueueInfo = (props: QueueInfoProps) => {
	const { showQueueInfo, setShowQueueInfo } = props;

	const dispatch = useDispatch();

	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const [prevQueue, setPrevQueue] = useState<Track[]>([]);
	const {
		queue,
		isPlaying,
		currentTrackInfo,
		currentTrackPosition,
		shuffleList,
	} = audioPlayer;

	const nextFromList = queue.slice(currentTrackPosition + 1, queue.length);

	useEffect(() => {
		if (shuffleList) {
			// shuffle the queue

			setPrevQueue(queue);

			const newQueue = [...queue];

			const currentItem = newQueue.splice(currentTrackPosition, 1);

			newQueue.sort(() => 0.5 - Math.random());

			dispatch(setCurrentTrackPosition(0));

			dispatch(setQueue([currentItem[0], ...newQueue]));
		} else {
			// restore previous queue

			const currentTrackIndex = prevQueue.findIndex(
				(item) => item.id == currentTrackInfo.id
			);
			const nextFromListPrev = prevQueue.slice(
				currentTrackIndex + 1,
				prevQueue.length
			);
			dispatch(setCurrentTrackPosition(currentTrackIndex));

			const newQueue = [...prevQueue];
			newQueue.splice(
				currentTrackIndex + 1,
				nextFromListPrev.length,
				...nextFromListPrev
			);

			dispatch(setQueue(newQueue));
		}
	}, [shuffleList]);

	return (
		<>
			<div
				className={`${
					showQueueInfo ? 'opacity-100 visible' : 'opacity-0 invisible'
				} absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-xl transition-opacity duration-700 ease-in-out z-30`}
			/>
			<div
				className={`${
					showQueueInfo
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-full'
				} fixed top-0 left-0 p-4 h-full w-full z-40 [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out]`}>
				<div className={`h-full w-full px-4 bg-primary rounded-2xl`}>
					<div className='h-full flex flex-col'>
						<div className='flex justify-between items-center'>
							<IconButton
								edge='start'
								onClick={() => {
									setShowQueueInfo(false);
								}}>
								<ExpandMoreRounded fontSize='large' />
							</IconButton>
							<div className='absolute left-1/2 -translate-x-1/2 text-center text-xs'>
								<span className='block tracking-widest'>
									PLAYING FROM ALBUM
								</span>
								<span className='block font-bold'>
									{currentTrackInfo.album?.name}
								</span>
							</div>
						</div>
						<div className='my-6'>
							<span className='block mb-2 font-bold '>Now Playing</span>
							<div className='flex items-center'>
								<div className='mr-2'>
									<div className='w-[40px] h-[40px] relative'>
										{queue.map(
											(item, index) =>
												currentTrackPosition === index && (
													<Image
														key={index}
														src={item.album?.albumImageUrl}
														width={40}
														height={40}
														classes='rounded-md shadow-md'
													/>
												)
										)}
									</div>
								</div>

								<div className='flex justify-between w-full'>
									<div>
										<span className='block text-sm text-accent'>
											{currentTrackInfo.title}
										</span>
										<span className='block text-sm text-inactive'>
											{currentTrackInfo.artist?.name}
										</span>
									</div>
									{isPlaying && <WaveAnimation />}
								</div>
							</div>
						</div>
						{nextFromList.length > 0 && (
							<div>
								<span className='block mb-2 font-bold'>
									Next From: Album Name
								</span>
								<DragDropContext
									onDragEnd={(e) => {
										if (!e.destination) return;

										// reorder items in nextFromList variable
										const [reorderedItem] = nextFromList.splice(
											e.source.index,
											1
										);
										nextFromList.splice(e.destination.index, 0, reorderedItem);

										// insert reordered items in state
										const newQueue = [...queue];
										newQueue.splice(
											currentTrackPosition + 1,
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
															isDragDisabled={nextFromList.length == 1}
															key={item.id}
															draggableId={item.id}
															index={index}>
															{(provided, snapshot) => (
																<li
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	className={`flex justify-between -mx-4 py-2 px-4 transition-colors duration-300 select-none ${
																		snapshot.isDragging ? 'bg-secondary' : ''
																	}`}>
																	<div>
																		<span className='block text-sm'>
																			{item.title}
																		</span>
																		<span className='block text-sm text-inactive'>
																			{item.artist?.name}
																		</span>
																	</div>
																	{nextFromList.length > 1 && (
																		<IconButton edge='end'>
																			<DragHandle />
																		</IconButton>
																	)}
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
									disabled={currentTrackPosition == 0}
									onClick={() => {
										dispatch(skipTrack('prev'));
									}}
									size='large'>
									<SkipPrevious fontSize='large' />
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
										<Pause fontSize='large' />
									) : (
										<PlayArrow fontSize='large' />
									)}
								</IconButton>
								<IconButton
									disabled={currentTrackPosition + 1 == queue.length}
									onClick={() => {
										dispatch(skipTrack('next'));
									}}
									size='large'>
									<SkipNext fontSize='large' />
								</IconButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

interface QueueInfoProps {
	showQueueInfo: boolean;
	setShowQueueInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default QueueInfo;
