<template>
    <h1 class="pb-8">chat</h1>
    <div class="bg-white q-pa-md row justify-between items- w-160 h-4/5 flex-col">
        <div>
            <q-chat-message
                label="Sunday, 19th"
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
        <q-input filled bottom-slots v-model="text" label="message" :dense="dense">
            <template v-slot:before>
            </template>
            <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
            </template>
            <template v-slot:after>
            <q-btn round dense flat icon="send" />
            </template>
        </q-input>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup () {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false)
    }
  }
}
</script>

<style>
    .w-160 {
        width: 40rem;
    }
</style>
