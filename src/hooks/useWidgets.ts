import { useState } from 'react';
import type { Widget, WidgetSize } from '../types/widget';

const DEFAULT_WIDGETS: Widget[] = [
  { id: 'milestones', title: 'Milestone Progress', type: 'timeline', size: 'expanded' },
  { id: 'stakeholders', title: 'Stakeholder Distribution', type: 'pie', size: 'expanded' },
  { id: 'distribution', title: 'E-Qoin Distribution', type: 'distribution', size: 'expanded' },
  { id: 'performance', title: 'Performance Metrics', type: 'metrics', size: 'expanded' }
];

export const useWidgets = () => {
  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);

  const updateWidgetLayout = (sourceIndex: number, destinationIndex: number) => {
    setWidgets(prevWidgets => {
      const newWidgets = Array.from(prevWidgets);
      const [removed] = newWidgets.splice(sourceIndex, 1);
      newWidgets.splice(destinationIndex, 0, removed);
      return newWidgets;
    });
  };

  const toggleWidgetSize = (id: string) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === id 
          ? { ...widget, size: widget.size === 'normal' ? 'expanded' : 'normal' }
          : widget
      )
    );
  };

  return { widgets, updateWidgetLayout, toggleWidgetSize };
};