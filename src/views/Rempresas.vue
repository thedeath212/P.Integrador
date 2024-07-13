<template>
    <div class="min-h-screen flex flex-col items-center justify-start bg-background text-foreground">
      <header class="w-full flex justify-start items-center p-4 bg-white shadow-md">
        <button class="text-xl p-2">
          <router-link to="/" class="text-xl p-2">
            <img aria-hidden="true" alt="back-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=←" class="h-6 w-6 md:h-8 md:w-8" />
          </router-link>
        </button>
        <img src="https://i.imgur.com/RCpUHKA.png" alt="multitrabajos logo" class="h-10 ml-2" />
        <router-link to="/register" class="text-pink-600 hover:underline ml-auto">Registrar como postulante</router-link>
      </header>
      <main class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mt-8 p-4">
        <div class="w-full md:w-1/2 p-4 bg-blue-100 rounded-lg shadow-lg">
          <h1 class="text-2xl font-bold text-blue-700 mb-4">Registra tu empresa en Multitrabajos</h1>
          <p class="text-muted-foreground mb-6">Todos los campos son obligatorios.</p>
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <fieldset>
              <legend class="text-lg font-semibold mb-2">Completa la información de tu usuario</legend>
              <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium">Nombre(s)</label>
                  <input type="text" id="firstName" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium">Apellido(s)</label>
                  <input type="text" id="lastName" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium">Email</label>
                  <input type="email" id="email" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="password" class="block text-sm font-medium">Contraseña</label>
                  <input type="password" id="password" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium">Repetir contraseña</label>
                  <input type="password" id="confirmPassword" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="text-lg font-semibold mb-2">Ingresa los datos de la empresa</legend>
              <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <label for="companyName" class="block text-sm font-medium">Nombre de la empresa</label>
                  <input type="text" id="companyName" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="businessName" class="block text-sm font-medium">Razón social</label>
                  <input type="text" id="businessName" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="fiscalCondition" class="block text-sm font-medium">Condición fiscal</label>
                  <select id="fiscalCondition" class="mt-1 block w-full border border-input rounded-lg p-2">
                    <option>Seleccione una opción</option>
                  </select>
                </div>
                <div>
                  <label for="document" class="block text-sm font-medium">Documento</label>
                  <input type="text" id="document" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="street" class="block text-sm font-medium">Calle</label>
                  <input type="text" id="street" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="number" class="block text-sm font-medium">Número</label>
                  <input type="text" id="number" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="postalCode" class="block text-sm font-medium">Código Postal</label>
                  <input type="text" id="postalCode" class="mt-1 block w-full border border-input rounded-lg p-2" />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium">Teléfono</label>
                  <div class="flex mt-1">
                    <select id="phoneCode" class="border border-input rounded-l-lg p-2">
                      <option>+593</option>
                    </select>
                    <input type="text" id="phone" class="block w-full border border-input rounded-r-lg p-2" />
                  </div>
                </div>
                <div>
                  <label for="industry" class="block text-sm font-medium">Industria</label>
                  <select id="industry" class="mt-1 block w-full border border-input rounded-lg p-2">
                    <option>Seleccione una opción</option>
                  </select>
                </div>
                <div>
                  <label for="employeeCount" class="block text-sm font-medium">Cantidad de empleados</label>
                  <select id="employeeCount" class="mt-1 block w-full border border-input rounded-lg p-2">
                    <option>Seleccione una opción</option>
                  </select>
                </div>
              </div>
            </fieldset>
            <div class="space-y-4">
            </div>
            <button type="submit" class="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300">Crear cuenta de Empresa</button>
            <div class="flex justify-between items-center mt-4">
              <router-link to="/logemp" class="text-pink-600 hover:underline">¿Ya tienes cuenta? Ingresa</router-link>
            </div>
            <p class="text-center text-pink-600 hover:underline mt-4">
              <router-link to="/" class="text-pink-600 hover:underline">Página Principal</router-link>
            </p>
          </form>
        </div>
        <div class="hidden md:block w-1/2 p-4">
          <img src="https://i.imgur.com/tM9uwLh.jpeg" alt="Ilustración de una persona con un currículum" class="max-w-full h-auto" />
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegistroEmpresa',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        businessName: '',
        fiscalCondition: '',
        document: '',
        street: '',
        number: '',
        postalCode: '',
        phoneCode: '+593',
        phone: '',
        industry: '',
        employeeCount: '',
        terms: false,
        newsletter: false,
        surveys: false,
      };
    },
    methods: {
      handleSubmit() {
        // Aquí se maneja el envío del formulario
      },
    },
  };
  </script>
  
  <style scoped>
  .min-h-screen {
    min-height: 100vh;
  }
  
  .bg-background {
    background-color: #f8fafc;
  }
  
  .text-foreground {
    color: #333;
  }
  
  .bg-blue-100 {
    background-color: #ebf8ff;
  }
  
  .bg-blue-700 {
    background-color: #3182ce;
  }
  
  .text-pink-600 {
    color: #d53f8c;
  }
  
  .text-muted-foreground {
    color: #6b7280;
  }
  
  .border-input {
    border-color: #d1d5db;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #3182ce;
  }
  
  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }
  </style>
  