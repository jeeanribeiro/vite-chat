<template>
    <h1 class="pb-8">chat</h1>
    <div class="bg-white q-pa-md row justify-between items- w-160 h-4/5 flex-col">
        <div>
            <q-chat-message
                :label="new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())"
            />
            <div>
                <q-chat-message
                    name="me"
                    avatar="https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
                    :text="['hey, how are you?']"
                    sent
                    stamp="7 minutes ago"
                />
                <q-chat-message
                    name="person"
                    avatar="https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
                    :text="['doing fine, how r you?']"
                    stamp="4 minutes ago"
                />
            </div>
        </div>
        <q-input filled bottom-slots v-model="message" label="message" :dense="dense">
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
import { ref } from 'vue'
import { io } from "socket.io-client"

export default {
  setup () {
    const message = ref('')
    const socket = io('http://' + window.location.host)

    socket.on("connect", () => {
      console.log("connected")
    })

    return {
      label: ref(null),
      message,
      ph: ref(''),
      dense: ref(false),

      onClick () {
        socket.emit('message', message.value)
        message.value = ''
      }
    }
  }
}
</script>

<style>
    .w-160 {
        width: 40rem;
    }
</style>
