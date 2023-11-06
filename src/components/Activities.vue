<template>
    <v-container>
        <div>
            <h3 class="mb-3">Activities</h3>
        </div>

        <div>
            <AddActivity />

            <v-row>
                <!-- Activity Sorting Menu -->
                <v-col cols="12" sm="6" md="4" lg="3">
                    <v-select v-model="selectedSortOption" :items="['All', 'Completed', 'Incomplete']" label="Filter"
                        variant="underlined">
                    </v-select>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddActivity from './AddActivity.vue';

export default {
    components: {
        AddActivity
    },
    data() {
        return {
            selectedSortOption: 'All', // Initial selection is 'All'
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
        ...mapActions("activity", ['GET_ACTIVITIES', 'PATCH_ACTIVITY', 'DELETE_ACTIVITY']),

        changeStatus(activity) {
            const activityId = activity.id;
            const updatedStatus = !activity.isComplete;
            this.PATCH_ACTIVITY({
                activityId,
                updatedStatus
            });
        },

        deleteActivity(activity) {
            const activityId = activity.id;
            this.DELETE_ACTIVITY({ activityId });
        }
    },
    created() {
        this.GET_ACTIVITIES();
    }
}
</script>

<style scoped></style>
