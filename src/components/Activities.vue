<template>
    <v-container>
        <div>
            <h3 class="mb-3">Activities</h3>

            <!-- Add Activity Button -->
            <v-btn class="mb-4" color="#4DB6AC" @click="openAddActivityDialog">ADD ACTIVITY</v-btn>

            <v-row>
                <!-- Activity Sorting Menu -->
                <v-col cols="12" sm="6" md="4" lg="3">
                    <v-select v-model="selectedSortOption" :items="['All', 'Completed', 'Incomplete']" label="Filter"
                        variant="underlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <!-- Activities Cards -->
                <v-col v-for="activity in filteredActivities" :key="activity.id" cols="12" sm="6" md="4" lg="3">
                    <v-card :color="activity.isComplete ? '#FFB74D' : '#78909C'" elevation="2">
                        <v-card-title>{{ activity.title }}</v-card-title>
                        <v-card-subtitle>{{ activity.isComplete ? 'Completed' : 'Incomplete' }}</v-card-subtitle>

                        <v-card-text>{{ activity.description }}</v-card-text>

                        <v-card-actions>
                            <v-btn @click="changeStatus(activity)">{{ activity.isComplete ? 'Mark as incomplete' : 'Mark as complete' }}</v-btn>
                            <v-spacer></v-spacer>

                            <v-btn @click="deleteActivity(activity)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>

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
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            selectedSortOption: 'All', // Initial selection is 'All'
            addActivityDialog: false,
            newActivityTitle: "",
            newActivityDescription: "",
        };
    },
    computed: {
        ...mapGetters("activity", ['allActivities']),

        filteredActivities() {
            if (this.selectedSortOption === 'All') {
                return this.allActivities;
            } else if (this.selectedSortOption === 'Completed') {
                return this.allActivities.filter(activity => activity.isComplete);
            } else if (this.selectedSortOption === 'Incomplete') {
                return this.allActivities.filter(activity => !activity.isComplete);
            }
        },
    },
    methods: {
        ...mapActions("activity", ['GET_ACTIVITIES', 'POST_ACTIVITY', 'PATCH_ACTIVITY', 'DELETE_ACTIVITY']),

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
        },

        changeStatus(activity){
            const activityId = activity.id;
            const updatedStatus = !activity.isComplete;
            this.PATCH_ACTIVITY({
                activityId, 
                updatedStatus
            });
        },

        deleteActivity(activity){
            const activityId = activity.id;
            this.DELETE_ACTIVITY({activityId});
        }
    },
    created() {
        this.GET_ACTIVITIES();
    }
}
</script>

<style scoped></style>
