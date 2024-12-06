-- MySQL dump 10.13  Distrib 9.0.1, for macos15.1 (arm64)
--
-- Host: localhost    Database: supermarkets_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collaborative_cart`
--

DROP TABLE IF EXISTS `collaborative_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collaborative_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `added_by_user` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `is_checked_out` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborative_cart`
--

LOCK TABLES `collaborative_cart` WRITE;
/*!40000 ALTER TABLE `collaborative_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `collaborative_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_table`
--

DROP TABLE IF EXISTS `groups_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_code` varchar(10) NOT NULL,
  `created_by_user` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_code` (`group_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_table`
--

LOCK TABLES `groups_table` WRITE;
/*!40000 ALTER TABLE `groups_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `supermarket_id` int DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_name` (`product_name`),
  KEY `supermarket_id` (`supermarket_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supermarket_id`) REFERENCES `supermarkets` (`supermarket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=626 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Fruits & Vegetables','Bananas',0.50,100,'Fresh ripe bananas'),(2,1,'Fruits & Vegetables','Apples',1.20,50,'Red and green apples'),(3,1,'Dairy','Milk',1.50,50,'1-liter carton of milk'),(4,1,'Dairy','Eggs',2.00,100,'12 large eggs'),(5,1,'Bakery','White Bread',1.00,60,'Loaf of white bread'),(6,2,'Pantry','Pasta',1.00,100,'500g bag of spaghetti'),(7,2,'Pantry','Rice',2.00,80,'1kg bag of white rice'),(8,2,'Frozen Foods','Frozen Pizza',4.00,25,'Cheese frozen pizza'),(9,2,'Snacks','Potato Chips',1.50,80,'Bag of chips'),(10,2,'Snacks','Cookies',2.50,50,'Pack of cookies'),(11,3,'Fruits & Vegetables','Organic Avocados',1.80,40,'Organic Hass avocados'),(12,3,'Dairy','Artisan Cheese',5.00,20,'Gourmet artisan cheese'),(13,3,'Bakery','Sourdough Bread',3.00,30,'Fresh sourdough loaf'),(14,3,'Pantry','Gourmet Olive Oil',8.00,15,'Extra virgin olive oil'),(15,3,'Beverages','Premium Coffee',10.00,10,'Single-origin coffee beans'),(16,4,'Snacks','Candy Bars',0.80,100,'Assorted candy bars'),(17,4,'Household Items','Dish Soap',3.00,30,'Dishwashing liquid'),(18,4,'Personal Care','Shampoo',5.50,30,'500ml shampoo'),(19,4,'Bakery','Bagels',2.50,30,'Pack of 6 bagels'),(20,4,'Dairy','Butter',2.20,40,'Unsalted butter'),(21,5,'Household Items','Toilet Paper',5.00,100,'12-roll pack'),(22,5,'Beverages','Orange Juice',2.50,30,'1-liter orange juice'),(23,5,'Beverages','Soda',1.00,100,'Can of soda'),(24,5,'Frozen Foods','Ice Cream',3.50,30,'Tub of vanilla ice cream'),(25,5,'Fruits & Vegetables','Tomatoes',1.10,80,'Fresh tomatoes'),(26,1,'Fruits & Vegetables','Oranges',1.10,70,'Juicy oranges'),(27,1,'Fruits & Vegetables','Lettuce',0.80,90,'Fresh iceberg lettuce'),(28,1,'Dairy','Skimmed Milk',1.40,40,'1-liter skimmed milk'),(29,1,'Dairy','Cream Cheese',2.50,30,'Spreadable cream cheese'),(30,1,'Bakery','Multigrain Bread',1.30,50,'Healthy multigrain loaf'),(31,1,'Meat & Seafood','Turkey Breast',7.50,15,'Sliced turkey breast'),(32,1,'Meat & Seafood','Pork Chops',6.20,20,'Bone-in pork chops'),(33,1,'Frozen Foods','Frozen Fries',3.00,40,'Crispy frozen fries'),(34,1,'Frozen Foods','Frozen Berries',4.50,25,'Mixed frozen berries'),(35,1,'Pantry','Peanut Butter',3.20,50,'Creamy peanut butter'),(36,1,'Pantry','Jelly',2.10,40,'Grape jelly'),(37,1,'Beverages','Green Tea',4.00,30,'Pack of green tea bags'),(38,1,'Beverages','Energy Drink',2.50,50,'Can of energy drink'),(39,1,'Household Items','Paper Towels',6.50,60,'6-roll pack of paper towels'),(40,1,'Household Items','Glass Cleaner',3.00,20,'Streak-free glass cleaner'),(41,1,'Personal Care','Hand Sanitizer',2.00,70,'Travel-size hand sanitizer'),(42,1,'Personal Care','Body Wash',5.00,40,'Moisturizing body wash'),(43,1,'Snacks','Pretzels',2.00,50,'Bag of salted pretzels'),(44,1,'Snacks','Trail Mix',3.50,40,'Healthy nut and fruit mix'),(45,1,'Snacks','Popcorn',1.80,60,'Microwaveable popcorn'),(46,2,'Fruits & Vegetables','Pineapple',3.00,20,'Fresh whole pineapple'),(47,2,'Fruits & Vegetables','Zucchini',1.20,60,'Fresh zucchini'),(48,2,'Dairy','Whipping Cream',2.80,25,'Heavy whipping cream'),(49,2,'Dairy','Cottage Cheese',2.20,40,'Low-fat cottage cheese'),(50,2,'Bakery','Donuts',3.00,25,'Pack of assorted donuts'),(51,2,'Meat & Seafood','Sausages',5.50,30,'Pack of pork sausages'),(52,2,'Meat & Seafood','Tuna Steaks',9.00,10,'Fresh tuna steaks'),(53,2,'Frozen Foods','Frozen Corn',2.50,50,'Bag of frozen corn'),(54,2,'Frozen Foods','Frozen Dumplings',5.00,20,'Chicken and vegetable dumplings'),(55,2,'Pantry','Honey',3.80,30,'Pure organic honey'),(56,2,'Pantry','Canned Soup',1.90,60,'Tomato soup in a can'),(57,2,'Beverages','Iced Tea',1.50,50,'Bottle of lemon iced tea'),(58,2,'Beverages','Mineral Water',0.90,80,'Bottle of sparkling water'),(59,2,'Household Items','Laundry Softener',8.00,20,'Fabric softener liquid'),(60,2,'Household Items','Trash Bags',6.00,30,'Roll of trash bags'),(61,2,'Personal Care','Deodorant',4.00,40,'Roll-on deodorant'),(62,2,'Personal Care','Lotion',5.50,30,'Moisturizing body lotion'),(63,2,'Snacks','Granola Bars',3.00,50,'Box of granola bars'),(64,2,'Snacks','Jerky',6.00,30,'Beef jerky pack'),(65,2,'Snacks','Cheese Puffs',1.50,70,'Bag of cheesy puffs'),(66,3,'Fruits & Vegetables','Cherries',4.00,15,'Sweet red cherries'),(67,3,'Fruits & Vegetables','Asparagus',2.50,25,'Fresh green asparagus'),(68,3,'Dairy','Goat Cheese',4.50,20,'Creamy goat cheese'),(69,3,'Dairy','Yogurt Drink',1.80,50,'Flavored yogurt drink'),(70,3,'Bakery','Chocolate Cake',6.00,10,'Rich chocolate cake'),(71,3,'Meat & Seafood','Duck Breast',12.00,5,'Premium duck breast'),(72,3,'Meat & Seafood','Crab Legs',15.00,10,'Fresh crab legs'),(73,3,'Frozen Foods','Frozen Lasagna',5.00,20,'Family-sized frozen lasagna'),(74,3,'Frozen Foods','Frozen Pancakes',3.50,30,'Ready-to-eat frozen pancakes'),(75,3,'Pantry','Balsamic Vinegar',6.00,15,'Aged balsamic vinegar'),(76,3,'Pantry','Quinoa',4.00,25,'1kg pack of quinoa'),(77,3,'Beverages','Herbal Tea',5.00,20,'Pack of herbal tea'),(78,3,'Beverages','Craft Beer',2.50,40,'Can of craft beer'),(79,3,'Household Items','Floor Cleaner',4.50,30,'Citrus-scented floor cleaner'),(80,3,'Household Items','Kitchen Towels',3.50,50,'Rolls of kitchen towels'),(81,3,'Personal Care','Face Wipes',3.00,40,'Pack of cleansing face wipes'),(82,3,'Personal Care','Lip Balm',2.00,60,'Moisturizing lip balm'),(83,3,'Snacks','Dark Chocolate',2.50,50,'70% cocoa dark chocolate bar'),(84,3,'Snacks','Rice Cakes',1.20,70,'Low-calorie rice cakes'),(85,3,'Snacks','Veggie Chips',2.80,50,'Healthy veggie chips'),(86,4,'Fruits & Vegetables','Cucumber',0.90,80,'Fresh cucumber'),(87,4,'Fruits & Vegetables','Bell Peppers',1.50,70,'Mixed bell peppers'),(88,4,'Dairy','Chocolate Milk',1.80,50,'1-liter chocolate milk'),(89,4,'Dairy','Parmesan Cheese',4.00,20,'Grated Parmesan cheese'),(90,4,'Bakery','Muffins',3.00,25,'Pack of assorted muffins'),(91,4,'Meat & Seafood','Ground Turkey',6.00,20,'Lean ground turkey'),(92,4,'Meat & Seafood','Cod Fillets',7.00,15,'Fresh cod fillets'),(93,4,'Frozen Foods','Frozen Fish Sticks',4.50,30,'Pack of breaded fish sticks'),(94,4,'Frozen Foods','Frozen Pies',5.00,15,'Fruit-flavored frozen pies'),(95,4,'Pantry','Canned Tuna',1.50,60,'Canned tuna in water'),(96,4,'Pantry','Spaghetti Sauce',2.50,40,'Jar of spaghetti sauce'),(97,4,'Beverages','Sparkling Water',1.20,80,'Flavored sparkling water'),(98,4,'Beverages','Hot Chocolate Mix',3.50,30,'Pack of hot chocolate mix'),(99,4,'Household Items','Bleach',2.00,40,'1-liter bottle of bleach'),(100,4,'Household Items','Sponges',2.50,50,'Pack of kitchen sponges'),(101,4,'Personal Care','Hair Conditioner',6.00,25,'Nourishing hair conditioner'),(102,4,'Personal Care','Toothbrush',3.00,30,'Pack of 2 toothbrushes'),(103,4,'Snacks','Salted Peanuts',2.00,50,'Bag of salted peanuts'),(104,4,'Snacks','Ice Cream Sandwiches',3.50,20,'Pack of ice cream sandwiches'),(105,4,'Snacks','Crackers',2.20,60,'Pack of assorted crackers'),(106,5,'Fruits & Vegetables','Avocados',1.50,40,'Fresh ripe avocados'),(107,5,'Fruits & Vegetables','Kale',2.00,30,'Organic kale leaves'),(108,5,'Dairy','Plain Yogurt',1.50,50,'Low-fat plain yogurt'),(109,5,'Dairy','String Cheese',3.00,40,'Pack of string cheese'),(110,5,'Bakery','Ciabatta Bread',2.50,20,'Italian ciabatta loaf'),(111,5,'Meat & Seafood','Lamb Chops',12.00,10,'Fresh lamb chops'),(112,5,'Meat & Seafood','Smoked Salmon',8.00,15,'Sliced smoked salmon'),(113,5,'Frozen Foods','Frozen Waffles',3.00,25,'Pack of frozen waffles'),(114,5,'Frozen Foods','Frozen Chicken Nuggets',4.50,30,'Pack of chicken nuggets'),(115,5,'Pantry','Oatmeal',2.50,40,'Pack of rolled oats'),(116,5,'Pantry','Canned Tomatoes',1.20,70,'Canned peeled tomatoes'),(117,5,'Beverages','Fruit Punch',2.00,60,'Bottle of fruit punch'),(118,5,'Beverages','Smoothies',2.80,50,'Ready-to-drink smoothies'),(119,5,'Household Items','All-Purpose Cleaner',3.50,40,'Multi-surface cleaner'),(120,5,'Household Items','Aluminum Foil',2.50,50,'Roll of aluminum foil'),(121,5,'Personal Care','Face Wash',4.50,30,'Gentle cleansing face wash'),(122,5,'Personal Care','Nail Clippers',3.00,20,'Set of nail clippers'),(123,5,'Snacks','Fruit Snacks',2.50,60,'Pack of fruit-flavored snacks'),(124,5,'Snacks','Potato Wedges',3.00,40,'Pack of frozen potato wedges'),(125,5,'Snacks','Honey Roasted Almonds',3.50,50,'Bag of honey roasted almonds'),(566,1,'Fruits & Vegetables','Strawberries',3.00,25,'Fresh sweet strawberries'),(567,1,'Fruits & Vegetables','Blueberries',4.00,15,'Fresh blueberries'),(568,1,'Fruits & Vegetables','Raspberries',5.00,10,'Fresh raspberries'),(569,1,'Fruits & Vegetables','Watermelon',6.00,8,'Large juicy watermelon'),(570,1,'Fruits & Vegetables','Kiwifruit',1.50,30,'Fresh green kiwifruit'),(571,1,'Fruits & Vegetables','Grapes',2.80,40,'Fresh seedless grapes'),(572,1,'Fruits & Vegetables','Pomegranate',3.50,18,'Juicy pomegranate'),(573,1,'Fruits & Vegetables','Cantaloupe',4.50,12,'Sweet cantaloupe melon'),(574,1,'Fruits & Vegetables','Plums',3.00,22,'Fresh ripe plums'),(575,1,'Dairy','Greek Yogurt',2.50,35,'Low-fat Greek yogurt'),(576,1,'Bakery','Rye Bread',2.20,20,'Fresh rye bread loaf'),(577,1,'Meat & Seafood','Chicken Thighs',4.00,25,'Boneless chicken thighs'),(578,1,'Frozen Foods','Frozen Green Beans',3.00,30,'Frozen cut green beans'),(579,1,'Pantry','Black Beans',1.20,40,'Canned black beans'),(581,2,'Fruits & Vegetables','Limes',0.80,50,'Fresh green limes'),(582,2,'Fruits & Vegetables','Cucumbers',1.00,45,'Crunchy cucumbers'),(583,2,'Fruits & Vegetables','Peaches',2.50,25,'Juicy yellow peaches'),(584,2,'Fruits & Vegetables','Pears',1.80,30,'Crisp green pears'),(585,2,'Fruits & Vegetables','Celery',1.50,40,'Fresh celery stalks'),(586,2,'Fruits & Vegetables','Broccoli',2.00,35,'Fresh green broccoli'),(587,2,'Fruits & Vegetables','Spinach',1.80,50,'Organic baby spinach'),(588,2,'Bakery','Dinner Rolls',3.00,30,'Pack of soft dinner rolls'),(589,2,'Meat & Seafood','Pork Loin',7.00,20,'Boneless pork loin'),(590,2,'Frozen Foods','Frozen Cauliflower',3.50,15,'Frozen cauliflower florets'),(591,2,'Pantry','Chickpeas',1.50,40,'Canned chickpeas'),(596,3,'Fruits & Vegetables','Romaine Lettuce',1.50,40,'Crisp romaine lettuce'),(597,3,'Fruits & Vegetables','Eggplant',2.00,30,'Fresh purple eggplant'),(598,3,'Fruits & Vegetables','Sweet Potatoes',1.80,50,'Fresh sweet potatoes'),(599,3,'Fruits & Vegetables','Mangoes',2.20,20,'Juicy ripe mangoes'),(600,3,'Fruits & Vegetables','Carrots',1.20,70,'Crunchy orange carrots'),(601,3,'Fruits & Vegetables','Beets',1.80,40,'Fresh red beets'),(602,3,'Fruits & Vegetables','Radishes',1.50,30,'Spicy red radishes'),(603,3,'Fruits & Vegetables','Turnips',1.50,20,'Fresh turnips'),(604,3,'Dairy','Ricotta Cheese',3.50,20,'Smooth ricotta cheese'),(605,3,'Bakery','Chocolate Muffins',3.00,25,'Pack of chocolate muffins'),(606,3,'Meat & Seafood','Salmon Fillets',15.00,10,'Fresh salmon fillets'),(607,3,'Frozen Foods','Frozen Mixed Berries',4.00,15,'Mixed frozen berries'),(608,3,'Pantry','Almond Butter',5.00,25,'Organic almond butter'),(611,4,'Fruits & Vegetables','Cauliflower',1.80,25,'Fresh cauliflower head'),(612,4,'Fruits & Vegetables','Onions',1.20,60,'Brown cooking onions'),(613,4,'Fruits & Vegetables','Parsley',1.00,30,'Fresh parsley bunch'),(614,4,'Fruits & Vegetables','Garlic',0.50,70,'Garlic bulbs'),(615,4,'Fruits & Vegetables','Pumpkin',4.50,10,'Large carving pumpkin'),(616,4,'Fruits & Vegetables','Leeks',1.70,20,'Fresh leeks'),(617,4,'Fruits & Vegetables','Cabbage',1.50,30,'Green cabbage'),(618,4,'Dairy','Feta Cheese',3.50,20,'Crumbled feta cheese'),(619,4,'Bakery','Croissants',4.00,20,'Buttery croissants'),(620,4,'Meat & Seafood','Ground Beef',5.50,30,'Lean ground beef'),(621,4,'Frozen Foods','Frozen Peas',2.50,25,'Frozen green peas'),(622,4,'Pantry','Maple Syrup',6.00,20,'Pure maple syrup');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supermarkets`
