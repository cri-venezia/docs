<template>
  <!-- 
    MODIFICA: Le classi 'ml-2 border-l' sono ora condizionali 
    basate sulla nuova prop 'isRoot'
  -->
  <ul 
    :class="[
      'space-y-1',
      !isRoot ? 'ml-2 border-l border-gray-200' : ''
    ]"
  >
    <li v-for="item in items" :key="item.path">
      
      <!-- Caso 1: È un file, renderizza un link -->
      <router-link
        v-if="item.type === 'file'"
        :to="`/docs/${categoryPath}/${item.path.replace('.md', '')}`"
        @click="$emit('navigate')"
        class="block py-1.5 px-3 rounded text-gray-700 hover:bg-gray-100 transition-colors"
        active-class="bg-red-50 text-cri-red font-medium"
      >
        {{ item.name }}
      </router-link>

      <!-- Caso 2: È un gruppo, renderizza un sottomenu a comparsa -->
      <div v-if="item.type === 'group'">
        <h3
          @click="toggleGroup(item.path)"
          class="flex justify-between items-center py-1.5 px-3 rounded text-sm font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        >
          <span>{{ item.name }}</span>
          <!-- Icona freccia -->
          <svg class="w-3 h-3 transition-transform" :class="isOpen(item.path) ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </h3>
        
        <!-- Dropdown (e qui sta la ricorsione!) -->
        <div v-show="isOpen(item.path)">
          <!-- 
            MODIFICA: 'isRoot' qui è false (o non passato), 
            quindi questo sottomenu avrà il rientro
          -->
          <SidebarMenu
            :items="item.items"
            :category-path="categoryPath"
            :open-groups="openGroups"
            @toggle-group="toggleGroup"
            @navigate="$emit('navigate')"
          />
        </div>
      </div>

    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';

// Definisce 'SidebarMenu' per l'uso ricorsivo
defineOptions({
  name: 'SidebarMenu'
});

// Props
const props = defineProps({
  items: Array,
  categoryPath: String,
  openGroups: Object, 
  // MODIFICA: Aggiunta la prop 'isRoot'
  isRoot: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['navigate', 'toggle-group']);

// Funzione per espandere/comprimere
const toggleGroup = (groupPath) => {
  emit('toggle-group', groupPath);
};

// Controlla se un gruppo è aperto
const isOpen = computed(() => {
  return (groupPath) => !!props.openGroups[groupPath];
});
</script>