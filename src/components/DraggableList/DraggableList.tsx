import React from 'react';
import {
	DndContext,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import Track from '../../types/Track';
import { setQueue } from '../../features/audioPlayerSlice';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { DragHandle } from '@mui/icons-material';
import artistNames from '../../utils/artistName';

const DraggableList = ({
	queue,
	currentTrackPosition,
}: {
	queue: Track[];
	currentTrackPosition: number;
}) => {
	const sensors = useSensors(useSensor(PointerSensor));

	const dispatch = useDispatch();

	const nextFromList = queue.slice(currentTrackPosition + 1, queue.length);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active && over && active.id !== over.id) {
			const oldIndex = queue.findIndex((item) => item._id === active.id);
			const newIndex = queue.findIndex((item) => item._id === over.id);
			const updatedQueue = arrayMove(queue, oldIndex, newIndex);

			dispatch(setQueue(updatedQueue));
		}
	};

	return (
		<ul className='overflow-y-auto mb-4'>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
				<SortableContext
					disabled={!queue[currentTrackPosition + 2]}
					items={nextFromList.map(({ _id }) => _id)}
					strategy={verticalListSortingStrategy}>
					{nextFromList.map(({ _id, track }) => (
						<SortableItem key={_id} id={_id}>
							<div className='flex items-center justify-between py-2 px-4 '>
								<div className='overflow-hidden'>
									<span className='block text-sm truncate lg:text-base'>
										{track?.title}
									</span>
									<span className='block text-sm text-inactive lg:text-base'>
										{artistNames(track?.artist)}
									</span>
								</div>
								{queue[currentTrackPosition + 2] && (
									<IconButton disableRipple edge='end'>
										<DragHandle />
									</IconButton>
								)}
							</div>
						</SortableItem>
					))}
				</SortableContext>
			</DndContext>
		</ul>
	);
};

export default DraggableList;
