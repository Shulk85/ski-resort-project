<template>
  <v-app>
    <header>
      <v-app-bar flat>
        <v-container class="app-shell">
          <div class="text-subtitle-1 font-weight-medium">
            Ski resort trip
          </div>
        </v-container>
      </v-app-bar>
    </header>

    <v-main>
      <main>
        <router-view />
      </main>
    </v-main>

    <footer>
      <v-footer class="py-4" border>
        <v-container class="app-shell">
          <div class="text-caption text-medium-emphasis">
          </div>
        </v-container>
      </v-footer>
    </footer>
  </v-app>
</template>
