import React, { useEffect, useRef, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayerState from '../../types/AudioPlayerState';

const TextSlideAnim = ({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) => {
	const audioPlayer = useSelector(
		(state: AudioPlayerState) => state.audioPlayer
	);
	const { currentTrackInfo } = audioPlayer;

	const spanRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (Object.keys(currentTrackInfo).length > 0 && spanRef.current) {
			spanRef.current.style.right = '0px';
			spanRef.current.style.transition = 'none';

			spanRef.current.scrollWidth !== spanRef.current.clientWidth &&
				textSlideAnim();
		}
	}, [currentTrackInfo]);

	function textSlideAnim() {
		let direction = 'left';

		changeTextPosition();

		spanRef.current!.ontransitionend = () => {
			direction = direction === 'left' ? 'right' : 'left';
			changeTextPosition();
		};

		function changeTextPosition() {
			const minDuration = 1000; // 1 second
			const maxDuration = 10000; // 10 seconds
			let duration = (spanRef.current!.textContent!.length / 0.5) * 100;

			// Clamp the duration between the minimum and maximum
			duration = Math.max(minDuration, Math.min(maxDuration, duration));

			spanRef.current!.style.transition = `all ${duration}ms linear`;
			spanRef.current!.style.right =
				direction === 'left'
					? spanRef.current!.scrollWidth - spanRef.current!.clientWidth + 'px'
					: '0px';
		}
	}

	return (
		<span
			ref={spanRef}
			className={`relative right-0 whitespace-nowrap block !delay-[2s]${
				className ? ` ${className}` : ''
			}`}>
			{children}
		</span>
	);
};

export default TextSlideAnim;
