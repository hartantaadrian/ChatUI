<template>
  <div class="chatbox">
    <div>
      <span class="username">
        {{chat.name}}
      </span>
    </div>
    <div>
      <span class="messages">
        {{chat.message}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatBox",
  props: {
    chat: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatbox {
  border: 1px solid;
  padding: 6px 7px 8px 9px;
  display: inline-block;
  border-radius: 7.5px;
  min-width: 200px;
  text-align: left;
}

.username {
}

.messages {
}
</style>