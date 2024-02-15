import React, { useEffect, useState } from 'react';
import {
	DndContext,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
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
	const [list, setList] = useState<Track[]>([]);
	const sensors = useSensors(useSensor(PointerSensor));

	const dispatch = useDispatch();

	useEffect(() => {
		const nextFromList = queue.slice(currentTrackPosition + 1, queue.length);
		setList(nextFromList);
	}, [currentTrackPosition]);

	useEffect(() => {
		if (list.length) {
			const newQueue = [...queue];
			newQueue.splice(currentTrackPosition + 1, list.length, ...list);

			dispatch(setQueue(newQueue));
		}
	}, [list]);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			setList((items) => {
				const oldIndex = items.findIndex((item) => item._id === active.id);
				const newIndex = items.findIndex((item) => item._id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToVerticalAxis]}>
			<SortableContext
				items={list.map(({ _id }) => _id)}
				strategy={verticalListSortingStrategy}>
				{list.map(({ _id, track }) => (
					<SortableItem key={_id} id={_id}>
						<div className='flex items-center justify-between py-2 px-4 '>
							<div>
								<span className='block text-sm lg:text-base'>
									{track?.title}
								</span>
								<span className='block text-sm text-inactive lg:text-base'>
									{artistNames(track?.artist)}
								</span>
							</div>
							<div>
								<IconButton>
									<DragHandle />
								</IconButton>
							</div>
						</div>
					</SortableItem>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default DraggableList;
