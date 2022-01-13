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
                            <v-card style="text-align: center; font-size: 20px; margin-left: 10px; margin-right: 10px;" @click="add_schedule()">
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
        <v-dialog v-model="create_dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar
                    dark
                    color="dark"
                    >
                    <v-btn icon @click="create_dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title> {{ this.year }}.{{ String(this.month).padStart(2, '0') }}.{{ String(this.day).padStart(2, '0') }} 일정 등록</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn text @click="schedule_dialog_clear()">
                            Clear
                        </v-btn>
                        <v-btn text @click="schedule_dialog_save()">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-list-item>
                        <v-text-field
                            v-model="schedule_title"
                            label="Title"
                            :rules="schedule_title_rules"
                            hide-details="auto">
                        </v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <v-row>
                            <v-col>
                                <v-menu
                                    ref="menu1"
                                    v-model="start_time"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="schedule_start"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="schedule_start"
                                            label="Start Time"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on" />
                                    </template>
                                    <v-time-picker
                                        v-if="start_time"
                                        v-model="schedule_start"
                                        format="ampm"
                                        ampm-in-title
                                        @click:minute="$refs.menu1.save(schedule_start)" />
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                    ref="menu2"
                                    v-model="end_time"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="schedule_end"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="schedule_end"
                                            label="End Time"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on" />
                                    </template>
                                    <v-time-picker
                                        v-if="end_time"
                                        v-model="schedule_end"
                                        format="ampm"
                                        ampm-in-title
                                        @click:minute="$refs.menu2.save(schedule_end)" />
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-list-item>
                    <v-list-item>
                        <v-select
                            v-model="schedule_select_members"
                            :items="members"
                            label="Participants"
                            :menu-props="{ offsetY: true }"
                            clearable
                            multiple
                            chips
                            dense>
                            <template v-slot:selection="data">
                                <v-chip
                                    :key="JSON.stringify(data.item)"
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    @click:close="data.parent.selectItem(data.item)">
                                    <v-avatar
                                        class="accent white--text"
                                        left
                                        v-text="data.item.slice(0, 1).toUpperCase()"/>
                                    {{ data.item }}
                                </v-chip>
                            </template>
                        </v-select>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox v-model="schedule_is_alram" 
                                label="Alram"/>
                        <v-spacer></v-spacer>
                        <v-select 
                                v-if="schedule_is_alram"
                                v-model="schedule_select_time"
                                :items="time_list"
                                label="Time"
                                :menu-props="{ offsetY: true }"
                                dense/>
                    </v-list-item>
                    <v-list-item>
                        <v-textarea
                            v-model="scehdule_comment"
                            filled
                            name="input-7-4"
                            auto-grow
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Comment"
                            value="Sample Data" />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
        <v-dialog v-model="detail_dialog">
        </v-dialog>
    </div>
</template>

<script src="./calendar.js">
</script>