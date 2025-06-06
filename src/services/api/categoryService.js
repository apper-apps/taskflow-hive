import categoryData from '../mockData/category.json'

class CategoryService {
  constructor() {
    this.categories = [...categoryData]
  }

  async getAll() {
    await this.delay()
    return [...this.categories]
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(item => item.id === id)
    return category ? { ...category } : null
  }

  async create(categoryData) {
    await this.delay()
    const newCategory = {
      ...categoryData,
      id: Date.now().toString()
    }
    this.categories.unshift(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Category not found')
    
    this.categories[index] = { ...this.categories[index], ...updates }
    return { ...this.categories[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) throw new Error('Category not found')
    
    const deleted = this.categories.splice(index, 1)[0]
    return { ...deleted }
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }
}

export default new CategoryService()