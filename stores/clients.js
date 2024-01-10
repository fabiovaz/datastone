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

    async create (data) {
      try {
        const uuidv4 = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
        const client = { id: uuidv4, ...data}
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
				this.client = {...this.client, ...params}
      }
			this.clients = this.clients.map(c => (c.id === id ? data : c))
    },

    async delete (id) {
      // API: Delete Client
      this.clients = this.clients.filter(x => x.id !== id)
    },

  }
})
