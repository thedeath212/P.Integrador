<template>
  <div class="min-h-screen bg-background text-foreground p-4">
    <header class="flex items-center justify-between p-4 bg-white shadow-md">
      <div class="flex items-center space-x-4">
        <img src="https://i.imgur.com/RCpUHKA.png" alt="Logo Multitrabajos" class="h-10">
        <input type="text" placeholder="Buscar empleo por puesto o palabra clave" class="border rounded-md p-2 w-64 focus:ring-2 focus:ring-primary">
        <input type="text" placeholder="Lugar de empleo" class="border rounded-md p-2 w-64 focus:ring-2 focus:ring-primary">
        <button class="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/80 transition">Buscar</button>
      </div>
      <div class="flex items-center space-x-4">
        <a href="#" class="text-muted-foreground hover:text-primary transition">Mis postulaciones</a>
        <a href="#" class="text-muted-foreground hover:text-primary transition">Salarios</a>
        <img src="https://placehold.co/40x40?text=👤" alt="User Profile" class="h-10 w-10 rounded-full">
      </div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
      <aside class="col-span-1 bg-white p-4 rounded-lg shadow-md">
        <div class="flex flex-col items-center space-y-4">
          <label for="profileImageInput" class="cursor-pointer">
            <img :src="userProfileImage" alt="User Profile" class="h-20 w-20 rounded-full mb-4 cursor-pointer">
          </label>
          <input id="profileImageInput" type="file" class="hidden" @change="handleImageChange">
          <h2 class="text-xl font-semibold text-blue-800">Omar Arias</h2>
          <p class="text-muted-foreground">Asesor comercial</p>
          <button class="bg-primary text-primary-foreground p-2 rounded-md mt-4 hover:bg-primary/80 transition">Ir a mi HV</button>
          <p class="text-muted-foreground mt-4">Última modificación de la HV: 0 días</p>
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-blue-800">Informa a las empresas tu disponibilidad</h3>
            <ul class="mt-2 space-y-2">
              <li class="flex items-center space-x-2">
                <input type="checkbox" class="form-checkbox">
                <span>Escucho propuestas de empleo</span>
              </li>
              <li class="flex items-center space-x-2">
                <input type="checkbox" class="form-checkbox">
                <span>Puedo empezar de inmediato</span>
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-blue-800">Mejora tu HV agregando:</h3>
            <ul class="mt-2 space-y-2">
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=📷" alt="Foto" class="h-5 w-5">
                <span>Foto</span>
              </li>
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=🏠" alt="Lugar de residencia" class="h-5 w-5">
                <span>Lugar de residencia</span>
              </li>
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=💼" alt="Datos personales" class="h-5 w-5">
                <span>Datos personales</span>
              </li>
              <li class="flex items-center space-x-2">
                <img src="https://placehold.co/20x20?text=💰" alt="Preferencia salarial" class="h-5 w-5">
                <span>Preferencia salarial</span>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main class="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Empleos favoritos</h3>
          <div class="border-dashed border-2 border-zinc-300 p-4 rounded-lg mt-4 text-center">
            <p class="text-muted-foreground">Guarda empleos para postularte más tarde</p>
            <router-link to="/ruta-deseada" class="block">
              <button class="bg-secondary text-secondary-foreground p-2 rounded-md mt-2 hover:bg-secondary/80 transition">Ver empleos</button>
            </router-link>
          </div>
        </section>
        <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Empresas favoritas</h3>
          <div class="border-dashed border-2 border-zinc-300 p-4 rounded-lg mt-4 text-center">
            <p class="text-muted-foreground">Guarda las empresas que más te interesen</p>
            <button class="bg-secondary text-secondary-foreground p-2 rounded-md mt-2 hover:bg-secondary/80 transition">Ver empresas</button>
          </div>
        </section>
        <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Mi actividad</h3>
          <p class="mt-4">0 Postulaciones esta semana</p>
          <p class="mt-2">0 HV leída</p>
          <p class="mt-2">0 Visualizaciones de mi hv</p>
          <router-link to="/mis-postulaciones" class="text-primary mt-4 inline-block hover:underline">Ir a mis postulaciones</router-link>
        </section>
        <section class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Salario pretendido</h3>
          <p class="text-muted-foreground mt-4">Salario comparado con otros postulantes en la misma área.</p>
          <div class="border-dashed border-2 border-zinc-300 p-4 rounded-lg mt-4 text-center">
            <p class="text-muted-foreground">Para conocer tu posible salario, postúlate a un aviso</p>
            <button class="bg-secondary text-secondary-foreground p-2 rounded-md mt-2 hover:bg-secondary/80 transition">Ver empleos</button>
          </div>
        </section>
        <section class="col-span-2 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-800">Empleos recomendados por IA</h3>
          <div class="mt-4">
            <div class="flex items-start space-x-4 p-4 border rounded-lg hover:bg-zinc-50 transition">
              <img src="https://placehold.co/60x60?text=Logo" alt="Corporacion El Rosado" class="h-12 w-12">
              <div>
                <h4 class="text-lg font-semibold">CORPORACION EL ROSADO</h4>
                <p class="text-muted-foreground">4.4 ★ - Publicado hace más de 30 días</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsuarioPage",
  data() {
    return {
      userProfileImage: require('@/assets/user-profile.jpg'),
    };
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.userProfileImage = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdn.tailwindcss.com?plugins=forms,typography");

/* Estilos específicos del componente */
.bg-background {
  background-color: #f0f4f8; /* Color de fondo principal */
}

.text-foreground {
  color: #1a202c; /* Color de texto principal */
}

.border-zinc-300 {
  border-color: #cbd5e0; /* Color de borde */
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Colores personalizados */
.primary {
  color: #3182ce;
}

.primary-foreground {
  color: #ebf8ff;
}

.secondary {
  color: #4a5568;
}

.secondary-foreground {
  color: #edf2f7;
}

.muted-foreground {
  color: #718096;
}

/* Personalización adicional */
input:focus {
  outline-color: #63b3ed; /* Color de foco */
}

button:hover {
  filter: brightness(90%);
}
</style>
