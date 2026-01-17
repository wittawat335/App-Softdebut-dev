import { AppDataSource } from './data-source';

let dataSourcePromise: Promise<void> | null = null;

export async function initDB() {
  if (!AppDataSource.isInitialized) {
    if (!dataSourcePromise) {
      dataSourcePromise = AppDataSource.initialize()
        .then(() => {
          console.log('✅ DB connected');
        })
        .catch(err => {
          dataSourcePromise = null;
          throw err;
        });
    }
    await dataSourcePromise;
  }
}