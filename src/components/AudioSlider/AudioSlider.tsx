import Slider from '@mui/material/Slider';
import React, { Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';
import { setIsSeeking, togglePlaying } from '../../features/audioPlayerSlice';
import accentColor from '../../utils/accentColor';

const AudioSlider = (props: AudioSliderProps) => {
	const {
		rangeInputValue,
		setRangeInputValue,
		setSeekCurrentTime,
		horizontalLayout,
	} = props;

	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { duration } = audioPlayer;

	const dispatch = useDispatch();

	const format = (val: number) => {
		const valString = val + '';
		if (valString.length < 2) {
			return '0' + valString;
		} else {
			return valString;
		}
	};

	const formattedTime = (val: any) => {
		const seconds = format(Math.trunc(val % 60));
		const minutes = Math.trunc((val / 60) as any);

		return `${minutes}:${seconds}`;
	};

	return (
		<div className='flex flex-col'>
			<div
				className={`${horizontalLayout && 'items-center'} relative flex w-full`}
				onMouseDown={() => dispatch(setIsSeeking(true))}
				onPointerDown={() => dispatch(setIsSeeking(true))}>
				{horizontalLayout && (
					<>
						<span className='absolute -left-9 text-xs'>
							{formattedTime(rangeInputValue)}
						</span>
						<span className='absolute -right-9 text-xs'>
							{formattedTime(duration)}
						</span>
					</>
				)}

				<Slider
					value={rangeInputValue}
					size='small'
					aria-label='Small'
					max={duration}
					onChange={(_, value) => {
						setRangeInputValue(value as number);
					}}
					onChangeCommitted={(_, value) => {
						dispatch(setIsSeeking(false));
						dispatch(togglePlaying(true));
						setSeekCurrentTime(value as number);
					}}
					sx={{
						'&.MuiSlider-root': {
							padding: '5px 0',
						},
						'& .MuiSlider-thumb': {
							backgroundColor: '#ffffff',
							height: 11,
							width: 11,
							'&.Mui-active': {
								boxShadow: '0 0 0 7px rgba(255, 255, 255, 16%)',
								height: 14,
								width: 14,
							},
						},
						'& .MuiSlider-track': {
							backgroundColor: accentColor,
							height: '4px',
						},
						'& .MuiSlider-rail': {
							height: '4px',
						},
					}}
				/>
			</div>
			{!horizontalLayout && (
				<div className='flex justify-between mt-1'>
					<span className='text-xs'>{formattedTime(rangeInputValue)}</span>
					<span className='text-xs'>{formattedTime(duration)}</span>
				</div>
			)}
		</div>
	);
};

interface AudioSliderProps {
	rangeInputValue: number;
	setRangeInputValue: Dispatch<SetStateAction<number>>;
	setSeekCurrentTime: (value: number) => void;
	horizontalLayout?: boolean;
}

export default AudioSlider;