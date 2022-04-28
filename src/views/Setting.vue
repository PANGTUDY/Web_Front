<template>
<<<<<<< HEAD
<section>
    <div class="top">
        화면 theme 설정
    </div>
     <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>   
</section>    
=======
  <div>
    <div v-for="(list, i) in list" :key="i">
      <div v-for="(item, i) in list" :key="i">
        {{ item.count }}
      </div>
    </div>
  </div>
>>>>>>> 59e45cc80beb0e4ac5784b9ea5bd4f619e472b2e
</template>

<script>
export default {
<<<<<<< HEAD
     data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
   
   mounted(){
=======
  name: "setting",
  data() {
    return {
      data: [
        { count: 1, text: "안녕" },
        { count: 2, text: "하세연" },
        { count: 1, text: "만나서" },
        { count: 2, text: "방가방가" },
      ],
      list: [],
    };
  },
>>>>>>> 59e45cc80beb0e4ac5784b9ea5bd4f619e472b2e

  mounted() {
    for (var i = 0; i < this.data.length; i += 2) {
      this.list.push(this.data.slice(i, i + 2));
    }
  },
};
</script>

<<<<<<< HEAD
<style scope>
.v-data-table__wrapper {
    width: 80%;
    position: relative;
    left: 12%;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background:none;
}

=======
<style>
>>>>>>> 59e45cc80beb0e4ac5784b9ea5bd4f619e472b2e
</style>