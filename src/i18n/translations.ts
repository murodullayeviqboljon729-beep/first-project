import { Language } from '../types';

export interface TranslationDictionary {
  // Top utility bar
  topFreeShipping: string;
  topOriginalWarranty: string;
  topCurrency: string;
  topLanguage: string;
  topAdminPanel: string;
  topBackToShop: string;
  phoneContact: string;

  // Header & Navigation
  brandSubtitle: string;
  navCatalog: string;
  navAllCategories: string;
  navSearchPlaceholder: string;
  navSearchBtn: string;
  navSearchSuggestions: string;
  navOrders: string;
  navMyOrders: string;
  navWishlist: string;
  navWishlistTitle: string;
  navCart: string;
  navCartEmpty: string;
  navDiscountsBadge: string;
  navHome: string;
  navAllProducts: string;
  navAboutFaq: string;
  navAboutContact: string;
  navAdminPro: string;
  navSections: string;
  navMainPages: string;
  navCategories: string;

  // Categories
  catAll: string;
  catSmartphones: string;
  catLaptops: string;
  catAudio: string;
  catWatches: string;
  catClothing: string;
  catHome: string;
  catSports: string;

  // Product Card & Badges
  badgeNew: string;
  badgeDiscount: string;
  badgeTop: string;
  badgeFlashSale: string;
  installmentPrefix: string;
  perMonth: string;
  inStock: string;
  outOfStock: string;
  inStockCount: string;
  btnAddToCart: string;
  btnInCart: string;
  btnQuickView: string;
  btnAdded: string;
  reviewsCountSuffix: string;
  currencyUz: string;

  // Home Page
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroStartShopping: string;
  heroDailyDeals: string;
  heroProofWarranty: string;
  heroProofInstallment: string;
  heroTopFlagship: string;
  flashSaleTitle: string;
  flashSaleSubtitle: string;
  flashSaleHours: string;
  flashSaleMins: string;
  flashSaleSecs: string;
  flashSaleViewAll: string;
  popularCategoriesTitle: string;
  popularCategoriesSubtitle: string;
  featuredTitle: string;
  featuredSubtitle: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerPromoCode: string;
  partnerBrandsTitle: string;
  partnerBrandsSubtitle: string;

  // Catalog Page
  catalogTitle: string;
  catalogProductsFound: string;
  filterTitle: string;
  filterPriceRange: string;
  filterFrom: string;
  filterTo: string;
  filterBrands: string;
  filterOnlyInStock: string;
  filterOnlyDiscount: string;
  filterMinRating: string;
  filterRatingStars: string;
  filterReset: string;
  sortTitle: string;
  sortPopular: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortRating: string;
  sortNewest: string;
  noProductsFound: string;
  noProductsSubtext: string;
  clearFiltersBtn: string;

  // Product Detail Page
  detailBackCatalog: string;
  detailInstallment: string;
  detailSelectColor: string;
  detailSelectSize: string;
  detailQuantity: string;
  detailBuyNow: string;
  detailAddToCart: string;
  detailTabSpecs: string;
  detailTabReviews: string;
  detailTabDelivery: string;
  detailShare: string;
  detailShareCopied: string;
  detailDeliveryInfoTitle: string;
  detailDeliveryInfoText: string;
  detailWarrantyInfoTitle: string;
  detailWarrantyInfoText: string;
  detailReturnInfoTitle: string;
  detailReturnInfoText: string;
  detailWriteReview: string;
  detailReviewName: string;
  detailReviewComment: string;
  detailReviewRating: string;
  detailReviewSubmit: string;
  detailReviewSuccess: string;
  detailRelatedTitle: string;
  detailFeaturesTitle: string;

  // Quick View Modal
  quickViewTitle: string;
  quickViewFullDetails: string;
  quickViewColors: string;
  quickViewSizes: string;
  quickViewQty: string;

  // Cart Page
  cartTitle: string;
  cartEmptyTitle: string;
  cartEmptySubtext: string;
  cartGoCatalog: string;
  cartClear: string;
  cartItemCol: string;
  cartPriceCol: string;
  cartQtyCol: string;
  cartTotalCol: string;
  cartPromoTitle: string;
  cartPromoPlaceholder: string;
  cartPromoApply: string;
  cartPromoApplied: string;
  cartPromoRemove: string;
  cartSummaryTitle: string;
  cartSubtotal: string;
  cartPromoDiscount: string;
  cartDeliveryFee: string;
  cartDeliveryFree: string;
  cartFreeShippingCongrats: string;
  cartFreeShippingNeeded: string;
  cartTotalToPay: string;
  cartProceedCheckout: string;
  cartContinueShopping: string;

  // Checkout Page
  checkoutTitle: string;
  checkoutStepRecipient: string;
  checkoutFullName: string;
  checkoutFullNamePlaceholder: string;
  checkoutPhone: string;
  checkoutCity: string;
  checkoutDistrict: string;
  checkoutAddress: string;
  checkoutAddressPlaceholder: string;
  checkoutNote: string;
  checkoutNotePlaceholder: string;
  checkoutStepDelivery: string;
  checkoutDeliveryStandard: string;
  checkoutDeliveryStandardTime: string;
  checkoutDeliveryExpress: string;
  checkoutDeliveryExpressTime: string;
  checkoutStepPayment: string;
  checkoutPayClick: string;
  checkoutPayPayme: string;
  checkoutPayUzum: string;
  checkoutPayCash: string;
  checkoutPayCardDelivery: string;
  checkoutConfirmOrder: string;
  checkoutProcessing: string;
  checkoutSuccessTitle: string;
  checkoutSuccessSubtitle: string;
  checkoutOrderNumber: string;
  checkoutViewOrdersBtn: string;
  checkoutBackHomeBtn: string;

  // Orders Page
  ordersTitle: string;
  ordersSubtitle: string;
  ordersEmptyTitle: string;
  ordersEmptySubtext: string;
  ordersEmptyBtn: string;
  ordersStatusPending: string;
  ordersStatusPreparing: string;
  ordersStatusDelivering: string;
  ordersStatusDelivered: string;
  ordersStatusCancelled: string;
  ordersDateLabel: string;
  ordersItemsCount: string;
  ordersTotalAmount: string;
  ordersDeliveryAddress: string;
  ordersPaymentMethod: string;
  ordersReorderBtn: string;

  // Wishlist Page
  wishlistTitle: string;
  wishlistSubtitle: string;
  wishlistEmptyTitle: string;
  wishlistEmptySubtext: string;
  wishlistEmptyBtn: string;
  wishlistAddAllToCart: string;
  wishlistTotalSaved: string;

  // About & Contact Page
  aboutTitle: string;
  aboutBadge: string;
  aboutStoryTitle: string;
  aboutStoryText1: string;
  aboutStoryText2: string;
  aboutStatsYears: string;
  aboutStatsCustomers: string;
  aboutStatsProducts: string;
  aboutStatsCities: string;
  aboutFaqTitle: string;
  aboutContactTitle: string;
  aboutContactSubtitle: string;
  aboutFormName: string;
  aboutFormPhone: string;
  aboutFormMessage: string;
  aboutFormSend: string;
  aboutWorkingHoursTitle: string;
  aboutWorkingHours: string;
  aboutAddressTitle: string;
  aboutAddress: string;
  aboutEmailTitle: string;
  aboutPhoneTitle: string;

  // Admin Page
  adminTitle: string;
  adminSubtitle: string;
  adminTabOverview: string;
  adminTabProducts: string;
  adminTabOrders: string;
  adminTabPromos: string;
  adminBackToStore: string;
  adminTotalRevenue: string;
  adminTotalOrders: string;
  adminActiveOrders: string;
  adminTotalProducts: string;
  adminStockCount: string;
  adminAddProductBtn: string;
  adminEditProductBtn: string;
  adminDeleteProductBtn: string;
  adminResetProductsBtn: string;
  adminSalesChartTitle: string;
  adminCategoryDistribution: string;
  adminRecentOrders: string;
  adminSearchProducts: string;
  adminFilterCategory: string;
  adminTableImage: string;
  adminTableName: string;
  adminTableCategory: string;
  adminTablePrice: string;
  adminTableStock: string;
  adminTableActions: string;
  adminAddPromoBtn: string;
  adminPromoCodeLabel: string;
  adminPromoDiscountLabel: string;
  adminPromoUsageLabel: string;
  adminPromoStatusLabel: string;

  // Footer
  footerDeliveryPropTitle: string;
  footerDeliveryPropDesc: string;
  footerOriginalPropTitle: string;
  footerOriginalPropDesc: string;
  footerPaymentPropTitle: string;
  footerPaymentPropDesc: string;
  footerSupportPropTitle: string;
  footerSupportPropDesc: string;
  footerAboutDesc: string;
  footerNewsletterTitle: string;
  footerNewsletterPlaceholder: string;
  footerNewsletterBtn: string;
  footerSectionsTitle: string;
  footerCategoriesTitle: string;
  footerContactTitle: string;
  footerCopyright: string;

