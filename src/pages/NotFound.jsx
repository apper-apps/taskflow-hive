import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <ApperIcon name="Search" size={64} className="mx-auto text-surface-400 mb-4" />
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-2">Page Not Found</h1>
          <p className="text-surface-600 dark:text-surface-300 text-lg">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
        >
          <ApperIcon name="Home" size={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound