<template>
  <h1>vite chat</h1>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const $q = useQuasar()
    const $router = useRouter()

    const name = ref(null)
    const accept = ref(false)

    return {
      name,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
          $router.push('/chat')          
        }
      },

      onReset () {
        name.value = null
        accept.value = false
      }
    }
  }
}
</script>
