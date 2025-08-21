import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const menuData = {
  lunch: {
    en: [
      {
        name: 'Hamburg Steak',
        description: 'Japanese-style hamburger steak with demi-glace sauce and seasonal vegetables',
        price: '¥1,800'
      },
      {
        name: 'Chicken Doria',
        description: 'Creamy rice gratin with tender chicken and cheese, baked to perfection',
        price: '¥1,500'
      },
      {
        name: 'Beef Curry',
        description: 'Rich European-style beef curry with tender vegetables and fragrant rice',
        price: '¥1,400'
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon, egg, and parmesan cheese',
        price: '¥1,600'
      }
    ],
    ja: [
      {
        name: 'ハンバーグステーキ',
        description: 'デミグラスソースと季節野菜を添えた日本式ハンバーグステーキ',
        price: '¥1,800'
      },
      {
        name: 'チキンドリア',
        description: 'チキンとチーズのクリーミーなライスグラタン、完璧に焼き上げました',
        price: '¥1,500'
      },
      {
        name: 'ビーフカレー',
        description: '柔らかな野菜と香り高いライスを添えた濃厚なヨーロッパ風ビーフカレー',
        price: '¥1,400'
      },
      {
        name: 'パスタカルボナーラ',
        description: 'ベーコン、卵、パルメザンチーズのクリーミーなパスタ',
        price: '¥1,600'
      }
    ]
  },
  dinner: {
    en: [
      {
        name: 'Steak Dinner',
        description: 'Premium beef steak with red wine sauce, roasted potatoes, and grilled vegetables',
        price: '¥3,500'
      },
      {
        name: 'Seafood Risotto',
        description: 'Creamy risotto with fresh seafood and herbs',
        price: '¥2,800'
      },
      {
        name: 'Roasted Duck',
        description: 'Tender roasted duck with orange glaze and seasonal accompaniments',
        price: '¥3,200'
      },
      {
        name: 'Fish of the Day',
        description: 'Fresh local fish prepared with butter sauce and market vegetables',
        price: '¥2,500'
      },
      {
        name: 'Chef\'s Course',
        description: '5-course tasting menu featuring seasonal ingredients and wine pairing',
        price: '¥5,500'
      }
    ],
    ja: [
      {
        name: 'ステーキディナー',
        description: 'プレミアム牛ステーキに赤ワインソース、ローストポテト、グリル野菜を添えて',
        price: '¥3,500'
      },
      {
        name: 'シーフードリゾット',
        description: '新鮮なシーフードとハーブのクリーミーなリゾット',
        price: '¥2,800'
      },
      {
        name: 'ローストダック',
        description: '柔らかなローストダックにオレンジグレーズと季節の付け合わせ',
        price: '¥3,200'
      },
      {
        name: '本日の魚料理',
        description: '新鮮な地元の魚をバターソースと市場の野菜で調理',
        price: '¥2,500'
      },
      {
        name: 'シェフのコース',
        description: '季節の食材とワインペアリングの5品テイスティングメニュー',
        price: '¥5,500'
      }
    ]
  }
};

export const MenuSection = () => {
  const { language, t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState('lunch');

  const currentMenu = menuData[activeMenu][language];

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            {t('menu.title')}
          </h2>
          
          {/* Menu Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-lg">
              <Button
                variant={activeMenu === 'lunch' ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setActiveMenu('lunch')}
                className="px-8"
              >
                {t('menu.lunch')}
              </Button>
              <Button
                variant={activeMenu === 'dinner' ? 'default' : 'ghost'}
                size="lg"
                onClick={() => setActiveMenu('dinner')}
                className="px-8"
              >
                {t('menu.dinner')}
              </Button>
            </div>
          </div>

          {/* Menu Hours */}
          <div className="text-center mb-12">
            <p className="text-muted-foreground">
              {activeMenu === 'lunch' ? t('menu.lunch.available') : t('menu.dinner.available')}
            </p>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            {currentMenu.map((item, index) => (
              <Card key={index} className="warm-shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-primary mb-2">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-6">
                      <span className="text-lg font-semibold text-accent">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};