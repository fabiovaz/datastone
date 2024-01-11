<script setup>
  import { useClientsStore } from '@/stores/clients'
  import { useProductsStore } from '@/stores/products'

  const clientsStore = useClientsStore()
  const clients = computed(() => clientsStore.clients)

  const productsStore = useProductsStore()
  const products = computed(() => productsStore.products)

  const currentClient = ref({
    active: false,
    name: null,
    document: null,
    phone: null,
    email: null,
    products: []
  })

  const showModal = ref(false)
  const showViewModal= ref(false)
  const fetchInUse = ref(false)

  const addClient = async () => {
    currentClient.value = { id: null, active: false, name: null, document: null, phone: null, email: null, products: [] }
    showModal.value = true
  }
  const addClientRandom = async () => {
    fetchInUse.value = true
    const { data } = await useFetch('https://randomuser.me/api/')
    currentClient.value = {
      active: false,
      name: `${data.value.results[0].name.first} ${data.value.results[0].name.last}`,
      document: data.value.results[0].id.value ? `${data.value.results[0].id.name}: ${data.value.results[0].id.value}` : null,
      phone: data.value.results[0].phone,
      email: data.value.results[0].email,
      picture: data.value.results[0].picture.large,
      products: []
    }
    const res = await clientsStore.create(currentClient.value)
    fetchInUse.value = false
  }

  const editClient = async (id) => {
    showModal.value = true
    await clientsStore.getById(id)
    currentClient.value = { ...clientsStore.client }
  }

  const deleteClient = async (id) => {
    const res = await clientsStore.delete(id)
    showModal.value = false
  }

  const formSubmit = async () => {
    if (!currentClient.value.id) await clientsStore.create(currentClient.value)
    if (currentClient.value.id) await clientsStore.update(currentClient.value.id, currentClient.value)
    showModal.value = false
  }

  function closeModal() {
    showModal.value = false
    showViewModal.value = false
  }

  const viewClient = async (id) => {
    showViewModal.value = true
    await clientsStore.getById(id)
    currentClient.value = { ...clientsStore.client }
  }
</script>

