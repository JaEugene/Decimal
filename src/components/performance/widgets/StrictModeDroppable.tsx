import { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { DroppableProps } from 'react-beautiful-dnd';

interface StrictModeDroppableProps extends Omit<DroppableProps, 'mode' | 'type'> {
  mode?: DroppableProps['mode'];
  type?: string;
}

export const StrictModeDroppable = ({
  children,
  mode = 'standard',
  type = 'DEFAULT',
  ...props
}: StrictModeDroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable
      mode={mode}
      type={type}
      {...props}
    >
      {children}
    </Droppable>
  );
};