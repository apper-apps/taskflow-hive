import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Toggle from '@/components/atoms/Toggle';
import HeaderActionButton from '@/components/molecules/HeaderActionButton';
import Text from '@/components/atoms/Text';

const GlobalHeader = ({ darkMode, setDarkMode, onAddTaskClick }) => {
  return (
    <header className="bg-white dark:bg-surface-800 shadow-soft border-b border-surface-200 dark:border-surface-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={18} className="text-white" />
            </div>
            <Text type="h1" className="text-xl font-semibold text-surface-900 dark:text-white">TaskFlow</Text>
          </div>
          
          <div className="flex items-center space-x-4">
            <Toggle 
              isToggled={darkMode} 
              onToggle={() => setDarkMode(!darkMode)} 
              iconOn="Sun" 
              iconOff="Moon" 
              iconClassName="text-surface-600 dark:text-surface-300"
            />
            
            <HeaderActionButton onClick={onAddTaskClick} iconName="Plus" label="Add Task" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;