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
              v-model="search"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="character in filterSearch"
            :key="character.id"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <v-card
              class="d-flex flex-column"
              @click="showDialog(character)"
              :key="character.id"
            >
              <v-img
                :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
                transition="fade-transition"
                height="200px"
              />
              <v-card-title
                class="text-body-1 font-weight-medium"
                v-text="character.name"
              ></v-card-title>
              <v-card-subtitle class="text-body-2 font-weight-normal">
                {{ character.description }}
              </v-card-subtitle>
              <v-card-text
                class="d-flex justify-end text-caption font-weight-medium"
                v-text="`Comics ${character.comics.available}`"
              ></v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <hero-detail
          :show-dialog="showDialog"
          :character="character"
          @closeDialog="closeDialog"
          v-if="dialogVisible"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getMarvelData } from "@/api";
import bitbanLogo from "@/assets/bitban-logo.png";
import marvelLogo from "@/assets/marvel-logo.svg";
import HeroDetail from "@/components/HeroDetail.vue";

export default {
  name: "App",
  components: { HeroDetail },
  data: () => ({
    characters: [],
    character: {},

    dialogVisible: false,
    bitbanLogo,
    marvelLogo,
    search: "",
  }),
  async mounted() {
    //this.characters = await getCharactersByText("example");
    this.characters = await getMarvelData();
  },
  methods: {
    showDialog(character) {
      this.character = character;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  computed: {
    filterSearch: function () {
      if (this.characters) {
        if (this.search) {
          return this.characters.filter((newlist) => {
            return newlist.name
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
        } else {
          return this.characters;
        }
      } else {
        return [];
      }
    },
  },
};
</script>
