
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useProducts } from "../../utils/ProductContext";

export default function ProductForm() {
    // Mengambil fungsi dari ProductContext
    const { addProduct, getCategories } = useProducts();

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

    // State validasi
    const [errors, setErrors] = useState({});

    // State preview gambar
    const [previewImage, setPreviewImage] = useState("");

    // State tombol submit
    const [isSubmitting, setIsSubmitting] = useState(false);

    // =====================================
    // 1. GET CATEGORIES
    // =====================================

    const {
        data: categories = [],
        isLoading: loadingCategories
    } = useQuery({
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
    // 2. HANDLE CHANGE
    // =====================================

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files?.[0];

            setFormData((prev) => ({
                ...prev,
                image: file || null
            }));

            setPreviewImage(
                file ? URL.createObjectURL(file) : ""
            );

            setErrors((prev) => ({
                ...prev,
                image: undefined
            }));

        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));

            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    // =====================================
    // 3. HANDLE SUBMIT
    // =====================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        setIsSubmitting(true);

        // Membuat FormData untuk upload gambar
        const data = new FormData();

        data.append("name", formData.name);
        data.append("slug", formData.slug);
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append("category_id", formData.category_id);
        data.append("description", formData.description);

        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            // Mengirim data ke Laravel API
            await addProduct(data);

            toast.success("Produk berhasil ditambahkan!");

            // Kembali ke dashboard
            navigate("/admin/dashboard");

        } catch (error) {
            console.error(error);

            // Menangani validasi Laravel
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});

                toast.error(
                    "Periksa kembali data yang dimasukkan."
                );
            } else {
                toast.error("Gagal menambahkan produk.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // =====================================
    // 4. FORM TAMBAH PRODUK
    // =====================================

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6">

            <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">
                Tambah Produk
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
                        placeholder="Masukkan nama produk"
                        className="border rounded-md p-2 w-full"
                        required
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
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
                        placeholder="Contoh: sepatu-sport"
                        className="border rounded-md p-2 w-full"
                        required
                    />

                    {errors.slug && (
                        <p className="text-red-500 text-sm mt-1">
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
                        required
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

                    {loadingCategories && (
                        <p className="text-gray-500 text-sm mt-1">
                            Memuat kategori...
                        </p>
                    )}

                    {errors.category_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category_id[0]}
                        </p>
                    )}
                </div>

                {/* Harga */}
                <div>
                    <label className="block font-medium mb-1">
                        Harga Produk
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Masukkan harga"
                        min="0"
                        className="border rounded-md p-2 w-full"
                        required
                    />

                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.price[0]}
                        </p>
                    )}
                </div>

                {/* Stok */}
                <div>
                    <label className="block font-medium mb-1">
                        Stok Produk
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Masukkan jumlah stok"
                        min="0"
                        className="border rounded-md p-2 w-full"
                        required
                    />

                    {errors.stock && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.stock[0]}
                        </p>
                    )}
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block font-medium mb-1">
                        Deskripsi Produk
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tuliskan deskripsi produk"
                        rows="4"
                        className="border rounded-md p-2 w-full"
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description[0]}
                        </p>
                    )}
                </div>

                {/* Upload Gambar */}
                <div>
                    <label className="block font-medium mb-1">
                        Gambar Produk
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                        required
                    />

                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image[0]}
                        </p>
                    )}
                </div>

                {/* Preview Gambar */}
                {previewImage && (
                    <div>
                        <p className="font-medium mb-2">
                            Preview Gambar
                        </p>

                        <img
                            src={previewImage}
                            alt="Preview produk"
                            className="w-36 h-36 object-cover rounded-lg"
                        />
                    </div>
                )}

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
                        disabled={isSubmitting}
                        className="w-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 rounded-lg"
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                    </button>

                </div>

            </form>
        </div>
    );
}
