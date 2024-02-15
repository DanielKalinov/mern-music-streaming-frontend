import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable(props: { id: string; children: JSX.Element }) {
	// isOver
	const { setNodeRef } = useDroppable({
		id: props.id,
	});

	return <div ref={setNodeRef}>{props.children}</div>;
}

export default Droppable;
