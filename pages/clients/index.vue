<template>
  <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative">

        <section class="p-3">
          <h2 class="text-4xl font-extrabold dark:text-white">Clientes</h2>
          <p class="my-4 text-lg text-gray-500">Listagem de clientes.</p>
        </section>
       
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 w-20">Ativo</th>
                <th scope="col" class="px-4 py-3">Nome</th>
                <th scope="col" class="px-4 py-3">Documento</th>
                <th scope="col" class="px-4 py-3">Telefone</th>
                <th scope="col" class="px-4 py-3">Email</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700">
                <th scope="row" class="px-4">
                  <label class="relative flex cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </th>
                <td class="px-4 py-3">
                  Fábio Vaz
                </td>
                <td class="px-4 py-3">
                  123.123.123-12
                </td>
                <td class="px-4 py-3">
                  (61) 99999-9999
                </td>
                <td class="px-4 py-3">
                  asd@asd.com.br
                </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  Editar / Deletar
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
