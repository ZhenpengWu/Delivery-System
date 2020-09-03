DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS package;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS description;
CREATE TABLE city
(
    cityid CHAR(40) NOT NULL CONSTRAINT city_pkey PRIMARY KEY,
    country CHAR(20),
    province CHAR(20),
    cityname CHAR(20)
);
CREATE TABLE type
(
    id CHAR(40) NOT NULL CONSTRAINT type_pkey PRIMARY KEY,
    servicetype CHAR(20),
    category CHAR(20)
);
CREATE TABLE description
(
    id CHAR(40) NOT NULL CONSTRAINT description_pkey PRIMARY KEY,
    text CHAR(100)
);
CREATE TABLE customer
(
    customerid CHAR(40) NOT NULL CONSTRAINT customer_pkey PRIMARY KEY,
    name CHAR(20) NOT NULL,
    address CHAR(100),
    phone CHAR(20) NOT NULL,
    CONSTRAINT customer_name_address_key UNIQUE(name, address)
);
CREATE TABLE package
(
    trackingnumber CHAR(40) NOT NULL CONSTRAINT package_pkey PRIMARY KEY,
    weight DOUBLE PRECISION,
    typeid CHAR(40) CONSTRAINT package_typeid_fkey REFERENCES type,
    signaturerequired BOOLEAN,
    senderid CHAR(40) NOT NULL CONSTRAINT package_senderid_fkey REFERENCES customer,
    receiverid CHAR(40) NOT NULL CONSTRAINT package_receiverid_fkey REFERENCES customer,
    CHECK(weight > 0)
);
CREATE TABLE status
(
    trackingnumber CHAR(40) NOT NULL CONSTRAINT status_trackingnumber_fkey REFERENCES package ON DELETE CASCADE,
    timestamp TIMESTAMP NOT NULL,
    descriptionid CHAR(40) NOT NULL CONSTRAINT status_descriptionid_fkey REFERENCES description,
    cityid CHAR(40) NOT NULL CONSTRAINT status_cityid_fkey REFERENCES city,
    CONSTRAINT status_pkey PRIMARY KEY (trackingnumber, timestamp)
);
INSERT INTO city
    (cityid, country, province, cityname)
VALUES
    ('3afd0172f1ca527563f2103e00b6c783', 'Canada', 'British Columbia', 'Vancouver'),
    ('98ef66ee09e853e470629fbc6ec4a5b7', 'Canada', 'Ontario', 'Toronto'),
    ('c52f61d7e59a0d7f5d323ea00cf112ed', 'China', 'Zhejiang', 'Shaoxing'),
    ('d15e44bc3988f5a4a71d388c9c762781', 'China', 'Beijing', 'Beijing'),
    ('d46fc9f3149653c76931b926ff8f2f21', 'Cambridgeshire', 'South Dakota', 'Denesikburgh'),
    ('f4eb009fe7288070893031c605288d17', 'Christmas Island', 'New Mexico', 'Lake Lupe'),
    ('4301310bbcd2318ea6ba319757e75206', 'Singapore', 'Oklahoma', 'Modestatown'),
    ('7db8f1539f001b065c0aec2445cc8114', 'Montenegro', 'Idaho', 'Weberfort'),
    ('04de5570899d266267e9a276bc7b3ed8', 'Macedonia', 'West Virginia', 'Sylviamouth'),
    ('8c3c70c27d54383868fcecab54b5a014', 'Russia', 'Moscow', 'Moscow');
INSERT INTO type
    (id, servicetype, category)
VALUES
    ('fd96dc0fccd2f66d66d7f03592582dae', 'Priority Mail', 'Letter'),
    ('135db3f4df725eea87b13c612a8b09e9', 'Priority Mail', 'Parcel'),
    ('6db2b70cb067067ecb87d80032c509f6', 'Regular Mail', 'Letter'),
    ('1e2dd17e5e0e3e22dd831aea005ee784', 'Regular Mail', 'Parcel'),
    ('7a232a3d7ffb0dca961efc180dcfa9e9', 'Expedited', 'Letter'),
    ('1710439893647ef3c0ee76c33dce8f7d', 'Expedited', 'Parcel');
INSERT INTO description
    (id, text)
