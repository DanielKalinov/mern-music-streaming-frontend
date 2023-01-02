import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DragHandleIcon from '@mui/icons-material/DragHandle';

const QueueInfo = (props) => {
	const { showQueueInfo, setShowQueueInfo } = props;
	const queue = useSelector((state) => state.audioPlayer.queue);
	const currentSongInfo = useSelector(
		(state) => state.audioPlayer.currentSongInfo
	);

	const nextFromList = queue.slice(currentSongInfo.position + 1, queue.length);

	return (
		<div
			className={`${showQueueInfo ? 'opacity-100' : 'opacity-0'} ${
				showQueueInfo ? 'translate-y-0' : 'translate-y-full'
			} bg-primary z-40 fixed top-0 h-full w-full [transition:transform_300ms_ease-in-out,opacity_200ms_ease-in-out]`}>
			<div>
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
				<div className='px-6'>
					<div className='mb-6'>
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
												currentSongInfo.position == index
													? 'opacity-1'
													: 'opacity-0'
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
							<span className='block mb-2 font-bold'>
								Next From: Album Name
							</span>
							<ul className='space-y-2'>
								{nextFromList.map((item) => (
									<li className='flex justify-between'>
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
					)}
				</div>
			</div>
		</div>
	);
};

export default QueueInfo;
