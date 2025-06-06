import React from 'react';
import { AnimatePresence } from 'framer-motion';
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
  handleEditTask 
}) => {
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
          <div className="space-y-3">
            <AnimatePresence>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  categories={categories}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskList;