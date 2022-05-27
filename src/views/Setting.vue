<template>
  <div>
    <div v-for="(list, i) in list" :key="i">
      <div v-for="(item, i) in list" :key="i">
        {{ item.count }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data() {
    return {
      data: [
        { count: 1, text: '안녕' },
        { count: 2, text: '하세연' },
        { count: 1, text: '만나서' },
        { count: 2, text: '방가방가' },
      ],
      list: [],
    };
  },

  mounted() {
    for (var i = 0; i < this.data.length; i += 2) {
      this.list.push(this.data.slice(i, i + 2));
    }
  },
};
</script>

<style></style>
