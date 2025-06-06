import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { taskService, categoryService } from '@/services';
import GlobalHeader from '@/components/organisms/GlobalHeader';
import SearchInput from '@/components/molecules/SearchInput';
import TaskFilter from '@/components/organisms/TaskFilter';
import CategoryFilter from '@/components/organisms/CategoryFilter';
import TaskForm from '@/components/organisms/TaskForm';
import TaskList from '@/components/organisms/TaskList';
import Spinner from '@/components/atoms/Spinner';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HomePage = ({ darkMode, setDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [tasksResult, categoriesResult] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ]);
        setTasks(tasksResult);
        setCategories(categoriesResult);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully!');
      setShowAddForm(false);
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted!');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      toast.success('Task updated!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowAddForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesFilter = filter === 'all' || 
                          (filter === 'active' && !task.completed) ||
                          (filter === 'completed' && task.completed);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <GlobalHeader darkMode={darkMode} setDarkMode={setDarkMode} onAddTaskClick={() => { setShowAddForm(true); setEditingTask(null); }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <TaskFilter tasks={tasks} filter={filter} setFilter={setFilter} />
            <CategoryFilter categories={categories} tasks={tasks} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <TaskForm
                categories={categories}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                showForm={showAddForm}
                setShowForm={setShowAddForm}
              />
              <TaskList
                tasks={filteredTasks}
                categories={categories}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
                setShowAddForm={setShowAddForm}
                handleEditTask={handleEditTask}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => { setShowAddForm(true); setEditingTask(null); }}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <ApperIcon name="Plus" size={24} />
      </Button>
    </div>
  );
};

export default HomePage;