<template>
    <v-dialog v-model="this.is_dialog"
                persistent
                max-width="1000">
        <v-card>
            <v-toolbar
                dark
                color="dark"
                >
                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title> 
                    {{ this.year }}.{{ String(this.month).padStart(2, '0') }}.{{ String(this.day).padStart(2, '0') }} 
                    {{ this.schedule_title }}
                    ({{ this.schedule_start }} ~ {{ this.schedule_end }})
                </v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                    <v-btn text @click="edit_schedule()">
                        Edit
                    </v-btn>
                    <v-btn text @click="delete_schedule()">
                        Delete
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-title class="text-h5"> </v-card-title>
            <v-card-text>
                {{ this.schedule_comment }}
            </v-card-text>
            <v-card-actions>
                <v-btn text color="green darken-1" @click="close">
                    Close
                </v-btn>
                <v-btn text color="green darken-1" @click="test">
                    Data Check!
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        year: Number,
        month: Number,
        day: Number,
        is_dialog: Boolean,
        schedule: Object
    },
    data() {
        return {
            dialog: this.is_dialog,
            
            schedule_title: '',
            schedule_start: null,
            schedule_end: null,
            schedule_select_members: [],
            schedule_is_alram: false,
            schedule_select_time: null,
            schedule_comment: '',
        }
    },
    watch: {
        is_dialog: function(is_dialog) {
            if (is_dialog) {
                this.schedule_title = this.schedule.title;
                this.schedule_start = this.time_format(this.schedule.startTime);
                this.schedule_end = this.time_format(this.schedule.endTime);
                this.schedule_select_members = ['박찬준'];
                this.schedule_is_alram = this.schedule.alarm;
                this.schedule_select_time = ['15분전'];
                this.schedule_comment = this.schedule.comment;
            }
        }
    },
    methods: {
        test() {
            console.log(this.schedule);
        },
        close() {
            this.$emit('close');
        },
        edit_schedule() {
            this.$emit('edit', this.schedule);
        },
        delete_schedule() {
            this.$emit('delete', this.schedule.id);
            this.$emit('close');
        },
        time_format(time) {
            return String(time[0]).padStart(2, '0') + ':' + String(time[1]).padStart(2, '0')
        }
    }
}
</script>