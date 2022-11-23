<template>
    <h1 class="pb-8">chat</h1>
    <div class="bg-white q-pa-md row justify-between items- w-160 h-4/5 flex-col">
        <div class="flex-1 overflow-auto">
            <q-chat-message
                :label="new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())"
            />
            <div v-for="message in messages">
                <q-chat-message
                    :name="message.name === name ? 'me' : message.name"
                    avatar="https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
                    :text="[message.message]"
                    :sent="message.name === name ? true : false"
                    :stamp="message.date.toLocaleString()"
                />
            </div>
        </div>
        <q-input filled bottom-slots v-model="message" label="message" :dense="false" @keydown="onKeyDown">
            <template v-slot:before>
            </template>
            <template v-slot:append>
            <q-icon v-if="message !== ''" name="close" @click="message = ''" class="cursor-pointer" />
            </template>
            <template v-slot:after>
            <q-btn round dense flat icon="send" @click="onClick" />
            </template>
        </q-input>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import { io } from "socket.io-client"
import { useStore } from 'vuex'

const messages: Ref<{ name: string, message: string, date: Date }[]> = ref([])
const name = ref('')

export default {
  setup () {
    const $store = useStore()
    const socket = io('http://' + window.location.host)
    
    const message = ref('')
    name.value = $store.state.name,

    socket.on("message", (data) => {
      messages.value = [...messages.value, data]
    })

    function sendMessageAndReset() {
      socket.emit("message", { name: name.value, message: message.value })
      message.value = ''
    }

    return {
      message,

      onClick () {
        sendMessageAndReset()
      },

      onKeyDown (event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
          sendMessageAndReset()
        }
      }
    }
  },
  data() {
    return {
      name,
      messages,
    }
  }
}
</script>

<style>
    .w-160 {
        width: 40rem;
    }
</style>
