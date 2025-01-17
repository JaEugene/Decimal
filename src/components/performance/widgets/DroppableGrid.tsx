import { FC } from 'react';
import type { Widget as WidgetType } from '../../../types/widget';
import { DraggableWidget } from './DraggableWidget';
import { DroppableContainer } from './DroppableContainer';

interface DroppableGridProps {
  widgets: WidgetType[];
  onResize: (id: string) => void;
  renderWidget: (widget: WidgetType) => React.ReactNode;
}

export const DroppableGrid: FC<DroppableGridProps> = ({ 
  widgets, 
  onResize,
  renderWidget 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DroppableContainer droppableId="widgets" type="DEFAULT">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="contents"
          >
            {widgets.map((widget, index) => (
              <DraggableWidget
                key={widget.id}
                {...widget}
                index={index}
                onResize={() => onResize(widget.id)}
              >
                {renderWidget(widget)}
              </DraggableWidget>
            ))}
            {provided.placeholder}
          </div>
        )}
      </DroppableContainer>
    </div>
  );
};