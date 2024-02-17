import React from 'react';
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
	nextFromList,
	queue,
}: {
	nextFromList: Track[];
	queue: Track[];
}) => {
	const sensors = useSensors(useSensor(PointerSensor));

	const dispatch = useDispatch();

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = nextFromList.findIndex((item) => item._id === active.id);
			const newIndex = nextFromList.findIndex((item) => item._id === over.id);
			const updatedQueue = arrayMove(nextFromList, oldIndex, newIndex);

			dispatch(setQueue([queue[0], ...updatedQueue]));
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToVerticalAxis]}>
			<SortableContext
				items={nextFromList.map(({ _id }) => _id)}
				strategy={verticalListSortingStrategy}>
				{nextFromList.map(({ _id, track }) => (
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