  // Auth & Profile
  authLoginTitle: string;
  authRegisterTitle: string;
  authEmailOrPhone: string;
  authEmail: string;
  authPassword: string;
  authConfirmPassword: string;
  authFullName: string;
  authPhone: string;
  authForgotPassword: string;
  authRememberMe: string;
  authLoginBtn: string;
  authRegisterBtn: string;
  authHaveAccount: string;
  authNoAccount: string;
  authSwitchToLogin: string;
  authSwitchToRegister: string;
  authWelcomeBonus: string;
  authDemoUserBtn: string;
  authDemoAdminBtn: string;
  authLogout: string;
  navLogin: string;
  navRegister: string;
  navProfile: string;
  navAccount: string;

  // Profile Dashboard
  profileTitle: string;
  profileSubtitle: string;
  profileTabInfo: string;
  profileTabOrders: string;
  profileTabAddresses: string;
  profileTabBonuses: string;
  profilePersonalDetails: string;
  profileSaveChanges: string;
  profileAddAddress: string;
  profileNoAddresses: string;
  profileBonusBalance: string;
  profileBonusHistory: string;
  profileBonusRule1: string;
  profileBonusRule2: string;
  profileRoleCustomer: string;
  profileRoleAdmin: string;
  profileMemberSince: string;

