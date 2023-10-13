import exampleResponse from "./examples/characters-response.json";

const PUBLIC_KEY = process.env.VUE_APP_MARVEL_API_PUBLIC_KEY;
const PRIVATE_KEY = process.env.VUE_APP_MARVEL_API_PRIVATE_KEY;

export function getCharactersByText(text) {
  // TODO: implementar busqueda contra api real
  console.debug({ text, PUBLIC_KEY, PRIVATE_KEY });
  return new Promise((resolve) => {
    resolve(exampleResponse.data.results);
  });
}
