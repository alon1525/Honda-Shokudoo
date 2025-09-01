import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const menuData = {
  lunch: {
    en: [
      {
        name: 'Wagyu Beef Bourguignon',
        description: 'Slow-braised Japanese wagyu in red wine with root vegetables and fresh herbs',
        price: '¥3,800'
      },
      {
        name: 'Miso-Glazed Salmon',
        description: 'Atlantic salmon with white miso glaze, seasonal vegetables, and quinoa',
        price: '¥2,900'
      },
      {
        name: 'Duck Confit Ramen',
        description: 'French duck confit in rich tonkotsu broth with handmade noodles',
        price: '¥2,400'
      },
      {
        name: 'Vegetarian Risotto',
        description: 'Creamy risotto with shiitake mushrooms, asparagus, and truffle oil',
        price: '¥2,200'
      }
    ],
    ja: [
      {
        name: '和牛ブルゴーニュ風',
        description: '日本産和牛を赤ワインで煮込み、根菜類とフレッシュハーブを添えて',
        price: '¥3,800'
      },
      {
        name: '味噌グレーズサーモン',
        description: 'アトランティックサーモンに白味噌グレーズ、季節野菜、キヌアを添えて',
        price: '¥2,900'
      },
      {
        name: 'ダックコンフィラーメン',
        description: 'フランス風鴨のコンフィを濃厚豚骨スープと手打ち麺で',
        price: '¥2,400'
      },
      {
        name: 'ベジタリアンリゾット',
        description: '椎茸、アスパラガス、トリュフオイルのクリーミーリゾット',
        price: '¥2,200'
      }
    ]
  },
  dinner: {
    en: [
      {
        name: 'Omakase Tasting Menu',
        description: '7-course chef\'s selection featuring seasonal ingredients and wine pairings',
        price: '¥12,000'
      },
      {
        name: 'A5 Wagyu Steak',
        description: 'Premium wagyu with wasabi butter, roasted vegetables, and red wine jus',
        price: '¥8,500'
      },
      {
        name: 'Lobster Thermidor',
        description: 'Japanese spiny lobster with miso-infused cream sauce and gratinéed cheese',
        price: '¥6,800'
      },
      {
        name: 'Sake-Braised Short Ribs',
        description: 'Tender beef short ribs braised in junmai sake with root vegetables',
        price: '¥4,200'
      },
      {
        name: 'Sea Bream Ceviche',
        description: 'Fresh sea bream with yuzu, cucumber, and micro shiso leaves',
        price: '¥3,600'
      }
    ],
    ja: [
      {
        name: 'おまかせテイスティングメニュー',
        description: '季節の食材とワインペアリングを楽しむシェフおまかせ7品コース',
        price: '¥12,000'
      },
      {
        name: 'A5和牛ステーキ',
        description: 'プレミアム和牛にわさびバター、ローストベジタブル、赤ワインソース',
        price: '¥8,500'
      },
      {
        name: 'ロブスターテルミドール',
        description: '日本産伊勢海老に味噌入りクリームソースとグラタンチーズ',
        price: '¥6,800'
      },
      {
        name: '日本酒煮込みショートリブ',
        description: '純米酒で煮込んだ柔らかな牛ショートリブと根菜類',
        price: '¥4,200'
      },
      {
        name: '真鯛のセビーチェ',
        description: '新鮮な真鯛に柚子、胡瓜、マイクロ紫蘇',
        price: '¥3,600'
      }
    ]
  }
};

export const MenuSection = () => {
  const { language, t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState('lunch');

  const currentMenu = menuData[activeMenu][language];

  const MenuToggleButton = ({ menuType, label }) => (
    <button
      onClick={() => setActiveMenu(menuType)}
      className={`px-8 py-3 rounded-md transition-colors ${
        activeMenu === menuType 
          ? 'bg-primary-600 text-white shadow-md' 
          : 'text-wood-600 hover:bg-cream-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-wood-800 mb-12">
            {t('menu.title')}
          </h2>
          
          <div className="flex justify-center mb-8">
            <div className="bg-cream-100 p-1 rounded-lg border border-cream-200">
              <MenuToggleButton menuType="lunch" label={t('menu.lunch')} />
              <MenuToggleButton menuType="dinner" label={t('menu.dinner')} />
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-wood-600">
              {activeMenu === 'lunch' ? t('menu.lunch.available') : t('menu.dinner.available')}
            </p>
          </div>

          <div className="space-y-6">
            {currentMenu.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-cream-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-wood-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-wood-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <span className="text-lg font-semibold text-primary-600">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
