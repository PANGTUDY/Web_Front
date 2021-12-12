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
                        <el-col :span="24">
                            <div class="grid-content bg-purple-light">{{ item.comment }}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </div>
        <modal :show.sync="change"
                gradient="danger"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Warning</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">현재 날짜의 스케줄이 변경되었습니다.</h4>
            </div>

            <template slot="footer">
                <base-button type="link"
                                text-color="white"
                                class="ml-auto"
                                @click="change = false">
                    Ok, Got it
                </base-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import Modal from "@/components/Modal.vue";
    export default {
        components: {
            Modal
        },
        data() {
            return {
                select_date: new Date(),
                change: false,
                sse_source: null
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
        mounted() {
            this.$store.dispatch("load_calendar", this.year);
            // TODO : EventSource 주소 상수화 필요
            this.sse_source = new EventSource("http://localhost:10831/calendar/schedules/sse");
            this.sse_source.onmessage = (event) => { 
                var event_data = JSON.parse(event.data);
                if (event_data.schedule.year === this.year) {
                    if (event_data.schedule.month === this.month && event_data.schedule.day === this.day) {
                        this.change = true;
                    }
                    this.$store.dispatch("call_calendar_event", event_data);
                }
            }
        },
        beforeDestroy() {
            this.sse_source.close();
            this.sse_source = null;
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