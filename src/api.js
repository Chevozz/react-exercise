// Jembatan ke REST API Laravel (backend: D:\Kampus\tekweb\laravel\latihan-laravel).
// Token Sanctum disimpan di localStorage agar bertahan setelah refresh.

const TOKEN_KEY = "jeda_token";
const CATALOG_KEY = "jeda_catalog";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Laravel mengirim price/rating sebagai string desimal ("78000.00").
// Number() dipakai supaya perhitungan keranjang tidak menghasilkan penggabungan teks.
const normalizeProduct = (product) => ({
  ...product,
  price: Number(product.price),
  rating: Number(product.rating),
  details: product.details ?? [],
});

async function request(path) {
  const token = getToken();
  const response = await fetch(`/api/${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "Token Sanctum belum ada atau sudah dicabut."
        : `Permintaan ke /api/${path} gagal (${response.status}).`
    );
  }

  return (await response.json()).data;
}

const readCache = () => {
  try {
    return JSON.parse(sessionStorage.getItem(CATALOG_KEY));
  } catch {
    return null;
  }
};

// Ambil katalog dari backend. Hasil terakhir disimpan di sessionStorage supaya
// katalog tetap tampil saat backend mati atau token habis.
export async function loadCatalog() {
  try {
    const [products, categories] = await Promise.all([
      request("products"),
      request("categories"),
    ]);
    const catalog = { products: products.map(normalizeProduct), categories };
    sessionStorage.setItem(CATALOG_KEY, JSON.stringify(catalog));
    return { ...catalog, stale: false, error: null };
  } catch (error) {
    const cached = readCache();
    if (cached) return { ...cached, stale: true, error };
    throw error;
  }
}
