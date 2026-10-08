import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-paper shadow-card transition hover:-translate-y-0.5 hover:border-clay/40">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-sand/40"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium text-muted">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            ★ {product.rating.toFixed(1)} · terjual {product.sold}
          </span>
          <span>{product.stock} stok</span>
        </div>

        <h3 className="font-serif text-base font-semibold leading-snug text-ink">
          <Link to={`/product/${product.id}`} className="hover:text-claydark">
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="leading-none">
            <span className="block text-[11px] uppercase tracking-wide text-muted">
              Harga
            </span>
            <span className="font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="rounded-full bg-clay px-3.5 py-2 text-xs font-semibold text-paper transition hover:bg-claydark"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </article>
  );
}