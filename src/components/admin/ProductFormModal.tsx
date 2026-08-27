import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  Image as ImageIcon, 
  Tag, 
  DollarSign, 
  Layers, 
  Check, 
  HelpCircle,
  Upload
} from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const PRESET_IMAGES: Record<string, { label: string; url: string }[]> = {
  smartphones: [
    { label: 'iPhone Pro', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80' },
    { label: 'Samsung Galaxy Ultra', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
    { label: 'Xiaomi Flagship', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' },
    { label: 'Google Pixel', url: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80' }
  ],
  laptops: [
    { label: 'MacBook Pro', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
    { label: 'Gaming Laptop', url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80' },
    { label: 'Ultrabook', url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80' }
  ],
  audio: [
    { label: 'Headphones Pro', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
    { label: 'AirPods Max style', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' },
    { label: 'Portable Speaker', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80' }
  ],
  watches: [
    { label: 'Smart Watch Ultra', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
    { label: 'Classic Chronograph', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80' }
  ],
  clothing: [
    { label: 'Kiyim & Hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80' },
    { label: 'Krossovka', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80' }
  ],
  home: [
    { label: 'Robot Changyutgich', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80' },
    { label: 'Kofemashina', url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80' }
  ],
  beauty: [
    { label: 'Fen & Styler', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80' },
    { label: 'Parfyum', url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80' }
  ],
  sports: [
    { label: 'Elektr Samokat', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80' },
    { label: 'Fitnes uskunasi', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80' }
  ]
};

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { addProduct, updateProduct, formatPrice, showToast } = useShop();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Product['category']>('smartphones');
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stockCount, setStockCount] = useState<number>(10);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [features, setFeatures] = useState<string[]>(['']);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: 'Kafolat', value: '12 oy rasmiy' }
  ]);
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isNew, setIsNew] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);

  // New color temporary input
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');
  
  // New size temporary input
  const [newSize, setNewSize] = useState('');

  // Populate when editing
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setOriginalPrice(productToEdit.originalPrice);
      setStockCount(productToEdit.stockCount);
      setDescription(productToEdit.description);
      setImages(productToEdit.images.length > 0 ? productToEdit.images : ['']);
      setFeatures(productToEdit.features.length > 0 ? productToEdit.features : ['']);
      
      const specsArray = Object.entries(productToEdit.specs || {}).map(([key, value]) => ({ key, value }));
      setSpecs(specsArray.length > 0 ? specsArray : [{ key: 'Kafolat', value: '12 oy' }]);
      
      setColors(productToEdit.colors || []);
      setSizes(productToEdit.sizes || []);
      setIsNew(!!productToEdit.isNew);
      setIsFeatured(!!productToEdit.isFeatured);
      setIsFlashSale(!!productToEdit.isFlashSale);
    } else {
      // Reset form
      setName('');
      setBrand('');
      setCategory('smartphones');
      setPrice(1000000);
      setOriginalPrice(undefined);
      setStockCount(15);
      setDescription('');
      setImages(['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80']);
      setFeatures(['Yuqori sifatli material', 'Rasmiy 1 yil kafolat']);
      setSpecs([
        { key: 'Kafolat', value: '12 oy rasmiy' },
        { key: 'Ishlab chiqaruvchi', value: 'Xitoy / Vyetnam' }
      ]);
      setColors([{ name: 'Qora', hex: '#18181b' }, { name: 'Kumush', hex: '#e4e4e7' }]);
      setSizes([]);
      setIsNew(true);
      setIsFeatured(false);
      setIsFlashSale(false);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (index: number, val: string) => {
    const updated = [...images];
    updated[index] = val;
    setImages(updated);
  };

  const handleAddImageField = () => {
    setImages([...images, '']);
  };

  const handleRemoveImageField = (index: number) => {
    if (images.length === 1) return;
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    if (features.length === 1) return;
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    if (specs.length === 1) return;
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleAddSize = () => {
    if (!newSize.trim()) return;
    if (!sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
    }
    setNewSize('');
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes(sizes.filter(s => s !== sizeToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Xatolik', 'Iltimos, mahsulot nomini kiriting', 'error');
      return;
    }

    if (!brand.trim()) {
      showToast('Xatolik', 'Iltimos, brend nomini kiriting', 'error');
      return;
    }

    if (price <= 0) {
      showToast('Xatolik', 'Narx 0 dan katta bo\'lishi kerak', 'error');
      return;
    }

    const validImages = images.map(img => img.trim()).filter(Boolean);
    if (validImages.length === 0) {
      showToast('Xatolik', 'Kamida 1 ta rasm URL manzilini kiriting', 'error');
      return;
    }

    const categoryObj = CATEGORIES.find(c => c.id === category);
    const categoryName = categoryObj ? categoryObj.name : 'Elektronika';

    const validFeatures = features.map(f => f.trim()).filter(Boolean);
    
    const specsRecord: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key.trim() && s.value.trim()) {
        specsRecord[s.key.trim()] = s.value.trim();
      }
    });

    const calculatedDiscount = originalPrice && originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;

    if (productToEdit) {
      // Update existing
      updateProduct(productToEdit.id, {
        name: name.trim(),
        brand: brand.trim(),
        category,
        categoryName,
        price,
        originalPrice: originalPrice && originalPrice > price ? originalPrice : undefined,
        discountPercent: calculatedDiscount,
        stockCount,
        inStock: stockCount > 0,
        description: description.trim() || `${name} — yuqori sifatli va zamonaviy original mahsulot.`,
        images: validImages,
        features: validFeatures.length > 0 ? validFeatures : ['Sifat kafolati', 'Tez yetkazib berish'],
        specs: Object.keys(specsRecord).length > 0 ? specsRecord : { 'Kafolat': '12 oy' },
        colors: colors.length > 0 ? colors : undefined,
        sizes: sizes.length > 0 ? sizes : undefined,
        isNew,
        isFeatured,
        isFlashSale,
        tags: [category, brand.toLowerCase(), isNew ? 'yangi' : '', isFlashSale ? 'aksiya' : ''].filter(Boolean)
      });
    } else {
      // Add new
      addProduct({
        name: name.trim(),
        brand: brand.trim(),
        category,
        categoryName,
        price,
        originalPrice: originalPrice && originalPrice > price ? originalPrice : undefined,
        discountPercent: calculatedDiscount,
        stockCount,
        inStock: stockCount > 0,
        description: description.trim() || `${name} — yuqori sifatli va zamonaviy original mahsulot.`,
        images: validImages,
        features: validFeatures.length > 0 ? validFeatures : ['Sifat kafolati', 'Tez yetkazib berish'],
        specs: Object.keys(specsRecord).length > 0 ? specsRecord : { 'Kafolat': '12 oy' },
        colors: colors.length > 0 ? colors : undefined,
        sizes: sizes.length > 0 ? sizes : undefined,
        isNew,
        isFeatured,
        isFlashSale,
        tags: [category, brand.toLowerCase(), isNew ? 'yangi' : '', isFlashSale ? 'aksiya' : ''].filter(Boolean)
      });
    }

    onClose();
  };

  const discountPercentCalculated = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div 
      id="product-form-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-zinc-900">
                {productToEdit ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
              </h2>
              <p className="text-[11px] text-zinc-500">
                Katalog uchun tovar tafsilotlari, narxi va rasmlarini kiriting
              </p>
            </div>
          </div>

          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Section 1: Basic info */}
          <div className="space-y-4">
            <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2 border-b border-zinc-100 pb-2">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>1. Asosiy ma'lumotlar</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="sm:col-span-2">
                <label className="font-bold text-zinc-700 block mb-1.5">
                  Mahsulot to'liq nomi *
                </label>
                <input
                  id="admin-product-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: iPhone 16 Pro Max 256GB Desert Titanium"
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1.5">
                  Brend *
                </label>
                <input
                  id="admin-product-brand"
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Apple, Samsung, Sony, Nike..."
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1.5">
                  Kategoriya / Bo'lim *
                </label>
                <select
                  id="admin-product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product['category'])}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-bold cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Section 2: Pricing & Stock */}
          <div className="space-y-4">
            <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2 border-b border-zinc-100 pb-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>2. Narx va Ombor</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div>
                <label className="font-bold text-zinc-700 block mb-1.5">
                  Sotuv narxi (so'mda) *
                </label>
                <input
                  id="admin-product-price"
                  type="number"
                  required
                  min={1000}
                  step={5000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 font-bold outline-none"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block font-medium">
                  {formatPrice(price)}
                </span>
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1.5">
                  Eski narxi (chegirma bo'lsa)
                </label>
                <input
                  id="admin-product-original-price"
                  type="number"
                  min={0}
                  step={5000}
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ixtiyoriy (masalan 16 000 000)"
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none"
                />
                {discountPercentCalculated > 0 && (
                  <span className="text-[10px] text-rose-600 font-bold mt-1 block">
                    -{discountPercentCalculated}% chegirma hisoblandi
                  </span>
                )}
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1.5">
                  Ombordagi qoldiq soni *
                </label>
                <input
                  id="admin-product-stock"
                  type="number"
                  required
                  min={0}
                  value={stockCount}
                  onChange={(e) => setStockCount(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 font-bold outline-none"
                />
                <span className={`text-[10px] font-bold mt-1 block ${stockCount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {stockCount > 0 ? `${stockCount} dona mavjud` : 'Tugagan (Mavjud emas)'}
                </span>
              </div>

            </div>
          </div>

          {/* Section 3: Images & Presets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>3. Mahsulot rasmlari (URL)</span>
              </h3>
              <button
                type="button"
                id="add-image-field-btn"
                onClick={handleAddImageField}
                className="text-emerald-600 hover:text-emerald-700 font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Rasm qo'shish</span>
              </button>
            </div>

            {/* Presets picker */}
            {PRESET_IMAGES[category] && (
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 space-y-2">
                <span className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Tezkor tayyor rasm namunalari ({category}):</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES[category].map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleImageChange(0, preset.url)}
                      className="bg-white hover:bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-zinc-700 flex items-center gap-1.5 shadow-2xs"
                    >
                      <img src={preset.url} alt="" className="w-4 h-4 rounded object-cover" referrerPolicy="no-referrer" />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Images inputs */}
            <div className="space-y-2">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 text-center font-bold text-zinc-400 text-xs">#{idx + 1}</span>
                  <input
                    type="url"
                    required={idx === 0}
                    value={imgUrl}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none font-mono"
                  />
                  {imgUrl && (
                    <img 
                      src={imgUrl} 
                      alt="" 
                      className="w-8 h-8 rounded-lg object-cover border border-zinc-200 bg-zinc-100 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImageField(idx)}
                      className="p-2 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-zinc-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Description & Features */}
          <div className="space-y-4">
            <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2 border-b border-zinc-100 pb-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>4. Tavsif va Xususiyatlari</span>
            </h3>

            <div>
              <label className="font-bold text-zinc-700 block mb-1.5">
                Batafsil tavsif
              </label>
              <textarea
                id="admin-product-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mahsulot haqida to'liq va jozibador ma'lumot yozing..."
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl p-3.5 text-xs text-zinc-900 outline-none leading-relaxed"
              />
            </div>

            {/* Bullets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-700">Asosiy afzalliklari (punktlar)</label>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Punkt qo'shish</span>
                </button>
              </div>

              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder="Masalan: 48MP asosiy kamera yoki 5000mAh batareya"
                    className="flex-1 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-1.5 text-xs text-zinc-900 outline-none"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-1.5 text-zinc-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Specs key-value */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-zinc-700">Texnik parametrlar jadvali</label>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Parametr qo'shish</span>
                </button>
              </div>

              {specs.map((s, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={s.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Parametr (masalan Ekran)"
                    className="col-span-5 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-xl px-3 py-1.5 text-xs text-zinc-900 outline-none font-bold"
                  />
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Qiymati (masalan 6.7 OLED 120Hz)"
                    className="col-span-6 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-xl px-3 py-1.5 text-xs text-zinc-900 outline-none"
                  />
                  <div className="col-span-1 text-right">
                    {specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="p-1.5 text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Section 5: Variants (Colors, Sizes) & Badges */}
          <div className="space-y-4">
            <h3 className="font-black text-zinc-900 text-sm flex items-center gap-2 border-b border-zinc-100 pb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>5. Variantlar va Teglar</span>
            </h3>

            {/* Colors */}
            <div className="space-y-2">
              <label className="font-bold text-zinc-700 block">Mavjud ranglar</label>
              
              <div className="flex flex-wrap gap-2 items-center mb-2">
                {colors.map((c, idx) => (
                  <div key={idx} className="bg-zinc-100 border border-zinc-200 rounded-xl px-2.5 py-1 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-zinc-300" style={{ backgroundColor: c.hex }} />
                    <span className="font-semibold text-zinc-800 text-[11px]">{c.name}</span>
                    <button type="button" onClick={() => handleRemoveColor(idx)} className="text-zinc-400 hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 items-center max-w-sm">
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="Rang nomi (masalan Moviy)"
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs outline-none"
                />
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                >
                  Qo'shish
                </button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-zinc-700 block">Mavjud o'lchamlar / modifikatsiyalar</label>
              
              <div className="flex flex-wrap gap-2 items-center mb-2">
                {sizes.map((s, idx) => (
                  <div key={idx} className="bg-zinc-100 border border-zinc-200 rounded-xl px-2.5 py-1 flex items-center gap-1.5">
                    <span className="font-bold text-zinc-800 text-[11px]">{s}</span>
                    <button type="button" onClick={() => handleRemoveSize(s)} className="text-zinc-400 hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 items-center max-w-sm">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="O'lcham (masalan: 128GB, 256GB yoki M, L, XL)"
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                >
                  Qo'shish
                </button>
              </div>
            </div>

            {/* Flags */}
            <div className="pt-3 border-t border-zinc-100 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span className="font-bold text-zinc-800">"Yangi" belgisi (New)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
                <span className="font-bold text-zinc-800">Bosh sahifada tavsiya etilgan (Featured)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFlashSale}
                  onChange={(e) => setIsFlashSale(e.target.checked)}
                  className="w-4 h-4 accent-rose-600 rounded"
                />
                <span className="font-bold text-zinc-800">Kunning aksiyasi (Flash Sale)</span>
              </label>
            </div>

          </div>

        </form>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-zinc-200 flex items-center justify-between bg-zinc-50/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            Bekor qilish
          </button>

          <button
            type="button"
            id="save-product-submit-btn"
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-7 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{productToEdit ? 'O\'zgarishlarni saqlash' : 'Mahsulotni saqlash'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
