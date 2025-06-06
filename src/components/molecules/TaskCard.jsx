import React from 'react';
import { motion } from 'framer-motion';
import Checkbox from '@/components/atoms/Checkbox';
import ApperIcon from '@/components/ApperIcon';
import { format, isToday, parseISO, isPast } from 'date-fns';
import Text from '@/components/atoms/Text';

const TaskCard = ({ task, categories, onToggleComplete, onEdit, onDelete, dragHandleProps, isDragging }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6b7280';
  };

  const getDateStatus = (dueDate) => {
    if (!dueDate) return null;
    const date = parseISO(dueDate);
    if (isToday(date)) return 'today';
    if (isPast(date)) return 'overdue';
    return 'upcoming';
  };

  const getDateColor = (status) => {
    switch (status) {
      case 'overdue': return 'text-red-500';
      case 'today': return 'text-yellow-600';
      case 'upcoming': return 'text-blue-500';
      default: return 'text-surface-500';
    }
  };

  const dateStatus = getDateStatus(task.dueDate);

return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-default ${
        isDragging 
          ? 'shadow-2xl bg-white dark:bg-surface-800 border-primary transform rotate-2 scale-105' 
          : task.completed
          ? 'bg-surface-50 dark:bg-surface-700/50 border-surface-200 dark:border-surface-600'
          : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-600 hover:border-primary/50'
      }`}
    >
<div className="flex items-start space-x-3">
        <div 
          {...dragHandleProps}
          className="flex items-center justify-center w-6 h-6 mt-1 cursor-grab active:cursor-grabbing hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors"
          title="Drag to reorder"
        >
          <ApperIcon name="GripVertical" size={14} className="text-surface-400 dark:text-surface-500" />
        </div>
        <Checkbox checked={task.completed} onChange={() => onToggleComplete(task.id)} className="mt-1" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Text type="h3" className={`font-medium ${
                task.completed
                  ? 'text-surface-500 dark:text-surface-400 line-through'
                  : 'text-surface-900 dark:text-white'
              }`}>
                {task.title}
              </Text>
              
              {task.description && (
                <Text type="p" className={`text-sm mt-1 ${
                  task.completed
                    ? 'text-surface-400 dark:text-surface-500'
                    : 'text-surface-600 dark:text-surface-300'
                }`}>
                  {task.description}
                </Text>
              )}

              <div className="flex items-center space-x-3 mt-2">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                  <Text type="span" className="text-xs text-surface-500 dark:text-surface-400 capitalize">
                    {task.priority}
                  </Text>
                </div>

                <div 
                  className="px-2 py-1 text-xs rounded-full text-white"
                  style={{ backgroundColor: getCategoryColor(task.category) }}
                >
                  {task.category}
                </div>

                {task.dueDate && (
                  <div className={`text-xs ${getDateColor(dateStatus)}`}>
                    <ApperIcon name="Calendar" size={12} className="inline mr-1" />
                    {isToday(parseISO(task.dueDate)) 
                      ? 'Today' 
                      : format(parseISO(task.dueDate), 'MMM d, yyyy')
                    }
                    {dateStatus === 'overdue' && ' (Overdue)'}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-surface-400 hover:text-primary transition-colors"
              >
                <ApperIcon name="Edit2" size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-surface-400 hover:text-red-500 transition-colors"
              >
                <ApperIcon name="Trash2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;