import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.reservations': 'Reservations',
    
    // Hero Section
    'hero.title': 'Honda-Shokudo',
    'hero.subtitle': 'Western Cuisine with a Japanese Soul',
    'hero.description': 'Experience the perfect harmony of European flavors and Japanese precision in our intimate restaurant.',
    'hero.reserve': 'Make Reservation',
    'hero.view-menu': 'View Menu',
    
    // About Section
    'about.title': 'About Honda-Shokudo',
    'about.description': 'Founded in the heart of Japan, Honda-Shokudo brings together the best of Western culinary traditions with Japanese attention to detail and seasonal ingredients. Our intimate space features a 5-seat bar and two tables, creating a personal dining experience.',
    
    // Menu
    'menu.title': 'Our Menu',
    'menu.lunch': 'Lunch',
    'menu.dinner': 'Dinner',
    'menu.lunch.available': 'Lunch Available: 11:30 AM - 2:30 PM',
    'menu.dinner.available': 'Dinner Available: 6:00 PM - 9:30 PM',
    
    // Reservations
    'reservations.title': 'Make a Reservation',
    'reservations.description': 'Book your table at Honda-Shokudo. Please provide your details below.',
    'reservations.name': 'Full Name',
    'reservations.phone': 'Phone Number',
    'reservations.date': 'Reservation Date',
    'reservations.meal': 'Meal Service',
    'reservations.lunch': 'Lunch',
    'reservations.dinner': 'Dinner',
    'reservations.party-size': 'Party Size',
    'reservations.seating': 'Preferred Seating',
    'reservations.bar': 'Bar (5 seats)',
    'reservations.table1': 'Table 1 (6 seats)',
    'reservations.table2': 'Table 2 (6 seats)',
    'reservations.submit': 'Reserve Table',
    'reservations.success': 'Reservation confirmed! We look forward to welcoming you.',
    'reservations.error': 'Failed to make reservation. Please try again.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.address': 'Address',
    'contact.hours': 'Opening Hours',
    'contact.phone': 'Phone',
    'contact.lunch-hours': 'Lunch: 11:30 AM - 2:30 PM',
    'contact.dinner-hours': 'Dinner: 6:00 PM - 9:30 PM',
    'contact.closed': 'Closed Mondays',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.close': 'Close',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.menu': 'メニュー',
    'nav.about': '私たちについて',
    'nav.reservations': '予約',
    
    // Hero Section
    'hero.title': 'ホンダ食堂',
    'hero.subtitle': '日本の心を込めた西洋料理',
    'hero.description': 'ヨーロッパの味と日本の精密さが完璧に調和した、親密なレストランでの体験をお楽しみください。',
    'hero.reserve': '予約する',
    'hero.view-menu': 'メニューを見る',
    
    // About Section
    'about.title': 'ホンダ食堂について',
    'about.description': '日本の中心部に設立されたホンダ食堂は、西洋の料理の伝統と日本の細やかな気配りと季節の食材を組み合わせています。5席のバーと2つのテーブルを備えた親密な空間で、個人的なダイニング体験を提供します。',
    
    // Menu
    'menu.title': '私たちのメニュー',
    'menu.lunch': 'ランチ',
    'menu.dinner': 'ディナー',
    'menu.lunch.available': 'ランチ営業時間: 11:30 - 14:30',
    'menu.dinner.available': 'ディナー営業時間: 18:00 - 21:30',
    
    // Reservations
    'reservations.title': '予約',
    'reservations.description': 'ホンダ食堂のテーブルを予約してください。以下に詳細をご記入ください。',
    'reservations.name': '氏名',
    'reservations.phone': '電話番号',
    'reservations.date': '予約日',
    'reservations.meal': '食事サービス',
    'reservations.lunch': 'ランチ',
    'reservations.dinner': 'ディナー',
    'reservations.party-size': '人数',
    'reservations.seating': '希望席',
    'reservations.bar': 'バー（5席）',
    'reservations.table1': 'テーブル1（6席）',
    'reservations.table2': 'テーブル2（6席）',
    'reservations.submit': 'テーブルを予約',
    'reservations.success': '予約が確認されました！お客様をお迎えできることを楽しみにしております。',
    'reservations.error': '予約に失敗しました。もう一度お試しください。',
    
    // Contact
    'contact.title': 'お問い合わせ',
    'contact.address': '住所',
    'contact.hours': '営業時間',
    'contact.phone': '電話',
    'contact.lunch-hours': 'ランチ: 11:30 - 14:30',
    'contact.dinner-hours': 'ディナー: 18:00 - 21:30',
    'contact.closed': '月曜日休業',
    
    // Common
    'common.loading': '読み込み中...',
    'common.error': 'エラーが発生しました',
    'common.close': '閉じる',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('honda-shokudo-language') as Language;
    if (saved && (saved === 'en' || saved === 'ja')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('honda-shokudo-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};