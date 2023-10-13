<template>
  <div class="dialog">
    <div class="dialog-content">
      <v-card variant="flat">
        <v-toolbar color="primary" dark class="text-h6">{{
          character.name
        }}</v-toolbar>
        <v-card-text class="pt-5">
          <div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-img
                  cover
                  height="320"
                  :src="`${character.thumbnail.path}.${character.thumbnail.extension}`"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="d-flex flex-column mb-6 bg-surface-variant">
                  <v-sheet class="mb-2">{{ character.description }}</v-sheet>
                  <v-sheet class=""
                    >Comics: {{ character.comics.available }}</v-sheet
                  >
                  <v-sheet class=""
                    >Events: {{ character.events.available }}</v-sheet
                  >
                  <v-sheet class=""
                    >Stories: {{ character.stories.available }}</v-sheet
                  >
                  <div class="mt-4">
                    <a :href="findDetailUrl" target="_blank"
                      ><v-btn block color="primary"
                        >Ver detalles en Marvel</v-btn
                      >
                    </a>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <div v-if="comics.length > 0">
            <h3 class="pb-3 pt-8">Últimos cómics:</h3>
            <v-row>
              <v-col
                v-for="comic in displayedComics"
                :key="comic.resourceURI"
                cols="6"
                sm="3"
              >
                <MiniComic
                  variant="flat"
                  :comicTitle="comic.title"
                  :comicImage="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
                />
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions class="justify-end pb-4">
          <v-btn
            class="text-none ms-4 text-white"
            color="primary"
            variant="flat"
            @click="closeDialog"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { generateRequest } from "@/api";
import MiniComic from "@/components/MiniComic.vue";

export default {
  components: {
    MiniComic,
  },
  props: {
    dialogId: Number,
    dialogText: String,
    character: {},
  },
  data() {
    return {
      comics: [],
    };
  },
  methods: {
    closeDialog() {
      this.comics = [];
      this.$emit("closeDialog");
    },
    async fetchData() {
      try {
        const req = new Request(this.collectionURI);
        const resp = await fetch(req);

        if (resp.status === 200) {
          const data = await resp.json();
          this.comics = data.data.results;
        } else {
          console.error("Error al cargar los cómics");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    // Ordenamos por fecha ya que queremos mostrar los 4 últimos.
    this.collectionURI = generateRequest(
      this.character.comics.collectionURI,
      "&orderBy=onsaleDate"
    );

    // Cargamos los cómics al crear la instancia del componente
    this.fetchData();
  },
  computed: {
    findDetailUrl() {
      // Buscamos la URL con "type" igual a "detail" para el link con los detalles del personaje en la página de Marvel
      const detailLink = this.character.urls.find(
        (url) => url.type === "detail"
      );

      // Si se encuentra la URL de detalle, la devolvemos. Y si no, devolvemos una cadena vacía
      return detailLink ? detailLink.url : "";
    },
    displayedComics() {
      if (this.comics.length === 0) {
        return [];
      }
      return this.comics.slice(0, 4);
    },
  },
};
</script>

<style>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: transparent;
  max-width: 800px; /* Ancho máximo de 800px */
  width: 100%;
  padding: 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
