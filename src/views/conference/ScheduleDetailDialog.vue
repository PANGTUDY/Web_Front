<template>
    <v-dialog v-model="this.is_dialog"
                persistent
                max-width="500">
        <v-card>
            <v-toolbar
                dark
                color="dark"
                >
                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title> {{ this.year }}.{{ String(this.month).padStart(2, '0') }}.{{ String(this.day).padStart(2, '0') }} 
                    {{ this.schedule === null ? '' : this.schedule.title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-title class="text-h5">
                Test Title!
            </v-card-title>
            <v-card-text>
                Hello World!!!
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
            schedule_title: ''
        }
    },
    watch: {
        is_dialog: function(is_dialog) {
            if (is_dialog) {
                this.schedule_title = this.schedule.title;
            }
        }
    },
    methods: {
        test() {
            console.log(this.schedule);
        },
        close() {
            this.$emit('close');
        }
    }
}
</script>