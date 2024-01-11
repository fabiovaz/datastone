import { defineStore } from 'pinia'

export const useClientsStore = defineStore({
  id: 'clients',
  state: () => ({
    client: null,
    clients: []
  }),
  persist: true,
  actions: {
    async fetchAll () {
      try {
        // Fetch Clients from API
      } catch(error) {
        throw error
      }
    },

    async getById (id) {
      try {
        // API: Get Client by Id
        const client = this.clients.find(x => x.id == id)
        this.client = client
        return client
      } catch(error) {
        throw error
      }
    },

    async create (data) {
      try {
        const uuidv4 = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
        data.picture = data.picture ? data.picture : `https://api.lorem.space/image/face?w=120&h=120&hash=${uuidv4}`
        const client = { ...data, id: uuidv4 }
        this.client = client
        // API: Add Client
        this.clients.push(client)
        return client
      } catch(error) {
        throw error
      }
    },

    async update (id, params) {
      // API: Update Client
			if (id === this.client.id) {
				this.client = { ...this.client, ...params}
      }
			this.clients = this.clients.map(c => (c.id === id ? this.client : c))
    },

    async delete (id) {
      // API: Delete Client
      this.clients = this.clients.filter(x => x.id !== id)
    },

    async addClientProduct (idProduto) {
      this.client.products.push(idProduto)
			this.clients = this.clients.map(c => (c.id === idProduto ? this.client : c))
      return this.client
    },

    async removeClientProduct (idProduto) {
      this.client.products = this.client.products.filter(p => p !== idProduto)
			this.clients = this.clients.map(c => (c.id === idProduto ? this.client : c))
      return this.client
    }

  }
})
