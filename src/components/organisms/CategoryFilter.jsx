import React from 'react';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import CategoryProgressCircle from '@/components/molecules/CategoryProgressCircle';
import Button from '@/components/atoms/Button';

const CategoryFilter = ({ categories, tasks, selectedCategory, setSelectedCategory }) => {
  const getCategoryCounts = () => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat.name] = {
        total: tasks.filter(t => t.category === cat.name).length,
        completed: tasks.filter(t => t.category === cat.name && t.completed).length
      };
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <Card className="p-4">
      <Text type="h3" className="font-medium text-surface-900 dark:text-white mb-3">Categories</Text>
      <div className="space-y-2">
        <Button
          onClick={() => setSelectedCategory('all')}
          className={`w-full flex justify-between items-center px-3 py-2 text-left ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
          }`}
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          size="small"
        >
          <span>All Categories</span>
          <span className="text-sm">{tasks.length}</span>
        </Button>
        
        {categories.map(category => {
          const counts = categoryCounts[category.name] || { total: 0, completed: 0 };
          const progress = counts.total > 0 ? (counts.completed / counts.total) * 100 : 0;
          
          return (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full flex items-center justify-between px-3 py-2 text-left ${
                selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
              variant={selectedCategory === category.name ? 'primary' : 'secondary'}
              size="small"
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span>{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CategoryProgressCircle progress={progress} color={category.color} />
                <span className="text-sm">{counts.total}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default CategoryFilter;