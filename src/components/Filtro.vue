<template>
  <v-dialog dark v-model="dialogFilter" max-width="290">
    <v-card>
      <v-card-title class="headline">Filter</v-card-title>

      <v-container>
        <v-select
          v-model="consoleSelected"
          :items="consoleItens"
          item-text="nome"
          item-value="id"
          label="nome"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-menu
          ref="modalDataStart"
          v-model="modalDataStart"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fiterDateStart"
              label="Start date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fiterDateStart" @input="menu2 = false">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalDataStart = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.modalDataStart.save(fiterDateStart)">OK</v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu
          ref="modalDataEnd"
          v-model="modalDataEnd"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fiterDateEnd"
              label="End date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fiterDateEnd" @input="menu2 = false">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalDataEnd = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.modalDataEnd.save(fiterDateEnd)">OK</v-btn>
          </v-date-picker>
        </v-menu>

        <v-text-field label="Search by name" v-model="searchName"></v-text-field>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="blue" text @click="enviarSearchPai()">Search</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Filtro",
  data() {
    return {
      searchName: null,
      fiterDateStart: new Date().toISOString().substr(0, 10),
      fiterDateEnd: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .substr(0, 10),
      modalDataStart: false,
      modalDataEnd: false,
      consoleSelected: { nome: "Todos", id: "" },
      consoleItens: [
        { nome: "All", id: "" },
        { nome: "PS4", id: "18" },
        { nome: "Xbox One", id: "1" },
        { nome: "PC", id: "4" },
        { nome: "Switch", id: "7" }
      ]
    };
  },
  props: ["dialogFilter"],
  methods: {
    enviarSearchPai() {
      //this.dialogFilter = false;
      //this.$emit('dialogFilter', false)
      var payload = {
          dialogFilter: false, fiterDateStart: this.fiterDateStart, fiterDateEnd: this.fiterDateEnd,
          searchName: this.searchName, consoleSelected: this.consoleSelected
      }
      //emit é responsavel por chamar um evento no componente pai
      this.$emit('filhosearch', payload )
    }
  }
};
</script>

<style>
</style>