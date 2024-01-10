<script lang="ts" setup>
interface ModalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl',
  escapable?: boolean,
  persistent?: boolean
}
const props = withDefaults(defineProps<ModalProps>(), {
  size: '2xl',
  escapable: true,
  persistent: false,
})
const emit = defineEmits(['close', 'click:outside'])
const modalSizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

function closeModal() {
  emit('close')
}
function clickOutside() {
  if(!props.persistent) {
    emit('click:outside')
    closeModal()
  }
}

function closeWithEsc() {
  if(props.escapable && !props.persistent) closeModal()
}
const modalRef: Ref<HTMLElement | null> = ref(null)
onMounted(() => {
  if(modalRef.value) {
    modalRef.value.focus()
  }
})
</script>

<template>
  <div>
    <div class="bg-gray-200/75 fixed inset-0 z-50" />
    <div tabindex="0" ref="modalRef" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full justify-center items-center flex" @keyup.esc="closeWithEsc" @click.self="clickOutside">
      <div class="relative flex my-auto justify-center p-4 w-full h-auto" :class="`${modalSizeClasses[size]}`">
        <!-- Modal content -->
        <div class="relative w-full bg-white/75 backdrop-blur rounded-lg shadow-xl shadow-black/25">
          <!-- Modal body -->
          <div class="p-8">
            <slot />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
