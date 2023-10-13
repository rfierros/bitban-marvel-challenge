import exampleResponse from "./examples/characters-response.json";
import CryptoJS from "crypto-js";

const PUBLIC_KEY = process.env.VUE_APP_MARVEL_API_PUBLIC_KEY;
const PRIVATE_KEY = process.env.VUE_APP_MARVEL_API_PRIVATE_KEY;

export function getCharactersByText(text) {
  // TODO: implementar busqueda contra api real
  console.debug({ text, PUBLIC_KEY, PRIVATE_KEY });
  return new Promise((resolve) => {
    resolve(exampleResponse.data.results);
  });
}

export function generateHash() {
  var ts = new Date().getTime();
  const hashInput = `${ts}${PRIVATE_KEY}${PUBLIC_KEY}`;
  const hash = CryptoJS.MD5(hashInput).toString();
  console.debug({ hash, PUBLIC_KEY, PRIVATE_KEY });

  return { ts, hash };
}

export function generateRequest(url, tail) {
  const { ts, hash } = generateHash();
  return `${url}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}${tail}`;
}

export async function getMarvelData() {
  const { ts, hash } = generateHash();
  const mainURL = "http://gateway.marvel.com/v1/public/characters";
  const apiUrl = `${mainURL}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      if (data && data.data && data.data.results) {
        const jsondata = data.data.results;
        return jsondata;
      } else {
        throw new Error("No se encontraron personajes.");
      }
    } else {
      throw new Error("La solicitud a la API falló.");
    }
  } catch (error) {
    new Error("Error al obtener personajes de Marvel:", error.message);
  }
}
