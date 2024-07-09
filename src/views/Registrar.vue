<template>
  <div id="Registrar"></div>
    <div class="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 class="text-2xl font-bold text-primary mb-6">Crea tu cuenta y encuentra tu empleo ideal</h1>
      <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-card shadow-lg rounded-lg overflow-hidden">
        <div class="w-full md:w-1/2 p-8">
          <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center hover:bg-blue-600 transition duration-300">
            <img src="https://placehold.co/20x20?text=G" alt="Google logo" class="mr-2">
            Iniciar sesión con Google
          </button>
          <button class="w-full bg-blue-700 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center hover:bg-blue-800 transition duration-300">
            <img src="https://placehold.co/20x20?text=In" alt="LinkedIn logo" class="mr-2">
            Acceder con LinkedIn
          </button>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Ingresa tu nombre" class="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
            <input type="text" placeholder="Ingresa tu apellido" class="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex">
              <select class="w-1/3 p-2 border border-border rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none">
                <option>Tipo</option>
              </select>
              <input type="text" placeholder="Número" class="w-2/3 p-2 border border-border rounded-r-md focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div class="flex">
              <select class="w-1/3 p-2 border border-border rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none">
                <option>+593</option>
              </select>
              <input type="text" placeholder="Número" class="w-2/3 p-2 border border-border rounded-r-md focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="relative">
              <input type="email" placeholder="Ingresa tu email" class="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
              <img src="https://placehold.co/20x20?text=@" alt="Email icon" class="absolute right-2 top-2" />
            </div>
            <div class="relative">
              <input type="password" placeholder="Ingresa tu contraseña" class="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
              <img src="https://placehold.co/20x20?text=🔒" alt="Password icon" class="absolute right-2 top-2" />
            </div>
          </div>
          <p class="text-sm text-destructive mb-4">* Campos obligatorios</p>
          <div class="flex flex-col space-y-2 mb-4">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2 focus:ring-primary">
              Acepto las <a href="#" class="text-primary underline">Condiciones de uso</a> de Multitrabajos.
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2 focus:ring-primary">
              He leído y comprendo la <a href="#" class="text-primary underline">Política de protección de datos personales y privacidad</a> de Multitrabajos.
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2 focus:ring-primary">
              Acepto recibir novedades, promociones y actualizaciones.
            </label>
          </div>
          <button class="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md mb-4 hover:bg-primary/80 transition duration-300">Crear cuenta</button>
          <p class="text-sm text-center">
            ¿Ya tienes cuenta? <a href="#" class="text-primary underline">Ingresa como candidato</a>
          </p>
        </div>
        <div class="hidden md:block w-1/2 p-4">
          <img src="https://placehold.co/400x400" alt="Illustration of people working" class="w-full h-full object-cover rounded-md">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegistrarForm'
  }
  </script>
  
  <style scoped>
  @import 'https://cdn.tailwindcss.com?plugins=forms,typography';
  
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
  </style>
  