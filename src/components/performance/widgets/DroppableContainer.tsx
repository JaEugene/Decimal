import { FC, useEffect, useState, PropsWithChildren } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

type DroppableContainerProps = PropsWithChildren<{
  droppableId: string;
  type?: string;
}>;

export const DroppableContainer: FC<DroppableContainerProps> = ({ 
  children, 
  droppableId, 
  type = 'DEFAULT' // Use parameter default instead of defaultProps
}) => {
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
    <Droppable droppableId={droppableId} type={type}>
      {children}
    </Droppable>
  );
};