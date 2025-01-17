import { FC } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { useWidgets } from '../../../hooks/useWidgets';
import { DroppableGrid } from './DroppableGrid';
import { PerformanceWidget } from './PerformanceWidget';
import { StakeholderWidget } from './StakeholderWidget';
import { EQoinDistributionWidget } from './EQoinDistributionWidget';
import { MilestoneWidget } from './MilestoneWidget';

export const WidgetGrid: FC = () => {
  const { widgets, updateWidgetLayout, toggleWidgetSize } = useWidgets();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    updateWidgetLayout(result.source.index, result.destination.index);
  };

  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case 'timeline':
        return (
          <MilestoneWidget
            id={widget.id}
            size={widget.size}
            onResize={() => toggleWidgetSize(widget.id)}
          />
        );
      case 'pie':
        return (
          <StakeholderWidget
            id={widget.id}
            size={widget.size}
            onResize={() => toggleWidgetSize(widget.id)}
          />
        );
      case 'distribution':
        return (
          <EQoinDistributionWidget
            id={widget.id}
            size={widget.size}
            onResize={() => toggleWidgetSize(widget.id)}
          />
        );
      case 'metrics':
        return (
          <PerformanceWidget
            id={widget.id}
            size="expanded"
            onResize={() => toggleWidgetSize(widget.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {widgets.filter(w => w.type !== 'metrics').map((widget, index) => (
            <div key={widget.id} className={widget.size === 'expanded' ? 'col-span-2' : ''}>
              {renderWidget(widget)}
            </div>
          ))}
        </div>
        
        {/* Performance Metrics at the bottom */}
        <div className="col-span-2">
          {renderWidget(widgets.find(w => w.type === 'metrics'))}
        </div>
      </div>
    </DragDropContext>
  );
};