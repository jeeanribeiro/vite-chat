import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { Server } from 'socket.io'

const socketio = () => ({
  name: 'socket-io-server',
  configureServer(server) {
    const io = new Server(server.httpServer)
    io.on('connection', (socket) => {
      socket.on('message', (message) => {
          console.log('Message received: ', message)
      });
  });
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    socketio(),
  ],
})
