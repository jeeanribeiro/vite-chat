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
                  :sent="message.name === name ? true : false"
                  :stamp="message.date.toLocaleString()"
              >
                <div v-if="message.fileArrayBuffer" :class="`flex items-center ${message.name === name ? '' : 'flex-row-reverse'}`">
                  <q-icon name="download_file" size="2rem" @click="onDownloadClick(message)" class="cursor-pointer block" />
                  <span class="flex-1">{{ message.file?.name }}</span>
                </div>
                <span v-if="message.message">
                  {{ message.message }}
                </span>
              </q-chat-message>
            </div>
        </div>
        <div class="flex">
          <q-input filled bottom-slots v-model="message" label="message" :dense="false" @keydown="onKeyDown" class="flex-1">
            <template v-slot:prepend>
              <div class="w-10 rounded-2xl">
                <EmojiPicker :native="true" @select="onSelectEmoji" picker-type="input" />
              </div>
            </template>
            <template v-slot:append>
              <q-icon v-if="message !== ''" name="close" @click="message = ''" class="cursor-pointer" />
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="send" @click="onSendClick" />
              <q-btn round dense flat icon="attach_file" @click="onAttachClick" />
            </template>
          </q-input>
          <q-file ref="qfile" borderless v-model="file" class="hidden" @update:model-value="onUpload" />
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import { io } from "socket.io-client"
import { useStore } from 'vuex'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const messages: Ref<{ name: string, message?: string, date: Date, file?: File, fileArrayBuffer?: ArrayBuffer }[]> = ref([])
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

    socket.on("file", (data) => {
      messages.value = [...messages.value, data]
    })

    function sendMessageAndReset() {
      socket.emit("message", { name: name.value, message: message.value })
      message.value = ''
    }

    return {
      message,
      onSendClick () {
        sendMessageAndReset()
      },
      onKeyDown (event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
          sendMessageAndReset()
        }
      },
      onFileChange(event: any) {
        console.log(event)
      },
      onUpload (file: File) {
        const reader = new FileReader()
        const _file = {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        }
        reader.addEventListener('load', () => {
          socket.emit('file', { name: name.value, file: _file, fileArrayBuffer: reader.result })
        })
        reader.readAsArrayBuffer(file)
      },
      onDownloadClick (message: any) {
        const blob = new Blob([message.fileArrayBuffer], { type: message.file.type })
        const objectURL = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectURL
        const fileName = message.file.name
        link.download = fileName
        link.click()
      },
      onSelectEmoji (emoji: any) {
        message.value += emoji.i
      },
    }
  },
  data() {
    return {
      name,
      messages,
      file: ref(null),
    }
  },
  methods: {
    onAttachClick () {
      (this.$refs.qfile as any)?.pickFiles()
    },
  },
  components: {
    EmojiPicker,
  }
}
</script>

<style>
    .w-160 {
        width: 40rem;
    }

    .v3-input-emoji-picker .v3-input-picker-root input.v3-emoji-picker-input {
      background: none;
      border: none;
      color: transparent;
    }
</style>
