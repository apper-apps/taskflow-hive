import React from 'react';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import FilterButton from '@/components/molecules/FilterButton';

const TaskFilter = ({ tasks, filter, setFilter }) => {
  const getTaskCounts = () => {
    return {
      all: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length
    };
  };

  const counts = getTaskCounts();

  return (
    <Card className="p-4">
      <Text type="h3" className="font-medium text-surface-900 dark:text-white mb-3">Filter Tasks</Text>
      <div className="space-y-2">
        {[
          { key: 'all', label: 'All Tasks', count: counts.all },
          { key: 'active', label: 'Active', count: counts.active },
          { key: 'completed', label: 'Completed', count: counts.completed }
        ].map(item => (
          <FilterButton
            key={item.key}
            label={item.label}
            count={item.count}
            onClick={() => setFilter(item.key)}
            isActive={filter === item.key}
          />
        ))}
      </div>
    </Card>
  );
};

export default TaskFilter;