VALUES
    ('be3b917699bb60a8744da9c2be14b73a', 'Electronic information submitted by shipper'),
    ('f0e5e638a717baa7e5c5af6eab0de70c', 'Shipment received at originating postal facility'),
    ('b29c67a2749bb108d8dc52d91e7cea09', 'Item processed'),
    ('65c63bffabb95dfe79bb6cf37ccd959f', 'In Transit'),
    ('1c0170aa28c50921aff343177b831fc3', 'Out for Delivery'),
    ('600576d8179c19e27084ec12ceb95a01', 'Arrival Scan'),
    ('3b9aca9d1e27674f4cf56fbe08d486c1', 'Departure Scan'),
    ('e6b94cfbba41f9c70e88247d6576d693', 'Delivered'),
    ('0370037286211836edb8ee451ff73900', 'Adverse Weather Delay');
INSERT INTO customer
    (customerid, name, address, phone)
VALUES
    ('0e21602ebf089618882f40d34251b22d', 'George', '2990 Wesbrook Mall, Vancouver, BC V6T 2B7', '911'),
    ('88ef4f34cacad6e3bdd8c350c5c4161e', 'Zhenpeng', '1267 Davie St, Vancouver, BC V6E 1N4', '119'),
    ('17dda470fdbbf9c2acc9867af53b6959', 'Vlad', '4747 Dunbar St, Vancouver, BC V6S 2H2', '(604) 682-5050'),
    ('b49bddf4da747ae38034654f91830e13', 'Tim', '6735 Salish Dr, Vancouver, BC V6N 4C4', '1 800 663-9122'),
    ('49e89314e7d5f928ac0ba0a8ff164ffa', 'Darren', '43012 Lavina Haven, New Roseton, Virginia, 05473', '732-505-7574'),
    ('875e90381ecf60f3ebf162390fb2368d', 'Macy', '166 Luettgen Fall, South Victoriaberg, Illinois, 56059-7212', '(381) 639-5801'),
    ('e71c1f098a0468b67702a020833b1564', 'Wendy', '67360 Ardith Summit, East Tamarafurt, Virginia, 20603', '794-214-3361'),
    ('903d0411da09091d6cc1671fda5eebea', 'Emory', '66491 Lurline Lodge, Monteland, Wisconsin, 43048-4820', '1-598-813-0918'),
    ('4eacc63fe028d5b1e8420cc474dc26c9', 'Omar', '1687 W Broadway #78, Vancouver, BC V6J 1X2', '(604) 872-3311');
INSERT INTO package
    (trackingnumber, weight, typeid, signaturerequired, senderid, receiverid)
