import taskData from '../mockData/task.json'

class TaskService {
  constructor() {
    this.tasks = [...taskData]
  }

  async getAll() {
    await this.delay()
    return [...this.tasks]
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(item => item.id === id)
    return task ? { ...task } : null
  }

  async create(taskData) {
    await this.delay()
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    this.tasks.unshift(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.tasks.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Task not found')
    
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.tasks.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Task not found')
    
    const deleted = this.tasks.splice(index, 1)[0]
    return { ...deleted }
  }
async reorderTasks(sourceIndex, destinationIndex) {
    await this.delay()
    const [removed] = this.tasks.splice(sourceIndex, 1)
    this.tasks.splice(destinationIndex, 0, removed)
    return [...this.tasks]
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }
}

export default new TaskService()