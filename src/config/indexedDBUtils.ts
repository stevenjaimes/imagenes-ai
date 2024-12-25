// Tipos personalizados
interface ImageRecord {
  id: string;
  blob: Blob;
}

/**
 * Abre la base de datos IndexedDB y la inicializa si es necesario.
 * @returns {Promise<IDBDatabase>} Promesa que se resuelve con la instancia de la base de datos.
 */
const openDatabase = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ImageDatabase", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id" });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (err: Event) => {
      reject("Error al abrir la base de datos: " + (err.target as IDBRequest).error);
    };
  });
};

/**
 * Guarda una imagen en la base de datos.
 * @param {string} id ID de la imagen.
 * @param {Blob} blob Blob de la imagen.
 */
export const saveImageToDB = async (id: string, blob: Blob): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");

  await new Promise<void>((resolve, reject) => {
    const request = store.put({ id, blob });
    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error al guardar la imagen en la base de datos");
  });
};

/**
 * Obtiene todas las imágenes de la base de datos.
 * @returns {Promise<ImageRecord[]>} Array de objetos con las imágenes.
 */
export const getImagesFromDB = async (): Promise<ImageRecord[]> => {
  const db = await openDatabase();
  const transaction = db.transaction("images", "readonly");
  const store = transaction.objectStore("images");

  return new Promise<ImageRecord[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener las imágenes de la base de datos");
  });
};

/**
 * Elimina una imagen de la base de datos.
 * @param {string} id ID de la imagen a eliminar.
 */
export const deleteImageFromDB = async (id: string): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");

  await new Promise<void>((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error al eliminar la imagen de la base de datos");
  });
};

/**
 * Inicializa la base de datos. (Opcional si `openDatabase` ya lo hace en `onupgradeneeded`).
 */
export const initializeDB = async (): Promise<void> => {
  await openDatabase(); // Se asegura de que la base de datos y la tienda estén inicializadas.
};
