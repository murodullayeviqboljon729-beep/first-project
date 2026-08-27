import { Product, Review } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'Barcha toifalar', icon: 'LayoutGrid', count: 18 },
  { id: 'smartphones', name: 'Smartfonlar va Gadjetlar', icon: 'Smartphone', count: 4 },
  { id: 'laptops', name: 'Noutbuklar va Kompyuterlar', icon: 'Laptop', count: 3 },
  { id: 'audio', name: 'Audio va Quloqchinlar', icon: 'Headphones', count: 3 },
  { id: 'watches', name: 'Aqlli soatlar', icon: 'Watch', count: 2 },
  { id: 'clothing', name: 'Kiyim va Poyabzal', icon: 'Shirt', count: 3 },
  { id: 'home', name: 'Uy va Maishiy texnika', icon: 'Home', count: 2 },
  { id: 'sports', name: 'Sport va Sayohat', icon: 'Activity', count: 2 },
];

export const BRANDS = ['Apple', 'Samsung', 'Sony', 'Xiaomi', 'Nike', 'Dyson', 'Asus', 'Adidas'];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    category: 'smartphones',
    categoryName: 'Smartfonlar va Gadjetlar',
    brand: 'Apple',
    price: 16800000,
    originalPrice: 18500000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Yangi A18 Pro protsessorli iPhone 16 Pro Max, titan korpus, 48MP yangilangan kamera tizimi va Camera Control tugmasi bilan.',
    features: [
      'A18 Pro bionik chip - o\'ta yuqori unumdorlik',
      'Yangi 48MP Fusion kamera 5x optik zoom bilan',
      'O\'ta chidamli 5-darajali titan ramka',
      'Batareya quvvati 33 soatgacha video ko\'rish imkoniyati',
      'Yorqin 6.9 dyuymli Super Retina XDR ekran'
    ],
    specs: {
      'Ekran': '6.9" Super Retina XDR OLED, 120Hz ProMotion',
      'Protsessor': 'Apple A18 Pro (3 nm)',
      'Doimiy xotira': '256 GB',
      'Tezkor xotira': '8 GB RAM',
      'Asosiy kamera': '48 MP + 48 MP + 12 MP',
      'Old kamera': '12 MP TrueDepth',
      'Akkumulyator': '4685 mAh, Tezkor simsiz quvvatlash'
    },
    colors: [
      { name: 'Desert Titanium', hex: '#c5b49e' },
      { name: 'Natural Titanium', hex: '#9d9994' },
      { name: 'Black Titanium', hex: '#393836' }
    ],
    inStock: true,
    stockCount: 14,
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    tags: ['iphone', 'apple', 'smartfon', 'titan', 'yangi']
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray',
    category: 'smartphones',
    categoryName: 'Smartfonlar va Gadjetlar',
    brand: 'Samsung',
    price: 14900000,
    originalPrice: 16500000,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Galaxy AI sun\'iy intellekt xususiyatlari, o\'rnatilgan S-Pen va 200MP kameraga ega premium flagman.',
    features: [
      'Galaxy AI: Jonli tarjima va Circle to Search',
      '200 MP ultra tiniq kamera',
      'Snapdragon 8 Gen 3 for Galaxy protsessori',
      'Quyoshda ham yorqin ko\'rinuvchi 2600 nit ekran'
    ],
    specs: {
      'Ekran': '6.8" Dynamic AMOLED 2X, 120Hz',
      'Protsessor': 'Snapdragon 8 Gen 3 (4 nm)',
      'Xotira': '512 GB / 12 GB RAM',
      'Kamera': '200 MP + 50 MP + 12 MP + 10 MP',
      'Akkumulyator': '5000 mAh'
    },
    colors: [
      { name: 'Titanium Gray', hex: '#636466' },
      { name: 'Titanium Black', hex: '#222324' },
      { name: 'Titanium Yellow', hex: '#e6dfb8' }
    ],
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    tags: ['samsung', 'galaxy', 'ai', 'smartfon']
  },
  {
    id: 'prod-3',
    name: 'MacBook Pro 16" M3 Max 36GB / 1TB SSD Space Black',
    category: 'laptops',
    categoryName: 'Noutbuklar va Kompyuterlar',
    brand: 'Apple',
    price: 38500000,
    originalPrice: 42000000,
    discountPercent: 8,
    rating: 5.0,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Dasturchilar, 3D mutaxassislar va video montajchilar uchun eng kuchli professional noutbuk.',
    features: [
      'Apple M3 Max chip (14 yadroli CPU, 30 yadroli GPU)',
      'Liquid Retina XDR displey, 1600 nit eng yuqori yorqinlik',
      '22 soatgacha bir martalik quvvat bilan ishlash',
      '6 ta dinamikli fazoviy ovoz tizimi'
    ],
    specs: {
      'Ekran': '16.2" Liquid Retina XDR (3456x2234)',
      'Protsessor': 'Apple M3 Max',
      'Xotira': '36 GB birlashgan xotira',
      'Disk': '1 TB SSD',
      'Portlar': 'HDMI, SDXC, MagSafe 3, 3x Thunderbolt 4'
    },
    colors: [
      { name: 'Space Black', hex: '#2c2e33' },
      { name: 'Silver', hex: '#d9d9dc' }
    ],
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    tags: ['macbook', 'apple', 'laptop', 'noutbuk', 'm3']
  },
  {
    id: 'prod-4',
    name: 'Sony WH-1000XM5 Simsiz Shovqin So\'ndiruvchi Quloqchin',
    category: 'audio',
    categoryName: 'Audio va Quloqchinlar',
    brand: 'Sony',
    price: 4300000,
    originalPrice: 4900000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Bozordagi eng yaxshi sanoat darajasidagi shovqinni so\'ndirish tizimi (ANC) va premium ovoz sifati.',
    features: [
      'Ikkita protsessor va 8 ta mikrofonli ANC',
      '30 soatgacha uzluksiz musiqa tinglash',
      'Speak-to-Chat funksiyasi - gapirganda avtomatik pauza',
      'O\'ta qulay va yengil korpus dizayni'
    ],
    specs: {
      'Turi': 'To\'liq o\'lchamli (Over-ear)',
      'Ulanish': 'Bluetooth 5.2, LDAC, AAC, SBC, 3.5mm jack',
      'Batareya': '30 soat (ANC yoqiq holda)',
      'Quvvatlash': '3 daqiqada 3 soatlik zaryad'
    },
    colors: [
      { name: 'Silver', hex: '#d3cfc9' },
      { name: 'Black', hex: '#1c1c1c' },
      { name: 'Midnight Blue', hex: '#1a233a' }
    ],
    inStock: true,
    stockCount: 22,
    isFlashSale: true,
    isFeatured: true,
    tags: ['sony', 'quloqchin', 'audio', 'bluetooth', 'anc']
  },
  {
    id: 'prod-5',
    name: 'Apple Watch Ultra 2 49mm Titanium GPS + Cellular',
    category: 'watches',
    categoryName: 'Aqlli soatlar',
    brand: 'Apple',
    price: 10200000,
    originalPrice: 11500000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Ekstremal sportchilar va sayohatchilar uchun o\'ta chidamli titan korpusli aqlli soat.',
    features: [
      'Titanium korpus va safir shisha',
      '3000 nit eng yorqin ekran',
      '100 metrgacha suvga chidamli (sho\'ng\'ish sertifikati)',
      '72 soatgacha energiya tejash rejimida ishlash'
    ],
    specs: {
      'Korpus o\'lchami': '49 mm Titan',
      'Ekran': 'Always-On Retina OLED, 3000 nit',
      'Suvga chidamlilik': 'WR100, EN13319 standart',
      'Sensorlar': 'EKG, Qon kislorodi, Harorat, Chuqurlik o\'lchagich'
    },
    colors: [
      { name: 'Natural Titanium + Orange Loop', hex: '#ea580c' },
      { name: 'Titanium + Blue Trail', hex: '#2563eb' }
    ],
    inStock: true,
    stockCount: 10,
    isFeatured: true,
    tags: ['apple', 'watch', 'aqlli soat', 'sport', 'titan']
  },
  {
    id: 'prod-6',
    name: 'Dyson V15 Detect Extra Simsiz Changyutgich',
    category: 'home',
    categoryName: 'Uy va Maishiy texnika',
    brand: 'Dyson',
    price: 9400000,
    originalPrice: 10800000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Lazerli chang aniqlash texnologiyasi va 240 AW kuchli so\'rish quvvatiga ega premium tozalash uskunasi.',
    features: [
      'Lazer yoritgich ko\'rinmas chang zarrachalarini ko\'rsatadi',
      'Akustik piezo sensor chang miqdorini tahlil qiladi',
      '60 daqiqagacha kuchli quvvatda ishlash',
      '99.99% mikroskopik zarrachalarni tutib qoluvchi filtr'
    ],
    specs: {
      'So\'rish quvvati': '240 AW',
      'Idish hajmi': '0.77 litr',
      'Og\'irligi': '3.1 kg',
      'Akkumulyator': '60 daqiqa (Eco rejimda)'
    },
    inStock: true,
    stockCount: 7,
    tags: ['dyson', 'uy', 'texnika', 'changyutgich']
  },
  {
    id: 'prod-7',
    name: 'Nike Air Max 270 Black & White Erkaklar Krossovkasi',
    category: 'clothing',
    categoryName: 'Kiyim va Poyabzal',
    brand: 'Nike',
    price: 1650000,
    originalPrice: 1950000,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Nike eng katta tovon havo yostig\'iga ega, kundalik kiyish va yengil yugurish uchun qulay krossovka.',
    features: [
      'Max Air 270 bo\'limi mislsiz yumshoqlik beradi',
      'Nafas oluvchi to\'rsimon ustki qism',
      'Chidamli kauchuk taglik sirpanishdan himoyalaydi'
    ],
    specs: {
      'Material': 'To\'qimachilik, polimer, rezina',
      'Mavsum': 'Bahor / Yoz / Kuz',
      'Kelib chiqishi': 'Vetnam'
    },
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Red & Black', hex: '#dc2626' },
      { name: 'All Black', hex: '#111827' },
      { name: 'White & Blue', hex: '#3b82f6' }
    ],
    inStock: true,
    stockCount: 35,
    isFlashSale: true,
    tags: ['nike', 'krossovka', 'poyabzal', 'sport', 'kiyim']
  },
  {
    id: 'prod-8',
    name: 'Asus ROG Zephyrus G16 OLED Gaming Laptop',
    category: 'laptops',
    categoryName: 'Noutbuklar va Kompyuterlar',
    brand: 'Asus',
    price: 27900000,
    originalPrice: 31000000,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 41,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Intel Core Ultra 9 va NVIDIA RTX 4080 bilan jihozlangan 2.5K 240Hz OLED geyming noutbuk.',
    features: [
      'Intel Core Ultra 9 185H protsessor',
      'NVIDIA GeForce RTX 4080 12GB grafik karta',
      '16" 2.5K ROG Nebula OLED 240Hz ekran',
      'Alyuminiy yengil korpus (1.85 kg)'
    ],
    specs: {
      'Ekran': '16" 2.5K (2560x1600) OLED 240Hz 0.2ms',
      'Protsessor': 'Intel Core Ultra 9 185H',
      'Grafika': 'NVIDIA GeForce RTX 4080',
      'RAM': '32 GB LPDDR5X',
      'SSD': '1 TB PCIe 4.0 NVMe'
    },
    inStock: true,
    stockCount: 4,
    isNew: true,
    tags: ['asus', 'rog', 'noutbuk', 'gaming', 'geyming']
  },
  {
    id: 'prod-9',
    name: 'Xiaomi 14 Ultra 512GB Photography Kit Edition',
    category: 'smartphones',
    categoryName: 'Smartfonlar va Gadjetlar',
    brand: 'Xiaomi',
    price: 13200000,
    originalPrice: 14800000,
    discountPercent: 11,
    rating: 4.8,
    reviewsCount: 77,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Leica professional 1 dyuymli asosiy optika, 4 ta 50MP kameralar to\'plami va maxsus kamera tutqichi.',
    features: [
      'Leica Vario-Summilux linzalari',
      'Snapdragon 8 Gen 3 super protsessor',
      '90W simli va 80W simsiz quvvatlash',
      'IP68 suv va changdan himoyalangan'
    ],
    specs: {
      'Kamera': '50 MP Leica 1" sensor + 50 MP + 50 MP + 50 MP',
      'Ekran': '6.73" AMOLED LTPO 120Hz',
      'Xotira': '512 GB / 16 GB RAM',
      'Batareya': '5000 mAh'
    },
    colors: [
      { name: 'Black Leather', hex: '#1e1e1e' },
      { name: 'White', hex: '#f8f9fa' }
    ],
    inStock: true,
    stockCount: 11,
    tags: ['xiaomi', 'leica', 'kamera', 'smartfon']
  },
  {
    id: 'prod-10',
    name: 'Sony PlayStation 5 Slim 1TB + 2 ta DualSense Controller',
    category: 'audio',
    categoryName: 'Audio va Gadjetlar',
    brand: 'Sony',
    price: 6990000,
    originalPrice: 7800000,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 189,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Yangi ixcham PS5 Slim modeli, 1TB SSD xotira va 2 ta oq original DualSense pultlari bilan to\'liq komplekt.',
    features: [
      'Ultra tezkor 1TB SSD xotira',
      'Ray Tracing nurlanish texnologiyasi',
      '4K 120Hz o\'yinlar qo\'llab-quvvatlash',
      'Haptic feedback taktil tebranish hissi'
    ],
    specs: {
      'Protsessor': 'AMD Zen 2 8-core 3.5GHz',
      'Grafika': 'AMD RDNA 2 10.3 TFLOPS',
      'Xotira': '1 TB Custom SSD',
      'Komplekt': 'Konsol, 2 ta DualSense, HDMI kabel, taglik'
    },
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    tags: ['sony', 'ps5', 'playstation', 'o\'yin', 'konsol']
  },
  {
    id: 'prod-11',
    name: 'Adidas Originals Trefoil Premium Qalin Hoodie',
    category: 'clothing',
    categoryName: 'Kiyim va Poyabzal',
    brand: 'Adidas',
    price: 890000,
    originalPrice: 1100000,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 84,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    ],
    description: '100% paxta materialidan tayyorlangan zamonaviy oversize uslubdagi premium hoodie.',
    features: [
      '100% og\'ir zich paxta matosi',
      'Keng kanguru cho\'ntak va qulay kapyushon',
      'Old qismida kashta tikilgan Adidas logotipi'
    ],
    specs: {
      'Tarkibi': '100% Tabiiy paxta',
      'Fason': 'Relaxed Fit (Erkin)',
      'Rang': 'Qora / To\'q Kulrang'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Onyx Black', hex: '#171717' },
      { name: 'Heather Gray', hex: '#9ca3af' }
    ],
    inStock: true,
    stockCount: 40,
    tags: ['adidas', 'hoodie', 'kiyim', 'paxta']
  },
  {
    id: 'prod-12',
    name: 'Garmin Fenix 7X Pro Sapphire Solar Edition',
    category: 'sports',
    categoryName: 'Sport va Sayohat',
    brand: 'Sony',
    price: 11800000,
    originalPrice: 13200000,
    discountPercent: 11,
    rating: 5.0,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Quyosh batareyasidan quvvat oluvchi, o\'rnatilgan fonarchali professional multisport GPS soati.',
    features: [
      'Quyosh paneli orqali 37 kungacha batareya muddati',
      'O\'rnatilgan kuchli LED fonarchi',
      'TopoActive butun dunyo xaritalari',
      'Titan ramka va chidamli safir oyna'
    ],
    specs: {
      'Displey': '1.4" Quyosh nurlarida o\'qiluvchi MIP',
      'Korpus': '51 mm Titan va tolali polimer',
      'Suvga chidamlilik': '10 ATM (100 metr)',
      'GPS': 'Ko\'p diapazonli sun\'iy yo\'ldosh tizimi'
    },
    inStock: true,
    stockCount: 6,
    tags: ['garmin', 'sport', 'gps', 'soat', 'fitnes']
  }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Azizbek Rahimov',
    rating: 5,
    date: '15 Fevral, 2026',
    comment: 'Mahsulot kutilganidan ham a\'lo darajada yetib keldi! Toshkent bo\'yicha buyurtma bergan edim, 3 soatda kuryer yetkazib berdi. Qadoqlanishi va sifati a\'lo.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    userName: 'Dilnoza Karimova',
    rating: 5,
    date: '12 Fevral, 2026',
    comment: 'Juda yoqdi. Original mahsulot, kafolat taloni bilan birga berildi. Narxi boshqa do\'konlarga qaraganda arzonroq ekan.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'Shoxrux Mirzayev',
    rating: 4,
    date: '8 Fevral, 2026',
    comment: 'Sifati juda yaxshi. Faqat kuryer yetib kelishidan oldin 10 daqiqa oldinroq qo\'ng\'iroq qilsa yaxshi bo\'lardi. Mahsulotga esa 5 baho!',
    verifiedPurchase: true
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; desc: string }> = {
  'SALOM2026': { discountPercent: 10, desc: '10% Yangi mijoz uchun chegirma' },
  'SUPER20': { discountPercent: 20, desc: '20% Maxsus bayram chegirmasi' },
  'UZUM5': { discountPercent: 5, desc: '5% Qo\'shimcha promo chegirma' }
};

