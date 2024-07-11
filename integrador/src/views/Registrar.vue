<template>
  <div id="Registrar"></div>
    <div class="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div class="w-full max-w-4xl bg-card p-4 mb-6 bg-blue-100 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold text-primary">Crea tu cuenta y encuentra tu empleo ideal</h1>
      </div>
      <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-blue-100 shadow-lg rounded-lg overflow-hidden">
        <div class="w-full md:w-1/40 p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Ingresa tu nombre" class="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
            <input type="text" placeholder="Ingresa tu apellido" class="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="flex">
              <select class="w-1/2 p-2 border border-border rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none">
                <option>Tipo</option>
              </select>
              <input type="text" placeholder="Número" class="w-2/3 p-2 border border-border rounded-r-md focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div class="flex">
              <select class="w-1/2 p-2 border border-border rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none">
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
          <div class="flex flex-col items-center justify-center bg-background bg-red-400 text-foreground p-4 rounded-lg mx-auto my-auto text-center" style="width: 200px; height: 50px;">
            <button class="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/80 transition duration-300">Crear cuenta</button>
          </div>
          <br>
          <p class="text-sm text-center">
            ¿Ya tienes cuenta? <router-link to="/Login" href="#" class="text-primary underline">Ingresa como candidato</router-link>
          </p>
          <p class="mt-4 text-center">
            <router-link to="/" href="#" class="text-destructive hover:text-destructive-foreground">Página Principal</router-link>
          </p>
        </div>
        <div class="hidden md:block w-1/2 p-4">
          <img src="https://i.imgur.com/USxWmxX.jpeg" alt="Illustration of people working" class="w-full h-full object-cover rounded-md">
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
  