  // Toast Notifications
  toastLangChanged: string;
  toastAddedToCart: string;
  toastRemovedFromCart: string;
  toastSavedWishlist: string;
  toastRemovedWishlist: string;
  toastPromoApplied: string;
  toastPromoInvalid: string;
  toastOrderCreated: string;
  toastMessageSent: string;
  toastLoginSuccess: string;
  toastRegisterSuccess: string;
  toastLogoutSuccess: string;
  toastProfileUpdated: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  uz: {
    // Top utility bar
    topFreeShipping: "O'zbekiston bo'ylab 1 kunda bepul yetkazib berish",
    topOriginalWarranty: "100% Kafolatlangan original mahsulotlar",
    topCurrency: "Valyuta:",
    topLanguage: "Til:",
    topAdminPanel: "Admin Panel",
    topBackToShop: "Do'konga qaytish",
    phoneContact: "+998 (71) 200-00-00",

    // Header & Navigation
    brandSubtitle: "Onlayn Gipermarket",
    navCatalog: "Katalog",
    navAllCategories: "Barcha toifalar",
    navSearchPlaceholder: "Mahsulotlar, brendlar yoki toifalarni qidiring...",
    navSearchBtn: "Topish",
    navSearchSuggestions: "Tavsiya etilgan qidiruv natijalari",
    navOrders: "Buyurtmalar",
    navMyOrders: "Mening buyurtmalarim",
    navWishlist: "Sevimlilar",
    navWishlistTitle: "Sevimlilar ro'yxati",
    navCart: "Savatcha",
    navCartEmpty: "Savatcha bo'sh",
    navDiscountsBadge: "Chegirmalar 20% gacha",
    navHome: "Bosh sahifa",
    navAllProducts: "Barcha mahsulotlar",
    navAboutFaq: "Biz haqimizda & FAQ",
    navAboutContact: "Biz haqimizda & Aloqa",
    navAdminPro: "Admin Panel (Boshqaruv)",
    navSections: "Bo'limlar",
    navMainPages: "Asosiy sahifalar",
    navCategories: "Kategoriyalar",

    // Categories
    catAll: "Barcha toifalar",
    catSmartphones: "Smartfonlar va Gadjetlar",
    catLaptops: "Noutbuklar va Kompyuterlar",
    catAudio: "Audio va Quloqchinlar",
    catWatches: "Aqlli soatlar",
    catClothing: "Kiyim va Poyabzal",
    catHome: "Uy va Maishiy texnika",
    catSports: "Sport va Sayohat",

    // Product Card & Badges
    badgeNew: "Yangi",
    badgeDiscount: "Chegirma",
    badgeTop: "Top Mahsulot",
    badgeFlashSale: "Aksiya",
    installmentPrefix: "Muddatli to'lov:",
    perMonth: "/oy",
    inStock: "Omborda mavjud",
    outOfStock: "Mavjud emas",
    inStockCount: "Omborda bor",
    btnAddToCart: "Savatchaga",
    btnInCart: "Savatchada",
    btnQuickView: "Tezkor ko'rish",
    btnAdded: "Qo'shildi",
    reviewsCountSuffix: "ta sharh",
    currencyUz: "so'm",

    // Home Page
    heroBadge: "Yangi Mavsum Takliflari 2026",
    heroTitle: "Eng sara texnika va gadjetlar",
    heroHighlight: "xush kelibsiz!",
    heroSubtitle: "iPhone 16 Pro Max, M3 Max MacBook Pro, Sony ANC quloqchinlari va boshqa original brend mahsulotlarini rasmiy kafolat bilan xarid qiling.",
    heroStartShopping: "Xaridni boshlash",
    heroDailyDeals: "Kunning aksiyalari",
    heroProofWarranty: "1 yillik rasmiy kafolat",
    heroProofInstallment: "0% Muddatli to'lov",
    heroTopFlagship: "Top Flagman",
    flashSaleTitle: "Kunning Super Aksiyalari",
    flashSaleSubtitle: "Cheklangan vaqt va maxsus chegirma narxlarida xarid qilishga shoshiling!",
    flashSaleHours: "soat",
    flashSaleMins: "daq",
    flashSaleSecs: "son",
    flashSaleViewAll: "Barchasini ko'rish",
    popularCategoriesTitle: "Ommabop Kategoriyalar",
    popularCategoriesSubtitle: "Eng ko'p talab qilinadigan bo'limlar bo'yicha saralang",
    featuredTitle: "Tavsiya Etilgan Mahsulotlar",
    featuredSubtitle: "Mijozlarimiz tomonidan eng yuqori baholangan tovarlar",
    bannerTitle: "Apple Ekotizimi bilan Yangi Pog'onaga",
    bannerSubtitle: "MacBook Pro M3, iPad Pro va iPhone 16 Pro uchun maxsus -15% gacha promokodlar",
    bannerPromoCode: "Promokod: SUPER20",
    partnerBrandsTitle: "Rasmiy Hamkor Brendlarimiz",
    partnerBrandsSubtitle: "Faqat 100% original va kafolatlangan mahsulotlar",

    // Catalog Page
    catalogTitle: "Mahsulotlar Katalogi",
    catalogProductsFound: "ta mahsulot topildi",
    filterTitle: "Filtrlar",
    filterPriceRange: "Narx oralig'i",
    filterFrom: "Dan",
    filterTo: "Gacha",
    filterBrands: "Brendlar",
    filterOnlyInStock: "Faqat omborda borlar",
    filterOnlyDiscount: "Faqat chegirmadagilar",
    filterMinRating: "Minimal reyting",
    filterRatingStars: "yulduz va undan yuqori",
    filterReset: "Filtrlarni tozalash",
    sortTitle: "Saralash:",
    sortPopular: "Ommabopligi bo'yicha",
    sortPriceAsc: "Narx: Arzondan qimmatga",
    sortPriceDesc: "Narx: Qimmatdan arzonga",
    sortRating: "Yuqori reytingli",
    sortNewest: "Eng yangilar",
    noProductsFound: "Mahsulot topilmadi",
    noProductsSubtext: "Qidiruv so'zini yoki tanlangan filtrlarni o'zgartirib ko'ring.",
    clearFiltersBtn: "Filtrlarni bekor qilish",

    // Product Detail Page
    detailBackCatalog: "Katalogga qaytish",
    detailInstallment: "Muddatli to'lovga xarid qilish",
    detailSelectColor: "Rangni tanlang:",
    detailSelectSize: "O'lchamni tanlang:",
    detailQuantity: "Miqdor:",
    detailBuyNow: "Hoziroq sotib olish",
    detailAddToCart: "Savatchaga qo'shish",
    detailTabSpecs: "Xususiyatlari",
    detailTabReviews: "Sharhlar",
    detailTabDelivery: "Yetkazib berish va Kafolat",
    detailShare: "Ulashish",
    detailShareCopied: "Havola nusxalandi!",
    detailDeliveryInfoTitle: "Tezkor va xavfsiz yetkazib berish",
    detailDeliveryInfoText: "Toshkent shahri bo'yicha 24 soat ichida, O'zbekiston viloyatlariga 48 soat ichida eshikkacha yetkazib beriladi.",
    detailWarrantyInfoTitle: "Rasmiy 12 oylik kafolat",
    detailWarrantyInfoText: "Ishlab chiqaruvchi tomonidan taqdim etiladigan rasmiy kafolat va xizmat ko'rsatish markazi xizmatlari.",
    detailReturnInfoTitle: "14 kunlik qaytarish imkoniyati",
    detailReturnInfoText: "Agar tovar sizga mos kelmasa, 14 kun ichida qadog'i buzilmagan holda almashtirib olishingiz mumkin.",
    detailWriteReview: "Sharh qoldirish",
    detailReviewName: "Ismingiz",
    detailReviewComment: "Fikringiz va taassurotlaringiz",
    detailReviewRating: "Bahoingiz:",
    detailReviewSubmit: "Sharhni yuborish",
    detailReviewSuccess: "Sharhingiz uchun rahmat!",
    detailRelatedTitle: "O'xshash Mahsulotlar",
    detailFeaturesTitle: "Asosiy afzalliklari:",

    // Quick View Modal
    quickViewTitle: "Tezkor ko'rish",
    quickViewFullDetails: "Batafsil sahifaga o'tish",
    quickViewColors: "Mavjud ranglar:",
    quickViewSizes: "O'lchamlar:",
    quickViewQty: "Soni:",

    // Cart Page
    cartTitle: "Xarid Savatchasi",
    cartEmptyTitle: "Savatchangiz bo'sh",
    cartEmptySubtext: "Hozircha hech qanday mahsulot qo'shmadingiz. Katalogimizdan o'zingizga yoqqan tovarlarni tanlang!",
    cartGoCatalog: "Katalogga o'tish",
    cartClear: "Savatchani tozalash",
    cartItemCol: "Mahsulot",
    cartPriceCol: "Narxi",
    cartQtyCol: "Soni",
    cartTotalCol: "Jami",
    cartPromoTitle: "Promokod mavjudmi?",
    cartPromoPlaceholder: "Masalan: SALOM2026",
    cartPromoApply: "Qo'llash",
    cartPromoApplied: "Promokod qo'llandi",
    cartPromoRemove: "O'chirish",
    cartSummaryTitle: "Buyurtma hisob-kitobi",
    cartSubtotal: "Tovarlar summasi",
    cartPromoDiscount: "Promokod chegirmasi",
    cartDeliveryFee: "Yetkazib berish",
    cartDeliveryFree: "Bepul",
    cartFreeShippingCongrats: "Tabriklaymiz! Sizga yetkazib berish bepul taqdim etiladi.",
    cartFreeShippingNeeded: "Bepul yetkazib berish uchun yana qo'shing:",
    cartTotalToPay: "Jami to'lov miqdori",
    cartProceedCheckout: "Rasmiylashtirishga o'tish",
    cartContinueShopping: "Xaridni davom ettirish",

    // Checkout Page
    checkoutTitle: "Buyurtmani Rasmiylashtirish",
    checkoutStepRecipient: "1. Qabul qiluvchi ma'lumotlari",
    checkoutFullName: "F.I.SH (To'liq ism familiya)*",
    checkoutFullNamePlaceholder: "Masalan: Jasur Rahimov",
    checkoutPhone: "Telefon raqam*",
    checkoutCity: "Shahar / Viloyat*",
    checkoutDistrict: "Tuman / Hudud*",
    checkoutAddress: "Aniq yetkazish manzili (ko'cha, uy, xonadon)*",
    checkoutAddressPlaceholder: "Amir Temur ko'chasi 45-uy, 12-xonadon",
    checkoutNote: "Kuryer uchun qo'shimcha izoh (ixtiyoriy)",
    checkoutNotePlaceholder: "Domofon kodi, mo'ljal va h.k.",
    checkoutStepDelivery: "2. Yetkazib berish turi",
    checkoutDeliveryStandard: "Standart yetkazib berish (1-2 kun)",
    checkoutDeliveryStandardTime: "Eshikkacha xavfsiz yetkazib berish",
    checkoutDeliveryExpress: "Tezkor Express yetkazib berish (3 soat ichida)",
    checkoutDeliveryExpressTime: "Toshkent shahri bo'ylab eng tezkor xizmat",
    checkoutStepPayment: "3. To'lov usulini tanlang",
    checkoutPayClick: "Click Online to'lov",
    checkoutPayPayme: "Payme Online to'lov",
    checkoutPayUzum: "Uzum Pay orqali to'lov",
    checkoutPayCash: "Yetkazilganda naqd to'lov",
    checkoutPayCardDelivery: "Yetkazilganda terminal (Uzcard/Humo)",
    checkoutConfirmOrder: "Buyurtmani tasdiqlash",
    checkoutProcessing: "Rasmiylashtirilmoqda...",
    checkoutSuccessTitle: "Buyurtmangiz muvaffaqiyatli qabul qilindi!",
    checkoutSuccessSubtitle: "Buyurtma tafsilotlari va yetkazib berish holatini 'Mening buyurtmalarim' bo'limida kuzatishingiz mumkin.",
    checkoutOrderNumber: "Buyurtma raqami:",
    checkoutViewOrdersBtn: "Buyurtmalarimni ko'rish",
    checkoutBackHomeBtn: "Bosh sahifaga qaytish",

    // Orders Page
    ordersTitle: "Mening Buyurtmalarim",
    ordersSubtitle: "Barcha faol va yakunlangan buyurtmalar holati",
    ordersEmptyTitle: "Buyurtmalar tarixi bo'sh",
    ordersEmptySubtext: "Siz hali biron marta buyurtma bermadingiz. Onlayn do'konimizdan kerakli mahsulotlarni tanlang!",
    ordersEmptyBtn: "Xaridni boshlash",
    ordersStatusPending: "Qabul qilindi",
    ordersStatusPreparing: "Tayyorlanmoqda",
    ordersStatusDelivering: "Kuryer yo'lda",
    ordersStatusDelivered: "Yetkazildi",
    ordersStatusCancelled: "Bekor qilindi",
    ordersDateLabel: "Buyurtma sanasi:",
    ordersItemsCount: "ta tovar",
    ordersTotalAmount: "Umumiy summa:",
    ordersDeliveryAddress: "Yetkazish manzili:",
    ordersPaymentMethod: "To'lov turi:",
    ordersReorderBtn: "Qayta buyurtma berish",

    // Wishlist Page
    wishlistTitle: "Sevimli Mahsulotlar",
    wishlistSubtitle: "Siz saqlab qo'ygan tovarlar ro'yxati",
    wishlistEmptyTitle: "Sevimlilar ro'yxati bo'sh",
    wishlistEmptySubtext: "O'zingizga yoqqan tovarlarni yurakcha belgisini bosish orqali shu yerda saqlab qo'yishingiz mumkin.",
    wishlistEmptyBtn: "Mahsulotlarni ko'rish",
    wishlistAddAllToCart: "Barchasini savatchaga qo'shish",
    wishlistTotalSaved: "ta saqlangan tovar",

    // About & Contact Page
    aboutTitle: "BOZOR PRO — Zamonaviy Onlayn Gipermarket",
    aboutBadge: "Biz haqimizda",
    aboutStoryTitle: "Bizning maqsadimiz va qadriyatlarimiz",
    aboutStoryText1: "BOZOR PRO — O'zbekiston bo'ylab eng yangi gadjetlar, noutbuklar, aqlli soatlar, maishiy texnika va zamonaviy kiyimlarni qulay narxlarda taqdim etuvchi yetakchi onlayn platformadir.",
    aboutStoryText2: "Biz har bir mijozimizga faqat rasmiy kafolatlangan original mahsulotlarni, tezkor 1 kunlik bepul yetkazib berishni hamda yuqori sifatli 24/7 mijozlarga xizmat ko'rsatishni kafolatlaymiz.",
    aboutStatsYears: "Yillik tajriba",
    aboutStatsCustomers: "Mamnun mijozlar",
    aboutStatsProducts: "Katalogdagi tovarlar",
    aboutStatsCities: "Viloyatlar bo'ylab yetkazish",
    aboutFaqTitle: "Ko'p Beriladigan Savollar (FAQ)",
    aboutContactTitle: "Biz bilan bog'laning",
    aboutContactSubtitle: "Savollaringiz yoki takliflaringiz bo'lsa, quyidagi forma orqali yozing.",
    aboutFormName: "Ismingiz",
    aboutFormPhone: "Telefon raqamingiz",
    aboutFormMessage: "Xabaringiz",
    aboutFormSend: "Xabarni yuborish",
    aboutWorkingHoursTitle: "Ish vaqti:",
    aboutWorkingHours: "Har kuni: 09:00 dan 22:00 gacha dam olish kunlarisiz",
    aboutAddressTitle: "Bosh ofis manzili:",
    aboutAddress: "Toshkent shahri, Yunusobod tumani, Amir Temur shoh ko'chasi 108",
    aboutEmailTitle: "Elektron pochta:",
    aboutPhoneTitle: "Yagona aloqa markazi:",

    // Admin Page
    adminTitle: "Admin Boshqaruv Markazi",
    adminSubtitle: "Do'kon tovarlari, buyurtmalar, promokodlar va savdo statistikasini boshqarish",
    adminTabOverview: "Umumiy ko'rinish",
    adminTabProducts: "Mahsulotlar",
    adminTabOrders: "Buyurtmalar",
    adminTabPromos: "Promokodlar",
    adminBackToStore: "Do'konga qaytish",
    adminTotalRevenue: "Umumiy Tushum",
    adminTotalOrders: "Jami Buyurtmalar",
    adminActiveOrders: "Faol Buyurtmalar",
    adminTotalProducts: "Katalogdagi Tovarlar",
    adminStockCount: "Ombordagi jami qoldiq",
    adminAddProductBtn: "Yangi Tovar Qo'shish",
    adminEditProductBtn: "Tahrirlash",
    adminDeleteProductBtn: "O'chirish",
    adminResetProductsBtn: "Boshlang'ich holatga qaytarish",
    adminSalesChartTitle: "Haftalik Savdolar Dinamikasi",
    adminCategoryDistribution: "Toifalar bo'yicha tovarlar soni",
    adminRecentOrders: "So'nggi Buyurtmalar",
    adminSearchProducts: "Nom yoki brend bo'yicha qidirish...",
    adminFilterCategory: "Barcha toifalar",
    adminTableImage: "Rasm",
    adminTableName: "Tovar nomi",
    adminTableCategory: "Toifasi",
    adminTablePrice: "Narxi",
    adminTableStock: "Omborda",
    adminTableActions: "Amallar",
    adminAddPromoBtn: "Promokod Qo'shish",
    adminPromoCodeLabel: "Kodi",
    adminPromoDiscountLabel: "Chegirma",
    adminPromoUsageLabel: "Qo'llanilishi",
    adminPromoStatusLabel: "Holati",

    // Footer
    footerDeliveryPropTitle: "Tezkor yetkazib berish",
    footerDeliveryPropDesc: "O'zbekistonning barcha viloyatlariga 1 kunda yetkazamiz.",
    footerOriginalPropTitle: "100% Original kafolati",
    footerOriginalPropDesc: "Faqat rasmiy distribyutorlardan sertifikatlangan tovarlar.",
    footerPaymentPropTitle: "Qulay to'lov tizimlari",
    footerPaymentPropDesc: "Click, Payme, Uzum Pay va qabul qilganda naqd to'lov.",
    footerSupportPropTitle: "24/7 Qo'llab-quvvatlash",
    footerSupportPropDesc: "Har qanday savolingizga operatorlarimiz yordam beradi.",
    footerAboutDesc: "Eng so'nggi zamonaviy elektronika, gadjetlar, noutbuklar, sport va kiyim-kechaklar eng hamyonbop narxlarda O'zbekiston bo'ylab.",
    footerNewsletterTitle: "Aksiyalardan xabardor bo'ling:",
    footerNewsletterPlaceholder: "Email manzilingiz...",
    footerNewsletterBtn: "Obuna",
    footerSectionsTitle: "Bo'limlar",
    footerCategoriesTitle: "Kategoriyalar",
    footerContactTitle: "Aloqa markazi",
    footerCopyright: "© 2026 BOZOR PRO Online Do'koni. Barcha huquqlar himoyalangan.",

    // Auth & Profile
    authLoginTitle: "Tizimga kirish",
    authRegisterTitle: "Ro'yxatdan o'tish",
    authEmailOrPhone: "Email yoki telefon raqami",
    authEmail: "Elektron pochta",
    authPassword: "Maxfiy parol",
    authConfirmPassword: "Parolni tasdiqlang",
    authFullName: "To'liq ism va familiyangiz",
    authPhone: "Telefon raqami (+998)",
    authForgotPassword: "Parolni unutdingizmi?",
    authRememberMe: "Meni eslab qol",
    authLoginBtn: "Kirish",
    authRegisterBtn: "Hisob yaratish",
    authHaveAccount: "Profilingiz bormi?",
    authNoAccount: "Hali hisobingiz yo'qmi?",
    authSwitchToLogin: "Kirish",
    authSwitchToRegister: "Ro'yxatdan o'tish",
    authWelcomeBonus: "Yangi foydalanuvchilarga 50 000 so'm xush kelibsiz bonusi!",
    authDemoUserBtn: "Mijoz profili (Tezkor test)",
    authDemoAdminBtn: "Admin profili (Tezkor test)",
    authLogout: "Tizimdan chiqish",
    navLogin: "Kirish",
    navRegister: "Ro'yxatdan o'tish",
    navProfile: "Mening profilim",
    navAccount: "Kabinet",

    // Profile Dashboard
    profileTitle: "Shaxsiy Kabinet",
    profileSubtitle: "Shaxsiy ma'lumotlar, buyurtmalar tarixi, manzillar va bonuslar",
    profileTabInfo: "Ma'lumotlarim",
    profileTabOrders: "Buyurtmalarim",
    profileTabAddresses: "Yetkazish manzillari",
    profileTabBonuses: "Bonuslar & Hamyon",
    profilePersonalDetails: "Shaxsiy ma'lumotlar",
    profileSaveChanges: "O'zgarishlarni saqlash",
    profileAddAddress: "Yangi manzil qo'shish",
    profileNoAddresses: "Hali yetkazib berish manzillari kiritilmagan",
    profileBonusBalance: "Bonus hisobingiz",
    profileBonusHistory: "Bonuslar qoidalari va sarflash",
    profileBonusRule1: "Har bir xariddan 3% keshbek bonus hisobingizga tushadi.",
    profileBonusRule2: "To'plangan bonuslarni keyingi buyurtmalar to'lovida 100% gacha ishlatishingiz mumkin (1 bonus = 1 so'm).",
    profileRoleCustomer: "Doimiy Xaridor",
    profileRoleAdmin: "Tizim Administratori",
    profileMemberSince: "Ro'yxatdan o'tgan:",

    // Toast Notifications
    toastLangChanged: "Til o'zgartirildi: O'zbekcha",
    toastAddedToCart: "Savatchaga qo'shildi!",
    toastRemovedFromCart: "Savatchadan olib tashlandi",
    toastSavedWishlist: "Sevimlilarga saqlandi ❤️",
    toastRemovedWishlist: "Sevimlilardan o'chirildi",
    toastPromoApplied: "Promo-kod faollashtirildi!",
    toastPromoInvalid: "Noto'g'ri yoki eskirgan promokod",
    toastOrderCreated: "Buyurtmangiz muvaffaqiyatli qabul qilindi!",
    toastMessageSent: "Xabaringiz muvaffaqiyatli yuborildi!",
    toastLoginSuccess: "Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz",
    toastRegisterSuccess: "Tabriklaymiz! Hisobingiz yaratildi va 50 000 bonus berildi 🎉",
    toastLogoutSuccess: "Tizimdan chiqildi",
    toastProfileUpdated: "Profil ma'lumotlari muvaffaqiyatli yangilandi!"
  },