VALUES
    ('b1382a7d108d36733267006f760ed45f', 1, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', '88ef4f34cacad6e3bdd8c350c5c4161e'),
    ('3b27b9cfd7d7afc8961bc5c13bdb7a04', 2, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', '17dda470fdbbf9c2acc9867af53b6959'),
    ('d803cbe348344421cd78ea651baac3ed', 3, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', 'b49bddf4da747ae38034654f91830e13'),
    ('fbb1025d79b30ae8c40734e061896eaa', 2, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', '49e89314e7d5f928ac0ba0a8ff164ffa'),
    ('3a55927bfd96c6de3fab1b26c07a13ac', 0.3, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', '875e90381ecf60f3ebf162390fb2368d'),
    ('40e58b178f9363642ad6c44ad45dbf2e', 2, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', 'e71c1f098a0468b67702a020833b1564'),
    ('7b3466985cee6f64ce1416fa20b0f2dd', 2, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', '903d0411da09091d6cc1671fda5eebea'),
    ('a3083ff5b7ce687ba523e9db90c845c1', 2, '7a232a3d7ffb0dca961efc180dcfa9e9', true, '0e21602ebf089618882f40d34251b22d', '4eacc63fe028d5b1e8420cc474dc26c9'),
    ('debfcad8c20a59127ce2d0f57bbd2e3c', 0.7, 'fd96dc0fccd2f66d66d7f03592582dae', true, '0e21602ebf089618882f40d34251b22d', 'b49bddf4da747ae38034654f91830e13'),
    ('873a254da6fb43333890f56551223869', 0.5, '6db2b70cb067067ecb87d80032c509f6', false, '17dda470fdbbf9c2acc9867af53b6959', '88ef4f34cacad6e3bdd8c350c5c4161e'),
    ('ef50a09f178d6d4e4f5fef7e71282f5c', 1.2, '1e2dd17e5e0e3e22dd831aea005ee784', false, '17dda470fdbbf9c2acc9867af53b6959', '0e21602ebf089618882f40d34251b22d'),
    ('ed362c5be5a2bc205e03bd8bdca4e68c', 0.8, 'fd96dc0fccd2f66d66d7f03592582dae', true, '88ef4f34cacad6e3bdd8c350c5c4161e', '4eacc63fe028d5b1e8420cc474dc26c9');
INSERT INTO status
    (trackingnumber, timestamp, descriptionid, cityid)
VALUES
    ('debfcad8c20a59127ce2d0f57bbd2e3c', '2018-02-15 01:53:55', '1c0170aa28c50921aff343177b831fc3', '98ef66ee09e853e470629fbc6ec4a5b7'),
    ('a3083ff5b7ce687ba523e9db90c845c1', '2017-09-12 13:32:21', '65c63bffabb95dfe79bb6cf37ccd959f', 'c52f61d7e59a0d7f5d323ea00cf112ed'),
    ('ef50a09f178d6d4e4f5fef7e71282f5c', '2005-04-04 20:08:01', '0370037286211836edb8ee451ff73900', 'd15e44bc3988f5a4a71d388c9c762781'),
    ('ef50a09f178d6d4e4f5fef7e71282f5c', '2011-08-06 15:41:21', '65c63bffabb95dfe79bb6cf37ccd959f', '4301310bbcd2318ea6ba319757e75206'),
    ('ef50a09f178d6d4e4f5fef7e71282f5c', '2017-12-30 14:48:01', 'b29c67a2749bb108d8dc52d91e7cea09', 'd15e44bc3988f5a4a71d388c9c762781'),
    ('873a254da6fb43333890f56551223869', '2008-08-07 15:37:12', '600576d8179c19e27084ec12ceb95a01', '98ef66ee09e853e470629fbc6ec4a5b7'),
    ('873a254da6fb43333890f56551223869', '2016-02-08 20:57:12', 'b29c67a2749bb108d8dc52d91e7cea09', '8c3c70c27d54383868fcecab54b5a014'),
    ('ed362c5be5a2bc205e03bd8bdca4e68c', '2013-05-01 05:43:51', '3b9aca9d1e27674f4cf56fbe08d486c1', '3afd0172f1ca527563f2103e00b6c783'),
    ('b1382a7d108d36733267006f760ed45f', '2013-02-01 05:43:51', 'e6b94cfbba41f9c70e88247d6576d693', 'f4eb009fe7288070893031c605288d17'),
    ('3b27b9cfd7d7afc8961bc5c13bdb7a04', '2014-03-11 05:43:51', '3b9aca9d1e27674f4cf56fbe08d486c1', '7db8f1539f001b065c0aec2445cc8114'),
    ('d803cbe348344421cd78ea651baac3ed', '2013-04-02 05:43:51', 'e6b94cfbba41f9c70e88247d6576d693', 'c52f61d7e59a0d7f5d323ea00cf112ed'),
    ('fbb1025d79b30ae8c40734e061896eaa', '2015-05-01 05:43:51', 'b29c67a2749bb108d8dc52d91e7cea09', '3afd0172f1ca527563f2103e00b6c783'),
    ('3a55927bfd96c6de3fab1b26c07a13ac', '2017-06-01 05:43:51', '65c63bffabb95dfe79bb6cf37ccd959f', 'c52f61d7e59a0d7f5d323ea00cf112ed'),
    ('40e58b178f9363642ad6c44ad45dbf2e', '2011-09-21 05:43:51', '3b9aca9d1e27674f4cf56fbe08d486c1', '3afd0172f1ca527563f2103e00b6c783'),
    ('7b3466985cee6f64ce1416fa20b0f2dd', '2012-10-01 05:43:51', '1c0170aa28c50921aff343177b831fc3', '8c3c70c27d54383868fcecab54b5a014');
