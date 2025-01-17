import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Widget } from './Widget';
import type { Widget as WidgetType } from '../../../types/widget';

interface DraggableWidgetProps extends Pick<WidgetType, 'id' | 'title' | 'type' | 'size'> {
  index: number;
  onResize: () => void;
}

export const DraggableWidget: FC<DraggableWidgetProps> = ({
  id,
  index,
  ...widgetProps
}) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`h-full transition-shadow ${
          snapshot.isDragging ? 'shadow-lg' : ''
        }`}
      >
        <Widget {...widgetProps} />
      </div>
    )}
  </Draggable>
);