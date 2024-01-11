<script setup>
  import { useClientsStore } from '@/stores/clients'
  import { useProductsStore } from '@/stores/products'

  const clientsStore = useClientsStore()
  const clients = clientsStore.clients

  const productsStore = useProductsStore()
  const products = productsStore.products

</script>

<template>
  <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative">

        <div>
          <h2 class="text-4xl font-extrabold dark:text-white">Dashboard</h2>
        </div>

        <section class="bg-white dark:bg-gray-900">
          <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ clients.filter(c => c.active === true).length }}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">Clientes Ativos</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ clients.filter(c => c.active === false).length }}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">Clientes Inativos</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ clients.length }}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">Total de Clientes</dd>
              </div>
            </dl>
          </div>
        </section>

        <section class="bg-white dark:bg-gray-900">
          <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ products.filter(p => p.active === true).length }}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">Produtos Ativos</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ products.filter(p => p.active === false).length }}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">Produtos Inativos</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ products.length }}</dt>
                <dd class="font-light text-gray-500 dark:text-gray-400">Total de Produtos</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