export const CITIES_LIST = [
  { name: 'Toshkent shahri', districts: ['Yunusobod', 'Chilonzor', 'Mirzo Ulug\'bek', 'Yakkasaroy', 'Mirobod', 'Shayxontohur', 'Uchtepa', 'Olmazor', 'Sergeli', 'Yangi Hayot'] },
  { name: 'Samarqand viloyati', districts: ['Samarqand sh.', 'Pastdarg\'om', 'Urgut', 'Toyloq', 'Bulung\'ur', 'Jomboy', 'Kattaqo\'rg\'on'] },
  { name: 'Buxoro viloyati', districts: ['Buxoro sh.', 'G\'ijduvon', 'Kogon', 'Vobkent', 'Jondor', 'Qorako\'l'] },
  { name: 'Farg\'ona viloyati', districts: ['Farg\'ona sh.', 'Marg\'ilon sh.', 'Qo\'qon sh.', 'Quva', 'Oltiariq', 'Rishton'] },
  { name: 'Andijon viloyati', districts: ['Andijon sh.', 'Asaka', 'Shahrixon', 'Xo\'jaobod', 'Baliqchi', 'Qo\'rg\'ontepa'] },
  { name: 'Namangan viloyati', districts: ['Namangan sh.', 'Chortoq', 'Kosonsoy', 'Pop', 'To\'raqo\'rg\'on', 'Uchqo\'rg\'on'] },
  { name: 'Xorazm viloyati', districts: ['Urganch sh.', 'Xiva sh.', 'Xonqa', 'Bog\'ot', 'Shovot', 'Gurlan'] },
  { name: 'Qashqadaryo viloyati', districts: ['Qarshi sh.', 'Shahrisabz sh.', 'Kitob', 'Koson', 'G\'uzor', 'Yakkabog\''] },
  { name: 'Surxondaryo viloyati', districts: ['Termiz sh.', 'Denov', 'Sherobod', 'Sho\'rchi', 'Boysun', 'Qumqo\'rg\'on'] },
  { name: 'Navoiy viloyati', districts: ['Navoiy sh.', 'Zarafshon sh.', 'Karmana', 'Qiziltepa', 'Xatirchi'] },
  { name: 'Jizzax viloyati', districts: ['Jizzax sh.', 'Zomin', 'G\'allaorol', 'Do\'stlik', 'Paxtakor'] },
  { name: 'Sirdaryo viloyati', districts: ['Guliston sh.', 'Yangiyer sh.', 'Shirin sh.', 'Boyovut', 'Sardoba'] },
  { name: 'Qoraqalpog\'iston Respublikasi', districts: ['Nukus sh.', 'Xo\'jayli', 'Qo\'ng\'irot', 'Beruniy', 'To\'rtko\'l', 'Chimboy'] },
];
