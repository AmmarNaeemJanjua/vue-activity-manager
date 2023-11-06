<template>
    <!-- Add Activity Button -->
    <v-btn class="mb-4" color="#4DB6AC" @click="openAddActivityDialog">ADD ACTIVITY</v-btn>

    <!-- Add Activity Dialog -->
    <v-dialog v-model="addActivityDialog" max-width="400">
        <v-card>
            <v-card-title>Add Activity</v-card-title>
            <v-card-text>
                <v-text-field clearable clear-icon="mdi-close-circle" variant="outlined" v-model="newActivityTitle"
                    label="Title"></v-text-field>
                <v-textarea clearable clear-icon="mdi-close-circle" variant="outlined" v-model="newActivityDescription"
                    label="Description"></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="addActivity">Add</v-btn>
                <v-btn color="red" @click="closeAddActivityDialog">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            addActivityDialog: false,
            newActivityTitle: "",
            newActivityDescription: "",
        };
    },
    methods: {
        ...mapActions("activity", ['POST_ACTIVITY']),

        // To open and close dialog
        openAddActivityDialog() {
            this.newActivityTitle = ""; // Clearing the activity fields to ensure a fresh start when opening the dialog again
            this.newActivityDescription = "";
            this.addActivityDialog = true;
        },
        closeAddActivityDialog() {
            this.addActivityDialog = false;
        },

        addActivity() {
            this.POST_ACTIVITY({
                title: this.newActivityTitle,
                description: this.newActivityDescription
            });
            this.closeAddActivityDialog();
        }
    }
}
</script>

<style scoped></style>