<template>
  <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative">

        <div>
          <h2 class="text-4xl font-extrabold dark:text-white">Clientes</h2>
          <p class="my-4 text-lg text-gray-500">Listagem de clientes.</p>
        </div>

        <div class="py-4 text-end">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click.prevent="addClientRandom">Adicionar Aleatório</button>
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click.prevent="addClient">Adicionar</button>
        </div>

        <div v-if="clients.length" class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 w-20">Ativo</th>
                <th scope="col" class="px-4 py-3">Nome</th>
                <th scope="col" class="px-4 py-3">Documento</th>
                <th scope="col" class="px-4 py-3">Telefone</th>
                <th scope="col" class="px-4 py-3">Email</th>
                <th scope="col" class="px-1 py-3">Produtos</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" class="border-b dark:border-gray-700">
                <th scope="row" class="px-4">
                  <label class="relative flex cursor-pointer">
                    <input type="checkbox" v-model="client.active" class="sr-only peer" :checked="client.active">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </th>
                <td class="px-4 py-3">
                  {{ client.name }}
                </td>
                <td class="px-4 py-3">
                  {{ client.document }}
                </td>
                <td class="px-4 py-3">
                  {{ client.phone }}
                </td>
                <td class="px-4 py-3">
                  {{ client.email }}
                </td>
                <td class="py-3 text-center">
                  {{ client.products.length }}/{{ products.filter(p => p.active === true).length }}
                </td>
                <td class="px-4 py-3 flex items-center gap-3 justify-end">
                  <button @click.prevent="viewClient(client.id)" class="font-medium text-green-600 dark:text-green-500 hover:underline">Visualizar</button>
                  <button @click.prevent="editClient(client.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                  <button @click.prevent="deleteClient(client.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Deletar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!clients.length">
          Nenhum cliente cadastrado
        </div>
      </div>
    </div>
  </section>

  <Modal v-if="showModal" size="2xl" @close="closeModal()">
    <div class="relative w-full bg-white/75 backdrop-blur rounded-lg shadow-xl shadow-black/25">
      <div class="p-8">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ currentClient.id ? 'Editar' : 'Adicionar' }} Cliente
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal" @click.prevent="closeModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="formSubmit">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div class="col-span-2">
              <label class="relative flex cursor-pointer">
                <input type="checkbox" v-model="currentClient.active" class="sr-only peer" :checked="currentClient.active">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Cliente {{ currentClient.active ? 'Ativo' : 'Inativo' }}</span>
              </label>
            </div>
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
              <input type="text" name="name" id="name" v-model="currentClient.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. João da Silva">
            </div>
            <div>
              <label for="document" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documento</label>
              <input type="text" name="document" id="document" v-model="currentClient.document" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. RG: 6971374">
            </div>
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
              <input type="text" name="phone" id="phone" v-model="currentClient.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. +55 (99) 99999.9999">
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" name="price" id="email" v-model="currentClient.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@mail.com">
            </div>
          </div>
          <div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Produtos</div>
          <div v-if="currentClient.products" class="inline-flex gap-2">
            <div v-for="product in products.filter(p => p.active === true)">
              <label class="cursor-pointer">
                <input type="checkbox" v-model="currentClient.products" :value="product.id" class="sr-only peer" :checked="currentClient.products.find(cp => cp === product.id)">
                <div class="px-3 py-1.5 cursor-pointer text-xs font-semibold border rounded-lg text-gray-800 bg-gray-100 border-gray-200 hover:bg-gray-200 peer-checked:text-blue-800 peer-checked:bg-blue-100 peer-checked:border-blue-200 peer-checked:hover:bg-blue-200">
                  <span>{{ product.name }}</span>
                </div>
              </label>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between space-x-4">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Salvar
            </button>
            <button v-if="currentClient.id" type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" @click.prevent="deleteClient(currentClient.id)">
              <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              Deletar
            </button>
          </div>
        </form>
      </div>
    </div>
  </Modal>

  <Modal v-if="showViewModal" size="md" @close="closeModal()">
    <div class="relative w-full backdrop-blur rounded-lg">
      <div class="flex justify-end">
        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal" @click.prevent="closeModal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <section class="bg-slate-800 rounded-2xl px-8 py-6 shadow-lg">
        <div class="mt-6 w-fit mx-auto">
          <img :src="currentClient.picture" class="rounded-full w-28 " alt="profile picture" srcset="">
        </div>

        <div class="mt-8 ">
          <h2 class="text-white font-bold text-2xl tracking-wide max-w-[80%]">{{ currentClient.name }}</h2>
        </div>
        <p class="font-semibold mt-2.5" :class="currentClient.active ? 'text-emerald-400' : 'text-rose-400'">
          {{ currentClient.active ? 'Ativo' : 'Inativo'}}
        </p>

        <div class="h-1 w-full bg-black mt-8 rounded-full">
          <div class="h-1 rounded-full bg-yellow-500 origin-left" :style="`transform: scaleX(${(currentClient.products.length/products.filter(p => p.active === true).length)})`" />
        </div>
        <div class="mt-3 text-white text-sm font-semibold">
          <div class="mt-2">
            <span class="text-gray-400">Nome:</span>
            <span class="block font-normal">{{ currentClient.name }}</span>
          </div>
          <div class="mt-2">
            <span class="block text-gray-400 font-semibold">Documento:</span>
            <span class="block font-normal">{{ currentClient.document }}</span>
          </div>
          <div class="mt-2">
            <span class="block text-gray-400 font-semibold">Telefone:</span>
            <span class="block font-normal">{{ currentClient.phone }}</span>
          </div>
          <div class="mt-2">
            <span class="block text-gray-400 font-semibold">Email:</span>
            <span class="block font-normal">{{ currentClient.email }}</span>
          </div>
          <div v-if="currentClient?.products?.length" class="mt-2">
            <span class="block text-gray-400 font-semibold">Produtos:</span>
            <div class="mt-1 flex gap-2 flex-wrap">
              <div class="inline-flex gap-2">
                <template v-for="product in products.filter(p => p.active === true)">
                  <div v-if="currentClient.products.find(cp => cp === product.id)" class="text-xs font-medium px-4 py-2 rounded text-white bg-slate-800 border border-slate-700 shadow-sm">
                    {{ product.name }}
                  </div>
                </template>
              </div>
            </div>            
          </div>
        </div>
      </section>
    </div>
  </Modal>

</template>
