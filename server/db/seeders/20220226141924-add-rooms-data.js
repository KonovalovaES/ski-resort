module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', [
      {
        form: 'room',
        title: 'Номер Стандарт',
        description: 'Классический номер гостиницы выполнен в спокойном лаконичном стиле скандинавского минимализма, уютный продуманный интерьер для двухместного размещения.',
        guestCount: 2,
        weekdayCost: 2900,
        weekendCost: 3900,
        images: 'standartRoom',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'room',
        title: 'Номер Комфорт',
        description: 'Классический номер гостиницы выполнен в спокойном лаконичном стиле скандинавского минимализма, уютный продуманный интерьер для двухместного размещения.',
        guestCount: 2,
        weekdayCost: 3900,
        weekendCost: 4900,
        images: 'comfortRoom',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'cottage',
        title: 'Коттедж Стандарт',
        description: 'Коттеджи «СТАНДАРТ» (30 коттеджей), размещение 4+2 (до 6-ти человек). Дома расположены в лесном массиве в центральной части нашего курорта. Все дома двухэтажные – деревянные, выполнены в спокойном и лаконичном стиле скандинавского минимализма, удобные и практичные! В наружной отделке использованы природные материалы: камень, дерево, черепица. Внутри – дизайнерская отделка деревом или камнем неброских светлых и тёмных цветов. Во всех коттеджах установлен тёплый пол.Постельное бельё и шторы выполнены из натуральных тканей. У каждого коттеджа прилегающая территория с уличной мебелью и мангалом. Ваш автомобиль может проехать на территорию для погрузки-выгрузки вещей, далее на охраняемую парковку.',
        guestCount: 6,
        weekdayCost: 6500,
        weekendCost: 9950,
        images: 'standartCottage',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'cottage',
        title: 'Коттедж Комфорт',
        description: 'Коттеджи «КОМФОРТ» (8 коттеджей), размещение 4+2 (до 6-ти человек). Дома расположены в отдельной части курорта, имеют свою закрытую забором территорию. Просторные двухэтажные коттеджи ,площадь 100 кв.м. Интерьер в стиле "прованс" — светлый, натуральный, пастельный. Деревянные стены с трещинками, терракотовая плитка в санузле, только натуральные материалы. Мебель с коваными элементами, крючки, подставки из керамики, фарфора, дерева , настенные натюрморты из картона, часы с росписью, подсвечники, полочки, зеркала в простых крашеных рамах, текстиль в деревенской манере. Особенностью коттеджей Люкс является наличие сауны и камина. Открытость, прозрачность, максимальный доступ воздуха и света обеспечивают ощущение пространства и свободы!',
        guestCount: 6,
        weekdayCost: 10000,
        weekendCost: 17450,
        images: 'comfortCottage',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        form: 'hotel',
        title: 'Спортивная гостиница',
        description: `Большое здание спортивной гостиницы расположено в коттеджном комплексе курорта в непосредственной близости от Основного склона, напротив ресторана «Панорама».
        К размещению до 40 человек.
        Гостиница рекомендуется к проживанию: спортивных команд, больших компаний, а также для гостей корпоративных мероприятий, возможно проведение различных тренингов , мастер классов и пр.

        На втором этаже здания:
        12 спальных комнат (с размещением 2-6 человек) с 2-х ярусными кроватями.
        2 санузла с душем расположены на этаже.
        На первом этаже здания:
        -просторный холл для большой компании с яркой мебелью (диваны, столы, стулья), ТВ
        -дополнительное помещение с панорамными окнами , удобное прорезиненное напольное покрытие.
        -просторная прихожая
        -санузел
        - техническое помещение (стиральная машина, сушилки для белья и пр.)
        КУХНЯ:
        -большой холодильник
        -индукционная плита с духовкой
        -микроволновая печь, чайник
        -набор кухонной мебели
        -комплект посуды для приготовления
        -столовые приборы, тарелки, чашки, салатники и пр.
        На прилегающей территории уличная мебель и мангал.
        Можно подъехать на автомобиле для погрузки/выгрузки.
        Парковка перед ресепшен — предоставляется для всех гостей -бесплатно.`,
        guestCount: 40,
        weekdayCost: 15000,
        weekendCost: 20000,
        images: 'hotel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    await queryInterface.bulkInsert('Rooms', [
      {
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
    await queryInterface.bulkDelete('Types', null, {});
  },
};
