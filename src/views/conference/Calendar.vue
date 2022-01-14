<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <v-sheet height="64">
                    <v-toolbar flat>
                        <v-btn outlined class="mr-4" color=" darken-2" @click="set_today">
                            Today
                        </v-btn>
                        <v-spacer />
                        <v-btn fab text small color="grey darken-2" @click="prev">
                            <v-icon small>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="next">
                            <v-icon small>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if = "$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                    </v-toolbar>
                </v-sheet>
                <v-calendar 
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="this.schedules"
                        :event-color="get_event_color"
                        type="month"
                        @click:event="show_schedule"
                        @click:more="more_schedules"
                        style="height: 800px">
                </v-calendar>
                <v-menu v-model="selected_open"
                        :close-on-content-click="false"
                        :activator="selected_element"
                        offset-x>
                    <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar :color="selected_schedule.color" dark>
                            <v-icon> mdi-calendar </v-icon>
                            &nbsp; &nbsp;
                            <v-toolbar-title v-html="selected_schedule.name" />
                        </v-toolbar>
                        <v-card-text>
                            <span v-html="selected_schedule.details" />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text color="secondary" @click="selected_open = false">
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </div>
            <div class="col-lg-3">
                <div class="row py-3" style="margin-bottom: 10px">
                    <h5 class="mb-0"> {{ this.year }}.{{ String(this.month).padStart(2, '0') }}.{{ String(this.day).padStart(2, '0') }} </h5>
                </div>
                <v-card elevation="2">
                    <!-- <v-row v-if="this.calendar[this.year + '-' + this.month + '-' + this.day] === undefined">
                        <v-col>
                            <v-card style="margin-left: 10px; margin-right: 10px;">
                                <v-card-text>
                                    Empty Schedule!
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row> -->
                    <v-row v-for="item in this.calendar[this.year + '-' + this.month + '-' + this.day]" :key="item.id">
                        <v-col>
                            <v-card color="#DAF1DB" style="margin-left: 10px; margin-right: 10px;">
                                <v-card-title class="text-h5">
                                    {{ item.title }}
                                </v-card-title>
                                <v-card-subtitle>
                                    <b> {{ time_format(item.startTime) }} ~ {{ time_format(item.endTime) }} </b>
                                </v-card-subtitle>
                                <v-card-text>
                                    {{ item.comment }}
                                    <div style="text-align: right">
                                        <v-btn icon x-small @click="modify_schedule(item)"><v-icon>{{ icons.mdiPencil }}</v-icon></v-btn> &nbsp;
                                        <v-btn icon x-small @click="delete_schedule(item)"><v-icon>{{ icons.mdiDelete }}</v-icon></v-btn> 
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card style="text-align: center; font-size: 20px; margin-left: 10px; margin-right: 10px;" @click="create_schedule()">
                                <b> + </b>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>
        <v-snackbar v-model="change">
            데이터 변경이 감지되었습니다.

            <template v-slot:action="{ attrs }">
                <v-btn color="pink"
                        text
                        v-bind="attrs"
                        @click="change = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <CreateDialog :is_dialog="create_dialog"
                    :schedule="current_schedule"
                    :year="year"
                    :month="month"
                    :day="day"
                    @close="close_create_dialog"
                    @commit="commit_create_dialog"> </CreateDialog>
        <DetailDialog :is_dialog="detail_dialog" :schedule="current_schedule" @close="close_detail_dialog"></DetailDialog>
    </div>
</template>

<script src="./calendar.js">
</script>