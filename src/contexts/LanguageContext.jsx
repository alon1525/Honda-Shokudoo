import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.reservations': 'Reservations',
    
    // Hero Section
    'hero.title': '本田食堂',
    'hero.subtitle': 'Honda-Shokudo',
    'hero.description': 'Authentic Western cuisine in the heart of Shimosuwa, Nagano. Experience our intimate dining with a 5-seat bar and 2 tables.',
    'hero.reserve': 'Make Reservation',
    'hero.view-menu': 'View Menu',
    
    // Menu
    'menu.title': 'Our Menu',
    'menu.lunch': 'Lunch',
    'menu.dinner': 'Dinner',
    'menu.lunch.available': 'Lunch: 11:30 - 14:00',
    'menu.dinner.available': 'Dinner: 18:00 - 22:00',
    
    // Reservations
    'reservations.title': 'Make a Reservation',
    'reservations.description': 'Book your table at Honda-Shokudo. No login required.',
    'reservations.name': 'Name',
    'reservations.phone': 'Phone Number',
    'reservations.date': 'Date',
    'reservations.meal': 'Meal',
    'reservations.lunch': 'Lunch',
    'reservations.dinner': 'Dinner',
    'reservations.party-size': 'Number of People',
    'reservations.seating': 'Seating',
    'reservations.bar': 'Bar (5 seats)',
    'reservations.table': 'Table (6 seats each)',
    'reservations.submit': 'Reserve',
    'reservations.success': 'Reservation confirmed! We look forward to welcoming you.',
    'reservations.error': 'Failed to make reservation. Please try again.',
    'reservations.unavailable': 'This option is not available for the selected date/meal.',
    'reservations.phone-exists': 'You already have a reservation on this date.',
    
    // Gallery
    'gallery.title': 'Gallery',
    
    // Contact
    'contact.title': 'Contact & Hours',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.hours': 'Opening Hours',
    'contact.friday': 'Friday: 11:30–14:00, 18:00–22:00',
    'contact.saturday': 'Saturday: 11:30–14:00, 18:00–22:00',
    'contact.sunday': 'Sunday: Closed',
    'contact.monday': 'Monday (Mountain Day): Closed',
    'contact.tuesday': 'Tuesday: 11:30–14:00, 18:00–22:00',
    'contact.wednesday': 'Wednesday: 11:30–14:00, 18:00–22:00',
    'contact.thursday': 'Thursday: 11:30–14:00, 18:00–22:00',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.close': 'Close',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.menu': 'メニュー',
    'nav.gallery': 'ギャラリー',
    'nav.contact': 'お問い合わせ',
    'nav.reservations': '予約',
    
    // Hero Section
    'hero.title': '本田食堂',
    'hero.subtitle': 'Honda-Shokudo',
    'hero.description': '長野県下諏訪の中心部で本格的な西洋料理をお楽しみください。5席のバーと2つのテーブルでの親密なお食事をご体験ください。',
    'hero.reserve': '予約する',
    'hero.view-menu': 'メニューを見る',
    
    // Menu
    'menu.title': 'メニュー',
    'menu.lunch': 'ランチ',
    'menu.dinner': 'ディナー',
    'menu.lunch.available': 'ランチ: 11:30 - 14:00',
    'menu.dinner.available': 'ディナー: 18:00 - 22:00',
    
    // Reservations
    'reservations.title': '予約',
    'reservations.description': '本田食堂のテーブルを予約してください。ログイン不要です。',
    'reservations.name': '氏名',
    'reservations.phone': '電話番号',
    'reservations.date': '日付',
    'reservations.meal': '食事',
    'reservations.lunch': 'ランチ',
    'reservations.dinner': 'ディナー',
    'reservations.party-size': '人数',
    'reservations.seating': '席',
    'reservations.bar': 'バー（5席）',
    'reservations.table': 'テーブル（各6席）',
    'reservations.submit': '予約する',
    'reservations.success': '予約が確認されました！お客様をお迎えできることを楽しみにしております。',
    'reservations.error': '予約に失敗しました。もう一度お試しください。',
    'reservations.unavailable': 'この選択肢は選択された日付/食事でご利用いただけません。',
    'reservations.phone-exists': 'この日付にはすでにご予約をいただいております。',
    
    // Gallery
    'gallery.title': 'ギャラリー',
    
    // Contact
    'contact.title': 'お問い合わせ・営業時間',
    'contact.address': '住所',
    'contact.phone': '電話',
    'contact.hours': '営業時間',
    'contact.friday': '金曜日: 11:30–14:00, 18:00–22:00',
    'contact.saturday': '土曜日: 11:30–14:00, 18:00–22:00',
    'contact.sunday': '日曜日: 休業',
    'contact.monday': '月曜日（山の日）: 休業',
    'contact.tuesday': '火曜日: 11:30–14:00, 18:00–22:00',
    'contact.wednesday': '水曜日: 11:30–14:00, 18:00–22:00',
    'contact.thursday': '木曜日: 11:30–14:00, 18:00–22:00',
    
    // Common
    'common.loading': '読み込み中...',
    'common.error': 'エラーが発生しました',
    'common.close': '閉じる',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('honda-shokudo-language');
    if (saved && (saved === 'en' || saved === 'ja')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('honda-shokudo-language', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
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