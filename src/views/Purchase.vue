<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="#d94d33 darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="search"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="#d94d33"
                :value="false"
              >
                <v-icon>arrow_drop_up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="#d94d33"
                :value="true"
              >
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row
          v-for="item in props.items"
          :key="item.name"
        >
          <v-col>
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Date:</v-list-item-content>
                  <v-list-item-content>{{ item.date | dateTime }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Status:</v-list-item-content>
                  <v-list-item-content>{{ item.status }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Amount:</v-list-item-content>
                  <v-list-item-content>{{ item.amount | currency }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <span
          class="mr-4
          grey--text"
        >
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn
          fab
          dark
          color="#d94d33"
          class="mr-1"
          @click="formerPage"
        >
          <v-icon>arrow_left</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          color="#d94d33"
          class="ml-1"
          @click="nextPage"
        >
          <v-icon>arrow_right</v-icon>
        </v-btn>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

interface OrderCard {
  date: Date
  name: string
  status: string
  amount: number
}

@Component
export default class Purchase extends Vue {
  search = ''
  filter = { }
  sortDesc = false
  page = 1
  itemsPerPage = 4
  sortBy = 'name'
  keys = [
    'Name',
    'Date',
    'Status',
    'Amount',
  ]
  items: Array<OrderCard> = [
    {
      name: 'Conveyor 1',
      status: 'Завершен',
      amount: 500,
      date: new Date(),
    },
    {
      name: 'Conveyor 2',
      status: 'Обработка',
      amount: 400,
      date: new Date(),
    },
    {
      name: 'Conveyor 3',
      status: 'Доставка',
      amount: 300,
      date: new Date(),
    },
  ]

  nextPage(): void {
    if (this.page + 1 <= this.numberOfPages) this.page += 1
   }

  formerPage(): void {
    if (this.page - 1 >= 1) this.page -= 1
  }

  get numberOfPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage)
  }
}
</script>
