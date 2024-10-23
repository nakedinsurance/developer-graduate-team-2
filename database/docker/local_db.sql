-- Create tables
CREATE TABLE product (
    productId UUID PRIMARY KEY,
    category VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    price FLOAT,
    stock INT
);

CREATE TABLE customer (
    customerId UUID PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    age INT,
    gender VARCHAR(50)
);

CREATE TABLE customer_product (
    customerId UUID,
    productId UUID,
    PRIMARY KEY (customerId, productId),
    FOREIGN KEY (customerId) REFERENCES customer(customerId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

INSERT INTO product (productId, category, name, description, price, stock) VALUES
('f966934e-883e-4c6f-ab34-aeeeb764ccc7', 'Phone', 'iPhone 14 Pro Max', 'High-end flagship phone', 27999, 1),
('c82f9ef5-6ab0-4b54-885b-7963f00b6144', 'Phone', 'Samsung Galaxy S23 Ultra', 'High-end flagship phone', 25499, 1),
('d37b5201-e2b1-4565-a221-dde51a15775c', 'Phone', 'Google Pixel 7 Pro', 'Flagship phone with advanced camera', 20999, 2),
('a60ff54e-216f-4f94-86b0-7d00692ca069', 'Phone', 'Huawei P50 Pro', 'High-end phone with Leica cameras', 18999, 1),
('dcb0ff20-2473-4da3-bd1a-135c65593992', 'Phone', 'OnePlus 11', 'Premium phone with high-performance specs', 16499, 3),
('b6d25500-85f7-4521-833a-106180feee2d', 'Phone', 'Xiaomi 12 Pro', 'Flagship killer with excellent value', 14999, 2),
('bc3e7a70-cb99-4717-b36e-ad64209901f2', 'Phone', 'Samsung Galaxy A54', 'Mid-range phone with solid performance', 9499, 4),
('d41cc709-c9a5-47ab-947f-655506aff6a1', 'Phone', 'Oppo Reno7', 'Stylish mid-range phone', 7999, 5),
('8fe62661-032a-44d2-980a-2c9fac95c222', 'Phone', 'Huawei Nova Y70', 'Affordable phone with large battery', 4499, 5),
('a0e7dcf7-fd9c-418a-ab1e-ffaab17f7a6a', 'Phone', 'Nokia C10', 'Very affordable entry-level smartphone', 1299, 2),
('859ac105-2617-43e4-ae00-5810aa5ddb56', 'Tablet', 'Apple iPad Pro 12.9" (5th Gen)', 'High-end professional tablet with M1 chip', 31999, 1),
('a6947aac-63d5-46cd-b2c6-af98e939a194', 'Tablet', 'Samsung Galaxy Tab S8 Ultra', 'Premium large-screen Android tablet', 23999, 1),
('4d1a093c-8981-4a60-a8c9-eccc40283a19', 'Tablet', 'Microsoft Surface Pro 8', 'High-performance 2-in-1 tablet and laptop', 21999, 2),
('6ffd27d7-56f3-47dd-9ce6-10eb320da31e', 'Tablet', 'Apple iPad Air (4th Gen)', 'Mid-range tablet with high performance and lightweight design', 15499, 1),
('a9965dfd-182a-4744-a087-9586393d997c', 'Tablet', 'Samsung Galaxy Tab S7 FE', 'Upper mid-range tablet with a large display', 12999, 3),
('c281a0f5-a0d2-4285-b9ad-64e84b61be3d', 'Tablet', 'Huawei MatePad Pro', 'Premium Android tablet with great display', 10499, 2),
('fd181be8-909b-4049-8198-6a538dd9f558', 'Tablet', 'Lenovo Tab P11 Pro', 'High-quality tablet with solid performance', 9499, 3),
('84dd7781-899b-4f8e-81c0-570e11732987', 'Tablet', 'Samsung Galaxy Tab A8', 'Affordable mid-range tablet for daily use', 5499, 5),
('6f938d8f-9176-45a8-b78b-0c584e3fa1bb', 'Tablet', 'TCL 10 Tab Max', 'Budget-friendly tablet with decent performance', 3999, 5),
('4f72bf04-002b-4f21-89c4-049971af5bdf', 'Tablet', 'Lenovo Tab M7', 'Very affordable entry-level tablet', 1499, 2),
('e2a9566b-c986-4ac9-bab8-60ea58e401ea', 'Camera', 'Canon EOS R5', 'Professional full-frame mirrorless camera', 72999, 1),
('effb8438-d941-4b16-b6f7-bf69da6722fe', 'Camera', 'Sony Alpha 1 (A1)', 'High-end professional mirrorless camera', 94999, 0),
('b9f59631-7edc-437a-ae6f-9e76ff211616', 'Camera', 'Nikon Z7 II', 'Full-frame mirrorless camera for professionals', 63999, 2),
('04baafd4-cf54-4808-be3b-811f0ffd5470', 'Camera', 'Fujifilm GFX 100S', 'Medium format camera for professional photographers', 124999, 1),
('3becd0da-ed33-491c-9291-4b85ce7750f7', 'Camera', 'Sony A7C', 'Compact full-frame mirrorless camera', 34999, 3),
('338b7bd0-f526-4874-8f57-07374d65d3d6', 'Camera', 'Canon EOS 90D', 'High-end DSLR for enthusiasts and professionals', 24499, 2),
('ab417730-9e06-470f-9790-b8a1c315159b', 'Camera', 'Nikon D7500', 'Advanced DSLR for enthusiasts', 18999, 4),
('1a5a789d-3faf-4a75-b6c5-a1bed741e174', 'Camera', 'Olympus OM-D E-M10 Mark IV', 'Mid-range mirrorless camera for casual and hobbyist photographers', 12999, 4),
('358b69e5-dc03-4dc3-b8d1-dca9cf6f0eb8', 'Camera', 'Sony ZV-1', 'Compact camera designed for vloggers', 11499, 5),
('a6184415-8d99-41ef-a7ca-68866a789153', 'Camera', 'Canon PowerShot SX540 HS', 'Affordable superzoom compact camera', 5999, 2),
('fc57f087-561d-4a7b-8486-4abd62396d4d', 'Laptop', 'Apple MacBook Pro 16" (M2 Max)', 'High-end professional laptop with M2 Max chip', 62999, 1),
('85711bc3-f2fb-4d36-9f39-6f80b2d12045', 'Laptop', 'Dell XPS 15 (2023)', 'Premium ultrabook with powerful performance and stunning display', 47999, 1),
('30076fd4-b972-41c9-afa2-6faac08ae90d', 'Laptop', 'Microsoft Surface Laptop Studio', 'High-performance 2-in-1 laptop for creators and professionals', 39999, 2),
('ca7129c3-bb26-4161-bb5d-10f68733e0c6', 'Laptop', 'Razer Blade 15 Advanced (2023)', 'High-end gaming laptop with powerful graphics', 44999, 1),
('d5ee3bad-fb70-4184-b28c-6b9a965e70b6', 'Laptop', 'HP Spectre x360 14', 'Premium convertible 2-in-1 laptop with excellent design', 31499, 3),
('b02ccb57-6223-4496-b94e-b0d4b7972f5c', 'Laptop', 'Apple MacBook Air (M2, 2022)', 'Lightweight and powerful MacBook for everyday use', 25499, 2),
('c6e2f8fd-7ffd-45fb-a35e-70519841715b', 'Laptop', 'ASUS ROG Zephyrus G14', 'High-performance gaming laptop with compact design', 24999, 4),
('ee5a859f-6af2-48a7-8373-b55f5b0874da', 'Laptop', 'Lenovo Yoga 7i', 'Mid-range 2-in-1 laptop with good performance and portability', 17999, 5),
('495ca07e-64ad-4038-857e-f40be4ca575b', 'Laptop', 'Acer Aspire 5', 'Affordable everyday laptop for work and study', 11999, 5),
('fa0f521a-cc1e-4ce8-a50d-b0a1605c7424', 'Laptop', 'HP Pavilion 15', 'Budget-friendly laptop with decent performance for basic tasks', 8499, 2),
('1a6484f6-d1d2-40a8-a39d-59417642a9ae', 'Desktop', 'Apple Mac Pro (2023)', 'High-end professional desktop for advanced computing and rendering', 179999, 1),
('da2b049d-e451-4afe-8027-2307d21fce38', 'Desktop', 'Alienware Aurora R13', 'High-performance gaming desktop with powerful GPU and CPU', 64999, 1),
('9ba38646-6cf0-4e55-9bfd-c85a04155650', 'Desktop', 'HP Omen 45L', 'Premium gaming desktop with high-end specs for enthusiasts', 52999, 2),
('5c80050e-ee27-49c9-a65d-83cc3457d5a6', 'Desktop', 'Dell XPS Desktop (Special Edition)', 'High-end desktop for professional creators and power users', 39999, 1),
('780d4f92-e00d-4d20-846d-f6a0d03deba6', 'Desktop', 'Corsair One i300', 'Compact desktop with advanced cooling for gaming and professional tasks', 49999, 3),
('72384ab9-47db-4352-bf34-8a3bbc0885fa', 'Desktop', 'Lenovo Legion Tower 7i', 'Gaming desktop with excellent cooling and powerful graphics', 28999, 2),
('78d077c4-61dd-4bf8-88dc-bd568f788f6c', 'Desktop', 'HP Envy Desktop', 'High-performance desktop for content creation and heavy multitasking', 24499, 4),
('69571681-c134-4c07-bd3b-21efaffdce52', 'Desktop', 'Acer Aspire TC', 'Mid-range desktop for everyday productivity and multimedia tasks', 15999, 5),
('db309ec3-1b2c-4d88-b57c-3567ab13ce20', 'Desktop', 'Dell Inspiron Desktop 3891', 'Budget-friendly desktop for basic computing and home use', 9999, 5),
('30e6de64-5573-46c6-9daf-fca44209ed71', 'Desktop', 'Lenovo IdeaCentre 3', 'Affordable desktop for casual users and students', 7499, 2),
('55d547e8-e2a9-475d-9eff-fa4050ab3add', 'Television', 'LG OLED77C1 77" 4K Smart OLED TV', 'Premium 4K OLED TV with stunning visuals and smart features', 74999, 1),
('9c018401-7da3-445c-9a31-c6f815855c1a', 'Television', 'Samsung QN85A 85" Neo QLED 4K Smart TV', 'High-end 4K QLED TV with advanced HDR and smart features', 69999, 1),
('773e1ad7-a154-4ee8-92f2-c934352a0c43', 'Television', 'Sony BRAVIA XR A90J 65" OLED 4K TV', 'Top-tier 4K OLED TV with the latest XR picture technology', 54999, 2),
('f0e84a85-dc51-4cfc-a6de-88c0cda2a194', 'Television', 'Hisense 75U8G 75" ULED 4K Smart TV', 'High-performance ULED TV with 4K resolution and full array local dimming', 39999, 1),
('99be1f12-3583-4ee1-8350-01932dca5c8e', 'Television', 'Samsung Q60A 65" QLED 4K Smart TV', 'Mid-range 4K QLED TV with vibrant colors and smart capabilities', 24999, 3),
('e030e8d2-c086-46d2-80c0-d95e6fc3bde7', 'Television', 'LG NanoCell 65NANO86 65" 4K Smart TV', '4K NanoCell TV with high color accuracy and HDR support', 22999, 2),
('f792cea7-23be-4701-83c3-924cf98977c1', 'Television', 'TCL 65C815 65" QLED 4K Smart TV', 'Budget-friendly 4K QLED TV with HDR support and Android TV', 15999, 7),
('57f743fb-8b90-413e-bedf-8fd3108a0206', 'Television', 'Hisense 55A6G 55" UHD 4K Smart TV', 'Affordable 4K TV with smart features and decent picture quality', 8999, 5),
('c843ba02-4f2f-4d6c-98de-e4948cc70d9b', 'Television', 'Skyworth 50TB7000 50" UHD 4K Android TV', 'Affordable Android TV with 4K resolution and smart features', 6999, 5),
('e126868f-9302-4c10-9560-7898b34af4db', 'Television', 'JVC LT-40N7115 40" Full HD Smart LED TV', 'Budget-friendly Full HD TV with basic smart features', 4499, 2),
('6b4967a2-189d-4a1d-a85c-d659ea4ad355', 'Monitor', 'Dell UltraSharp U4320Q 43" 4K Monitor', 'High-end 4K monitor with ultra-wide display for professional use', 26999, 1),
('bb816191-4744-4d41-b024-0dd5f356393c', 'Monitor', 'Apple Pro Display XDR 32" 6K Monitor', 'Professional-grade 6K monitor with advanced color accuracy and brightness', 79999, 0),
('1b0ba82c-b4f4-4787-949f-6e3867f2d1f5', 'Monitor', 'Samsung Odyssey G9 49" Curved QHD Gaming Monitor', 'Premium ultra-wide curved gaming monitor with QHD resolution and high refresh rate', 34999, 2),
('68185c5a-aca5-451d-b8fe-cdeb345ece3e', 'Monitor', 'LG UltraGear 38GN950-B 38" Curved QHD Monitor', 'High-end curved monitor with G-Sync for gaming and productivity', 24999, 1),
('034a0562-3b2c-4ea5-a656-f819109d7405', 'Monitor', 'ASUS ROG Swift PG32UQ 32" 4K Gaming Monitor', 'High-performance 4K gaming monitor with HDR and G-Sync compatibility', 22499, 3),
('74d757d2-4b82-4f7b-964d-1816f51bf8c0', 'Monitor', 'BenQ PD3200U 32" 4K Designer Monitor', '4K monitor designed for creative professionals with excellent color accuracy', 18999, 2),
('ea2c9075-f38c-43f7-a2a9-57fb827be4fc', 'Monitor', 'AOC U2790PQU 27" 4K Monitor', 'Affordable 4K monitor with IPS panel for professional and casual use', 9999, 4),
('7f8de3cd-755a-4e1d-9ec8-99c2d1744b22', 'Monitor', 'Samsung Odyssey G5 27" Curved QHD Gaming Monitor', 'Mid-range curved gaming monitor with QHD resolution and 144Hz refresh rate', 7499, 5),
('a0b1d45a-bf7f-43e6-8332-117f3c719b92', 'Monitor', 'Dell S2421H 24" Full HD Monitor', 'Budget-friendly monitor with Full HD resolution and slim bezels', 4499, 5),
('cae33bcb-1d4f-454d-a162-9d0705f3ec8a', 'Monitor', 'LG 22MK430H 22" Full HD Monitor', 'Affordable Full HD monitor with IPS display for everyday use', 2499, 2),
('05e26784-00a4-4635-9bd2-3884b44899cb', 'Smartwatch', 'Apple Watch Ultra', 'High-end rugged smartwatch with advanced health tracking and diving features', 18999, 1),
('f155e82e-014f-42b6-8333-e91b9c8a1162', 'Smartwatch', 'TAG Heuer Connected Modular 45', 'Luxury smartwatch with customizable design and premium build quality', 25999, 1),
('af7c6f0b-ee9d-4ef9-9ad0-ecd2d0fba7c7', 'Smartwatch', 'Garmin Fenix 7X Sapphire Solar', 'High-end multisport GPS smartwatch with solar charging and advanced fitness tracking', 17999, 2),
('1e0acd16-29b2-4831-a47a-8702f12fe07b', 'Smartwatch', 'Samsung Galaxy Watch5 Pro', 'Premium smartwatch with advanced fitness tracking and long battery life', 11499, 1),
('9850f5eb-c18d-4916-b891-f6c81bb207e2', 'Smartwatch', 'Apple Watch Series 8', 'Popular high-end smartwatch with ECG and blood oxygen monitoring', 9499, 2),
('37714786-032f-4225-bdeb-90f7f7adab4b', 'Smartwatch', 'Garmin Forerunner 955', 'Advanced GPS running smartwatch with long battery life and training features', 8999, 2),
('020e1611-398b-4bbb-aaf4-0985181fd6f0', 'Smartwatch', 'Fitbit Sense 2', 'Health-focused smartwatch with stress management and ECG monitoring', 6499, 6),
('11e98d0f-c3ef-452a-b0d1-9147fc876c00', 'Smartwatch', 'Huawei Watch GT 3 Pro', 'Stylish smartwatch with robust fitness tracking and long battery life', 5999, 5),
('e66c6666-4913-43b8-b77e-410e00c4e422', 'Smartwatch', 'Amazfit GTR 4', 'Affordable smartwatch with built-in GPS and health monitoring', 3999, 5),
('bcaf6405-2599-4498-a9a3-3245321c165f', 'Smartwatch', 'Xiaomi Mi Watch Lite', 'Budget-friendly smartwatch with essential fitness tracking and long battery life', 1299, 10),
('c7619e0c-c2ad-4a78-b280-b84a9a161318', 'Headphone', 'Focal Utopia', 'High-end audiophile-grade over-ear open-back headphones', 65999, 1),
('a9a9b185-9f9f-461c-8681-684e8122721e', 'Headphone', 'Audeze LCD-4', 'Premium planar magnetic headphones with exceptional sound quality', 54999, 1),
('ac32d8e8-c6cf-46b6-afb2-a307316001d5', 'Headphone', 'Sony WH-1000XM5', 'Premium wireless noise-canceling over-ear headphones', 8499, 2),
('8972cd7d-c0d6-4ef9-ba52-873c21f9a1a2', 'Headphone', 'Bose Noise Cancelling Headphones 700', 'High-end noise-canceling over-ear headphones with excellent sound and call quality', 7499, 1),
('a3a56f6e-23bf-4b9a-8b06-c6664e902c13', 'Headphone', 'Sennheiser Momentum 4 Wireless', 'Wireless over-ear headphones with active noise cancellation and premium sound', 6999, 3),
('01fd47be-4e56-4f03-9bd9-f332d0aa5d3d', 'Headphone', 'Apple AirPods Max', 'High-end over-ear headphones with noise cancellation and immersive sound', 11499, 2),
('5fcb516f-d9dd-4efd-9f22-cbd146911565', 'Headphone', 'Bowers & Wilkins PX7', 'Premium wireless over-ear headphones with noise cancellation and top-tier sound', 6499, 4),
('7f679b11-a953-4203-902e-5d7dc2d744f2', 'Headphone', 'Beats Studio 3 Wireless', 'Wireless noise-canceling headphones with powerful bass and Apple integration', 5999, 3),
('28c0abf9-a098-4183-91bd-917b0f539483', 'Headphone', 'JBL Live 660NC', 'Mid-range over-ear wireless headphones with active noise cancellation', 3299, 5),
('79299306-1394-4032-8e97-27653107d274', 'Headphone', 'Sony WH-CH710N', 'Affordable wireless over-ear noise-canceling headphones', 2499, 7);



INSERT INTO customer (customerId, name, email, age, gender) VALUES
('cdad3ffd-f5d6-488e-b76f-a92a151b7c72', 'Alexander Tapia', 'phillipsilva@example.com', 39, 'male'),
('0fbb07a7-8454-487d-861f-04af55dbea0b', 'Alan Johnson', 'samuel29@example.org', 58, 'female'),
('e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf', 'Patrick Wallace', 'cody21@example.com', 24, 'male'),
('696fd9c7-085c-47e7-9d0a-8e0b68f347fa', 'Sara Burns', 'jessicaschneider@example.org', 28, 'female'),
('0d891e8f-5278-4f06-97aa-1600a71e0586', 'Kayla Wells', 'george52@example.com', 52, 'male'),
('66849eb3-f259-41f4-961b-8e155fb94abf', 'Nancy Mcclain', 'leestephanie@example.com', 40, 'male'),
('03ca8d20-cb2f-4eec-a5e2-bd0cfe098f51', 'Sheena Brown', 'tshaw@example.org', 50, 'male'),
('44f2f7f8-2612-4dc8-981d-0337e2d7fd48', 'Ashley Andrade', 'lcox@example.com', 45, 'male'),
('c38b2fff-baba-4d31-9d97-e45d853b9cad', 'Catherine Gray', 'sstone@example.com', 63, 'female'),
('af9e04d8-cb33-44ab-86d0-cb06ca721d70', 'Jason Shaw', 'shane70@example.com', 33, 'male'),
('39d4151f-da59-43ef-83aa-4ee3dbd5af1f', 'Ashley Li', 'stephanie56@example.com', 42, 'female'),
('df0c33e1-5a46-4748-a0c2-32499ad318ef', 'Kathleen Bird', 'belljennifer@example.org', 29, 'male'),
('cc6ca37e-1db0-4999-b671-05312c11933e', 'Heidi Watson', 'wrightwilliam@example.com', 18, 'female'),
('3ce8ed90-7a2c-424a-8ba9-11d0a6d1ff1a', 'Julie Johnson', 'diana56@example.org', 22, 'female'),
('966433bc-dd77-4e6a-89c9-b222facd69ae', 'Darren Klein', 'christinabanks@example.org', 19, 'male'),
('2b8f70de-d864-44ed-8252-7fa4ea475970', 'Julie Thompson', 'jefferycontreras@example.org', 27, 'male'),
('69ba429e-3a99-488e-82a4-74b35d0d809a', 'Sydney Johnson', 'bradleycassandra@example.net', 41, 'female'),
('1460b0d5-dffc-415d-ac1f-5bf898773e38', 'Angela Price', 'melindamiller@example.net', 26, 'male'),
('9466abd8-ab07-447a-99b4-ac2f888058cd', 'Christopher Howell', 'pamelahall@example.org', 28, 'male'),
('7827af35-2fe3-4b1e-82a3-98f1098e40a6', 'Gregory Cortez', 'lisawebb@example.net', 31, 'male'),
('56d27279-e2cb-4494-bc3a-f99dbc146b80', 'Ashley Underwood', 'sellerswanda@example.com', 36, 'female'),
('8f3d317a-a341-4669-96f2-f8364457949e', 'John Smith', 'sonyamiller@example.org', 29, 'female'),
('a4a25dd8-da95-4430-9843-c5c99f5cf826', 'Jason Barrett', 'lauraleach@example.net', 20, 'male'),
('92f6c3c7-920d-4c19-826b-f27e8b9e65f0', 'Brian Brooks', 'iharper@example.net', 65, 'male'),
('83c4d3f5-1b0a-4b96-b312-8f5a5f164ba1', 'Brent Olson', 'kevin27@example.org', 63, 'male'),
('ff68a4ed-6c60-4635-a0b9-e52f7850327e', 'David Ochoa', 'dmorris@example.com', 52, 'male'),
('b3411df8-9acf-4ac3-b4c2-9ad56533dcff', 'Justin Hernandez', 'dgriffin@example.com', 38, 'female'),
('89974c02-2c4c-4c53-9cc8-7fbdc0d0b95f', 'Regina Salazar', 'haynesmichael@example.net', 36, 'female'),
('8a2d9f74-81fe-4cc6-b28f-1ac3ac374ecd', 'Jeffrey Snyder', 'allen57@example.com', 57, 'female'),
('ab17446e-6505-4625-9933-80de2a1bd1bc', 'Derek Ray', 'brian88@example.org', 53, 'female'),
('cb576996-7397-4f15-ac4b-4a4b3066e974', 'Lori Ray', 'brownpeter@example.org', 26, 'male'),
('9dd4627a-1b13-4be4-9567-78d68460d777', 'Jeremy Pena', 'earnold@example.org', 56, 'male'),
('58789804-5707-4060-bf4c-5d76dacb048b', 'Michelle Beck', 'charlescampbell@example.org', 52, 'male'),
('4c5f7286-923d-4b59-a64b-4cecbf145400', 'Frederick Lowe', 'cbowman@example.org', 43, 'female'),
('8e44845d-e683-47f2-8617-66314a1be0e1', 'Justin Lee', 'vhatfield@example.com', 33, 'male'),
('cbe3187f-6988-45fb-b713-12d7032695bb', 'Courtney Aguirre', 'michaelabaxter@example.org', 61, 'male');

INSERT INTO customer_product (customerId, productId) VALUES
('cdad3ffd-f5d6-488e-b76f-a92a151b7c72', 'e2a9566b-c986-4ac9-bab8-60ea58e401ea'),
('cdad3ffd-f5d6-488e-b76f-a92a151b7c72', '358b69e5-dc03-4dc3-b8d1-dca9cf6f0eb8'),
('cdad3ffd-f5d6-488e-b76f-a92a151b7c72', '11e98d0f-c3ef-452a-b0d1-9147fc876c00'),
('cdad3ffd-f5d6-488e-b76f-a92a151b7c72', 'f155e82e-014f-42b6-8333-e91b9c8a1162'),
('0fbb07a7-8454-487d-861f-04af55dbea0b', '358b69e5-dc03-4dc3-b8d1-dca9cf6f0eb8'),
('e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf', '72384ab9-47db-4352-bf34-8a3bbc0885fa'),
('e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf', 'a9a9b185-9f9f-461c-8681-684e8122721e'),
('e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf', '01fd47be-4e56-4f03-9bd9-f332d0aa5d3d'),
('696fd9c7-085c-47e7-9d0a-8e0b68f347fa', 'b02ccb57-6223-4496-b94e-b0d4b7972f5c'),
('696fd9c7-085c-47e7-9d0a-8e0b68f347fa', 'a6947aac-63d5-46cd-b2c6-af98e939a194'),
('0d891e8f-5278-4f06-97aa-1600a71e0586', '859ac105-2617-43e4-ae00-5810aa5ddb56'),
('0d891e8f-5278-4f06-97aa-1600a71e0586', 'fd181be8-909b-4049-8198-6a538dd9f558'),
('66849eb3-f259-41f4-961b-8e155fb94abf', '7f8de3cd-755a-4e1d-9ec8-99c2d1744b22'),
('66849eb3-f259-41f4-961b-8e155fb94abf', 'bb816191-4744-4d41-b024-0dd5f356393c'),
('03ca8d20-cb2f-4eec-a5e2-bd0cfe098f51', '84dd7781-899b-4f8e-81c0-570e11732987'),
('03ca8d20-cb2f-4eec-a5e2-bd0cfe098f51', 'e126868f-9302-4c10-9560-7898b34af4db'),
('44f2f7f8-2612-4dc8-981d-0337e2d7fd48', 'e126868f-9302-4c10-9560-7898b34af4db'),
('c38b2fff-baba-4d31-9d97-e45d853b9cad', '4f72bf04-002b-4f21-89c4-049971af5bdf'),
('c38b2fff-baba-4d31-9d97-e45d853b9cad', '84dd7781-899b-4f8e-81c0-570e11732987'),
('c38b2fff-baba-4d31-9d97-e45d853b9cad', '3becd0da-ed33-491c-9291-4b85ce7750f7'),
('c38b2fff-baba-4d31-9d97-e45d853b9cad', 'e2a9566b-c986-4ac9-bab8-60ea58e401ea'),
('af9e04d8-cb33-44ab-86d0-cb06ca721d70', 'a6184415-8d99-41ef-a7ca-68866a789153'),
('af9e04d8-cb33-44ab-86d0-cb06ca721d70', '338b7bd0-f526-4874-8f57-07374d65d3d6'),
('39d4151f-da59-43ef-83aa-4ee3dbd5af1f', '6ffd27d7-56f3-47dd-9ce6-10eb320da31e'),
('39d4151f-da59-43ef-83aa-4ee3dbd5af1f', '859ac105-2617-43e4-ae00-5810aa5ddb56'),
('39d4151f-da59-43ef-83aa-4ee3dbd5af1f', '04baafd4-cf54-4808-be3b-811f0ffd5470'),
('39d4151f-da59-43ef-83aa-4ee3dbd5af1f', 'e2a9566b-c986-4ac9-bab8-60ea58e401ea'),
('df0c33e1-5a46-4748-a0c2-32499ad318ef', 'bcaf6405-2599-4498-a9a3-3245321c165f'),
('df0c33e1-5a46-4748-a0c2-32499ad318ef', 'a0e7dcf7-fd9c-418a-ab1e-ffaab17f7a6a'),
('cc6ca37e-1db0-4999-b671-05312c11933e', 'b02ccb57-6223-4496-b94e-b0d4b7972f5c'),
('cc6ca37e-1db0-4999-b671-05312c11933e', 'bcaf6405-2599-4498-a9a3-3245321c165f'),
('3ce8ed90-7a2c-424a-8ba9-11d0a6d1ff1a', 'e66c6666-4913-43b8-b77e-410e00c4e422'),
('966433bc-dd77-4e6a-89c9-b222facd69ae', '7f679b11-a953-4203-902e-5d7dc2d744f2'),
('966433bc-dd77-4e6a-89c9-b222facd69ae', 'd41cc709-c9a5-47ab-947f-655506aff6a1'),
('2b8f70de-d864-44ed-8252-7fa4ea475970', 'ea2c9075-f38c-43f7-a2a9-57fb827be4fc'),
('2b8f70de-d864-44ed-8252-7fa4ea475970', 'bcaf6405-2599-4498-a9a3-3245321c165f'),
('69ba429e-3a99-488e-82a4-74b35d0d809a', '859ac105-2617-43e4-ae00-5810aa5ddb56'),
('69ba429e-3a99-488e-82a4-74b35d0d809a', '04baafd4-cf54-4808-be3b-811f0ffd5470'),
('1460b0d5-dffc-415d-ac1f-5bf898773e38', 'ea2c9075-f38c-43f7-a2a9-57fb827be4fc'),
('1460b0d5-dffc-415d-ac1f-5bf898773e38', 'a0b1d45a-bf7f-43e6-8332-117f3c719b92'),
('9466abd8-ab07-447a-99b4-ac2f888058cd', 'ab417730-9e06-470f-9790-b8a1c315159b'),
('9466abd8-ab07-447a-99b4-ac2f888058cd', '1a5a789d-3faf-4a75-b6c5-a1bed741e174'),
('7827af35-2fe3-4b1e-82a3-98f1098e40a6', 'fc57f087-561d-4a7b-8486-4abd62396d4d'),
('7827af35-2fe3-4b1e-82a3-98f1098e40a6', '30076fd4-b972-41c9-afa2-6faac08ae90d'),
('56d27279-e2cb-4494-bc3a-f99dbc146b80', 'a6184415-8d99-41ef-a7ca-68866a789153'),
('56d27279-e2cb-4494-bc3a-f99dbc146b80', '358b69e5-dc03-4dc3-b8d1-dca9cf6f0eb8'),
('8f3d317a-a341-4669-96f2-f8364457949e', '85711bc3-f2fb-4d36-9f39-6f80b2d12045'),
('8f3d317a-a341-4669-96f2-f8364457949e', 'c6e2f8fd-7ffd-45fb-a35e-70519841715b'),
('8f3d317a-a341-4669-96f2-f8364457949e', 'a6184415-8d99-41ef-a7ca-68866a789153'),
('a4a25dd8-da95-4430-9843-c5c99f5cf826', '9ba38646-6cf0-4e55-9bfd-c85a04155650'),
('a4a25dd8-da95-4430-9843-c5c99f5cf826', '78d077c4-61dd-4bf8-88dc-bd568f788f6c'),
('92f6c3c7-920d-4c19-826b-f27e8b9e65f0', '55d547e8-e2a9-475d-9eff-fa4050ab3add'),
('92f6c3c7-920d-4c19-826b-f27e8b9e65f0', '773e1ad7-a154-4ee8-92f2-c934352a0c43'),
('92f6c3c7-920d-4c19-826b-f27e8b9e65f0', 'ab417730-9e06-470f-9790-b8a1c315159b'),
('83c4d3f5-1b0a-4b96-b312-8f5a5f164ba1', 'e126868f-9302-4c10-9560-7898b34af4db'),
('ff68a4ed-6c60-4635-a0b9-e52f7850327e', '55d547e8-e2a9-475d-9eff-fa4050ab3add'),
('ff68a4ed-6c60-4635-a0b9-e52f7850327e', 'f792cea7-23be-4701-83c3-924cf98977c1'),
('b3411df8-9acf-4ac3-b4c2-9ad56533dcff', 'ca7129c3-bb26-4161-bb5d-10f68733e0c6'),
('b3411df8-9acf-4ac3-b4c2-9ad56533dcff', '6ffd27d7-56f3-47dd-9ce6-10eb320da31e'),
('b3411df8-9acf-4ac3-b4c2-9ad56533dcff', 'fd181be8-909b-4049-8198-6a538dd9f558'),
('89974c02-2c4c-4c53-9cc8-7fbdc0d0b95f', 'fc57f087-561d-4a7b-8486-4abd62396d4d'),
('8a2d9f74-81fe-4cc6-b28f-1ac3ac374ecd', 'effb8438-d941-4b16-b6f7-bf69da6722fe'),
('8a2d9f74-81fe-4cc6-b28f-1ac3ac374ecd', 'c281a0f5-a0d2-4285-b9ad-64e84b61be3d'),
('8a2d9f74-81fe-4cc6-b28f-1ac3ac374ecd', 'fd181be8-909b-4049-8198-6a538dd9f558'),
('ab17446e-6505-4625-9933-80de2a1bd1bc', '4d1a093c-8981-4a60-a8c9-eccc40283a19'),
('ab17446e-6505-4625-9933-80de2a1bd1bc', 'a6947aac-63d5-46cd-b2c6-af98e939a194'),
('cb576996-7397-4f15-ac4b-4a4b3066e974', 'f966934e-883e-4c6f-ab34-aeeeb764ccc7'),
('cb576996-7397-4f15-ac4b-4a4b3066e974', 'bcaf6405-2599-4498-a9a3-3245321c165f'),
('cb576996-7397-4f15-ac4b-4a4b3066e974', '020e1611-398b-4bbb-aaf4-0985181fd6f0'),
('9dd4627a-1b13-4be4-9567-78d68460d777', '358b69e5-dc03-4dc3-b8d1-dca9cf6f0eb8'),
('9dd4627a-1b13-4be4-9567-78d68460d777', 'a6184415-8d99-41ef-a7ca-68866a789153'),
('58789804-5707-4060-bf4c-5d76dacb048b', '55d547e8-e2a9-475d-9eff-fa4050ab3add'),
('58789804-5707-4060-bf4c-5d76dacb048b', '57f743fb-8b90-413e-bedf-8fd3108a0206'),
('58789804-5707-4060-bf4c-5d76dacb048b', '6f938d8f-9176-45a8-b78b-0c584e3fa1bb'),
('58789804-5707-4060-bf4c-5d76dacb048b', '6ffd27d7-56f3-47dd-9ce6-10eb320da31e'),
('4c5f7286-923d-4b59-a64b-4cecbf145400', 'a9965dfd-182a-4744-a087-9586393d997c'),
('4c5f7286-923d-4b59-a64b-4cecbf145400', '859ac105-2617-43e4-ae00-5810aa5ddb56'),
('4c5f7286-923d-4b59-a64b-4cecbf145400', '3becd0da-ed33-491c-9291-4b85ce7750f7'),
('8e44845d-e683-47f2-8617-66314a1be0e1', '9850f5eb-c18d-4916-b891-f6c81bb207e2'),
('8e44845d-e683-47f2-8617-66314a1be0e1', '11e98d0f-c3ef-452a-b0d1-9147fc876c00'),
('8e44845d-e683-47f2-8617-66314a1be0e1', 'a60ff54e-216f-4f94-86b0-7d00692ca069'),
('cbe3187f-6988-45fb-b713-12d7032695bb', '04baafd4-cf54-4808-be3b-811f0ffd5470');

CREATE TABLE wishlist (
    wishlistId UUID PRIMARY KEY,  -- Unique ID for each wishlist
    customerId UUID,  -- Foreign key to the customer
    productId UUID,  -- Foreign key to the product
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customer(customerId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);


CREATE TABLE orders (
    orderId UUID PRIMARY KEY,  -- Unique ID for each order
    customerId UUID,  -- Foreign key to the customer
    totalPrice FLOAT,
    orderStatus VARCHAR(50),  -- Example: 'pending', 'completed', 'canceled'
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customer(customerId)
);


CREATE TABLE order_items (
    orderItemId UUID PRIMARY KEY,  -- Unique ID for each order item
    orderId UUID,  -- Foreign key to the orders table
    productId UUID,  -- Foreign key to the product table
    quantity INT,
    priceAtPurchase FLOAT,  -- Price at the time of purchase
    FOREIGN KEY (orderId) REFERENCES orders(orderId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE TABLE user_auth (
    userId UUID PRIMARY KEY,  -- Unique ID for the user
    customerId UUID,  -- Foreign key to the customer
    email VARCHAR(255) UNIQUE,  -- Unique email for login
    password_hash VARCHAR(255),  -- Password hash for security
    role VARCHAR(50) DEFAULT 'customer',  -- Role can be 'customer', 'admin', etc.
    FOREIGN KEY (customerId) REFERENCES customer(customerId)
);


CREATE TABLE product_recommendations (
    recommendationId UUID PRIMARY KEY,  -- Unique ID for each recommendation
    customerId UUID,  -- Foreign key to the customer
    productId UUID,  -- Foreign key to the product
    recommendationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customer(customerId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

INSERT INTO user_auth (userId, customerId, email, password_hash, role)
VALUES
('1f9d5f07-52df-4b2f-abc1-2b4c4eb5b3a1', 'cdad3ffd-f5d6-488e-b76f-a92a151b7c72', 'phillipsilva@example.com', 'hashed_password1', 'customer'),
('2a1a7f95-552b-4b1e-a1a4-2f547ebef041', '0fbb07a7-8454-487d-861f-04af55dbea0b', 'samuel29@example.org', 'hashed_password2', 'customer'),
('39a07e68-dfa9-420f-9b79-fb9b736a75da', 'e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf', 'cody21@example.com', 'hashed_password3', 'customer'),
('4cb81fa6-47d9-46d5-a768-0f329ee7e635', '696fd9c7-085c-47e7-9d0a-8e0b68f347fa', 'jessicaschneider@example.org', 'hashed_password4', 'customer'),
('5d2a8bb2-8b75-4be9-9c2b-135c5286b7d5', '0d891e8f-5278-4f06-97aa-1600a71e0586', 'george52@example.com', 'hashed_password5', 'customer'),
('6f0dfe88-e4a9-4d9d-9291-51e03f9028f3', '66849eb3-f259-41f4-961b-8e155fb94abf', 'leestephanie@example.com', 'hashed_password6', 'customer'),
('7d7febe8-3d97-4e55-8b34-703b59c78531', '03ca8d20-cb2f-4eec-a5e2-bd0cfe098f51', 'tshaw@example.org', 'hashed_password7', 'customer'),
('8f1d6113-6a71-482d-8d5f-517c20237b2a', '44f2f7f8-2612-4dc8-981d-0337e2d7fd48', 'lcox@example.com', 'hashed_password8', 'customer'),
('9e3041c1-4bff-4c41-a5d9-72616f7c975d', 'c38b2fff-baba-4d31-9d97-e45d853b9cad', 'sstone@example.com', 'hashed_password9', 'customer'),
('1013126c-cb41-43e7-a5b9-95cfb8f789a4', 'af9e04d8-cb33-44ab-86d0-cb06ca721d70', 'shane70@example.com', 'hashed_password10', 'customer'),
('118a6c0b-9f59-4b56-853e-74de47f156f1', '39d4151f-da59-43ef-83aa-4ee3dbd5af1f', 'stephanie56@example.com', 'hashed_password11', 'customer'),
('129cd39b-4d2f-46e1-b5b4-78292f7e2de9', 'df0c33e1-5a46-4748-a0c2-32499ad318ef', 'belljennifer@example.org', 'hashed_password12', 'customer'),
('139fb688-4f2f-41c3-87b7-e7dd567dafeb', 'cc6ca37e-1db0-4999-b671-05312c11933e', 'wrightwilliam@example.com', 'hashed_password13', 'customer'),
('1496c33f-3490-4823-a791-8fa439e47ed1', '3ce8ed90-7a2c-424a-8ba9-11d0a6d1ff1a', 'diana56@example.org', 'hashed_password14', 'customer'),
('1589a32a-56df-4d56-b939-215efc5e928a', '966433bc-dd77-4e6a-89c9-b222facd69ae', 'christinabanks@example.org', 'hashed_password15', 'customer'),
('162b28b4-2d12-4adf-9098-965f66c3edfd', '2b8f70de-d864-44ed-8252-7fa4ea475970', 'jefferycontreras@example.org', 'hashed_password16', 'customer'),
('179d6fb9-d5db-4b91-8ef6-c3fe3f9b0e42', '69ba429e-3a99-488e-82a4-74b35d0d809a', 'bradleycassandra@example.net', 'hashed_password17', 'customer'),
('189dbe3d-7dc7-47e4-afe5-913e77d7b226', '1460b0d5-dffc-415d-ac1f-5bf898773e38', 'melindamiller@example.net', 'hashed_password18', 'customer'),
('19da43cb-8f7b-4a85-b550-716e7c98fdf4', '9466abd8-ab07-447a-99b4-ac2f888058cd', 'pamelahall@example.org', 'hashed_password19', 'customer'),
('20d4ab87-fc9a-41e9-a70d-587f3f51c23a', '7827af35-2fe3-4b1e-82a3-98f1098e40a6', 'lisawebb@example.net', 'hashed_password20', 'customer'),
('219c3b84-243b-42f3-945d-7e1f4324d586', '56d27279-e2cb-4494-bc3a-f99dbc146b80', 'sellerswanda@example.com', 'hashed_password21', 'customer'),
('22959b24-7f68-4a32-bf8d-e314f9a1bfc1', '8f3d317a-a341-4669-96f2-f8364457949e', 'sonyamiller@example.org', 'hashed_password22', 'customer'),
('239bd7cb-7e6f-48f7-8f13-289cbbd83f27', 'a4a25dd8-da95-4430-9843-c5c99f5cf826', 'lauraleach@example.net', 'hashed_password23', 'customer'),
('24aeb173-2492-4c2f-965e-52be53c87549', '92f6c3c7-920d-4c19-826b-f27e8b9e65f0', 'iharper@example.net', 'hashed_password24', 'customer'),
('25dba172-1a6f-4e29-bf83-6d6b5f208024', '83c4d3f5-1b0a-4b96-b312-8f5a5f164ba1', 'kevin27@example.org', 'hashed_password25', 'customer'),
('26f7cbb9-4561-4ae0-bd73-2e7f45af49b1', 'ff68a4ed-6c60-4635-a0b9-e52f7850327e', 'dmorris@example.com', 'hashed_password26', 'customer'),
('278c7437-82d6-4c55-963b-0ad60d420d31', 'b3411df8-9acf-4ac3-b4c2-9ad56533dcff', 'dgriffin@example.com', 'hashed_password27', 'customer'),
('281d82b3-572d-4858-bbc5-1e80c9788d56', '89974c02-2c4c-4c53-9cc8-7fbdc0d0b95f', 'haynesmichael@example.net', 'hashed_password28', 'customer'),
('291ab05e-43de-47db-9459-41b02c9d68b2', '8a2d9f74-81fe-4cc6-b28f-1ac3ac374ecd', 'allen57@example.com', 'hashed_password29', 'customer'),
('30dbbba4-204d-49f7-b5a3-21b35c6c6e44', 'ab17446e-6505-4625-9933-80de2a1bd1bc', 'brian88@example.org', 'hashed_password30', 'customer'),
('31cb878d-4574-4770-b213-42f98d2c9d62', 'cb576996-7397-4f15-ac4b-4a4b3066e974', 'brownpeter@example.org', 'hashed_password31', 'customer'),
('329db8ff-39a6-4376-b0a4-124a61654b9a', '9dd4627a-1b13-4be4-9567-78d68460d777', 'earnold@example.org', 'hashed_password32', 'customer'),
('33a4c1f7-56c6-48d9-a567-214f4b82c8e8', '58789804-5707-4060-bf4c-5d76dacb048b', 'charlescampbell@example.org', 'hashed_password33', 'customer'),
('3476d82a-8b0b-4019-8d4f-e125458847b2', '4c5f7286-923d-4b59-a64b-4cecbf145400', 'cbowman@example.org', 'hashed_password34', 'customer'),
('3586f05f-f6ae-4e34-abb0-4932b4f582a1', '8e44845d-e683-47f2-8617-66314a1be0e1', 'vhatfield@example.com', 'hashed_password35', 'customer'),
('369db77a-df91-40ea-91fc-7bcbe2760b02', 'cbe3187f-6988-45fb-b713-12d7032695bb', 'michaelabaxter@example.org', 'hashed_password36', 'customer');


-- Insert dummy orders with generated UUIDs
INSERT INTO orders (orderId, customerId, totalPrice, orderStatus, orderDate)
VALUES
-- Order for customer 'cdad3ffd-f5d6-488e-b76f-a92a151b7c72'
('11111111-1111-1111-1111-111111111111', 'cdad3ffd-f5d6-488e-b76f-a92a151b7c72', 53498.00, 'completed', CURRENT_TIMESTAMP),

-- Order for customer '0fbb07a7-8454-487d-861f-04af55dbea0b'
('22222222-2222-2222-2222-222222222222', '0fbb07a7-8454-487d-861f-04af55dbea0b', 39998.00, 'completed', CURRENT_TIMESTAMP),

-- Order for customer 'e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf'
('33333333-3333-3333-3333-333333333333', 'e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf', 31498.00, 'pending', CURRENT_TIMESTAMP);




-- Insert order items linked to products
INSERT INTO order_items (orderItemId, orderId, productId, quantity, priceAtPurchase)
VALUES
-- Order 1 (for customer 'cdad3ffd-f5d6-488e-b76f-a92a151b7c72'): iPhone 14 Pro Max and Samsung Galaxy S23 Ultra
('aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'f966934e-883e-4c6f-ab34-aeeeb764ccc7', 1, 27999),
('bbbb1111-bbbb-1111-bbbb-111111111111', '11111111-1111-1111-1111-111111111111', 'c82f9ef5-6ab0-4b54-885b-7963f00b6144', 1, 25499),

-- Order 2 (for customer '0fbb07a7-8454-487d-861f-04af55dbea0b'): Google Pixel 7 Pro and Huawei P50 Pro
('aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222', 'd37b5201-e2b1-4565-a221-dde51a15775c', 1, 20999),
('bbbb2222-bbbb-2222-bbbb-222222222222', '22222222-2222-2222-2222-222222222222', 'a60ff54e-216f-4f94-86b0-7d00692ca069', 1, 18999),

-- Order 3 (for customer 'e1dde6d3-f41d-4b38-ac0a-1da3e9929aaf'): OnePlus 11 and Xiaomi 12 Pro
('aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333', 'dcb0ff20-2473-4da3-bd1a-135c65593992', 1, 16499),
('bbbb3333-bbbb-3333-bbbb-333333333333', '33333333-3333-3333-3333-333333333333', 'b6d25500-85f7-4521-833a-106180feee2d', 1, 14999);