--

DROP TABLE IF EXISTS `supermarkets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supermarkets` (
  `supermarket_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`supermarket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarkets`
--

LOCK TABLES `supermarkets` WRITE;
/*!40000 ALTER TABLE `supermarkets` DISABLE KEYS */;
INSERT INTO `supermarkets` VALUES (1,'Supermarket A','A local supermarket offering fresh produce, dairy, and household items.','123 Market Street, Birmingham, UK','8:00 AM - 10:00 PM','+44 123 456 7890'),(2,'Supermarket B','A budget-friendly store with a wide range of pantry and frozen food options.','45 Budget Road, Birmingham, UK','9:00 AM - 9:00 PM','+44 987 654 3210'),(3,'Supermarket C','A premium supermarket focusing on organic and gourmet products.','22 Gourmet Avenue, Birmingham, UK','7:00 AM - 11:00 PM','+44 555 678 9101'),(4,'Supermarket D','Convenient neighborhood store with a mix of essentials and snacks.','10 Essentials Lane, Birmingham, UK','8:00 AM - 8:00 PM','+44 444 333 2222'),(5,'Supermarket E','A family-friendly store with a focus on household items and beverages.','67 Family Park, Birmingham, UK','10:00 AM - 6:00 PM','+44 777 888 9999');
/*!40000 ALTER TABLE `supermarkets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_table`
--

DROP TABLE IF EXISTS `users_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `group_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_table`
--

LOCK TABLES `users_table` WRITE;
/*!40000 ALTER TABLE `users_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 15:10:35
