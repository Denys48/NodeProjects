1.1 Кількість речей в категоріях
Стадія $group:
{
  "_id": "$category",
  "items": {
    $sum: 1
  }
}

Результат:
{
  "_id": "books",
  "items": 2
}
{
  "_id": "electronics",
  "items": 2
}
{
  "_id": "clothing",
  "items": 2
}
{
  "_id": "food",
  "items": 3
}

1.2 Середня ціна по категоріях
Стадія $group:
{
  "_id": "$category",
  "averagePrice": {$avg: "$price"}
}

Результат:
{
  "_id": "clothing",
  "averagePrice": 950
}
{
  "_id": "electronics",
  "averagePrice": 1350
}
{
  "_id": "books",
  "averagePrice": 405
}
{
  "_id": "food",
  "averagePrice": 31.666666666666668
}

1.3 Cумарна вартість всіх товарів
Cтадія $group:
{
  "_id": null,
  "totalPrice": {$sum: 
  	{$multiply: ["$price", "$stock"]}
  }
}

Результат:
{
  "_id": null,
  "totalPrice": 120041340
}

1.4 Вивести тільки ті категорії, у яких середня ціна більша за 300 
Стадія $group:
{
  "_id": "$category",
  "averagePrice": {$avg: "$price"}
}

Стадія $match
{
  "averagePrice": { "$gt": 300 }
}

Результат:
{
  "_id": "clothing",
  "averagePrice": 950
}
{
  "_id": "electronics",
  "averagePrice": 1350
}
{
  "_id": "books",
  "averagePrice": 405
}

1.5 Порахувати активних і неактивних користувачів
Стадія $group
{
  "_id": "$isActive",
  "quantity": {$sum: 1}
}

Результат:
{
  "_id": true,
  "quantity": 3
}
{
  "_id": false,
  "quantity": 2
}

2.1 Коли ми намагаємося якось фільтрувати чи шукати об'єки в колекції, COLLSCAN перевіряє всі документи на відповідність нашим вимогам, і це може займати багато часу. Для того, щоб спростити цю задачу, ми можемо створити індекси. Вони групують документи залежно від значення певного поля, тож звернувшись до індекса можна встановити, які документи відповідають певним вимогам без необхідності перевіряти кожен з них (IXSCAN).

2.2 
shopDB> db.products.getIndexes()
[ { v: 2, key: { _id: 1 }, name: '_id_' } ]
shopDB> db.users.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { email: 1 }, name: 'email_1', unique: true }
]

Індекс за полем email з'явився, бо у файі зі схемою було вказано unique: true, що автоматично створює унікальний індекс для пришвидшення пошуку і перевірки збігів.

2.3

db.products.find({ category: "electronics" }).explain("executionStats")

totalDocsExamined: 9,
totalKeysExamined: 0,
stage: 'COLLSCAN'

2.4
shopDB> db.products.createIndex({ category: 1 })
category_1

2.5

totalKeysExamined: 2,   totalDocsExamined: 9,
totalDocsExamined: 2,   totalKeysExamined: 0,
stage: 'IXSCAN'         stage: 'COLLSCAN'

Використання індексу дозволило використати IXSCAN і не переглядати всі 9 документів, а лише 2, які відповідали вимогам. Їх було знайдено за ключами в індексі.

2.6

E11000 duplicate key error collection: shopDB.users index: email_1 dup key: { email: \"hetman@example.com\"}
Помилка виникла, бо було створено індекс для поля емейл, який забороняє мати однакове значення цього поля кільком документам


Кількіссть переглянутих документів зменшилася завдяки створенню індекса та використанню IXSCAN замість COLLSCAN. Таким чином вдалося відшукати потрібні документи за ключами індекса, а не перевіряти всі по-черзі
