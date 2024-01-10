import { defineStore } from 'pinia'

export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    product: null,
    products: []
  }),
  persist: true,
  actions: {
    async fetchAll () {
      try {
        // Fetch Products from API
      } catch(error) {
        throw error
      }
    },

    async getById (id) {
      try {
        // API: Get Product by Id
        const product = this.products.find(x => x.id == id)
        this.product = client
        return client
      } catch(error) {
        throw error
      }
    },

    async create (data) {
      try {
        const uuidv4 = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
        const product = { ...data, id: uuidv4 }
        this.product = product
        // API: Add Product
        this.products.push(product)
        return product
      } catch(error) {
        throw error
      }
    },

    async update (id, params) {
      // API: Update Product
			if (id === this.product.id) {
				this.product = { ...this.product, ...params}
      }
			this.products = this.products.map(p => (p.id === id ? this.product : p))
    },

    async delete (id) {
      // API: Delete product
      this.products = this.products.filter(x => x.id !== id)
    },

  }
})
