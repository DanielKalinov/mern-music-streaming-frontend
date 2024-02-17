import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem(props: { id: string; children: JSX.Element }) {
	const { attributes, listeners, setNodeRef, transform, transition, active } =
		useSortable({
			id: props.id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			className={`transition-colors duration-150 ease-in-out ${
				active?.id == props.id ? 'bg-secondary' : ''
			}`}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			{props.children}
		</div>
	);
}

export default SortableItem;
