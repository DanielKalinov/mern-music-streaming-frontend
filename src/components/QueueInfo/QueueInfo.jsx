import React from 'react';
import { IconButton } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const QueueInfo = (props) => {
	const { showQueueInfo, setShowQueueInfo } = props;

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
			</div>
		</div>
	);
};

export default QueueInfo;
