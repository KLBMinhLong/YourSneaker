import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { productsApi } from '../api/productsApi';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ui/ProductCard';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'newest';

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await productsApi.getCategories();
      if (res.success && res.data) setCategories(res.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const selectedCat = categories.find((c) => c.slug === categorySlug);
        const res = await productsApi.getProducts({
          search,
          categoryId: selectedCat?.id,
          sortBy,
          page: 1,
          pageSize: 20,
        });
        if (res.success && res.data) {
          setProducts(res.data.items);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, categorySlug, sortBy, categories]);

  const handleCategorySelect = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) {
      newParams.set('category', slug);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', e.target.value);
    setSearchParams(newParams);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header filter bar */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>TẤT CẢ SẢN PHẨM</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Hiển thị {products.length} mẫu sneaker cao cấp
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <SlidersHorizontal size={16} /> Sắp xếp:
          </div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="newest" style={{ background: '#12141D' }}>Mới nhất</option>
            <option value="price_asc" style={{ background: '#12141D' }}>Giá tăng dần</option>
            <option value="price_desc" style={{ background: '#12141D' }}>Giá giảm dần</option>
            <option value="popular" style={{ background: '#12141D' }}>Phổ biến nhất</option>
          </select>
        </div>
      </div>

      {/* Main layout with sidebar filters */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
        
        {/* Sidebar Filter */}
        <aside className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--accent-primary)" /> DANH MỤC
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => handleCategorySelect('')}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: !categorySlug ? 'rgba(255,46,99,0.15)' : 'transparent',
                color: !categorySlug ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: !categorySlug ? 700 : 500,
                border: 'none'
              }}
            >
              Tất cả thương hiệu
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: categorySlug === cat.slug ? 'rgba(255,46,99,0.15)' : 'transparent',
                  color: categorySlug === cat.slug ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: categorySlug === cat.slug ? 700 : 500,
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({cat.productCount})</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <main>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              Đang tải sản phẩm...
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Không tìm thấy sản phẩm phù hợp.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
