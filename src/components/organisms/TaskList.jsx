import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import TaskCard from '@/components/molecules/TaskCard';
import Text from '@/components/atoms/Text';
const TaskList = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onDeleteTask, 
  onUpdateTask, 
  setShowAddForm, 
  handleEditTask,
  onReorderTasks 
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.index === destination.index) return;
    
    onReorderTasks(source.index, destination.index);
  };
  return (
    <Card>
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <div className="flex justify-between items-center">
          <Text type="h2" className="text-xl font-semibold text-surface-900 dark:text-white">
            Tasks ({tasks.length})
          </Text>
        </div>
      </div>

      <div className="p-6">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="CheckCircle" size={48} className="mx-auto text-surface-300 dark:text-surface-600 mb-4" />
            <Text type="h3" className="text-lg font-medium text-surface-900 dark:text-white mb-2">
              No tasks found
            </Text>
            <Text type="p" className="text-surface-500 dark:text-surface-400 mb-6">
              Get started by adding your first task!
            </Text>
            <Button onClick={() => setShowAddForm(true)}>
              Add Task
            </Button>
          </div>
) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-3 transition-colors duration-200 ${
                    snapshot.isDraggingOver ? 'bg-primary/5 rounded-lg p-2' : ''
                  }`}
                >
                  <AnimatePresence>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`transition-transform duration-200 ${
                              snapshot.isDragging 
                                ? 'rotate-2 scale-105 shadow-lg' 
                                : 'hover:scale-[1.02]'
                            }`}
                          >
                            <TaskCard
                              task={task}
                              categories={categories}
                              onToggleComplete={onToggleComplete}
                              onDelete={onDeleteTask}
                              onEdit={handleEditTask}
                              dragHandleProps={provided.dragHandleProps}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </Card>
  );
};

export default TaskList;