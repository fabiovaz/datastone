<script setup>
  import { useProductsStore } from '@/stores/products'

  const productsStore = useProductsStore()
  const products = computed(() => productsStore.products)

  const addProduct = async () => {
    const product = {
      active: false,
      name: 'Produto',
    }
    const res = await productsStore.create(product)
  }

  const deleteProduct = async (id) => {
    const res = await productsStore.delete(id)
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
                  {{ product.id }}
                  <button>Editar</button> / <button @click="deleteProduct(product.id)">Deletar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!products.length">
          Nenhum projeto cadastrado
        </div>
      </div>
    </div>
  </section>
</template>
