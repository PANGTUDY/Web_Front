<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <el-calendar v-model="select_date">
                    <template slot="dateCell" slot-scope="{date, data}">
                        <div>
                            <p :class="data.isSelected ? 'is-selected' : ''" >
                                {{ date.getDate() }}
                            </p>
                        </div>
                    </template>
                </el-calendar>
            </div>
            <div class="col-lg-3">
                <div class="row py-3 align-items-center">
                    <h6 class="mb-0"> {{ this.year }}.{{ this.month }}.{{ this.day }} </h6>
                </div>
            
                <el-card shadow="never">
                    <el-row v-for="item in this.calendar[this.year + '-' + this.month + '-' + this.day]" :key="item.id">
                        <el-col :span="24"><div class="grid-content bg-purple-light">{{ item.comment }}</div></el-col>
                    </el-row>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                select_date: new Date(),
            }
        },
        computed: {
            year() {
                return this.select_date.getFullYear();
            },
            month() {
                return this.select_date.getMonth() + 1;
            },
            day() {
                return this.select_date.getDate();
            },
            calendar() {
                return this.$store.state.calendar;
            }
        },
        methods: {
            test(data, date) {
                alert(data + "\n" + date);
                console.log(this.calendar);
                console.log(this.selectDate);
            }
        },
        mounted() {
            this.$store.dispatch("load_calendar", this.year);
            var source = new EventSource("http://localhost:10831/calendar/schedules/sse");
            source.onmessage = (event) => { 
                var event_data = JSON.parse(event.data);
                if (event_data.schedule.year === this.year) {
                    this.$store.dispatch("call_calendar_event", event_data);
                }
            }
        }
    }
</script>

<style>
 .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-light {
    background: #DAF1DB;
  }
  .grid-content {
    border-radius: 7px;
    padding: 10px;
  }
</style>