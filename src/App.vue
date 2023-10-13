<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-img
        alt="Marvel logo"
        class="shrink ml-2"
        contain
        :src="marvelLogo"
        width="100"
      />
      <v-spacer />
      <v-img
        alt="Bitban logo"
        class="shrink mr-2 hidden-sm-and-down"
        contain
        :src="bitbanLogo"
        width="80"
        transition="scale-transition"
      />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              role="searchbox"
              prepend-inner-icon="mdi-magnify"
              placeholder="Busca por nombre de personaje"
              clearable
              loading
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="character in characters"
            :key="character.id"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <v-card class="d-flex flex-column" @click="showDialog = true">
              <!-- Imagen de ejemplo -->
              <v-img
                src="https://i.pinimg.com/originals/f2/18/50/f2185070a709055b6ece00fbf1b19d35.jpg"
                transition="fade-transition"
                height="200px"
              />
              <v-card-title
                class="text-body-1 font-weight-medium"
                v-text="character.name"
              ></v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog max-width="800" v-model="showDialog">
          <v-card>
            <v-toolbar color="primary" dark>Placeholder</v-toolbar>
            <v-card-text class="pt-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit, fusce
                litora nibh libero ultricies conubia nostra, id vulputate luctus
                augue sed tellus.
              </p>
              <p>
                Fusce tristique felis pharetra malesuada quisque viverra,
                vehicula sagittis feugiat posuere sed primis morbi.
              </p>
              <p>
                Interdum nisi rhoncus nostra montes. Vivamus erat tempus dictum
                taciti nulla mi ligula duis, nunc vehicula pellentesque
                imperdiet placerat sapien lectus hac rutrum, parturient
                habitasse tellus suscipit ac semper interdu.
              </p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="showDialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getCharactersByText } from "@/api";
import bitbanLogo from "@/assets/bitban-logo.png";
import marvelLogo from "@/assets/marvel-logo.svg";

export default {
  name: "App",
  components: {},
  data: () => ({
    characters: [],
    showDialog: false,
    bitbanLogo,
    marvelLogo,
  }),
  async mounted() {
    this.characters = await getCharactersByText("example");
  },
};
</script>
