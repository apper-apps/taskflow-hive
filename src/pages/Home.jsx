import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { taskService } from '../services'
import { categoryService } from '../services'
import { format, isToday, isPast, parseISO } from 'date-fns'

const Home = ({ darkMode, setDarkMode }) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tasksResult, categoriesResult] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ])
        setTasks(tasksResult)
        setCategories(categoriesResult)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success('Task added successfully!')
      setShowAddForm(false)
    } catch (err) {
      toast.error('Failed to add task')
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      })
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t))
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened!')
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.id !== taskId))
      toast.success('Task deleted!')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates)
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t))
      toast.success('Task updated!')
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && !task.completed) ||
                         (filter === 'completed' && task.completed)
    
    return matchesSearch && matchesCategory && matchesFilter
  })

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

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length
    }
  }

  const getCategoryCounts = () => {
    const counts = {}
    categories.forEach(cat => {
      counts[cat.name] = {
        total: tasks.filter(t => t.category === cat.name).length,
        completed: tasks.filter(t => t.category === cat.name && t.completed).length
      }
    })
    return counts
  }

  const counts = getTaskCounts()
  const categoryCounts = getCategoryCounts()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-soft border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-surface-900 dark:text-white">TaskFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} size={18} className="text-surface-600 dark:text-surface-300" />
              </button>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card">
              <div className="relative">
                <ApperIcon name="Search" size={18} className="absolute left-3 top-3 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card">
              <h3 className="font-medium text-surface-900 dark:text-white mb-3">Filter Tasks</h3>
              <div className="space-y-2">
                {[
                  { key: 'all', label: 'All Tasks', count: counts.all },
                  { key: 'active', label: 'Active', count: counts.active },
                  { key: 'completed', label: 'Completed', count: counts.completed }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      filter === item.key
                        ? 'bg-primary text-white'
                        : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-sm">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card">
              <h3 className="font-medium text-surface-900 dark:text-white mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-sm">{tasks.length}</span>
                </button>
                
                {categories.map(category => {
                  const counts = categoryCounts[category.name] || { total: 0, completed: 0 }
                  const progress = counts.total > 0 ? (counts.completed / counts.total) * 100 : 0
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-primary text-white'
                          : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span>{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 relative">
                          <svg className="w-8 h-8 transform -rotate-90">
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              className="opacity-20"
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              stroke={category.color}
                              strokeWidth="2"
                              fill="none"
                              strokeDasharray={`${progress * 0.88} 88`}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{counts.total}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <MainFeature
              tasks={filteredTasks}
              categories={categories}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              onAddTask={handleAddTask}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setShowAddForm(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
      >
        <ApperIcon name="Plus" size={24} />
      </button>
    </div>
  )
}

export default Home