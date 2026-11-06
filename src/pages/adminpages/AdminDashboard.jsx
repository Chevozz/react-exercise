
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

// Nama komponen
export default function AdminDashboard() {
    // Mengambil data dan fungsi dari ProductContext
    const {
        products,
        isLoading,
        isError,
        deleteProduct
    } = useProducts();

    // Menampilkan loading
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Menampilkan error
    if (isError) {
        return <p>Error loading products.</p>;
    }

    // =====================================
    // DELETE PRODUCT
    // =====================================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Apakah kamu yakin ingin menghapus produk ini?"
        );

        if (!confirmDelete) return;

        try {
            await deleteProduct.mutateAsync(id);

            toast.success("Produk berhasil dihapus!");

        } catch (error) {
            console.error(
                "Gagal menghapus produk:",
                error
            );

            toast.error(
                "Terjadi kesalahan saat menghapus produk."
            );
        }
    };

    // =====================================
    // TAMPILAN DASHBOARD
    // =====================================

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

            <div className="rounded-2xl border border-sand bg-paper p-4">

                {/* Judul Halaman */}
                <h1 className="text-xl font-bold mb-4">
                    Manajemen Produk
                </h1>

                {/* Tombol Tambah Produk */}
                <div className="mb-4">
                    <Link
                        to="/admin/add-product"
                        className="text-blue-600 hover:underline"
                    >
                        Tambah Produk
                    </Link>
                </div>

                {/* Tabel Produk */}
                <div className="overflow-x-auto">

                    <table className="table-auto w-full border">

                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border">
                                    #
                                </th>

                                <th className="p-2 border">
                                    Image
                                </th>

                                <th className="p-2 border">
                                    Nama
                                </th>

                                <th className="p-2 border">
                                    Harga
                                </th>

                                <th className="p-2 border">
                                    Stok
                                </th>

                                <th className="p-2 border">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* Menampilkan data produk */}
                            {products?.map((p, index) => (

                                <tr key={p.id}>

                                    {/* Nomor */}
                                    <td className="p-2 border">
                                        {index + 1}
                                    </td>

                                    {/* Gambar */}
                                    <td className="p-2 border">
                                        <img
                                            src={
                                                p.img_url ||
                                                p.image_url ||
                                                p.image
                                            }
                                            alt={p.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>

                                    {/* Nama dan Kategori */}
                                    <td className="p-2 border">
                                        {p.name}

                                        <br />

                                        <small className="text-gray-500">
                                            #{p.category?.name || p.category?.category || p.category || "-"}
                                        </small>
                                    </td>

                                    {/* Harga */}
                                    <td className="p-2 border">
                                        Rp. {Number(p.price).toLocaleString("id-ID")}
                                    </td>

                                    {/* Stok */}
                                    <td className="p-2 border">
                                        {p.stock}
                                    </td>

                                    {/* Aksi */}
                                    <td className="p-2 border space-x-2">

                                        {/* Tombol Edit */}
                                        <Link
                                            to={`/admin/edit-product/${p.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        {/* Tombol Hapus */}
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            disabled={deleteProduct.isPending}
                                            className="cursor-pointer text-red-600 hover:underline disabled:opacity-50"
                                        >
                                            Hapus
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            {/* Jika produk kosong */}
                            {products?.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        Belum ada produk.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}
