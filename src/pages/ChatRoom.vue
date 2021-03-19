<template>
  <div class="py-5 main-chat">
    <div class="px-5 chatList">
      <ol
        v-for="(chat,index) in chats"
        :key="index"
      >
        <div v-bind:class="isCurrentUser(chat)">
          <ChatBox :chat="chat"></ChatBox>
        </div>
      </ol>
    </div>
    <div class="messageContainer px-5 pb-5">
      <b-form @submit="sendMessage">
        <b-form-group id="input-group-2">
          <b-input-group class>
            <b-form-input
              type="text"
              id="messageBox"
              placeholder="Type here"
              class="py-4"
              v-model="messageBox"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-button
          id="send"
          class=""
          type="submit"
          variant="danger"
          size="lg"
          style="width:100%"
        >Send Message</b-button>
      </b-form>

    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";

import ChatBox from "../components/ChatBox.vue";
export default {
  components: {
    ChatBox,
  },
  data() {
    return {
      ws: "",
      messageBox: "",
      chatBox: "",
      usernameBox: "",
      chatData: {
        name: "",
        email: "",
        message: "",
      },
      chats: [],
    };
  },
  mounted() {
    //this.getUser();
  },

  created: function () {
    this.ws = new WebSocket("ws://192.168.0.7:3434");

    this.ws.onopen = () => {
      console.log("Connection Open");
    };
    this.ws.onmessage = (data) => {
      let messages = {};
      messages = JSON.parse(data.data);
      console.log(messages);
      this.chats.push(messages);
    };
    this.ws.onclose = () => {
      this.ws = null;
    };
    if (!this.ws) {
      this.ws.onerror = this.ws.open = this.ws.onclose = null;
      this.ws.close();
    }
  },
  methods: {
    isCurrentUser(chat) {
      let result = chat.email === this.chatData.email ? "right" : "left";

      return result;
    },
    sendMessage() {
      let token = jwt.decode(localStorage.getItem("token"));
      this.chatData.name = token.name;
      this.chatData.email = token.email;
      this.chatData.message = this.messageBox;

      this.ws.send(JSON.stringify(this.chatData));
      this.chats.push({
        name: token.name,
        message: this.messageBox,
        email: token.email,
      });
      this.messageBox = "";
      console.log(this.chats);
    },
  },
};
</script>

<style>
.chatList ol {
  padding-left: 0;
}
.chatList {
  overflow-y: scroll;
  max-height: 500px;
}

.right {
  text-align: right;
}

.left {
  text-align: left;
}
.messageContainer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
