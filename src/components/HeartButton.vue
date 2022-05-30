<template>
  <button class="heart-btn" @click="heartit">
    <svg
      class="heart heart-icon"
      :class="[this.liked ? 'fill-red' : 'fill-gray']"
      viewBox="0 0 32 29.6"
    >
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    likes: Number,
  },
  data: () => ({
    liked: false,
    count: 0,
    likes_num: 0,
  }),

  methods: {
    heartit: function (e) {
      e.preventDefault();

      this.liked = !this.liked;
      this.liked ? (this.likes_num += 1) : (this.likes_num -= 1);

      this.$emit("setInput", this.likes_num);
    },
  },
  mounted() {
    this.likes_num = this.likes;
  },
};
</script>

<style scoped>
:focus {
  outline: none;
}

body .using-mouse :focus {
  outline: none;
}

.heart {
  width: 20px;
  fill: gray;
  pointer-events: none;
}

.heart-btn {
  position: relative;
  background: transparent;
}

.liked {
  fill: #ee3529;
}

.fill-red {
  fill: #ee3529;
}

.fill-gray {
  fill: gray;
}
</style>