  ru: {
    // Top utility bar
    topFreeShipping: "Бесплатная доставка по всему Узбекистану за 1 день",
    topOriginalWarranty: "100% Гарантия оригинальной продукции",
    topCurrency: "Валюта:",
    topLanguage: "Язык:",
    topAdminPanel: "Админ-панель",
    topBackToShop: "Вернуться в магазин",
    phoneContact: "+998 (71) 200-00-00",

    // Header & Navigation
    brandSubtitle: "Онлайн Гипермаркет",
    navCatalog: "Каталог",
    navAllCategories: "Все категории",
    navSearchPlaceholder: "Поиск товаров, брендов или категорий...",
    navSearchBtn: "Найти",
    navSearchSuggestions: "Рекомендуемые результаты поиска",
    navOrders: "Заказы",
    navMyOrders: "Мои заказы",
    navWishlist: "Избранное",
    navWishlistTitle: "Список избранного",
    navCart: "Корзина",
    navCartEmpty: "Корзина пуста",
    navDiscountsBadge: "Скидки до 20%",
    navHome: "Главная",
    navAllProducts: "Все товары",
    navAboutFaq: "О нас и FAQ",
    navAboutContact: "О нас и Контакты",
    navAdminPro: "Админ-панель (Управление)",
    navSections: "Разделы",
    navMainPages: "Главные страницы",
    navCategories: "Категории",

    // Categories
    catAll: "Все категории",
    catSmartphones: "Смартфоны и Гаджеты",
    catLaptops: "Ноутбуки и Компьютеры",
    catAudio: "Аудио и Наушники",
    catWatches: "Смарт-часы",
    catClothing: "Одежда и Обувь",
    catHome: "Техника для дома",
    catSports: "Спорт и Туризм",

    // Product Card & Badges
    badgeNew: "Новинка",
    badgeDiscount: "Скидка",
    badgeTop: "Топ товар",
    badgeFlashSale: "Акция",
    installmentPrefix: "Рассрочка:",
    perMonth: "/мес",
    inStock: "В наличии",
    outOfStock: "Нет в наличии",
    inStockCount: "В наличии",
    btnAddToCart: "В корзину",
    btnInCart: "В корзине",
    btnQuickView: "Быстрый просмотр",
    btnAdded: "Добавлено",
    reviewsCountSuffix: "отзывов",
    currencyUz: "сум",

    // Home Page
    heroBadge: "Предложения Нового Сезона 2026",
    heroTitle: "Лучшая техника и гаджеты",
    heroHighlight: "добро пожаловать!",
    heroSubtitle: "Покупайте iPhone 16 Pro Max, MacBook Pro M3 Max, наушники Sony с шумоподавлением и другую оригинальную технику с официальной гарантией.",
    heroStartShopping: "Начать покупки",
    heroDailyDeals: "Акции дня",
    heroProofWarranty: "1 год официальной гарантии",
    heroProofInstallment: "0% Рассрочка",
    heroTopFlagship: "Топ Флагман",
    flashSaleTitle: "Супер Акции Дня",
    flashSaleSubtitle: "Успейте купить по специальным ценам за ограниченное время!",
    flashSaleHours: "час",
    flashSaleMins: "мин",
    flashSaleSecs: "сек",
    flashSaleViewAll: "Смотреть все",
    popularCategoriesTitle: "Популярные Категории",
    popularCategoriesSubtitle: "Выбирайте товары по самым востребованным категориям",
    featuredTitle: "Рекомендуемые Товары",
    featuredSubtitle: "Товары с наивысшими оценками от наших покупателей",
    bannerTitle: "На новый уровень с экосистемой Apple",
    bannerSubtitle: "Специальные промокоды со скидкой до 15% на MacBook Pro M3, iPad Pro и iPhone 16 Pro",
    bannerPromoCode: "Промокод: SUPER20",
    partnerBrandsTitle: "Наши Официальные Бренды-Партнеры",
    partnerBrandsSubtitle: "Только 100% оригинальная сертифицированная продукция",

    // Catalog Page
    catalogTitle: "Каталог Товаров",
    catalogProductsFound: "товаров найдено",
    filterTitle: "Фильтры",
    filterPriceRange: "Диапазон цен",
    filterFrom: "От",
    filterTo: "До",
    filterBrands: "Бренды",
    filterOnlyInStock: "Только в наличии",
    filterOnlyDiscount: "Только со скидкой",
    filterMinRating: "Минимальный рейтинг",
    filterRatingStars: "звезд и выше",
    filterReset: "Сбросить фильтры",
    sortTitle: "Сортировка:",
    sortPopular: "По популярности",
    sortPriceAsc: "Цена: От дешевых к дорогим",
    sortPriceDesc: "Цена: От дорогих к дешевым",
    sortRating: "Высокий рейтинг",
    sortNewest: "Новинки",
    noProductsFound: "Товары не найдены",
    noProductsSubtext: "Попробуйте изменить поисковый запрос или выбранные фильтры.",
    clearFiltersBtn: "Сбросить фильтры",

    // Product Detail Page
    detailBackCatalog: "Назад в каталог",
    detailInstallment: "Купить в рассрочку",
    detailSelectColor: "Выберите цвет:",
    detailSelectSize: "Выберите размер:",
    detailQuantity: "Количество:",
    detailBuyNow: "Купить сейчас",
    detailAddToCart: "Добавить в корзину",
    detailTabSpecs: "Характеристики",
    detailTabReviews: "Отзывы",
    detailTabDelivery: "Доставка и Гарантия",
    detailShare: "Поделиться",
    detailShareCopied: "Ссылка скопирована!",
    detailDeliveryInfoTitle: "Быстрая и надежная доставка",
    detailDeliveryInfoText: "Бесплатная доставка по Ташкенту за 24 часа, по всем регионам Узбекистана за 48 часов прямо до двери.",
    detailWarrantyInfoTitle: "Официальная гарантия 12 месяцев",
    detailWarrantyInfoText: "Официальный гарантийный талон от производителя и обслуживание в авторизованных сервисных центрах.",
    detailReturnInfoTitle: "Возврат в течение 14 дней",
    detailReturnInfoText: "Если товар вам не подошел, вы можете вернуть или обменять его в течение 14 дней с сохранением упаковки.",
    detailWriteReview: "Оставить отзыв",
    detailReviewName: "Ваше имя",
    detailReviewComment: "Ваш отзыв и впечатления",
    detailReviewRating: "Ваша оценка:",
    detailReviewSubmit: "Отправить отзыв",
    detailReviewSuccess: "Спасибо за ваш отзыв!",
    detailRelatedTitle: "Похожие Товары",
    detailFeaturesTitle: "Ключевые преимущества:",

    // Quick View Modal
    quickViewTitle: "Быстрый просмотр",
    quickViewFullDetails: "Перейти к полному описанию",
    quickViewColors: "Доступные цвета:",
    quickViewSizes: "Размеры:",
    quickViewQty: "Количество:",

    // Cart Page
    cartTitle: "Корзина Покупок",
    cartEmptyTitle: "Ваша корзина пуста",
    cartEmptySubtext: "Вы еще не добавили ни одного товара. Выберите понравившиеся товары из каталога!",
    cartGoCatalog: "Перейти в каталог",
    cartClear: "Очистить корзину",
    cartItemCol: "Товар",
    cartPriceCol: "Цена",
    cartQtyCol: "Кол-во",
    cartTotalCol: "Итого",
    cartPromoTitle: "Есть промокод?",
    cartPromoPlaceholder: "Например: SALOM2026",
    cartPromoApply: "Применить",
    cartPromoApplied: "Промокод применен",
    cartPromoRemove: "Удалить",
    cartSummaryTitle: "Сумма заказа",
    cartSubtotal: "Стоимость товаров",
    cartPromoDiscount: "Скидка по промокоду",
    cartDeliveryFee: "Доставка",
    cartDeliveryFree: "Бесплатно",
    cartFreeShippingCongrats: "Поздравляем! Вам доступна бесплатная доставка.",
    cartFreeShippingNeeded: "До бесплатной доставки осталось:",
    cartTotalToPay: "Итого к оплате",
    cartProceedCheckout: "Перейти к оформлению",
    cartContinueShopping: "Продолжить покупки",

    // Checkout Page
    checkoutTitle: "Оформление Заказа",
    checkoutStepRecipient: "1. Данные получателя",
    checkoutFullName: "Ф.И.О (Полное имя)*",
    checkoutFullNamePlaceholder: "Например: Джасур Рахимов",
    checkoutPhone: "Номер телефона*",
    checkoutCity: "Город / Область*",
    checkoutDistrict: "Район / Территория*",
    checkoutAddress: "Точный адрес доставки (улица, дом, кв.)*",
    checkoutAddressPlaceholder: "ул. Амира Темура дом 45, кв. 12",
    checkoutNote: "Комментарий для курьера (необязательно)",
    checkoutNotePlaceholder: "Код домофона, ориентир и т.д.",
    checkoutStepDelivery: "2. Способ доставки",
    checkoutDeliveryStandard: "Стандартная доставка (1-2 дня)",
    checkoutDeliveryStandardTime: "Надежная доставка до двери",
    checkoutDeliveryExpress: "Экспресс-доставка (в течение 3 часов)",
    checkoutDeliveryExpressTime: "Самая быстрая доставка по Ташкенту",
    checkoutStepPayment: "3. Выберите способ оплаты",
    checkoutPayClick: "Онлайн оплата Click",
    checkoutPayPayme: "Онлайн оплата Payme",
    checkoutPayUzum: "Оплата через Uzum Pay",
    checkoutPayCash: "Наличными при получении",
    checkoutPayCardDelivery: "Терминалом при получении (Uzcard/Humo)",
    checkoutConfirmOrder: "Подтвердить заказ",
    checkoutProcessing: "Оформляется...",
    checkoutSuccessTitle: "Ваш заказ успешно принят!",
    checkoutSuccessSubtitle: "Детали заказа и статус доставки вы можете отслеживать в разделе 'Мои заказы'.",
    checkoutOrderNumber: "Номер заказа:",
    checkoutViewOrdersBtn: "Посмотреть мои заказы",
    checkoutBackHomeBtn: "Вернуться на главную",

    // Orders Page
    ordersTitle: "Мои Заказы",
    ordersSubtitle: "История всех активных и завершенных заказов",
    ordersEmptyTitle: "История заказов пуста",
    ordersEmptySubtext: "Вы еще не оформляли заказы. Выберите нужные товары в нашем магазине!",
    ordersEmptyBtn: "Начать покупки",
    ordersStatusPending: "Принят",
    ordersStatusPreparing: "Собирается",
    ordersStatusDelivering: "Курьер в пути",
    ordersStatusDelivered: "Доставлен",
    ordersStatusCancelled: "Отменен",
    ordersDateLabel: "Дата заказа:",
    ordersItemsCount: "товаров",
    ordersTotalAmount: "Общая сумма:",
    ordersDeliveryAddress: "Адрес доставки:",
    ordersPaymentMethod: "Способ оплаты:",
    ordersReorderBtn: "Повторить заказ",

    // Wishlist Page
    wishlistTitle: "Избранные Товары",
    wishlistSubtitle: "Список сохраненных вами товаров",
    wishlistEmptyTitle: "Список избранного пуст",
    wishlistEmptySubtext: "Сохраняйте понравившиеся товары, нажимая на значок сердечка.",
    wishlistEmptyBtn: "Смотреть каталог",
    wishlistAddAllToCart: "Добавить всё в корзину",
    wishlistTotalSaved: "сохраненных товаров",

    // About & Contact Page
    aboutTitle: "BOZOR PRO — Современный Онлайн Гипермаркет",
    aboutBadge: "О нас",
    aboutStoryTitle: "Наша миссия и ценности",
    aboutStoryText1: "BOZOR PRO — ведущая онлайн-платформа в Узбекистане, предлагающая новейшие гаджеты, ноутбуки, смарт-часы, бытовую технику и стильную одежду по доступным ценам.",
    aboutStoryText2: "Мы гарантируем каждому покупателю исключительно оригинальные товары с официальной гарантией, оперативную бесплатную доставку за 1 день и круглосуточную поддержку 24/7.",
    aboutStatsYears: "Лет опыта",
    aboutStatsCustomers: "Довольных клиентов",
    aboutStatsProducts: "Товаров в каталоге",
    aboutStatsCities: "Доставка по регионам",
    aboutFaqTitle: "Часто Задаваемые Вопросы (FAQ)",
    aboutContactTitle: "Свяжитесь с нами",
    aboutContactSubtitle: "Если у вас есть вопросы или предложения, напишите нам через форму ниже.",
    aboutFormName: "Ваше имя",
    aboutFormPhone: "Номер телефона",
    aboutFormMessage: "Ваше сообщение",
    aboutFormSend: "Отправить сообщение",
    aboutWorkingHoursTitle: "Режим работы:",
    aboutWorkingHours: "Ежедневно: с 09:00 до 22:00 без выходных",
    aboutAddressTitle: "Адрес головного офиса:",
    aboutAddress: "г. Ташкент, Юнусабадский район, проспект Амира Темура 108",
    aboutEmailTitle: "Электронная почта:",
    aboutPhoneTitle: "Единый контакт-центр:",

    // Admin Page
    adminTitle: "Центр Управления Админа",
    adminSubtitle: "Управление товарами, заказами, промокодами и аналитикой продаж",
    adminTabOverview: "Обзор",
    adminTabProducts: "Товары",
    adminTabOrders: "Заказы",
    adminTabPromos: "Промокоды",
    adminBackToStore: "Вернуться в магазин",
    adminTotalRevenue: "Общая Выручка",
    adminTotalOrders: "Всего Заказов",
    adminActiveOrders: "Активные Заказы",
    adminTotalProducts: "Товаров в Каталоге",
    adminStockCount: "Общий остаток на складе",
    adminAddProductBtn: "Добавить Новый Товар",
    adminEditProductBtn: "Редактировать",
    adminDeleteProductBtn: "Удалить",
    adminResetProductsBtn: "Восстановить по умолчанию",
    adminSalesChartTitle: "Динамика Недельных Продаж",
    adminCategoryDistribution: "Количество товаров по категориям",
    adminRecentOrders: "Последние Заказы",
    adminSearchProducts: "Поиск по названию или бренду...",
    adminFilterCategory: "Все категории",
    adminTableImage: "Фото",
    adminTableName: "Название товара",
    adminTableCategory: "Категория",
    adminTablePrice: "Цена",
    adminTableStock: "На складе",
    adminTableActions: "Действия",
    adminAddPromoBtn: "Добавить Промокод",
    adminPromoCodeLabel: "Код",
    adminPromoDiscountLabel: "Скидка",
    adminPromoUsageLabel: "Применений",
    adminPromoStatusLabel: "Статус",

    // Footer
    footerDeliveryPropTitle: "Быстрая доставка",
    footerDeliveryPropDesc: "Доставим за 1 день во все регионы Узбекистана.",
    footerOriginalPropTitle: "100% Оригинальная гарантия",
    footerOriginalPropDesc: "Только сертифицированные товары от официальных дистрибьюторов.",
    footerPaymentPropTitle: "Удобные способы оплаты",
    footerPaymentPropDesc: "Click, Payme, Uzum Pay и оплата наличными при получении.",
    footerSupportPropTitle: "Поддержка 24/7",
    footerSupportPropDesc: "Наши операторы готовы ответить на любые ваши вопросы.",
    footerAboutDesc: "Новейшая современная электроника, гаджеты, ноутбуки, спорт и одежда по самым выгодным ценам по всему Узбекистану.",
    footerNewsletterTitle: "Будьте в курсе акций:",
    footerNewsletterPlaceholder: "Ваш email...",
    footerNewsletterBtn: "Подписка",
    footerSectionsTitle: "Разделы",
    footerCategoriesTitle: "Категории",
    footerContactTitle: "Контакт-центр",
    footerCopyright: "© 2026 Онлайн-магазин BOZOR PRO. Все права защищены.",

    // Auth & Profile
    authLoginTitle: "Вход в аккаунт",
    authRegisterTitle: "Регистрация",
    authEmailOrPhone: "Email или номер телефона",
    authEmail: "Электронная почта",
    authPassword: "Ваш пароль",
    authConfirmPassword: "Подтвердите пароль",
    authFullName: "Полное имя и фамилия",
    authPhone: "Номер телефона (+998)",
    authForgotPassword: "Забыли пароль?",
    authRememberMe: "Запомнить меня",
    authLoginBtn: "Войти",
    authRegisterBtn: "Создать аккаунт",
    authHaveAccount: "Уже есть аккаунт?",
    authNoAccount: "Впервые у нас?",
    authSwitchToLogin: "Войти",
    authSwitchToRegister: "Зарегистрироваться",
    authWelcomeBonus: "Приветственный бонус 50 000 сум новым покупателям!",
    authDemoUserBtn: "Профиль клиента (Быстрый тест)",
    authDemoAdminBtn: "Профиль админа (Быстрый тест)",
    authLogout: "Выйти из системы",
    navLogin: "Войти",
    navRegister: "Регистрация",
    navProfile: "Мой профиль",
    navAccount: "Кабинет",

    // Profile Dashboard
    profileTitle: "Личный Кабинет",
    profileSubtitle: "Управление данными, история заказов, адреса доставки и бонусы",
    profileTabInfo: "Мои данные",
    profileTabOrders: "Мои заказы",
    profileTabAddresses: "Адреса доставки",
    profileTabBonuses: "Бонусы и кошелек",
    profilePersonalDetails: "Личные данные",
    profileSaveChanges: "Сохранить изменения",
    profileAddAddress: "Добавить новый адрес",
    profileNoAddresses: "У вас пока нет сохраненных адресов",
    profileBonusBalance: "Бонусный баланс",
    profileBonusHistory: "Правила начисления и списания бонусов",
    profileBonusRule1: "3% кэшбэка с каждого оформленного заказа возвращается на бонусный счет.",
    profileBonusRule2: "Накопленные бонусы можно использовать для оплаты до 100% стоимости будущих покупок (1 бонус = 1 сум).",
    profileRoleCustomer: "Постоянный покупатель",
    profileRoleAdmin: "Администратор системы",
    profileMemberSince: "Дата регистрации:",

    // Toast Notifications
    toastLangChanged: "Язык изменен: Русский",
    toastAddedToCart: "Добавлено в корзину!",
    toastRemovedFromCart: "Удалено из корзины",
    toastSavedWishlist: "Сохранено в избранное ❤️",
    toastRemovedWishlist: "Удалено из избранного",
    toastPromoApplied: "Промокод успешно применен!",
    toastPromoInvalid: "Неверный или просроченный промокод",
    toastOrderCreated: "Ваш заказ успешно принят!",
    toastMessageSent: "Ваше сообщение успешно отправлено!",
    toastLoginSuccess: "Добро пожаловать! Вы успешно вошли в аккаунт",
    toastRegisterSuccess: "Поздравляем! Аккаунт создан и начислено 50 000 бонусов 🎉",
    toastLogoutSuccess: "Вы вышли из системы",
    toastProfileUpdated: "Данные профиля успешно обновлены!"
  },

