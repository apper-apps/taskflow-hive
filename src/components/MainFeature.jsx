import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { format, isToday, isPast, parseISO } from 'date-fns'

const MainFeature = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onDeleteTask, 
  onUpdateTask, 
  onAddTask,
  showAddForm,
  setShowAddForm,
  darkMode 
}) => {
  const [editingTask, setEditingTask] = useState(null)
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: ''
  })

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskForm.title.trim()) return

    if (editingTask) {
      onUpdateTask(editingTask.id, {
        ...taskForm,
        dueDate: taskForm.dueDate || null
      })
      setEditingTask(null)
    } else {
      onAddTask({
        ...taskForm,
        dueDate: taskForm.dueDate || null,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
      })
    }
    resetForm()
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setTaskForm({
      title: task.title,
      description: task.description || '',
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate ? format(parseISO(task.dueDate), 'yyyy-MM-dd') : ''
    })
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setEditingTask(null)
    setShowAddForm(false)
    resetForm()
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-400'
    }
  }

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName)
    return category?.color || '#6b7280'
  }

  const getDateStatus = (dueDate) => {
    if (!dueDate) return null
    const date = parseISO(dueDate)
    if (isToday(date)) return 'today'
    if (isPast(date)) return 'overdue'
    return 'upcoming'
  }

  const getDateColor = (status) => {
    switch (status) {
      case 'overdue': return 'text-red-500'
      case 'today': return 'text-yellow-600'
      case 'upcoming': return 'text-blue-500'
      default: return 'text-surface-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Task Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <button
                onClick={handleCancel}
                className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white"
                    placeholder="Add description..."
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Category
                  </label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-surface-600 dark:text-surface-300 hover:text-surface-800 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks List */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card">
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-white">
              Tasks ({tasks.length})
            </h2>
          </div>
        </div>

        <div className="p-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="CheckCircle" size={48} className="mx-auto text-surface-300 dark:text-surface-600 mb-4" />
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                Get started by adding your first task!
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Task
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {tasks.map((task) => {
                  const dateStatus = getDateStatus(task.dueDate)
                  
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        task.completed
                          ? 'bg-surface-50 dark:bg-surface-700/50 border-surface-200 dark:border-surface-600'
                          : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-600 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Checkbox */}
                        <div className="custom-checkbox mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task.id)}
                          />
                          <div className="checkmark">
                            <ApperIcon name="Check" size={12} className="text-white" />
                          </div>
                        </div>

                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className={`font-medium ${
                                task.completed
                                  ? 'text-surface-500 dark:text-surface-400 line-through'
                                  : 'text-surface-900 dark:text-white'
                              }`}>
                                {task.title}
                              </h3>
                              
                              {task.description && (
                                <p className={`text-sm mt-1 ${
                                  task.completed
                                    ? 'text-surface-400 dark:text-surface-500'
                                    : 'text-surface-600 dark:text-surface-300'
                                }`}>
                                  {task.description}
                                </p>
                              )}

                              <div className="flex items-center space-x-3 mt-2">
                                {/* Priority */}
                                <div className="flex items-center space-x-1">
                                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                                  <span className="text-xs text-surface-500 dark:text-surface-400 capitalize">
                                    {task.priority}
                                  </span>
                                </div>

                                {/* Category */}
                                <div 
                                  className="px-2 py-1 text-xs rounded-full text-white"
                                  style={{ backgroundColor: getCategoryColor(task.category) }}
                                >
                                  {task.category}
                                </div>

                                {/* Due Date */}
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

                            {/* Actions */}
                            <div className="flex items-center space-x-1 ml-4">
                              <button
                                onClick={() => handleEdit(task)}
                                className="p-1 text-surface-400 hover:text-primary transition-colors"
                              >
                                <ApperIcon name="Edit2" size={16} />
                              </button>
                              <button
                                onClick={() => onDeleteTask(task.id)}
                                className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                              >
                                <ApperIcon name="Trash2" size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainFeature