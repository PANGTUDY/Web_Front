<template>
    <v-dialog v-model="this.is_dialog"
                persistent
                max-width="500">
        <v-card>
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
        is_dialog: Boolean,
        schedule: Object
    },
    data() {
        return {
            dialog: this.is_dialog
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