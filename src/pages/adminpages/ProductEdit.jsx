
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useProducts } from "../../utils/ProductContext";

export default function ProductEdit() {
    // Mengambil ID produk dari URL
    const { id } = useParams();

    // Mengambil fungsi dari ProductContext
    const {
        updateProduct,
        getProductById,
        getCategories
    } = useProducts();

    // Navigasi halaman
    const navigate = useNavigate();

    // State form produk
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        stock: "",
        category_id: "",
        description: "",
        image: null
    });

    // State gambar lama dan preview gambar baru
    const [currentImage, setCurrentImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // State validasi
    const [errors, setErrors] = useState({});

    // State loading produk
    const [loadingProduct, setLoadingProduct] = useState(true);

    // =====================================
    // 1. GET CATEGORIES
    // =====================================

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await getCategories();

            // Menyesuaikan bentuk response API
            if (Array.isArray(response)) {
                return response;
            }

            if (Array.isArray(response?.data)) {
                return response.data;
            }

            return response?.data?.data || [];
        }
    });

    // =====================================
    // 2. GET PRODUCT BY ID
    // =====================================

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);

                setFormData({
                    name: product.name || "",
                    slug: product.slug || "",
                    price: product.price || "",
                    stock: product.stock || "",
                    category_id:
                        product.category_id ||
                        product.category?.category_id ||
                        "",
                    description: product.description || "",
                    img: null
                });

                // Menampilkan gambar produk lama
                setCurrentImage(
                    product.img_url ||
                    product.image_url ||
                    ""
                );

            } catch (error) {
                console.error(error);
                toast.error("Gagal memuat data produk.");
            } finally {
                setLoadingProduct(false);
            }
        };

        fetchProduct();
    }, [id]);

    // =====================================
    // 3. HANDLE CHANGE
    // =====================================

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "img") {
            const file = files?.[0];

            setFormData((prev) => ({
                ...prev,
                img: file || null
            }));

            setPreviewImage(
                file ? URL.createObjectURL(file) : ""
            );
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // =====================================
    // 4. HANDLE SUBMIT / UPDATE PRODUCT
    // =====================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        const data = new FormData();

        data.append("name", formData.name);
        data.append("slug", formData.slug);
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append("category_id", formData.category_id);
        data.append("description", formData.description);

        // Gambar hanya dikirim jika memilih gambar baru
        if (formData.img) {
            data.append("img", formData.img);
        }

        try {
            await updateProduct(id, data);

            toast.success("Produk berhasil diperbarui!");

            navigate("/admin/dashboard");

        } catch (error) {
            console.error(error);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});

                toast.error(
                    "Periksa kembali data yang dimasukkan."
                );
            } else {
                toast.error("Gagal memperbarui produk.");
            }
        }
    };

    // =====================================
    // 5. LOADING
    // =====================================

    if (loadingProduct) {
        return <p>Memuat data produk...</p>;
    }

    // =====================================
    // 6. FORM EDIT PRODUCT
    // =====================================

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">
                Edit Produk
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Nama Produk */}
                <div>
                    <label className="block font-medium mb-1">
                        Nama Produk
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name[0]}
                        </p>
                    )}
                </div>

                {/* Slug */}
                <div>
                    <label className="block font-medium mb-1">
                        Slug Produk
                    </label>

                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.slug && (
                        <p className="text-red-500 text-sm">
                            {errors.slug[0]}
                        </p>
                    )}
                </div>

                {/* Kategori */}
                <div>
                    <label className="block font-medium mb-1">
                        Pilih Kategori
                    </label>

                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    >
                        <option value="">
                            -- Pilih Kategori --
                        </option>

                        {categories.map((cat) => (
                            <option
                                key={cat.category_id ?? cat.id}
                                value={cat.category_id ?? cat.id}
                            >
                                {cat.category ?? cat.name}
                            </option>
                        ))}
                    </select>

                    {errors.category_id && (
                        <p className="text-red-500 text-sm">
                            {errors.category_id[0]}
                        </p>
                    )}
                </div>

                {/* Harga */}
                <div>
                    <label className="block font-medium mb-1">
                        Harga
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.price && (
                        <p className="text-red-500 text-sm">
                            {errors.price[0]}
                        </p>
                    )}
                </div>

                {/* Stok */}
                <div>
                    <label className="block font-medium mb-1">
                        Stok
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.stock && (
                        <p className="text-red-500 text-sm">
                            {errors.stock[0]}
                        </p>
                    )}
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block font-medium mb-1">
                        Deskripsi
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description[0]}
                        </p>
                    )}
                </div>

                {/* Gambar Lama */}
                {currentImage && !previewImage && (
                    <div>
                        <label className="block font-medium mb-2">
                            Gambar Saat Ini
                        </label>

                        <img
                            src={currentImage}
                            alt="Gambar produk"
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* Preview Gambar Baru */}
                {previewImage && (
                    <div>
                        <label className="block font-medium mb-2">
                            Preview Gambar Baru
                        </label>

                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* Upload Gambar */}
                <div>
                    <label className="block font-medium mb-1">
                        Ganti Gambar Produk
                    </label>

                    <input
                        type="file"
                        name="img"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.img && (
                        <p className="text-red-500 text-sm">
                            {errors.img[0]}
                        </p>
                    )}
                </div>

                {/* Tombol */}
                <div className="flex gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/dashboard")}
                        className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                        Simpan Perubahan
                    </button>

                </div>

            </form>
        </div>
    );
}