  en: {
    // Top utility bar
    topFreeShipping: "Free 1-day delivery across Uzbekistan",
    topOriginalWarranty: "100% Guaranteed original products",
    topCurrency: "Currency:",
    topLanguage: "Language:",
    topAdminPanel: "Admin Panel",
    topBackToShop: "Back to Shop",
    phoneContact: "+998 (71) 200-00-00",

    // Header & Navigation
    brandSubtitle: "Online Hypermarket",
    navCatalog: "Catalog",
    navAllCategories: "All Categories",
    navSearchPlaceholder: "Search products, brands or categories...",
    navSearchBtn: "Search",
    navSearchSuggestions: "Recommended search results",
    navOrders: "Orders",
    navMyOrders: "My Orders",
    navWishlist: "Wishlist",
    navWishlistTitle: "Saved Items",
    navCart: "Cart",
    navCartEmpty: "Cart is empty",
    navDiscountsBadge: "Discounts up to 20%",
    navHome: "Home",
    navAllProducts: "All Products",
    navAboutFaq: "About Us & FAQ",
    navAboutContact: "About Us & Contact",
    navAdminPro: "Admin Panel (Management)",
    navSections: "Sections",
    navMainPages: "Main Pages",
    navCategories: "Categories",

    // Categories
    catAll: "All Categories",
    catSmartphones: "Smartphones & Gadgets",
    catLaptops: "Laptops & Computers",
    catAudio: "Audio & Headphones",
    catWatches: "Smartwatches",
    catClothing: "Clothing & Shoes",
    catHome: "Home & Appliances",
    catSports: "Sports & Outdoors",

    // Product Card & Badges
    badgeNew: "New",
    badgeDiscount: "Sale",
    badgeTop: "Top Pick",
    badgeFlashSale: "Flash Sale",
    installmentPrefix: "Installment:",
    perMonth: "/mo",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    inStockCount: "In Stock",
    btnAddToCart: "Add to Cart",
    btnInCart: "In Cart",
    btnQuickView: "Quick View",
    btnAdded: "Added",
    reviewsCountSuffix: "reviews",
    currencyUz: "UZS",

    // Home Page
    heroBadge: "New Season Deals 2026",
    heroTitle: "Premium electronics & tech",
    heroHighlight: "welcome!",
    heroSubtitle: "Shop iPhone 16 Pro Max, M3 Max MacBook Pro, Sony ANC headphones, and other authentic brands with official warranty.",
    heroStartShopping: "Start Shopping",
    heroDailyDeals: "Today's Deals",
    heroProofWarranty: "1-year official warranty",
    heroProofInstallment: "0% Installment plan",
    heroTopFlagship: "Top Flagship",
    flashSaleTitle: "Super Flash Deals",
    flashSaleSubtitle: "Hurry to grab top items at special discounted prices for a limited time!",
    flashSaleHours: "hrs",
    flashSaleMins: "min",
    flashSaleSecs: "sec",
    flashSaleViewAll: "View All",
    popularCategoriesTitle: "Popular Categories",
    popularCategoriesSubtitle: "Explore our most requested product collections",
    featuredTitle: "Featured Products",
    featuredSubtitle: "Top-rated items chosen by our valued customers",
    bannerTitle: "Level Up with the Apple Ecosystem",
    bannerSubtitle: "Special promo codes up to -15% off MacBook Pro M3, iPad Pro, and iPhone 16 Pro",
    bannerPromoCode: "Promo code: SUPER20",
    partnerBrandsTitle: "Our Official Brand Partners",
    partnerBrandsSubtitle: "100% certified authentic products direct from distributors",

    // Catalog Page
    catalogTitle: "Product Catalog",
    catalogProductsFound: "products found",
    filterTitle: "Filters",
    filterPriceRange: "Price Range",
    filterFrom: "From",
    filterTo: "To",
    filterBrands: "Brands",
    filterOnlyInStock: "In Stock Only",
    filterOnlyDiscount: "Discounted Only",
    filterMinRating: "Minimum Rating",
    filterRatingStars: "stars and above",
    filterReset: "Reset Filters",
    sortTitle: "Sort by:",
    sortPopular: "Popularity",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortRating: "Top Rated",
    sortNewest: "Newest Arrivals",
    noProductsFound: "No products found",
    noProductsSubtext: "Try adjusting your search terms or applied filters.",
    clearFiltersBtn: "Clear Filters",

    // Product Detail Page
    detailBackCatalog: "Back to Catalog",
    detailInstallment: "Buy with 0% installment",
    detailSelectColor: "Select Color:",
    detailSelectSize: "Select Size:",
    detailQuantity: "Quantity:",
    detailBuyNow: "Buy Now",
    detailAddToCart: "Add to Cart",
    detailTabSpecs: "Specifications",
    detailTabReviews: "Reviews",
    detailTabDelivery: "Delivery & Warranty",
    detailShare: "Share",
    detailShareCopied: "Link copied!",
    detailDeliveryInfoTitle: "Fast and secure delivery",
    detailDeliveryInfoText: "Within 24 hours in Tashkent, 48 hours across all regions of Uzbekistan right to your door.",
    detailWarrantyInfoTitle: "12 Months Official Warranty",
    detailWarrantyInfoText: "Official manufacturer warranty certificate and authorized service center support.",
    detailReturnInfoTitle: "14-Day Return Policy",
    detailReturnInfoText: "Return or exchange within 14 days if the item does not meet your expectations, keeping original packaging.",
    detailWriteReview: "Write a Review",
    detailReviewName: "Your Name",
    detailReviewComment: "Your feedback and review",
    detailReviewRating: "Your Rating:",
    detailReviewSubmit: "Submit Review",
    detailReviewSuccess: "Thank you for your review!",
    detailRelatedTitle: "Similar Products",
    detailFeaturesTitle: "Key Highlights:",

    // Quick View Modal
    quickViewTitle: "Quick View",
    quickViewFullDetails: "View Full Product Page",
    quickViewColors: "Available Colors:",
    quickViewSizes: "Sizes:",
    quickViewQty: "Quantity:",

    // Cart Page
    cartTitle: "Shopping Cart",
    cartEmptyTitle: "Your cart is empty",
    cartEmptySubtext: "You haven't added any products yet. Browse our catalog and find great deals!",
    cartGoCatalog: "Explore Catalog",
    cartClear: "Clear Cart",
    cartItemCol: "Product",
    cartPriceCol: "Price",
    cartQtyCol: "Qty",
    cartTotalCol: "Total",
    cartPromoTitle: "Have a promo code?",
    cartPromoPlaceholder: "e.g. SALOM2026",
    cartPromoApply: "Apply",
    cartPromoApplied: "Promo applied",
    cartPromoRemove: "Remove",
    cartSummaryTitle: "Order Summary",
    cartSubtotal: "Products Subtotal",
    cartPromoDiscount: "Promo Discount",
    cartDeliveryFee: "Shipping",
    cartDeliveryFree: "Free",
    cartFreeShippingCongrats: "Congratulations! You qualified for Free Shipping.",
    cartFreeShippingNeeded: "Add more to get free shipping:",
    cartTotalToPay: "Total to Pay",
    cartProceedCheckout: "Proceed to Checkout",
    cartContinueShopping: "Continue Shopping",

    // Checkout Page
    checkoutTitle: "Order Checkout",
    checkoutStepRecipient: "1. Recipient Information",
    checkoutFullName: "Full Name*",
    checkoutFullNamePlaceholder: "e.g. Jasur Rahimov",
    checkoutPhone: "Phone Number*",
    checkoutCity: "City / Region*",
    checkoutDistrict: "District*",
    checkoutAddress: "Delivery Address (Street, Building, Apt)*",
    checkoutAddressPlaceholder: "Amir Temur Street 45, Apt 12",
    checkoutNote: "Courier Notes (Optional)",
    checkoutNotePlaceholder: "Door code, landmark, etc.",
    checkoutStepDelivery: "2. Delivery Method",
    checkoutDeliveryStandard: "Standard Delivery (1-2 days)",
    checkoutDeliveryStandardTime: "Door-to-door safe delivery",
    checkoutDeliveryExpress: "Express Delivery (within 3 hours)",
    checkoutDeliveryExpressTime: "Fastest delivery in Tashkent",
    checkoutStepPayment: "3. Choose Payment Method",
    checkoutPayClick: "Click Online Payment",
    checkoutPayPayme: "Payme Online Payment",
    checkoutPayUzum: "Uzum Pay Payment",
    checkoutPayCash: "Cash on Delivery",
    checkoutPayCardDelivery: "Card Terminal on Delivery (Uzcard/Humo)",
    checkoutConfirmOrder: "Confirm & Place Order",
    checkoutProcessing: "Processing...",
    checkoutSuccessTitle: "Your order has been placed successfully!",
    checkoutSuccessSubtitle: "You can track your order status and details in 'My Orders'.",
    checkoutOrderNumber: "Order Number:",
    checkoutViewOrdersBtn: "View My Orders",
    checkoutBackHomeBtn: "Back to Home",

    // Orders Page
    ordersTitle: "My Orders",
    ordersSubtitle: "History of all active and completed orders",
    ordersEmptyTitle: "No orders yet",
    ordersEmptySubtext: "You haven't placed any orders yet. Discover our latest products and shop today!",
    ordersEmptyBtn: "Start Shopping",
    ordersStatusPending: "Received",
    ordersStatusPreparing: "Preparing",
    ordersStatusDelivering: "In Transit",
    ordersStatusDelivered: "Delivered",
    ordersStatusCancelled: "Cancelled",
    ordersDateLabel: "Order Date:",
    ordersItemsCount: "items",
    ordersTotalAmount: "Total Amount:",
    ordersDeliveryAddress: "Delivery Address:",
    ordersPaymentMethod: "Payment Method:",
    ordersReorderBtn: "Reorder",

    // Wishlist Page
    wishlistTitle: "Wishlist",
    wishlistSubtitle: "Your saved products collection",
    wishlistEmptyTitle: "Your wishlist is empty",
    wishlistEmptySubtext: "Save your favorite items by clicking the heart icon on any product card.",
    wishlistEmptyBtn: "Browse Products",
    wishlistAddAllToCart: "Add All to Cart",
    wishlistTotalSaved: "saved items",

    // About & Contact Page
    aboutTitle: "BOZOR PRO — Modern Online Hypermarket",
    aboutBadge: "About Us",
    aboutStoryTitle: "Our Mission & Values",
    aboutStoryText1: "BOZOR PRO is Uzbekistan's premier online marketplace offering the latest tech gadgets, laptops, smartwatches, home appliances, and fashion apparel at competitive prices.",
    aboutStoryText2: "We guarantee 100% genuine products with official warranties, swift 1-day free delivery, and responsive 24/7 customer care.",
    aboutStatsYears: "Years Experience",
    aboutStatsCustomers: "Satisfied Customers",
    aboutStatsProducts: "Products in Catalog",
    aboutStatsCities: "Nationwide Coverage",
    aboutFaqTitle: "Frequently Asked Questions (FAQ)",
    aboutContactTitle: "Contact Us",
    aboutContactSubtitle: "Have questions or suggestions? Send us a message below.",
    aboutFormName: "Your Name",
    aboutFormPhone: "Phone Number",
    aboutFormMessage: "Your Message",
    aboutFormSend: "Send Message",
    aboutWorkingHoursTitle: "Working Hours:",
    aboutWorkingHours: "Daily: 09:00 to 22:00 without days off",
    aboutAddressTitle: "Head Office Address:",
    aboutAddress: "Tashkent city, Yunusabad district, Amir Temur Avenue 108",
    aboutEmailTitle: "Email Address:",
    aboutPhoneTitle: "Customer Support Line:",

    // Admin Page
    adminTitle: "Admin Control Center",
    adminSubtitle: "Manage store catalog, customer orders, promo vouchers, and sales analytics",
    adminTabOverview: "Overview",
    adminTabProducts: "Products",
    adminTabOrders: "Orders",
    adminTabPromos: "Promo Codes",
    adminBackToStore: "Back to Store",
    adminTotalRevenue: "Total Revenue",
    adminTotalOrders: "Total Orders",
    adminActiveOrders: "Active Orders",
    adminTotalProducts: "Total Products",
    adminStockCount: "Total Warehouse Stock",
    adminAddProductBtn: "Add New Product",
    adminEditProductBtn: "Edit",
    adminDeleteProductBtn: "Delete",
    adminResetProductsBtn: "Reset to Default",
    adminSalesChartTitle: "Weekly Sales Performance",
    adminCategoryDistribution: "Products per Category",
    adminRecentOrders: "Recent Orders",
    adminSearchProducts: "Search by title or brand...",
    adminFilterCategory: "All categories",
    adminTableImage: "Image",
    adminTableName: "Product Title",
    adminTableCategory: "Category",
    adminTablePrice: "Price",
    adminTableStock: "Stock",
    adminTableActions: "Actions",
    adminAddPromoBtn: "Add Promo Code",
    adminPromoCodeLabel: "Code",
    adminPromoDiscountLabel: "Discount",
    adminPromoUsageLabel: "Usage",
    adminPromoStatusLabel: "Status",

    // Footer
    footerDeliveryPropTitle: "Fast Delivery",
    footerDeliveryPropDesc: "Next-day delivery across all regions of Uzbekistan.",
    footerOriginalPropTitle: "100% Original Guarantee",
    footerOriginalPropDesc: "Certified genuine products from official distributors.",
    footerPaymentPropTitle: "Easy Payment Options",
    footerPaymentPropDesc: "Click, Payme, Uzum Pay and cash or card on delivery.",
    footerSupportPropTitle: "24/7 Support",
    footerSupportPropDesc: "Our dedicated operators are always ready to assist you.",
    footerAboutDesc: "The latest electronics, gadgets, laptops, sportswear, and fashion at the best prices throughout Uzbekistan.",
    footerNewsletterTitle: "Subscribe for special deals:",
    footerNewsletterPlaceholder: "Your email address...",
    footerNewsletterBtn: "Subscribe",
    footerSectionsTitle: "Sections",
    footerCategoriesTitle: "Categories",
    footerContactTitle: "Customer Care",
    footerCopyright: "© 2026 BOZOR PRO Online Store. All rights reserved.",

    // Auth & Profile
    authLoginTitle: "Account Login",
    authRegisterTitle: "Create Account",
    authEmailOrPhone: "Email or phone number",
    authEmail: "Email Address",
    authPassword: "Password",
    authConfirmPassword: "Confirm Password",
    authFullName: "Full Name",
    authPhone: "Phone Number (+998)",
    authForgotPassword: "Forgot password?",
    authRememberMe: "Remember me",
    authLoginBtn: "Sign In",
    authRegisterBtn: "Sign Up",
    authHaveAccount: "Already have an account?",
    authNoAccount: "Don't have an account?",
    authSwitchToLogin: "Sign In",
    authSwitchToRegister: "Register",
    authWelcomeBonus: "50,000 UZS Welcome Bonus for new users!",
    authDemoUserBtn: "Customer Profile (Quick Test)",
    authDemoAdminBtn: "Admin Profile (Quick Test)",
    authLogout: "Sign Out",
    navLogin: "Sign In",
    navRegister: "Sign Up",
    navProfile: "My Profile",
    navAccount: "Cabinet",

    // Profile Dashboard
    profileTitle: "Customer Portal",
    profileSubtitle: "Manage your details, order history, shipping addresses, and reward bonuses",
    profileTabInfo: "Personal Info",
    profileTabOrders: "My Orders",
    profileTabAddresses: "Shipping Addresses",
    profileTabBonuses: "Bonuses & Wallet",
    profilePersonalDetails: "Personal Details",
    profileSaveChanges: "Save Changes",
    profileAddAddress: "Add New Address",
    profileNoAddresses: "No delivery addresses saved yet",
    profileBonusBalance: "Reward Points Balance",
    profileBonusHistory: "Bonus Rules & Spending",
    profileBonusRule1: "Earn 3% cashback points on every successful order directly to your bonus wallet.",
    profileBonusRule2: "Redeem your bonus points for up to 100% discount on future orders (1 point = 1 UZS).",
    profileRoleCustomer: "Verified Customer",
    profileRoleAdmin: "System Administrator",
    profileMemberSince: "Member since:",

    // Toast Notifications
    toastLangChanged: "Language switched: English",
    toastAddedToCart: "Added to cart!",
    toastRemovedFromCart: "Removed from cart",
    toastSavedWishlist: "Saved to wishlist ❤️",
    toastRemovedWishlist: "Removed from wishlist",
    toastPromoApplied: "Promo code successfully applied!",
    toastPromoInvalid: "Invalid or expired promo code",
    toastOrderCreated: "Your order was successfully placed!",
    toastMessageSent: "Your message was sent successfully!",
    toastLoginSuccess: "Welcome back! You have signed in successfully",
    toastRegisterSuccess: "Congratulations! Account created with 50,000 UZS welcome bonus 🎉",
    toastLogoutSuccess: "You have signed out",
    toastProfileUpdated: "Profile information updated successfully!"
  }
};

export const getLocalizedCategoryName = (categoryId: string, lang: Language): string => {
  const dict = translations[lang] || translations.uz;
  switch (categoryId) {
    case 'smartphones': return dict.catSmartphones;
    case 'laptops': return dict.catLaptops;
    case 'audio': return dict.catAudio;
    case 'watches': return dict.catWatches;
    case 'clothing': return dict.catClothing;
    case 'home': return dict.catHome;
    case 'sports': return dict.catSports;
    default: return dict.catAll;
  }
};

export const getLocalizedStatusLabel = (status: string, lang: Language): string => {
  const dict = translations[lang] || translations.uz;
  switch (status) {
    case 'yetkazildi': return dict.ordersStatusDelivered;
    case 'yolda': return dict.ordersStatusDelivering;
    case 'tayyorlanmoqda': return dict.ordersStatusPreparing;
    case 'bekor_qilindi': return dict.ordersStatusCancelled;
    default: return dict.ordersStatusPending;
  }
};
