<script setup>
  import { useProductsStore } from '@/stores/products'

  const productsStore = useProductsStore()
  const products = computed(() => productsStore.products)

  const currentProduct = ref({
    active: false,
    name: null
  })

  const showModal = ref(false)

  const addProduct = async () => {
    currentProduct.value = { id: null, active: false, name: null }
    showModal.value = true
  }

  const editProduct = async (id) => {
    showModal.value = true
    await productsStore.getById(id)
    currentProduct.value = { ...productsStore.product }
  }

  const deleteProduct = async (id) => {
    const res = await productsStore.delete(id)
    showModal.value = false
  }

  const formSubmit = async () => {
    if (!currentProduct.value.id) await productsStore.create(currentProduct.value)
    if (currentProduct.value.id) await productsStore.update(currentProduct.value.id, currentProduct.value)
    showModal.value = false
  }

  function closeModal() {
    showModal.value = false
  }

</script>

<template>
  <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative">

        <div>
          <h2 class="text-4xl font-extrabold dark:text-white">Produtos</h2>
          <p class="my-4 text-lg text-gray-500">Listagem de produtos.</p>
        </div>

        <div class="py-4 text-end">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click.prevent="addProduct">Adicionar</button>
        </div>

        <div v-if="products.length" class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 w-20">Ativo</th>
                <th scope="col" class="px-4 py-3">Nome</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" class="border-b dark:border-gray-700">
                <th scope="row" class="px-4">
                  <label class="relative flex cursor-pointer">
                    <input type="checkbox" v-model="product.active" class="sr-only peer" :checked="product.active">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </th>
                <td class="px-4 py-3">
                  {{ product.name }}
                </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <button @click.prevent="editProduct(product.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</button>
                  <button @click.prevent="deleteProduct(product.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Deletar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!products.length">
          Nenhum produto cadastrado
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
            {{ currentProduct.id ? 'Editar' : 'Adicionar' }} Produto
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="formSubmit">
          <div class="grid gap-4 mb-4">
            <div class="col-span-2">
              <label class="relative flex cursor-pointer">
                <input type="checkbox" v-model="currentProduct.active" class="sr-only peer" :checked="currentProduct.active">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Produto {{ currentProduct.active ? 'Ativo' : 'Inativo' }}</span>
              </label>
            </div>
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
              <input type="text" name="name" id="name" v-model="currentProduct.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. Plataforma Online">
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between space-x-4">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Salvar
            </button>
            <button v-if="currentProduct.id" type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" @click.prevent="deleteProduct(currentProduct.id)">
              <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              Deletar
            </button>
          </div>
        </form>
      </div>
    </div>
  </Modal>
</template>
