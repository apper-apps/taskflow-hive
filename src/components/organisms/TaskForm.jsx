import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import { format, parseISO } from 'date-fns';
import Text from '@/components/atoms/Text';

const TaskForm = ({ 
  categories, 
  onAddTask, 
  onUpdateTask, 
  editingTask, 
  setEditingTask,
  showForm, 
  setShowForm 
}) => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    if (editingTask) {
      setTaskForm({
        title: editingTask.title,
        description: editingTask.description || '',
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate ? format(parseISO(editingTask.dueDate), 'yyyy-MM-dd') : ''
      });
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    const dataToSubmit = {
      ...taskForm,
      dueDate: taskForm.dueDate || null
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, dataToSubmit);
      setEditingTask(null);
    } else {
      onAddTask({
        ...dataToSubmit,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
      });
    }
    setShowForm(false);
    resetForm();
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
    resetForm();
  };

  const categoryOptions = categories.map(cat => ({ value: cat.name, label: cat.name }));

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Text type="h3" className="text-lg font-semibold text-surface-900 dark:text-white">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </Text>
              <Button
                onClick={handleCancel}
                className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                variant="ghost"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormField 
                    label="Task Title" 
                    name="title"
                    value={taskForm.title} 
                    onChange={handleChange} 
                    placeholder="Enter task title..." 
                    required 
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField 
                    label="Description" 
                    type="textarea" 
                    name="description"
                    value={taskForm.description} 
                    onChange={handleChange} 
                    placeholder="Add description..." 
                    rows="3"
                  />
                </div>

                <FormField 
                  label="Category" 
                  type="select" 
                  name="category"
                  value={taskForm.category} 
                  onChange={handleChange} 
                  options={[{ value: '', label: 'Select Category' }, ...categoryOptions]}
                  required 
                />

                <FormField 
                  label="Priority" 
                  type="select" 
                  name="priority"
                  value={taskForm.priority} 
                  onChange={handleChange} 
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' }
                  ]}
                />

                <div className="md:col-span-2">
                  <FormField 
                    label="Due Date" 
                    type="date" 
                    name="dueDate"
                    value={taskForm.dueDate} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" onClick={handleCancel} variant="ghost">
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTask ? 'Update Task' : 'Add Task'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskForm;