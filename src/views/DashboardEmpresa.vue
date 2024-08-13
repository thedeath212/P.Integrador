<template>
    <div>
        <div class="flex justify-center">
    <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
  </div>
  
      <!-- Contenido principal -->
      <div class="flex h-screen bg-zinc-100">
        <!-- Barra lateral -->
        <aside class="w-70 bg-blue-600 text-white flex flex-col h-160">
          <div class="flex items-center justify-center h-16 border-b border-blue-700">
            <H1>MultiEmpleos AMV</H1>
          </div>
          <nav class="flex-1 px-4 py-6 space-y-4">
            <a href="#" class="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded">
              <!--<img src="https://placehold.co/24x24?text=🏠" alt="Inicio" class="h-6 w-6">-->
              <span>Inicio</span>
            </a>
            <a href="#" class="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded">
              <!--<img src="https://placehold.co/24x24?text=📄" alt="Avisos" class="h-6 w-6">-->
              <span>Avisos</span>
            </a>
            <a href="#" class="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded">
              <!--<img src="https://placehold.co/24x24?text=🔍" alt="Búsqueda en base" class="h-6 w-6">-->
              <span>Búsqueda en base</span>
            </a>
            <a href="#" class="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded">
              <!--<img src="https://placehold.co/24x24?text=📊" alt="Resumen de cuenta" class="h-6 w-6">-->
              <span>Resumen de cuenta</span>
            </a>
            <a href="#" class="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded">
              <!--<img src="https://placehold.co/24x24?text=🛒" alt="Compra online" class="h-6 w-6">-->
              <span>Compra online</span>
            </a>
          </nav>
          <div class="flex items-center justify-center h-16 border-t border-blue-700">
            <a href="#" class="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png" alt="Contacto" class="h-6 w-6">
              <span>Contacto</span>
            </a>
          </div>    
        </aside>
  
        <!-- Contenido principal -->
        <main class="flex-1 p-6 space-y-6">
          <!-- Sección: Tus primeros pasos -->
          <section class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold">Tus primeros pasos</h1>
            <button class="bg-pink-600 text-white px-4 py-2 rounded-lg">Crear nuevo aviso</button>
          </section>
  
          <!-- Sección: Contenido destacado -->
          <section class="flex space-x-6">
            <!-- Primer bloque -->
            <div class="w-1/2 bg-white p-6 rounded-lg shadow">
              <div class="flex items-center space-x-4">
                <img src="https://i.imgur.com/5UlbTga.png" alt="Tu primer aviso con Jobi" class="h-16 w-16">
                <div>
                  <h2 class="text-lg font-semibold text-pink-600">Tu primer aviso</h2>
                  <p class="text-zinc-700">Te ayudamos a redactar tu aviso con <span class="font-semibold">inteligencia artificial</span>. Elige el tipo de aviso, escribe una breve descripción del puesto y ¡Listo!</p>
                </div>
              </div>
              <button class="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg">Crear aviso</button>
            </div>
  
            <!-- Segundo bloque -->
            <div class="w-1/2 space-y-4">
              <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold">Completa tu perfil</h3>
                <a href="#" class="text-blue-600 hover:underline">Carga la información de tu empresa</a>
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold">Navega por nuestra base de datos</h3>
                <a href="#" class="text-blue-600 hover:underline">Adquiere CVs de forma individual</a>
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold">Centro de ayuda</h3>
                <a href="#" class="text-blue-600 hover:underline">Accede al catálogo de preguntas frecuentes</a>
              </div>
            </div>
          </section>
  
          <!-- Sección: Productos -->
          <section class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Productos</h2>
            <div class="flex space-x-4 mb-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Avisos</button>
              <button class="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-lg">Búsqueda en base</button>
              <button class="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-lg">Paquetes</button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="border p-4 rounded-lg">
                <h3 class="text-lg font-semibold">Gratis</h3>
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
                <p class="text-zinc-700">1</p>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">Publicar</button>
              </div>
              <div class="border p-4 rounded-lg">
                <h3 class="text-lg font-semibold">Simple</h3>
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
                <p class="text-zinc-700">USD 300<sup>15</sup> final</p>
                <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
              </div>
              <div class="border p-4 rounded-lg">
                <h3 class="text-lg font-semibold">Destacado</h3>
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
                <p class="text-zinc-700">USD 479<sup>95</sup> final</p>
                <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
              </div>
              <div class="border p-4 rounded-lg">
                <h3 class="text-lg font-semibold">Superdestacado</h3>
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
                <p class="text-zinc-700">USD 671<sup>05</sup> final</p>
                <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
              </div>
              <div class="border p-4 rounded-lg">
                <h3 class="text-lg font-semibold">Tecnología</h3>
                <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo" class="h-12 ml-4">
                <p class="text-zinc-700">USD 671<sup>06</sup> final</p>
                <button class="bg-green-600 text-white px-4 py-2 rounded-lg mt-2">Comprar</button>
              </div>
            </div>
            <button class="mt-4 text-pink-600 hover:underline">Comprar más productos</button>
          </section>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardEmpresa',
  }
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para este componente si es necesario */
  </style>
  