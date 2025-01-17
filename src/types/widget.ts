export type WidgetSize = 'normal' | 'expanded';
export type WidgetType = 'metrics' | 'pie' | 'timeline' | 'list';

export interface Widget {
  id: string;
  title: string;
  type: WidgetType;
  size: WidgetSize;
}

export interface DragResult {
  source: {
    index: number;
  };
  destination?: {
    index: number;
  };
}