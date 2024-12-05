-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: supermarkets_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
  KEY `supermarket_id` (`supermarket_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supermarket_id`) REFERENCES `supermarkets` (`supermarket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Fruits & Vegetables','Bananas',0.50,100,'Fresh ripe bananas'),(2,1,'Fruits & Vegetables','Apples',1.20,50,'Red and green apples'),(3,1,'Dairy','Milk',1.50,50,'1-liter carton of milk'),(4,1,'Dairy','Eggs',2.00,100,'12 large eggs'),(5,1,'Bakery','White Bread',1.00,60,'Loaf of white bread'),(6,2,'Pantry','Pasta',1.00,100,'500g bag of spaghetti'),(7,2,'Pantry','Rice',2.00,80,'1kg bag of white rice'),(8,2,'Frozen Foods','Frozen Pizza',4.00,25,'Cheese frozen pizza'),(9,2,'Snacks','Potato Chips',1.50,80,'Bag of chips'),(10,2,'Snacks','Cookies',2.50,50,'Pack of cookies'),(11,3,'Fruits & Vegetables','Organic Avocados',1.80,40,'Organic Hass avocados'),(12,3,'Dairy','Artisan Cheese',5.00,20,'Gourmet artisan cheese'),(13,3,'Bakery','Sourdough Bread',3.00,30,'Fresh sourdough loaf'),(14,3,'Pantry','Gourmet Olive Oil',8.00,15,'Extra virgin olive oil'),(15,3,'Beverages','Premium Coffee',10.00,10,'Single-origin coffee beans'),(16,4,'Snacks','Candy Bars',0.80,100,'Assorted candy bars'),(17,4,'Household Items','Dish Soap',3.00,30,'Dishwashing liquid'),(18,4,'Personal Care','Shampoo',5.50,30,'500ml shampoo'),(19,4,'Bakery','Bagels',2.50,30,'Pack of 6 bagels'),(20,4,'Dairy','Butter',2.20,40,'Unsalted butter'),(21,5,'Household Items','Toilet Paper',5.00,100,'12-roll pack'),(22,5,'Beverages','Orange Juice',2.50,30,'1-liter orange juice'),(23,5,'Beverages','Soda',1.00,100,'Can of soda'),(24,5,'Frozen Foods','Ice Cream',3.50,30,'Tub of vanilla ice cream'),(25,5,'Fruits & Vegetables','Tomatoes',1.10,80,'Fresh tomatoes');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04 13:19:34
