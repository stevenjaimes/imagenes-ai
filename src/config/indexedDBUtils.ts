// Tipos personalizados

interface ImageRecord {
  id: string; // O cualquier tipo que estés usando para el ID
  blob: Blob;
}

// Inicializa la base de datos
export const initializeDB = (): void => {
  const request: IDBOpenDBRequest = indexedDB.open("ImageDatabase", 1);

  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
    // Crea la tienda de objetos "images" si no existe
    if (!db.objectStoreNames.contains("images")) {
      db.createObjectStore("images", { keyPath: "id" });
    }
  };

  request.onerror = (event: Event) => {
    console.error(
      "Error al abrir la base de datos",
      (event.target as IDBRequest).error
    );
  };
};

// Guarda una imagen en la base de datos
export const saveImageToDB = (id: string, blob: Blob): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open("ImageDatabase", 1);

    request.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction: IDBTransaction = db.transaction("images", "readwrite");
      const store: IDBObjectStore = transaction.objectStore("images");

      // Guardamos la imagen en la tienda de objetos
      store.put({ id, blob });

      transaction.oncomplete = () => resolve();
      transaction.onerror = (err: Event) => reject(err);
    };

    request.onerror = (err: Event) => reject("Error al abrir la base de datos: " + err);
  });
};

// Obtiene todas las imágenes de la base de datos
export const getImagesFromDB = (): Promise<ImageRecord[]> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open("ImageDatabase", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("images")) {
        return resolve([]);
      }

      const transaction: IDBTransaction = db.transaction("images", "readonly");
      const store: IDBObjectStore = transaction.objectStore("images");

      const allRecords: IDBRequest<ImageRecord[]> = store.getAll();
      allRecords.onsuccess = () => resolve(allRecords.result);
      allRecords.onerror = (err: Event) => reject(err);
    };

    request.onerror = (err: Event) => reject("Error al abrir la base de datos: " + err);
  });
};

// Elimina una imagen de la base de datos
export const deleteImageFromDB = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open("ImageDatabase", 1);

    request.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction: IDBTransaction = db.transaction("images", "readwrite");
      const store: IDBObjectStore = transaction.objectStore("images");

      // Especificar el tipo genérico para IDBRequest
      const deleteRequest: IDBRequest<undefined> = store.delete(id);

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject("Error al eliminar la imagen de la base de datos");
      };
    };

    request.onerror = () => reject("Error al abrir IndexedDB");
  });
};
