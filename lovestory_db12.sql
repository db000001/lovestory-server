/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 100432
 Source Host           : 127.0.0.1:3306
 Source Schema         : lovestory_db

 Target Server Type    : MySQL
 Target Server Version : 100432
 File Encoding         : 65001

 Date: 23/04/2025 00:37:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) NULL DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `rolled_back_at` datetime(3) NULL DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO `_prisma_migrations` VALUES ('3891ac11-560b-4677-97f2-2a6effe7aed9', 'f2a3eaaa28a92915506b32be1935ff986abbe2cc436e89af584e90157da7dc8e', '2025-03-07 09:59:36.450', '20250307095936_update_users_table', NULL, NULL, '2025-03-07 09:59:36.375', 1);
INSERT INTO `_prisma_migrations` VALUES ('49093df0-22b7-4dfb-8f4c-79dc541da7ba', '02977570b8af270f0cd60913d8e02b540e30216c499461a8130e7c2359db3618', '2025-03-07 08:12:29.667', '20250307081229_create_users_table', NULL, NULL, '2025-03-07 08:12:29.632', 1);
INSERT INTO `_prisma_migrations` VALUES ('5a6a6c7b-69c9-4e56-8d3f-72e0d5d8c02a', 'ddf67d9eef1c5f8b0fec1e2ddbefc16b5895630395083510c0a1bed5b6ee9148', '2025-03-07 11:04:55.070', '20250307110455_update_users_table', NULL, NULL, '2025-03-07 11:04:55.019', 1);
INSERT INTO `_prisma_migrations` VALUES ('62372e02-c229-4ef1-96cc-a727ecb98afa', 'd9110aa17a4e48ff1a77451be7ef2e5056d3bdc892bee2671d48acbb52ed5f1d', '2025-03-07 08:33:43.263', '20250307083343_update_users_table', NULL, NULL, '2025-03-07 08:33:43.209', 1);
INSERT INTO `_prisma_migrations` VALUES ('782d2cf6-540f-4d79-9cb6-d379c86cf837', 'b4a9206ce93b7ae7f20d51e85a91ee05a26a68383ebbb0e375e378c6f3ff5bf6', '2025-03-07 12:46:59.264', '20250307124659_add_verification_token_field', NULL, NULL, '2025-03-07 12:46:59.238', 1);
INSERT INTO `_prisma_migrations` VALUES ('931a518d-62c1-4af0-b12c-dfab7f526301', 'be3322db1c1236e0797344d68c48cd37db27a33d6e296c9ad821584e4484c541', '2025-03-07 11:00:25.507', '20250307110025_update_users_table', NULL, NULL, '2025-03-07 11:00:25.481', 1);
INSERT INTO `_prisma_migrations` VALUES ('db8b04a4-bf64-4335-b838-f0d5df4abd5e', '7e9430ddaacd7d383f0231cd6020335d709319688d84dd249784d14bd7de8373', '2025-03-07 14:17:09.218', '20250307141709_update_users_table_name', NULL, NULL, '2025-03-07 14:17:09.146', 1);

-- ----------------------------
-- Table structure for ads_tbl
-- ----------------------------
DROP TABLE IF EXISTS `ads_tbl`;
CREATE TABLE `ads_tbl`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `company` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `tag1` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tag2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tag3` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start` date NULL DEFAULT NULL,
  `end` date NULL DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for categories_tbl
-- ----------------------------
DROP TABLE IF EXISTS `categories_tbl`;
CREATE TABLE `categories_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'active',
  `row` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `category_order` int(5) UNSIGNED NULL DEFAULT NULL,
  `file_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `views` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories_tbl
-- ----------------------------
INSERT INTO `categories_tbl` VALUES (24, 'Women 18 - 21', '', 'active', 'General', 1, 20, '2025-03-11 18:39:48', '2025-04-22 16:16:51', 5);
INSERT INTO `categories_tbl` VALUES (25, 'Men 18 - 21', '', 'inactive', 'General', 2, 22, '2025-03-11 18:41:39', '2025-03-18 14:43:25', 0);
INSERT INTO `categories_tbl` VALUES (26, 'LGBTQ+ 18 - 21', '', 'active', 'General', 3, 24, '2025-03-11 18:43:33', '2025-03-11 18:43:33', 0);
INSERT INTO `categories_tbl` VALUES (27, 'Athletes 18 - 21', '', 'active', 'General', 4, 27, '2025-03-11 18:44:27', '2025-03-11 18:46:54', 0);
INSERT INTO `categories_tbl` VALUES (28, 'Long Distance', '', 'active', 'General', 5, 28, '2025-03-11 18:48:23', '2025-03-11 18:48:23', 0);
INSERT INTO `categories_tbl` VALUES (29, 'Columbia', '', 'active', 'Colleges', 1, 31, '2025-03-11 18:51:25', '2025-03-11 18:51:25', 0);
INSERT INTO `categories_tbl` VALUES (30, 'Harvard', '', 'active', 'Colleges', 2, 32, '2025-03-11 19:08:18', '2025-03-11 19:08:18', 0);
INSERT INTO `categories_tbl` VALUES (31, 'Johns Hopkins', '', 'active', 'Colleges', 3, 33, '2025-03-11 19:39:22', '2025-03-11 19:39:22', 0);
INSERT INTO `categories_tbl` VALUES (32, 'MIT', '', 'active', 'Colleges', 4, 42, '2025-03-11 19:39:55', '2025-03-11 19:46:03', 0);
INSERT INTO `categories_tbl` VALUES (33, 'North western', '', 'active', 'Colleges', 5, 65, '2025-03-11 19:40:35', '2025-03-11 20:29:59', 0);
INSERT INTO `categories_tbl` VALUES (34, 'Princeton', '', 'active', 'Colleges', 6, 37, '2025-03-11 19:41:19', '2025-03-11 19:41:19', 0);
INSERT INTO `categories_tbl` VALUES (35, 'Stanford', '', 'active', 'Colleges', 7, 45, '2025-03-11 19:51:56', '2025-03-11 20:01:32', 0);
INSERT INTO `categories_tbl` VALUES (36, 'Uchicago', '', 'active', 'Colleges', 8, 63, '2025-03-11 19:52:46', '2025-03-11 20:29:34', 0);
INSERT INTO `categories_tbl` VALUES (37, 'Upenn', '', 'active', 'Colleges', 9, 60, '2025-03-11 19:53:01', '2025-03-11 20:29:14', 0);
INSERT INTO `categories_tbl` VALUES (38, 'Yale', '', 'active', 'Colleges', 10, 54, '2025-03-11 19:53:25', '2025-03-11 20:15:36', 0);
INSERT INTO `categories_tbl` VALUES (39, 'Atlanta', '', 'active', 'Cities', 1, 59, '2025-03-11 19:53:51', '2025-03-11 20:28:40', 0);
INSERT INTO `categories_tbl` VALUES (40, 'Boston', '', 'active', 'Cities', 2, 51, '2025-03-11 19:54:02', '2025-03-11 20:11:18', 0);
INSERT INTO `categories_tbl` VALUES (41, 'Chicago', '', 'active', 'Cities', 3, 75, '2025-03-11 19:54:19', '2025-03-11 20:31:31', 0);
INSERT INTO `categories_tbl` VALUES (42, 'District of Columbia', '', 'active', 'Cities', 4, 73, '2025-03-11 19:54:36', '2025-03-11 20:31:16', 0);
INSERT INTO `categories_tbl` VALUES (43, 'Houston', '', 'active', 'Cities', 5, 71, '2025-03-11 19:54:50', '2025-03-11 20:30:54', 0);
INSERT INTO `categories_tbl` VALUES (44, 'Los Angeles', '', 'active', 'Cities', 6, 68, '2025-03-11 19:55:09', '2025-03-11 20:30:36', 0);
INSERT INTO `categories_tbl` VALUES (45, 'Miami', '', 'active', 'Cities', 7, 57, '2025-03-11 19:55:23', '2025-03-11 20:18:24', 0);
INSERT INTO `categories_tbl` VALUES (46, 'New York City', '', 'active', 'Cities', 8, 67, '2025-03-11 19:55:45', '2025-03-11 20:30:15', 0);
INSERT INTO `categories_tbl` VALUES (47, 'San Francisco', '', 'active', 'Cities', 9, 53, '2025-03-11 19:56:01', '2025-03-11 20:13:36', 0);
INSERT INTO `categories_tbl` VALUES (48, 'Seattle', '', 'active', 'Cities', 10, 48, '2025-03-11 19:56:14', '2025-03-11 20:10:42', 0);

-- ----------------------------
-- Table structure for category_visibility_tbl
-- ----------------------------
DROP TABLE IF EXISTS `category_visibility_tbl`;
CREATE TABLE `category_visibility_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NULL DEFAULT NULL,
  `visibility_value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` enum('active','inactive','other') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'active',
  `visibility_value_type` int(2) UNSIGNED NULL DEFAULT NULL COMMENT '0: sex, 1: sexual oriantation, 2: college',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 98 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category_visibility_tbl
-- ----------------------------
INSERT INTO `category_visibility_tbl` VALUES (60, 24, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (61, 26, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (63, 27, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (66, 32, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (82, 35, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (84, 48, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (85, 40, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (86, 47, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (87, 38, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (88, 45, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (89, 39, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (90, 37, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (91, 36, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (92, 33, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (93, 46, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (94, 44, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (95, 43, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (96, 42, 'All', 'active', 3);
INSERT INTO `category_visibility_tbl` VALUES (97, 41, 'All', 'active', 3);

-- ----------------------------
-- Table structure for collection_category_tbl
-- ----------------------------
DROP TABLE IF EXISTS `collection_category_tbl`;
CREATE TABLE `collection_category_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `collection_id` int(11) NULL DEFAULT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for collection_visibility_tbl
-- ----------------------------
DROP TABLE IF EXISTS `collection_visibility_tbl`;
CREATE TABLE `collection_visibility_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `collection_id` int(11) NULL DEFAULT NULL,
  `visibility_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `visibility_value_type` int(2) NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'active',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for collections_tbl
-- ----------------------------
DROP TABLE IF EXISTS `collections_tbl`;
CREATE TABLE `collections_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `collection_order` int(11) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'active',
  `file_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for colleges_tbl
-- ----------------------------
DROP TABLE IF EXISTS `colleges_tbl`;
CREATE TABLE `colleges_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `college` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of colleges_tbl
-- ----------------------------
INSERT INTO `colleges_tbl` VALUES (12, 'nyu.edu', 'New York University');

-- ----------------------------
-- Table structure for emotions_tbl
-- ----------------------------
DROP TABLE IF EXISTS `emotions_tbl`;
CREATE TABLE `emotions_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `symbol` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of emotions_tbl
-- ----------------------------
INSERT INTO `emotions_tbl` VALUES (1, 'heart');
INSERT INTO `emotions_tbl` VALUES (2, 'laugh');
INSERT INTO `emotions_tbl` VALUES (3, 'sad');
INSERT INTO `emotions_tbl` VALUES (4, 'surprise');
INSERT INTO `emotions_tbl` VALUES (5, 'love');
INSERT INTO `emotions_tbl` VALUES (6, 'dislike');
INSERT INTO `emotions_tbl` VALUES (7, 'pray');

-- ----------------------------
-- Table structure for files_tbl
-- ----------------------------
DROP TABLE IF EXISTS `files_tbl`;
CREATE TABLE `files_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bytes` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `user_id` int(11) NULL DEFAULT NULL,
  `status` enum('uploaded','other') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 162 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of files_tbl
-- ----------------------------
INSERT INTO `files_tbl` VALUES (1, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741700817633-call-bg.jpg', 1456413, '2025-03-11 13:47:04', 3, 'uploaded', '2025-03-11 13:47:04');
INSERT INTO `files_tbl` VALUES (2, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741710987735-harvard_edu.jpeg', 47258, '2025-03-11 16:36:33', 1, 'uploaded', '2025-03-11 16:36:33');
INSERT INTO `files_tbl` VALUES (3, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712413586-harvard_edu.jpeg', 47258, '2025-03-11 17:00:17', 1, 'uploaded', '2025-03-11 17:00:17');
INSERT INTO `files_tbl` VALUES (4, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712415290-harvard_edu.jpeg', 47258, '2025-03-11 17:00:19', 1, 'uploaded', '2025-03-11 17:00:19');
INSERT INTO `files_tbl` VALUES (5, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712440907-harvard_edu.jpeg', 47258, '2025-03-11 17:00:44', 1, 'uploaded', '2025-03-11 17:00:44');
INSERT INTO `files_tbl` VALUES (6, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712440987-harvard_edu.jpeg', 47258, '2025-03-11 17:00:44', 1, 'uploaded', '2025-03-11 17:00:44');
INSERT INTO `files_tbl` VALUES (7, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712464737-harvard_edu.jpeg', 47258, '2025-03-11 17:01:08', 1, 'uploaded', '2025-03-11 17:01:08');
INSERT INTO `files_tbl` VALUES (8, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712464731-harvard_edu.jpeg', 47258, '2025-03-11 17:01:08', 1, 'uploaded', '2025-03-11 17:01:08');
INSERT INTO `files_tbl` VALUES (9, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712632813-harvard_edu.jpeg', 47258, '2025-03-11 17:03:57', 1, 'uploaded', '2025-03-11 17:03:57');
INSERT INTO `files_tbl` VALUES (10, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741712779680-harvard_edu.jpeg', 47258, '2025-03-11 17:06:24', 1, 'uploaded', '2025-03-11 17:06:24');
INSERT INTO `files_tbl` VALUES (11, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741713063639-weman-18-21.jpg', 7925, '2025-03-11 17:11:07', 1, 'uploaded', '2025-03-11 17:11:07');
INSERT INTO `files_tbl` VALUES (12, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741713108013-main-18-21.jpg', 4742, '2025-03-11 17:11:51', 1, 'uploaded', '2025-03-11 17:11:51');
INSERT INTO `files_tbl` VALUES (13, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718161437-Ellipse 535_11.png', 1277875, '2025-03-11 18:36:07', 1, 'uploaded', '2025-03-11 18:36:07');
INSERT INTO `files_tbl` VALUES (14, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718161498-Ellipse 535_11.png', 1277875, '2025-03-11 18:36:10', 1, 'uploaded', '2025-03-11 18:36:10');
INSERT INTO `files_tbl` VALUES (15, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718322712-Ellipse 535_1.png', 2050779, '2025-03-11 18:39:11', 1, 'uploaded', '2025-03-11 18:39:11');
INSERT INTO `files_tbl` VALUES (16, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718291227-Ellipse 535_1.png', 2050779, '2025-03-11 18:39:14', 1, 'uploaded', '2025-03-11 18:39:14');
INSERT INTO `files_tbl` VALUES (17, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718322736-Ellipse 535_1.png', 2050779, '2025-03-11 18:39:19', 1, 'uploaded', '2025-03-11 18:39:19');
INSERT INTO `files_tbl` VALUES (18, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718291334-Ellipse 535_1.png', 2050779, '2025-03-11 18:39:20', 1, 'uploaded', '2025-03-11 18:39:20');
INSERT INTO `files_tbl` VALUES (19, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718346033-Ellipse 535_1.png', 2050779, '2025-03-11 18:39:28', 1, 'uploaded', '2025-03-11 18:39:28');
INSERT INTO `files_tbl` VALUES (20, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718346127-Ellipse 535_1.png', 2050779, '2025-03-11 18:39:34', 1, 'uploaded', '2025-03-11 18:39:34');
INSERT INTO `files_tbl` VALUES (21, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718434099-Ellipse 535_2.png', 1147083, '2025-03-11 18:41:27', 1, 'uploaded', '2025-03-11 18:41:27');
INSERT INTO `files_tbl` VALUES (22, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718442285-Ellipse 535_2.png', 1147083, '2025-03-11 18:41:33', 1, 'uploaded', '2025-03-11 18:41:33');
INSERT INTO `files_tbl` VALUES (23, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718588269-Ellipse 535_3.png', 1371541, '2025-03-11 18:43:15', 1, 'uploaded', '2025-03-11 18:43:15');
INSERT INTO `files_tbl` VALUES (24, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718588261-Ellipse 535_3.png', 1371541, '2025-03-11 18:43:15', 1, 'uploaded', '2025-03-11 18:43:15');
INSERT INTO `files_tbl` VALUES (25, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718724479-Ellipse 535_4.png', 844053, '2025-03-11 18:46:50', 1, 'uploaded', '2025-03-11 18:46:50');
INSERT INTO `files_tbl` VALUES (26, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718724420-Ellipse 535_4.png', 844053, '2025-03-11 18:46:52', 1, 'uploaded', '2025-03-11 18:46:52');
INSERT INTO `files_tbl` VALUES (27, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718766938-Ellipse 535_4.png', 844053, '2025-03-11 18:46:53', 1, 'uploaded', '2025-03-11 18:46:53');
INSERT INTO `files_tbl` VALUES (28, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718824400-Ellipse 535_5.png', 4463919, '2025-03-11 18:48:20', 1, 'uploaded', '2025-03-11 18:48:20');
INSERT INTO `files_tbl` VALUES (29, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741718824231-Ellipse 535_5.png', 4463919, '2025-03-11 18:48:37', 1, 'uploaded', '2025-03-11 18:48:37');
INSERT INTO `files_tbl` VALUES (30, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741719018781-Ellipse 535_6.png', 1577635, '2025-03-11 18:50:42', 1, 'uploaded', '2025-03-11 18:50:42');
INSERT INTO `files_tbl` VALUES (31, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741719018717-Ellipse 535_6.png', 1577635, '2025-03-11 18:50:44', 1, 'uploaded', '2025-03-11 18:50:44');
INSERT INTO `files_tbl` VALUES (32, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741719424815-Ellipse 535_7.png', 10924840, '2025-03-11 19:06:09', 1, 'uploaded', '2025-03-11 19:06:09');
INSERT INTO `files_tbl` VALUES (33, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741721952100-Ellipse 535_8.png', 756902, '2025-03-11 19:39:20', 1, 'uploaded', '2025-03-11 19:39:20');
INSERT INTO `files_tbl` VALUES (34, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741721952033-Ellipse 535_8.png', 756902, '2025-03-11 19:39:35', 1, 'uploaded', '2025-03-11 19:39:35');
INSERT INTO `files_tbl` VALUES (35, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741721985101-Ellipse 535_9.png', 1830448, '2025-03-11 19:40:30', 1, 'uploaded', '2025-03-11 19:40:30');
INSERT INTO `files_tbl` VALUES (36, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741721985084-Ellipse 535_9.png', 1830448, '2025-03-11 19:40:32', 1, 'uploaded', '2025-03-11 19:40:32');
INSERT INTO `files_tbl` VALUES (37, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722053924-Ellipse 535_11.png', 1277875, '2025-03-11 19:41:17', 1, 'uploaded', '2025-03-11 19:41:17');
INSERT INTO `files_tbl` VALUES (38, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722053895-Ellipse 535_11.png', 1277875, '2025-03-11 19:41:25', 1, 'uploaded', '2025-03-11 19:41:25');
INSERT INTO `files_tbl` VALUES (39, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722034900-Ellipse 535_10.png', 7529845, '2025-03-11 19:44:05', 1, 'uploaded', '2025-03-11 19:44:05');
INSERT INTO `files_tbl` VALUES (40, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722034927-Ellipse 535_10.png', 7529845, '2025-03-11 19:44:15', 1, 'uploaded', '2025-03-11 19:44:15');
INSERT INTO `files_tbl` VALUES (41, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722295247-Ellipse 535_9.png', 1830448, '2025-03-11 19:45:59', 1, 'uploaded', '2025-03-11 19:45:59');
INSERT INTO `files_tbl` VALUES (42, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722295110-Ellipse 535_9.png', 1830448, '2025-03-11 19:46:02', 1, 'uploaded', '2025-03-11 19:46:02');
INSERT INTO `files_tbl` VALUES (43, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722155191-Ellipse 535_10.png', 7529845, '2025-03-11 19:47:16', 1, 'uploaded', '2025-03-11 19:47:16');
INSERT INTO `files_tbl` VALUES (44, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741722499149-Ellipse 535_10.png', 7529845, '2025-03-11 19:52:01', 1, 'uploaded', '2025-03-11 19:52:01');
INSERT INTO `files_tbl` VALUES (45, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723271037-Ellipse 535_12.png', 429080, '2025-03-11 20:01:25', 1, 'uploaded', '2025-03-11 20:01:25');
INSERT INTO `files_tbl` VALUES (46, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723315981-Ellipse 535_13.png', 8479307, '2025-03-11 20:05:25', 1, 'uploaded', '2025-03-11 20:05:25');
INSERT INTO `files_tbl` VALUES (47, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723315900-Ellipse 535_13.png', 8479307, '2025-03-11 20:05:32', 1, 'uploaded', '2025-03-11 20:05:32');
INSERT INTO `files_tbl` VALUES (48, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723834035-Ellipse 535_25-optimized.png', 463461, '2025-03-11 20:10:40', 1, 'uploaded', '2025-03-11 20:10:40');
INSERT INTO `files_tbl` VALUES (49, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723834042-Ellipse 535_25-optimized.png', 463461, '2025-03-11 20:10:44', 1, 'uploaded', '2025-03-11 20:10:44');
INSERT INTO `files_tbl` VALUES (50, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723871779-Ellipse 535_17-optimized.png', 232492, '2025-03-11 20:11:16', 1, 'uploaded', '2025-03-11 20:11:16');
INSERT INTO `files_tbl` VALUES (51, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741723871766-Ellipse 535_17-optimized.png', 232492, '2025-03-11 20:11:17', 1, 'uploaded', '2025-03-11 20:11:17');
INSERT INTO `files_tbl` VALUES (52, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724009579-Ellipse 535_24.png', 1004381, '2025-03-11 20:13:35', 1, 'uploaded', '2025-03-11 20:13:35');
INSERT INTO `files_tbl` VALUES (53, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724009622-Ellipse 535_24.png', 1004381, '2025-03-11 20:13:36', 1, 'uploaded', '2025-03-11 20:13:36');
INSERT INTO `files_tbl` VALUES (54, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724129879-Ellipse 535_15.png', 441525, '2025-03-11 20:15:35', 1, 'uploaded', '2025-03-11 20:15:35');
INSERT INTO `files_tbl` VALUES (55, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724129887-Ellipse 535_15.png', 441525, '2025-03-11 20:15:37', 1, 'uploaded', '2025-03-11 20:15:37');
INSERT INTO `files_tbl` VALUES (56, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724298075-Ellipse 535_22.png', 532710, '2025-03-11 20:18:23', 1, 'uploaded', '2025-03-11 20:18:23');
INSERT INTO `files_tbl` VALUES (57, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724298093-Ellipse 535_22.png', 532710, '2025-03-11 20:18:23', 1, 'uploaded', '2025-03-11 20:18:23');
INSERT INTO `files_tbl` VALUES (58, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724911982-Ellipse 535_10-compressed.jpg', 158547, '2025-03-11 20:28:39', 1, 'uploaded', '2025-03-11 20:28:39');
INSERT INTO `files_tbl` VALUES (59, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724911988-Ellipse 535_10-compressed.jpg', 158547, '2025-03-11 20:28:39', 1, 'uploaded', '2025-03-11 20:28:39');
INSERT INTO `files_tbl` VALUES (60, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724947496-Ellipse 535_8-compressed.jpg', 353567, '2025-03-11 20:29:12', 1, 'uploaded', '2025-03-11 20:29:12');
INSERT INTO `files_tbl` VALUES (61, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724947510-Ellipse 535_8-compressed.jpg', 353567, '2025-03-11 20:29:16', 1, 'uploaded', '2025-03-11 20:29:16');
INSERT INTO `files_tbl` VALUES (62, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724968871-Ellipse 535_7-compressed.jpg', 336994, '2025-03-11 20:29:33', 1, 'uploaded', '2025-03-11 20:29:33');
INSERT INTO `files_tbl` VALUES (63, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724968883-Ellipse 535_7-compressed.jpg', 336994, '2025-03-11 20:29:33', 1, 'uploaded', '2025-03-11 20:29:33');
INSERT INTO `files_tbl` VALUES (64, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724992803-Ellipse 535_4-compressed.jpg', 282917, '2025-03-11 20:29:57', 1, 'uploaded', '2025-03-11 20:29:57');
INSERT INTO `files_tbl` VALUES (65, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741724992787-Ellipse 535_4-compressed.jpg', 282917, '2025-03-11 20:29:57', 1, 'uploaded', '2025-03-11 20:29:57');
INSERT INTO `files_tbl` VALUES (66, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725010142-Ellipse 535_17-compressed.jpg', 84365, '2025-03-11 20:30:14', 1, 'uploaded', '2025-03-11 20:30:14');
INSERT INTO `files_tbl` VALUES (67, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725010147-Ellipse 535_17-compressed.jpg', 84365, '2025-03-11 20:30:14', 1, 'uploaded', '2025-03-11 20:30:14');
INSERT INTO `files_tbl` VALUES (68, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725030698-Ellipse 535_15-compressed.jpg', 407535, '2025-03-11 20:30:35', 1, 'uploaded', '2025-03-11 20:30:35');
INSERT INTO `files_tbl` VALUES (69, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725030680-Ellipse 535_15-compressed.jpg', 407535, '2025-03-11 20:30:39', 1, 'uploaded', '2025-03-11 20:30:39');
INSERT INTO `files_tbl` VALUES (70, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725048716-Ellipse 535_14-compressed.jpg', 124198, '2025-03-11 20:30:53', 1, 'uploaded', '2025-03-11 20:30:53');
INSERT INTO `files_tbl` VALUES (71, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725048727-Ellipse 535_14-compressed.jpg', 124198, '2025-03-11 20:30:53', 1, 'uploaded', '2025-03-11 20:30:53');
INSERT INTO `files_tbl` VALUES (72, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725071212-Ellipse 535_13-compressed.jpg', 157900, '2025-03-11 20:31:15', 1, 'uploaded', '2025-03-11 20:31:15');
INSERT INTO `files_tbl` VALUES (73, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725071222-Ellipse 535_13-compressed.jpg', 157900, '2025-03-11 20:31:15', 1, 'uploaded', '2025-03-11 20:31:15');
INSERT INTO `files_tbl` VALUES (74, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725086093-Ellipse 535_12-compressed.jpg', 357926, '2025-03-11 20:31:30', 1, 'uploaded', '2025-03-11 20:31:30');
INSERT INTO `files_tbl` VALUES (75, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/categories/1741725086078-Ellipse 535_12-compressed.jpg', 357926, '2025-03-11 20:31:31', 1, 'uploaded', '2025-03-11 20:31:31');
INSERT INTO `files_tbl` VALUES (76, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741759575412-test_video.mp4', 3114374, '2025-03-12 06:07:32', 1, 'uploaded', '2025-03-12 06:07:32');
INSERT INTO `files_tbl` VALUES (77, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741759575335-test_video.mp4', 3114374, '2025-03-12 06:07:46', 1, 'uploaded', '2025-03-12 06:07:46');
INSERT INTO `files_tbl` VALUES (78, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741759634381-test_video.mp4', 3114374, '2025-03-12 06:08:10', 1, 'uploaded', '2025-03-12 06:08:10');
INSERT INTO `files_tbl` VALUES (79, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741759634274-test_video.mp4', 3114374, '2025-03-12 06:08:17', 1, 'uploaded', '2025-03-12 06:08:17');
INSERT INTO `files_tbl` VALUES (80, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741760342214-Rectangle 22811.jpg', 355204, '2025-03-12 06:19:07', 1, 'uploaded', '2025-03-12 06:19:07');
INSERT INTO `files_tbl` VALUES (81, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741760342201-Rectangle 22811.jpg', 355204, '2025-03-12 06:19:07', 1, 'uploaded', '2025-03-12 06:19:07');
INSERT INTO `files_tbl` VALUES (82, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741760408238-Rectangle 22811.jpg', 355204, '2025-03-12 06:20:22', 1, 'uploaded', '2025-03-12 06:20:22');
INSERT INTO `files_tbl` VALUES (83, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741760408235-Rectangle 22811.jpg', 355204, '2025-03-12 06:20:26', 1, 'uploaded', '2025-03-12 06:20:26');
INSERT INTO `files_tbl` VALUES (84, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741760452423-test_video.mp4', 3114374, '2025-03-12 06:22:06', 1, 'uploaded', '2025-03-12 06:22:06');
INSERT INTO `files_tbl` VALUES (85, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761445817-test_video.mp4', 3114374, '2025-03-12 06:38:37', 1, 'uploaded', '2025-03-12 06:38:37');
INSERT INTO `files_tbl` VALUES (86, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761445978-test_video.mp4', 3114374, '2025-03-12 06:38:50', 1, 'uploaded', '2025-03-12 06:38:50');
INSERT INTO `files_tbl` VALUES (87, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761538452-Rectangle 22811.jpg', 355204, '2025-03-12 06:39:04', 1, 'uploaded', '2025-03-12 06:39:04');
INSERT INTO `files_tbl` VALUES (88, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761538438-Rectangle 22811.jpg', 355204, '2025-03-12 06:39:06', 1, 'uploaded', '2025-03-12 06:39:06');
INSERT INTO `files_tbl` VALUES (89, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761726718-Rectangle 22811.jpg', 355204, '2025-03-12 06:42:24', 1, 'uploaded', '2025-03-12 06:42:24');
INSERT INTO `files_tbl` VALUES (90, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761726732-Rectangle 22811.jpg', 355204, '2025-03-12 06:42:30', 1, 'uploaded', '2025-03-12 06:42:30');
INSERT INTO `files_tbl` VALUES (91, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761885182-fatboy.png', 47294, '2025-03-12 06:44:50', 3, 'uploaded', '2025-03-12 06:44:50');
INSERT INTO `files_tbl` VALUES (92, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761944516-Rectangle 22811.jpg', 355204, '2025-03-12 06:45:56', 1, 'uploaded', '2025-03-12 06:45:56');
INSERT INTO `files_tbl` VALUES (93, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741761972099-Rectangle 22811.jpg', 355204, '2025-03-12 06:46:16', 1, 'uploaded', '2025-03-12 06:46:16');
INSERT INTO `files_tbl` VALUES (94, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762061697-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:47:46', 1, 'uploaded', '2025-03-12 06:47:46');
INSERT INTO `files_tbl` VALUES (95, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762071885-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:47:52', 1, 'uploaded', '2025-03-12 06:47:52');
INSERT INTO `files_tbl` VALUES (96, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762269871-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:51:14', 1, 'uploaded', '2025-03-12 06:51:14');
INSERT INTO `files_tbl` VALUES (97, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762419124-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:53:44', 1, 'uploaded', '2025-03-12 06:53:44');
INSERT INTO `files_tbl` VALUES (98, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762419127-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:53:44', 1, 'uploaded', '2025-03-12 06:53:44');
INSERT INTO `files_tbl` VALUES (99, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762460830-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:54:25', 1, 'uploaded', '2025-03-12 06:54:25');
INSERT INTO `files_tbl` VALUES (100, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762653324-Rectangle 22811_2.jpg', 103331, '2025-03-12 06:57:37', 1, 'uploaded', '2025-03-12 06:57:37');
INSERT INTO `files_tbl` VALUES (101, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762666829-test_video.mp4', 3114374, '2025-03-12 06:58:05', 1, 'uploaded', '2025-03-12 06:58:05');
INSERT INTO `files_tbl` VALUES (102, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762774227-test_video.mp4', 3114374, '2025-03-12 06:59:42', 1, 'uploaded', '2025-03-12 06:59:42');
INSERT INTO `files_tbl` VALUES (103, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762778478-Rectangle 22811.jpg', 355204, '2025-03-12 06:59:43', 1, 'uploaded', '2025-03-12 06:59:43');
INSERT INTO `files_tbl` VALUES (104, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762853580-Rectangle 22811_1.jpg', 349494, '2025-03-12 07:00:58', 1, 'uploaded', '2025-03-12 07:00:58');
INSERT INTO `files_tbl` VALUES (105, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762856102-test_video.mp4', 3114374, '2025-03-12 07:01:19', 1, 'uploaded', '2025-03-12 07:01:19');
INSERT INTO `files_tbl` VALUES (106, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762933401-Rectangle 22811_2.jpg', 103331, '2025-03-12 07:02:17', 1, 'uploaded', '2025-03-12 07:02:17');
INSERT INTO `files_tbl` VALUES (107, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741762931157-test_video.mp4', 3114374, '2025-03-12 07:03:06', 1, 'uploaded', '2025-03-12 07:03:06');
INSERT INTO `files_tbl` VALUES (108, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741764724507-Rectangle 22811_2.jpg', 103331, '2025-03-12 07:32:10', 1, 'uploaded', '2025-03-12 07:32:10');
INSERT INTO `files_tbl` VALUES (109, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741764727894-test_video.mp4', 3114374, '2025-03-12 07:34:15', 1, 'uploaded', '2025-03-12 07:34:15');
INSERT INTO `files_tbl` VALUES (110, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741786618315-Rectangle 22811_1.jpg', 349494, '2025-03-12 13:37:16', 1, 'uploaded', '2025-03-12 13:37:16');
INSERT INTO `files_tbl` VALUES (111, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741786641285-100627-video-720.mp4', 2705845, '2025-03-12 13:39:57', 1, 'uploaded', '2025-03-12 13:39:57');
INSERT INTO `files_tbl` VALUES (112, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741801207603-download (2).jpg', 8505, '2025-03-12 17:40:11', 1, 'uploaded', '2025-03-12 17:40:11');
INSERT INTO `files_tbl` VALUES (113, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741801217128-Az6c7YTYga8_144.mp4', 344500, '2025-03-12 17:40:28', 1, 'uploaded', '2025-03-12 17:40:28');
INSERT INTO `files_tbl` VALUES (114, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741801252484-download (2).jpg', 8505, '2025-03-12 17:40:57', 1, 'uploaded', '2025-03-12 17:40:57');
INSERT INTO `files_tbl` VALUES (115, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741801255612-Az6c7YTYga8_144.mp4', 344500, '2025-03-12 17:41:00', 1, 'uploaded', '2025-03-12 17:41:00');
INSERT INTO `files_tbl` VALUES (116, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802015631-Rectangle 22811.jpg', 355204, '2025-03-12 17:53:40', 1, 'uploaded', '2025-03-12 17:53:40');
INSERT INTO `files_tbl` VALUES (117, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802032266-test2.mp4', 838274, '2025-03-12 17:53:58', 1, 'uploaded', '2025-03-12 17:53:58');
INSERT INTO `files_tbl` VALUES (118, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802096115-Rectangle 22811_1.jpg', 349494, '2025-03-12 17:55:01', 1, 'uploaded', '2025-03-12 17:55:01');
INSERT INTO `files_tbl` VALUES (119, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802113006-test1.mp4', 972412, '2025-03-12 17:55:18', 1, 'uploaded', '2025-03-12 17:55:18');
INSERT INTO `files_tbl` VALUES (120, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802176561-images (1).jpg', 14198, '2025-03-12 17:56:20', 1, 'uploaded', '2025-03-12 17:56:20');
INSERT INTO `files_tbl` VALUES (121, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802178935-NuvWHU38d6V_144.mp4', 292917, '2025-03-12 17:56:23', 1, 'uploaded', '2025-03-12 17:56:23');
INSERT INTO `files_tbl` VALUES (122, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802228788-Rectangle 22811_2.jpg', 103331, '2025-03-12 17:57:13', 1, 'uploaded', '2025-03-12 17:57:13');
INSERT INTO `files_tbl` VALUES (123, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802224889-100627-video-720.mp4', 2705845, '2025-03-12 17:57:29', 1, 'uploaded', '2025-03-12 17:57:29');
INSERT INTO `files_tbl` VALUES (124, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802305696-images.jpg', 17759, '2025-03-12 17:58:29', 1, 'uploaded', '2025-03-12 17:58:29');
INSERT INTO `files_tbl` VALUES (125, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1741802307819-Az6c7YTYga8_144.mp4', 344500, '2025-03-12 17:58:32', 1, 'uploaded', '2025-03-12 17:58:32');
INSERT INTO `files_tbl` VALUES (126, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742822704222-female_test.jpg', 5478, '2025-03-24 13:25:07', 7, 'uploaded', '2025-03-24 13:25:07');
INSERT INTO `files_tbl` VALUES (127, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742824194430-female_test.jpg', 5478, '2025-03-24 13:49:57', 7, 'uploaded', '2025-03-24 13:49:57');
INSERT INTO `files_tbl` VALUES (128, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742824260668-female_test.jpg', 5478, '2025-03-24 13:51:04', 7, 'uploaded', '2025-03-24 13:51:04');
INSERT INTO `files_tbl` VALUES (129, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742859026248-female_test2.jpg', 6129, '2025-03-24 23:30:29', 7, 'uploaded', '2025-03-24 23:30:29');
INSERT INTO `files_tbl` VALUES (130, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742860048840-female_test.jpg', 5478, '2025-03-24 23:47:32', 7, 'uploaded', '2025-03-24 23:47:32');
INSERT INTO `files_tbl` VALUES (131, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742860348841-female_test.jpg', 5478, '2025-03-24 23:52:32', 7, 'uploaded', '2025-03-24 23:52:32');
INSERT INTO `files_tbl` VALUES (132, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742860628464-female_test.jpg', 5478, '2025-03-24 23:57:11', 7, 'uploaded', '2025-03-24 23:57:11');
INSERT INTO `files_tbl` VALUES (133, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1742862533482-female_test2.jpg', 6129, '2025-03-25 00:28:58', 7, 'uploaded', '2025-03-25 00:28:58');
INSERT INTO `files_tbl` VALUES (134, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743265806732-6010331.jpg', 408615, '2025-03-29 16:30:35', 7, 'uploaded', '2025-03-29 16:30:35');
INSERT INTO `files_tbl` VALUES (135, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743265843709-6010331.jpg', 408615, '2025-03-29 16:31:31', 7, 'uploaded', '2025-03-29 16:31:31');
INSERT INTO `files_tbl` VALUES (136, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743266636998-6010331.jpg', 408615, '2025-03-29 16:44:29', 7, 'uploaded', '2025-03-29 16:44:29');
INSERT INTO `files_tbl` VALUES (137, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743267112969-6010331.jpg', 408615, '2025-03-29 16:52:12', 7, 'uploaded', '2025-03-29 16:52:12');
INSERT INTO `files_tbl` VALUES (138, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743267545187-6010331.jpg', 408615, '2025-03-29 16:59:22', 7, 'uploaded', '2025-03-29 16:59:22');
INSERT INTO `files_tbl` VALUES (139, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743397336662-background.jpg', 952380, '2025-03-31 05:02:24', 7, 'uploaded', '2025-03-31 05:02:24');
INSERT INTO `files_tbl` VALUES (140, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743398977359-background.jpg', 952380, '2025-03-31 05:29:50', 7, 'uploaded', '2025-03-31 05:29:50');
INSERT INTO `files_tbl` VALUES (141, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743399110163-background.jpg', 952380, '2025-03-31 05:31:56', 7, 'uploaded', '2025-03-31 05:31:56');
INSERT INTO `files_tbl` VALUES (142, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743399144744-background.jpg', 952380, '2025-03-31 05:32:31', 7, 'uploaded', '2025-03-31 05:32:31');
INSERT INTO `files_tbl` VALUES (143, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743399334128-background.jpg', 952380, '2025-03-31 05:36:01', 7, 'uploaded', '2025-03-31 05:36:01');
INSERT INTO `files_tbl` VALUES (144, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743399424482-background.jpg', 952380, '2025-03-31 05:37:09', 7, 'uploaded', '2025-03-31 05:37:09');
INSERT INTO `files_tbl` VALUES (145, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743399702686-background.jpg', 952380, '2025-03-31 05:42:04', 7, 'uploaded', '2025-03-31 05:42:04');
INSERT INTO `files_tbl` VALUES (146, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743447088473-background.jpg', 952380, '2025-03-31 18:51:44', 7, 'uploaded', '2025-03-31 18:51:44');
INSERT INTO `files_tbl` VALUES (147, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743447101247-background.jpg', 952380, '2025-03-31 18:51:48', 7, 'uploaded', '2025-03-31 18:51:48');
INSERT INTO `files_tbl` VALUES (148, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743447149447-female_test.jpg', 5478, '2025-03-31 18:52:32', 7, 'uploaded', '2025-03-31 18:52:32');
INSERT INTO `files_tbl` VALUES (149, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743447209585-female_test.jpg', 5478, '2025-03-31 18:53:33', 7, 'uploaded', '2025-03-31 18:53:33');
INSERT INTO `files_tbl` VALUES (150, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743448774723-female_test2.jpg', 6129, '2025-03-31 19:19:38', 7, 'uploaded', '2025-03-31 19:19:38');
INSERT INTO `files_tbl` VALUES (151, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1743474852652-female_test2.jpg', 6129, '2025-04-01 02:34:16', 7, 'uploaded', '2025-04-01 02:34:16');
INSERT INTO `files_tbl` VALUES (152, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1743479038321-female_test2.jpg', 6129, '2025-04-01 03:44:02', 7, 'uploaded', '2025-04-01 03:44:02');
INSERT INTO `files_tbl` VALUES (153, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743479520321-female_test2.jpg', 6129, '2025-04-01 03:52:03', 7, 'uploaded', '2025-04-01 03:52:03');
INSERT INTO `files_tbl` VALUES (154, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/posts/1743479799972-male_test1.jpg', 7030, '2025-04-01 03:56:43', 7, 'uploaded', '2025-04-01 03:56:43');
INSERT INTO `files_tbl` VALUES (155, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1743658535390-female_test2.jpg', 6129, '2025-04-03 05:35:39', 7, 'uploaded', '2025-04-03 05:35:39');
INSERT INTO `files_tbl` VALUES (156, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1743658588430-female_test2.jpg', 6129, '2025-04-03 05:36:31', 7, 'uploaded', '2025-04-03 05:36:31');
INSERT INTO `files_tbl` VALUES (157, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/avatars/1743661318448-female_test2.jpg', 6129, '2025-04-03 06:22:02', 7, 'uploaded', '2025-04-03 06:22:02');
INSERT INTO `files_tbl` VALUES (158, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1745340495321-Screenshot 2025-04-21 105105.png', 5819, '2025-04-22 16:48:19', 1, 'uploaded', '2025-04-22 16:48:19');
INSERT INTO `files_tbl` VALUES (159, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1745341446527-123.mp4', 2886814, '2025-04-22 17:04:46', 1, 'uploaded', '2025-04-22 17:04:46');
INSERT INTO `files_tbl` VALUES (160, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1745341519113-logo.png', 4829, '2025-04-22 17:05:22', 1, 'uploaded', '2025-04-22 17:05:22');
INSERT INTO `files_tbl` VALUES (161, 'https://lovestory-aws-bucket.s3.us-west-2.amazonaws.com/videos/1745341500281-background.jpg', 952380, '2025-04-22 17:05:28', 1, 'uploaded', '2025-04-22 17:05:28');

-- ----------------------------
-- Table structure for matches_tbl
-- ----------------------------
DROP TABLE IF EXISTS `matches_tbl`;
CREATE TABLE `matches_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email1` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `score` int(11) NULL DEFAULT NULL,
  `email1_status` enum('accepted','pending','rejected','expired') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'pending',
  `email2_status` enum('accepted','pending','rejected','expired') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'pending',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `expiration` timestamp(0) NULL DEFAULT NULL,
  `expiration_email_sent` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for matching_action_tbl
-- ----------------------------
DROP TABLE IF EXISTS `matching_action_tbl`;
CREATE TABLE `matching_action_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user1_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `user2_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `matching_action` enum('accepted','reignited','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for miscellaneous_tbl
-- ----------------------------
DROP TABLE IF EXISTS `miscellaneous_tbl`;
CREATE TABLE `miscellaneous_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `regular_match_deadline` int(11) NULL DEFAULT NULL,
  `subscriber_match_deadline` int(11) NULL DEFAULT NULL,
  `regular_info_spending_limit` int(11) NULL DEFAULT NULL,
  `subscriber_info_spending_limit` int(11) NULL DEFAULT NULL,
  `reignite_cost` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of miscellaneous_tbl
-- ----------------------------
INSERT INTO `miscellaneous_tbl` VALUES (1, 50, 59, 25, 100, 50);

-- ----------------------------
-- Table structure for payment_details_tbl
-- ----------------------------
DROP TABLE IF EXISTS `payment_details_tbl`;
CREATE TABLE `payment_details_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_subscription_id` int(11) NULL DEFAULT NULL,
  `payment_date` timestamp(0) NULL DEFAULT current_timestamp(0),
  `amount_number` decimal(10, 2) NULL DEFAULT NULL,
  `payment_method` enum('credit_card','paypal','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for post_category_tbl
-- ----------------------------
DROP TABLE IF EXISTS `post_category_tbl`;
CREATE TABLE `post_category_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NULL DEFAULT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for post_emotion_tbl
-- ----------------------------
DROP TABLE IF EXISTS `post_emotion_tbl`;
CREATE TABLE `post_emotion_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NULL DEFAULT NULL,
  `emotion_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for post_file_tbl
-- ----------------------------
DROP TABLE IF EXISTS `post_file_tbl`;
CREATE TABLE `post_file_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NULL DEFAULT NULL,
  `file_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for posts_tbl
-- ----------------------------
DROP TABLE IF EXISTS `posts_tbl`;
CREATE TABLE `posts_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `post_type` enum('discussion','video','review') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rating` float(11, 1) NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `status` enum('active','inactive') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'active',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `p_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `target_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT 'post_type = discussion => category_id, video => video_id, review => user_id(reviewee)',
  `image_file_id` int(11) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question_prices_tbl
-- ----------------------------
DROP TABLE IF EXISTS `question_prices_tbl`;
CREATE TABLE `question_prices_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` float(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 542 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question_prices_tbl
-- ----------------------------
INSERT INTO `question_prices_tbl` VALUES (1, 'What is your first name?', 0.00);
INSERT INTO `question_prices_tbl` VALUES (2, 'What is your last name?', 100.00);
INSERT INTO `question_prices_tbl` VALUES (3, 'What is your middle name, if any?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (4, 'What is your nickname, if any?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (5, 'What is your date of birth?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (6, 'What is your sex?', 0.00);
INSERT INTO `question_prices_tbl` VALUES (7, 'What is your eye color?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (8, 'What is your current hair color?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (9, 'What is your natural hair color?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (10, 'What is your body type?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (11, 'What is your height?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (12, 'What is your weight?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (13, 'How would you describe your level of masculinity or femininity?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (14, 'Do you have an internal monologue?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (15, 'How would you describe your general happiness level?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (16, 'How do you feel about your life overall?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (17, 'How do you approach personal growth and self-improvement?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (18, 'How would you describe your self-esteem?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (19, 'How do you approach personal and professional growth?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (20, 'How would you describe your overall outlook on life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (21, 'How resilient are you when faced with setbacks?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (22, 'How do you cope with challenges and setbacks?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (23, 'How often do you practice positive thinking?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (24, 'In difficult situations, how do you maintain a positive attitude?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (25, 'How would you rate your level of empathy and emotional intelligence?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (26, 'How do you usually handle conflicts?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (27, 'How comfortable are you with vulnerability and emotional sharing in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (28, 'Which of these traits best describe your personality?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (29, 'What type of guy are you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (30, 'What type of girl are you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (31, 'Are you more of an introvert or an extrovert?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (32, 'Are you more of an optimist or a pessimist?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (33, 'How open-minded and curious are you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (34, 'How important is it for you to challenge your own beliefs and learn from others?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (35, 'How would you describe your sense of humor?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (36, 'How important is laughter in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (37, 'How often do you use humor in your daily life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (38, 'I enjoy:', 1.50);
INSERT INTO `question_prices_tbl` VALUES (39, 'In difficult situations, I tend to:', 1.50);
INSERT INTO `question_prices_tbl` VALUES (40, 'Who are your top 3 favorite comedians?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (41, 'How often do you engage in self-reflection?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (42, 'How important is personal growth to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (43, 'How would you rate your commitment to self-improvement?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (44, 'What self-care practices do you regularly engage in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (45, 'How often do you practice mindfulness or meditation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (46, 'How would you rate your overall physical health?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (47, 'What hormonal birth control do you currently use, if any?', 20.00);
INSERT INTO `question_prices_tbl` VALUES (48, 'What types of medications, if any, are you currently taking?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (49, 'How many COVID-19 vaccine doses have you received?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (50, 'What is your blood type?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (51, 'To what extent, if any, are you affected by blindness?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (52, 'To what extent, if any, are you affected by deafness or hearing loss?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (53, 'Do you have any physical health issues or conditions?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (54, 'Do you have any disorders or disabilities?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (55, 'Are you neurodiverse? If so, in what way?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (56, 'Are you missing any limbs or extremities, and if so, which ones?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (57, 'Do you have any STDs?', 20.00);
INSERT INTO `question_prices_tbl` VALUES (58, 'Have you ever undergone surgery? If so, what type?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (59, 'Have you ever had a medical or surgical abortion, and if so, how many?', 20.00);
INSERT INTO `question_prices_tbl` VALUES (60, 'Have you ever used Plan B, and if so, how many times?', 20.00);
INSERT INTO `question_prices_tbl` VALUES (61, 'How would you rate your overall mental health?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (62, 'Do you have any mental health issues or conditions?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (63, 'How many times do you cry each year, on average?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (64, 'Have you ever been a victim of a serious crime?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (65, 'Have you ever been a victim of terrorism?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (66, 'Have you ever experienced a significant or serious instance of sexual assault?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (67, 'Have you ever sought therapy or counseling for mental health reasons?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (68, 'Have you ever had a near death experience?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (69, 'Have you ever attempted suicide?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (70, 'How many people do you personally know that have committed suicide?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (71, 'Which of these phobias, if any, do you experience?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (72, 'How do you manage stress in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (73, 'Which of these substances, if any, have you used previously?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (74, 'Which of these substances, if any, do you use regularly?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (75, 'How much do you rely on your intuition when making decisions?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (76, 'When faced with a difficult decision, which approach do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (77, 'How often do you make decisions based on your gut feeling?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (78, 'How confident are you in your decision-making abilities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (79, 'How ambitious would you consider yourself to be?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (80, 'How driven and motivated are you when it comes to achieving your goals?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (81, 'What are your top two hopes and dreams?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (82, 'Which of these fears resonate with you the most?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (83, 'What is your biggest regret?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (84, 'What has been your biggest failure?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (85, 'What are your proudest life accomplishments so far?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (86, 'Which of the following life milestones are you most looking forward to?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (87, 'What is your religious affiliation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (88, 'Do you believe in a higher power?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (89, 'What are your views on circumcision?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (90, 'What are your beliefs about death and the afterlife?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (91, 'How often do you pray?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (92, 'How important is religion in your daily life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (93, 'How often do you attend religious services or gatherings?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (94, 'Are you open to dating someone with a different religious background?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (95, 'What are your views on astrology or numerology?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (96, 'What is your Western zodiac sign?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (97, 'What is your Chinese zodiac sign?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (98, 'Do you believe in fate?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (99, 'Do you believe in karma?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (100, 'Do you believe ghosts are real?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (101, 'Do you believe spirits are real?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (102, 'Do you believe in the power of positive thinking?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (103, 'How important is it for you to maintain the traditions of your cultural heritage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (104, 'Would you prefer a partner with a similar cultural background as yours?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (105, 'What citizenships do you have?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (106, 'What nationalities form your dad′s ancestry?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (107, 'What nationalities form your mom′s ancestry?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (108, 'What percent of each ethnicity are you approximately?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (109, 'Do you belong to any of the following ethnicities or subgroups?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (110, 'How open are you to learning about and experiencing different cultures?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (111, 'How important are cultural traditions and customs to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (112, 'How important are cultural celebrations and holidays to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (113, 'Which cultural or religious celebrations do you partake in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (114, 'What college do you currently attend?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (115, 'What college, if any, did you previously attend?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (116, 'What are you major(s)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (117, 'What are your minor(s)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (118, 'What is the highest level of education you′ve attained or are enrolled in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (119, 'What is the highest level of education you plan on attaining?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (120, 'How intellectually curious would you consider yourself to be?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (121, 'Do you enjoy engaging in thought-provoking discussions?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (122, 'How would you rate your critical thinking skills?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (123, 'When faced with a problem, what is your preferred approach to solving it?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (124, 'How do you handle conflicting opinions or information?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (125, 'What is your current cumulative GPA?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (126, 'What was your high school UGPA?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (127, 'What was your highest combined math and verbal SAT score?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (128, 'What was your highest ACT score?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (129, 'What is your preferred learning style?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (130, 'How do you typically study or learn new information?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (131, 'Which creative hobbies do you actively engage in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (132, 'When faced with a problem, do you tend to:', 1.50);
INSERT INTO `question_prices_tbl` VALUES (133, 'Are you open to new ideas and innovative solutions in your personal and professional life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (134, 'How many languages do you speak fluently?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (135, 'Which languages can you read, speak, and write fluently?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (136, 'Which languages can you read with at least basic proficiency?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (137, 'Which languages can you speak with at least basic proficiency?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (138, 'Which languages can you write with at least basic proficiency?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (139, 'How would you rate your storytelling abilities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (140, 'How would you describe your level of verbosity?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (141, 'Which curse words do you tend to use most frequently, if any?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (142, 'Which of the following best describes your personal values and ethics?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (143, 'How often do you consume news and follow current events?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (144, 'What are your top 2 favorite sources of news and media?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (145, 'Which best describes your political views?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (146, 'Which political party do you most closely identify with?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (147, 'Who did you vote for president in the 2016 primary election?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (148, 'Who did you vote for president in the 2016 general election?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (149, 'Who did you vote for president in the 2020 primary election?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (150, 'Who did you vote for president in the 2020 general election?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (151, 'Who did you vote for president in the 2024 primary election?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (152, 'Who did you vote for president in the 2024 general election?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (153, 'What are your views on capitalism?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (154, 'What are your views on anthropogenic climate change or global warming?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (155, 'What are your views on LGBTQIA+ rights and issues?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (156, 'What are your views on the use of gender pronouns (e.g., she/her, he/him, they/them)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (157, 'What are your views on white privilege?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (158, 'What are your views on racism?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (159, 'What are your views on vaccines in general?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (160, 'What are your views on COVID-19 vaccines?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (161, 'What are your views on Israel?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (162, 'What are your views on Palestine or the Palestinian cause?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (163, 'How would you describe your views on Jewish people?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (164, 'How would you describe your views on Muslim people?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (165, 'What are your views on memes?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (166, 'How often and why do you change your mind on politics?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (167, 'How important is politics in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (168, 'How active are you in activism and advocacy for social or political causes?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (169, 'How engaged are you in civic life (e.g., voting, attending community meetings, participating in local politics)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (170, 'How committed are you to living a sustainable lifestyle?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (171, 'How often do you engage in environmentally friendly practices (e.g., recycling, reducing waste, conserving energy)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (172, 'How often do you volunteer or participate in community projects?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (173, 'Which social issues are most important to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (174, 'How active are you in social or political activism?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (175, 'How would you rate your level of empathy?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (176, 'How often do you engage in acts of kindness or compassionate acts?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (177, 'Which of the following acts of kindness or compassion have you performed recently?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (178, 'How would you rate your ability to provide emotional support to others?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (179, 'How comfortable are you with providing a listening ear to others in need?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (180, 'In times of need, how available are you for others?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (181, 'How often do you express gratitude or appreciation for the people and things in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (182, 'In what ways do you typically express gratitude or appreciation to others?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (183, 'How important is it for you to receive expressions of gratitude or appreciation from others in your relationships?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (184, 'How would you rate your ability to pick up on social cues and nonverbal communication?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (185, 'How sensitive are you to others′ feelings in social situations?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (186, 'How empathetic are you in social situations?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (187, 'How would you rate your ability to connect with others and understand different perspectives?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (188, 'How would you rate your active listening skills?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (189, 'How important is a sense of community to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (190, 'What types of groups, clubs, or organizations do you belong to or have an interest in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (191, 'How involved are you in the groups, clubs, or organizations you belong to?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (192, 'How often do you engage with local groups, organizations, and events?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (193, 'How often do you volunteer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (194, 'What types of organizations do you prefer to support through volunteering?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (195, 'How do you prefer to give to charity?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (196, 'What cause do you prioritize when giving to charity?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (197, 'How do you view the importance of philanthropy in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (198, 'How would you describe the size of your social circle?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (199, 'How often do you engage with your friends?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (200, 'How do you prefer to socialize with friends?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (201, 'Are you involved in Greek life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (202, 'Which of these fraternities or sororities, if any, do you belong to?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (203, 'Do you belong to any secret society, final club, or eating club?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (204, 'What type of friendship style do you have?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (205, 'How do you maintain friendships?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (206, 'What do you expect from your friends?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (207, 'How do you feel about merging social circles with your partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (208, 'On which occasions do you usually give gifts?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (209, 'What kind of gifts do you typically give to friends and loved ones?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (210, 'How often do you engage in professional networking?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (211, 'What is your preferred method of networking?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (212, 'In a collaborative or team setting, what role do you usually take on?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (213, 'How would you describe your conflict management style?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (214, 'How resilient are you in challenging situations?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (215, 'How would you describe your digital presence?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (216, 'Which social media platforms do you use most frequently?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (217, 'How comfortable are you with sharing personal information on social media?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (218, 'How do you prefer to engage with others through digital platforms?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (219, 'What are your long-term career aspirations?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (220, 'How satisfied are you with your current job and work environment?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (221, 'How would you describe your work ethic?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (222, 'How much time and effort do you put into professional development?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (223, 'How would you describe your work-life balance?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (224, 'What is your strategy for maintaining harmony between work and personal life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (225, 'How do you allocate your time and energy between work and leisure?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (226, 'How willing are you to adjust your work-life balance for a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (227, 'What are your work priorities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (228, 'What are your leisure priorities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (229, 'How would you rate your time management skills?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (230, 'What best describes your daily routine?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (231, 'How do you prioritize tasks and responsibilities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (232, 'How would you describe your punctuality in attending appointments and events?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (233, 'How future-oriented are you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (234, 'How do you approach setting and achieving life goals?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (235, 'How do you handle major life transitions?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (236, 'How do you feel about adjusting your daily routine and priorities for a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (237, 'How would you describe your approach to managing finances?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (238, 'How frugal are you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (239, 'Do you currently rent/lease or own your residence?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (240, 'Do you currently rent/lease, own, or borrow your car?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (241, 'How much do you have in your bank and brokerage account(s)?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (242, 'How much do you owe in car loans?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (243, 'How much do you owe in student loans?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (244, 'How much do you owe in credit card debt?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (245, 'What is your credit score situation?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (246, 'Did you run a lemonade stand, start a small business or side hustle, etc., when you were younger?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (247, 'What car make do you currently drive?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (248, 'What year is the car you currently drive?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (249, 'What is your general approach to long-term financial planning?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (250, 'What are your long-term financial goals?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (251, 'What net worth are you targeting for the next few decades?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (252, 'What annual income are you targeting for the next few decades?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (253, 'What are your expectations for financial management in a long-term relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (254, 'How do you feel about combining finances with a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (255, 'What are your expectations for shared financial responsibilities in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (256, 'What is your current occupation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (257, 'When you graduate, what industry will you likely work in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (258, 'armed forces, if any, have you served in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (259, 'Which home design style do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (260, 'How important is having a well-decorated living space to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (261, 'Have you ever lived with a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (262, 'How do you feel about sharing living spaces with a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (263, 'What are your expectations for a partner′s involvement in household responsibilities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (264, 'How would you describe your level of neatness and organization?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (265, 'How do you feel about clutter in your living space?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (266, 'How would you rate your interest in technology and innovation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (267, 'What is your perspective on the role of technology in society?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (268, 'Which mobile operating system do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (269, 'Do you prefer using a Mac or PC for computing?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (270, 'Which gaming platform do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (271, 'How do you prefer to spend your leisure time?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (272, 'How important is relaxation and downtime in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (273, 'Are you more of an adventurous person or do you prefer a more predictable routine?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (274, 'How often do you enjoy trying new activities or hobbies?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (275, 'How important is spontaneity in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (276, 'How much alone time do you typically need?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (277, 'What are some of your personal interests?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (278, 'How do you balance socializing and spending time alone?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (279, 'What type of art do you most enjoy?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (280, 'How often do you visit art galleries or museums?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (281, 'Do you enjoy live performances, such as theater, concerts, or dance?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (282, 'Which of the following best describes your involvement in the arts?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (283, 'What is your favorite type of live performance?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (284, 'Do you enjoy attending cultural festivals or events?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (285, 'Do you like to travel?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (286, 'What type of travel do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (287, 'How often do you travel?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (288, 'How often would you like to travel in the future?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (289, 'Do you prefer domestic or international travel, or both equally?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (290, 'How do you prefer to plan your vacations?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (291, 'Which type of accommodation do you prefer when traveling?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (292, 'Which countries have you visited for more than 3 days?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (293, 'What are your top 10 favorite international travel destinations?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (294, 'What are the top 25 countries you would you like to visit next?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (295, 'What are your favorite types of destinations to visit?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (296, 'What are your top 3 favorite airlines?', 0.50);
INSERT INTO `question_prices_tbl` VALUES (297, 'What type of living environments do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (298, 'When choosing a place to live, what factors are most important to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (299, 'How important is it for you to live in a walkable area with shops, restaurants, and amenities nearby?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (300, 'What type of climates do you prefer to live in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (301, 'How open are you to relocating for a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (302, 'Are you willing to live in a different country for love?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (303, 'What state are you from?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (304, 'What region of the country are you from?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (305, 'What state do you live in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (306, 'What state does your dad live in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (307, 'What state does your mom live in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (308, 'What region of the country do you want to live in after graduation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (309, 'Where do you want to live after graduation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (310, 'How important is living near your family?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (311, 'How important is living near your friends?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (312, 'What are your top 3 favorite movie genres?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (313, 'What are your top 10 favorite movies?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (314, 'What are your top 3 favorite Disney movies?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (315, 'Which TV show genres do you enjoy most?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (316, 'What are your top 3 favorite TV channels?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (317, 'Who are your top 3 favorite TV talk show hosts?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (318, 'Do you enjoy playing video games?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (319, 'What are your top 3 favorite video game genres?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (320, 'What are your top 5 favorite video games?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (321, 'What are your top 3 favorite board games?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (322, 'What are your top 3 favorite card games?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (323, 'How do you prefer to consume movies and TV shows?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (324, 'Do you prefer physical books, eBooks, or audiobooks?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (325, 'How often do you play video games?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (326, 'How often do you read books?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (327, 'How important are books in your life?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (328, 'What are your top 3 favorite book genres?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (329, 'What are your top 10 favorite books?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (330, 'Who are your top 3 favorite authors?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (331, 'What are your top 3 favorite music genres?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (332, 'Who are your top 3 favorite musicians?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (333, 'What are your top 3 favorite musical instruments?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (334, 'How often do you exercise or engage in physical activities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (335, 'What types of exercise or physical activities do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (336, 'How many days a week do you usually go to the gym or work out?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (337, 'How would you describe your approach to nutrition and eating habits?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (338, 'Do you follow any specific dietary preferences or restrictions?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (339, 'On average, how many hours of sleep do you get per night?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (340, 'How many naps do you take each week?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (341, 'What are your preferred methods for rest and relaxation?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (342, 'What is your level of interest in sports?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (343, 'Which sports do you enjoy participating in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (344, 'Which sports do you enjoy watching?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (345, 'What is your favorite professional baseball team (MLB)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (346, 'What is your favorite professional basketball team (NBA)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (347, 'What is your favorite professional football team (NFL)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (348, 'What is your favorite professional hockey team (NHL)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (349, 'What is your favorite college baseball team (NCAA)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (350, 'What is your favorite college basketball team (NCAA)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (351, 'What is your favorite college football team (NCAA)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (352, 'What is your favorite college hockey team (NCAA)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (353, 'Which martial arts do you enjoy training in?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (354, 'How competitive are you when it comes to sports or physical activities?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (355, 'How important is maintaining an active lifestyle to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (356, 'What are your top 5 favorite foods?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (357, 'What are your top 3 favorite types of cuisine?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (358, 'Where do you usually shop for groceries?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (359, 'What types of food do you consume?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (360, 'What are your top 3 favorite fast food restaurants?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (361, 'What are your top 7 favorite condiments?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (362, 'What is your favorite meal of the day?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (363, 'How much coffee do you drink?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (364, 'How often do you cook at home?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (365, 'How often do you eat out at restaurants or order takeout?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (366, 'Do you keep kosher? If so, to what extent?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (367, 'Do you keep halal? If so, to what extent?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (368, 'Are you vegetarian? If so, to what extent?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (369, 'Are you vegan? If so, to what extent?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (370, 'How important is it for your partner to share your dietary preferences or restrictions?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (371, 'How would you rate your cooking skills?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (372, 'Would you change your food and cuisine preferences for a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (373, 'How adventurous are you when it comes to trying new foods?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (374, 'How often do you try new restaurants or dining experiences?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (375, 'How would you describe your personal style?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (376, 'How often do you wear cologne or perfume?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (377, 'How often do you wear makeup?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (378, 'What are your favorite clothing brands?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (379, 'Which clothing colors look best on you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (380, 'Which of these fashion trends do you like the most?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (381, 'How often do you go to the tanning salon?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (382, 'What type of hair do you have?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (383, 'How do you usually wear your hair?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (384, 'Do you have any of the following body modifications?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (385, 'Do you have facial hair (including mustache)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (386, 'Do you have abs?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (387, 'Which of the following physical characteristics do you have?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (388, 'How important is your own appearance to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (389, 'Would you be willing to change your personal style for a partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (390, 'How would you describe your level of personal hygiene?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (391, 'What is your dress size?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (392, 'What is your bra size?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (393, 'What is your men\'s T-shirt size', 1.50);
INSERT INTO `question_prices_tbl` VALUES (394, 'What is your women\'s T-shirt size', 1.50);
INSERT INTO `question_prices_tbl` VALUES (395, 'What is your pants size?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (396, 'What is your men\'s shoe size', 1.50);
INSERT INTO `question_prices_tbl` VALUES (397, 'What is your women\'s shoe size', 1.50);
INSERT INTO `question_prices_tbl` VALUES (398, 'Do you own any pets?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (399, 'What types of pets do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (400, 'Are you open to adopting or rescuing pets?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (401, 'How do you feel about pets in the home?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (402, 'What type of animal-related activities do you enjoy?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (403, 'What are your top 5 favorite animals/creatures?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (404, 'Which attachment style best describes you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (405, 'What type of relationship dynamics do you prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (406, 'What level of commitment are you seeking in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (407, 'What are your personal views on divorce?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (408, 'Which relationship goals are most important to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (409, 'How do you balance independence and interdependence in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (410, 'What are your deal breakers in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (411, 'Which of these personal boundaries are important to you in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (412, 'How willing are you to compromise on your boundaries or deal breakers in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (413, 'How important is trust to you in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (414, 'How important is honesty to you in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (415, 'In past relationships, have you ever experienced a breach of trust?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (416, 'Which of these trust-building strategies do you believe are essential in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (417, 'Which of the following aspects make you feel secure in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (418, 'Which of the following actions make you feel safe and supported in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (419, 'How willing are you to provide emotional support and safety for your partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (420, 'What is your sexual orientation?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (421, 'What is your current marital status?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (422, 'Have you ever been in love?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (423, 'What do you find most attractive in a potential partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (424, 'How important is physical attraction to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (425, 'What physical features are you most attracted to?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (426, 'Which of the following body shapes are you most attracted to?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (427, 'Which of the following accents do you like?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (428, 'How do you express your love and affection?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (429, 'What romantic gestures do you appreciate most?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (430, 'What is your ideal first date?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (431, 'What is your opinion on who should pay on the first date?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (432, 'How soon would you like to meet in person after connecting online?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (433, 'How often do you prefer to communicate with someone you′re dating?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (434, 'What are your expectations for exclusivity when dating someone?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (435, 'How long do you typically wait before introducing a partner to your friends and family?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (436, 'When would you like to get married?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (437, 'How do you envision making major decisions in a long-term relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (438, 'How important is physical affection to you in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (439, 'How do you feel about long-distance relationships?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (440, 'How comfortable are you discussing sex?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (441, 'What is your preferred level of intimacy in a relationship?', 4.00);
INSERT INTO `question_prices_tbl` VALUES (442, 'With how many sexual partners have you consensually engaged in the following activities?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (443, 'At what age did you first consensually engage in the following activities?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (444, 'How often do you currently have sex?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (445, 'How often would you like to have sex while dating?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (446, 'How often would you like to have sex during marriage?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (447, 'How long would you prefer sex to last?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (448, 'What are your views on vaginal sex?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (449, 'What are your views on oral sex?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (450, 'What are your views on anal sex?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (451, 'How would you describe your libido or level of sexual desire?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (452, 'What times of the day do you, or would you, prefer to have sex?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (453, 'How much lighting do you, or would you, prefer during sex?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (454, 'Where do you, or would you, prefer to have sex?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (455, 'What is your erect penis length size?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (456, 'How would you describe your preference for variety in sexual positions?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (457, 'What are your top 2 preferred sex positions?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (458, 'How would you describe your interest in kinks?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (459, 'What are your top 3 kinks?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (460, 'How would you describe your interest in fetishes?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (461, 'What are your top 3 fetishes?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (462, 'Which of the following activities have you ever engaged in?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (463, 'Which of the following is a deal breaker for you in a partner?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (464, 'At what age did you start puberty?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (465, 'Have you frozen your sperm or eggs?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (466, 'Are you able to conceive or have a child?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (467, 'Have you ever had a one-night stand?', 10.00);
INSERT INTO `question_prices_tbl` VALUES (468, 'Are you transgender?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (469, 'Would you consider having a romantic relationship with a transgender person?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (470, 'Would you consider an open relationship?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (471, 'What is your love language?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (472, 'How do you like to express love and affection to your partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (473, 'What is your preferred relationship tempo?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (474, 'How do you handle conflicts in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (475, 'How would you describe your problem-solving style in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (476, 'Are you open to seeking professional help for relationship issues?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (477, 'How do you feel about apologizing in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (478, 'How willing are you to compromise in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (479, 'How do you prefer to spend quality time with your partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (480, 'How often do you prefer to have date nights?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (481, 'How do you prefer to stay connected with your partner during the day?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (482, 'How important is having children to you?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (483, 'How many children do you have?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (484, 'How many children would you like to have?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (485, 'When would you like to have your first or next child?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (486, 'Do you want biological children or are you open to adoption?', 3.00);
INSERT INTO `question_prices_tbl` VALUES (487, 'How do you envision raising your future children in terms of family values and upbringing?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (488, 'Which of the following do you believe comes first in marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (489, 'Which of the following do you believe comes second in marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (490, 'Which of the following do you believe comes third in marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (491, 'Which of the following do you believe comes fourth in marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (492, 'What do you believe should be a man′s responsibilities in marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (493, 'What do you believe should be a woman′s responsibilities in marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (494, 'What parenting style do you think you will prefer?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (495, 'What style of baby names do you find appealing?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (496, 'How do you typically show support and encouragement to your partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (497, 'What type of support do you appreciate most from your partner?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (498, 'How do you build trust in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (499, 'What does loyalty mean to you in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (500, 'Which of the following is your first preference for last names after marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (501, 'Which of the following is your second preference for last names after marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (502, 'Which of the following is your third preference for last names after marriage?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (503, 'What are your views on entering into a prenuptial agreement with your future spouse?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (504, 'How would you describe your family upbringing?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (505, 'How would you describe your childhood?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (506, 'How important are family values to you?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (507, 'What is the highest level of education your dad attained?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (508, 'What is the highest level of education your mom attained?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (509, 'Are you adopted?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (510, 'Were you an orphan?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (511, 'Is your dad alive?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (512, 'Is your mom alive?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (513, 'Are your dad and mom still together?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (514, 'How would you describe your relationship with your dad?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (515, 'How would you describe your relationship with your mom?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (516, 'How much do you trust your dad?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (517, 'How much do you trust your mom?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (518, 'What is your dad′s occupation?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (519, 'What is your mom′s occupation?', 2.00);
INSERT INTO `question_prices_tbl` VALUES (520, 'How would you describe your parents′ financial situation?', 5.00);
INSERT INTO `question_prices_tbl` VALUES (521, 'What role do your parents play in your decision-making process?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (522, 'How do you handle family conflicts?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (523, 'How do you balance your personal life with family commitments?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (524, 'How many full siblings (sharing both parents) do you have?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (525, 'How many half siblings (sharing one parent) do you have?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (526, 'What is your birth order position among your full siblings (those with whom you share both parents)?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (527, 'How close are you to your siblings?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (528, 'How close are you to your extended family?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (529, 'How much time do you spend with other people and how much time do you spend alone?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (530, 'How much time would you prefer to spend with other people and how much time would you prefer to spend alone?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (531, 'How do you approach setting and maintaining boundaries in relationships?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (532, 'How comfortable are you with sharing personal information and experiences in a relationship?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (533, 'How would you describe your past relationship experiences?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (534, 'For your past relationship experiences, provide their first and last name, current college, and relationship length', 1.50);
INSERT INTO `question_prices_tbl` VALUES (535, 'What patterns have you noticed in your relationships?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (536, 'Which lessons have you learned from past relationships that you will apply to future ones?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (537, 'How would you describe your propensity to take risks?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (538, 'Which of the following adventure-seeking activities appeal to you the most?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (539, 'How comfortable are you with uncertainty and change?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (540, 'Which of the following do you seriously dislike or hate?', 1.50);
INSERT INTO `question_prices_tbl` VALUES (541, 'How did you hear about Love Story?', 1.50);

-- ----------------------------
-- Table structure for subscription_plans_tbl
-- ----------------------------
DROP TABLE IF EXISTS `subscription_plans_tbl`;
CREATE TABLE `subscription_plans_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `duration` int(11) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `updated_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_chat_notification_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_chat_notification_tbl`;
CREATE TABLE `user_chat_notification_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `chat_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `status` int(5) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_favo_categories_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_favo_categories_tbl`;
CREATE TABLE `user_favo_categories_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `category_id` int(11) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_filters_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_filters_tbl`;
CREATE TABLE `user_filters_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT ' ',
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `middle_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `age` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `eye_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `current_hair_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `natural_hair_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `height` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `weight` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `body_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `religious_affiliation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ethnicity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ethnic_subgroup` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `current_college` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `current_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `home_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `political_views` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type_of_relationship` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `number_of_children` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_notification_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_notification_tbl`;
CREATE TABLE `user_notification_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `chat_notification_status` int(11) NULL DEFAULT NULL,
  `discussion_notification_status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_post_emotion_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_post_emotion_tbl`;
CREATE TABLE `user_post_emotion_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `post_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `emotion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_property_value_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_property_value_tbl`;
CREATE TABLE `user_property_value_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `property_id` int(11) NULL DEFAULT NULL,
  `value_id` int(11) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_qa_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_qa_tbl`;
CREATE TABLE `user_qa_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `q_index` int(11) NULL DEFAULT NULL,
  `s_index` int(11) NULL DEFAULT NULL,
  `p_index` int(11) NULL DEFAULT NULL,
  `g_index` int(11) NULL DEFAULT NULL,
  `toggle` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2226 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_sessions_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_sessions_tbl`;
CREATE TABLE `user_sessions_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `session` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `timezone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ipv4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ipv6` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `loggedout_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 214 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_status_action_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_status_action_tbl`;
CREATE TABLE `user_status_action_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status_action` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_subscription_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_subscription_tbl`;
CREATE TABLE `user_subscription_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `subscription_plan_id` int(11) NULL DEFAULT NULL,
  `start_date` timestamp(0) NULL DEFAULT current_timestamp(0),
  `end_date` timestamp(0) NULL DEFAULT NULL,
  `status` enum('active','expired','canceled') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_transactions_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_transactions_tbl`;
CREATE TABLE `user_transactions_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL,
  `payment_intent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amount` int(11) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'success',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `revenue_id` int(11) NULL DEFAULT NULL,
  `information_items` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_video_likes_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_video_likes_tbl`;
CREATE TABLE `user_video_likes_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `video_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_withdraw_requests_tbl
-- ----------------------------
DROP TABLE IF EXISTS `user_withdraw_requests_tbl`;
CREATE TABLE `user_withdraw_requests_tbl`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `paypal_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `venmo_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cash_app_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amount` float NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `zip_code` int(11) UNSIGNED NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users_tbl
-- ----------------------------
DROP TABLE IF EXISTS `users_tbl`;
CREATE TABLE `users_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` enum('male','female','other','intersex') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `college` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `joined_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `updated_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `email_verified` tinyint(1) NULL DEFAULT 0,
  `verification_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `birthday` timestamp(0) NULL DEFAULT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `post_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `chat_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `match_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `edit_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `deposit_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `withdraw_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `logout_status` enum('on','off') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'on',
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `verification_token_expiration` timestamp(0) NULL DEFAULT NULL,
  `reset_pwd_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `reset_pwd_token_expiration` timestamp(0) NULL DEFAULT NULL,
  `balance` float(255, 2) NULL DEFAULT NULL,
  `premium_ends_at` timestamp(0) NULL DEFAULT NULL,
  `premium_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `payment_method_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `personal_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `discussion_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_tbl_email_key`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_tbl
-- ----------------------------
INSERT INTO `users_tbl` VALUES (1, 'John', NULL, 'Doe', 'admin@lovestory.ai', 'female', NULL, '', 'active', '$2b$10$ajaRoApC4vMBBSuoDzCMue6M4O.onmGlfjYoip/CMCIJdZ7wjciyi', '2025-03-09 15:22:42', '2025-03-09 15:22:42', '2025-04-23 00:08:09', 0, '0bedba35a0b24a5e4740fdebe238b81b7b45261b3507e6bf57e8902a7c7c593e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbG92ZXN0b3J5LmFpIiwiaWF0IjoxNzQ1MzY2ODg5LCJleHAiOjE3NDU5NzE2ODl9.NNIh5pZPok-gNBH0TxpFbBSKeNOXTEwuPSbomGAEAxQ', '1997-06-10 12:16:21', 'admin', 'on', 'on', 'on', 'on', 'on', 'on', 'on', 'The young woman you matched with lived in Paris as a child and is a child and is a consultant today. She enjoys dining out, has a fondness for cats and is a moderate liberal. She has a passion for traveling and her dream vacations is Tahiti. She has a close relationship with some of her friends and enjoys playing the piano/ she is interested in starting a family and is open to the idea of adoptions. Despite some personal hardships she has faced, she remains optimistic about the future.The young woman you matched with lived in Paris as a child and is a child and is a consultant today. She enjoys dining out, has a fondness for cats and is a moderate liberal. She has a passion for traveling and her dream vacations is Tahiti. She has a close relationship with some of her friends and enjoys playing the piano/ she is interested in starting a family and is open to the idea of adoptions. Despite some personal hardships she has faced, she remains optimistic about the future.', NULL, NULL, NULL, 0.00, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for video_file_tbl
-- ----------------------------
DROP TABLE IF EXISTS `video_file_tbl`;
CREATE TABLE `video_file_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NULL DEFAULT NULL,
  `file_id` int(11) NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for videos_tbl
-- ----------------------------
DROP TABLE IF EXISTS `videos_tbl`;
CREATE TABLE `videos_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `collection_id` int(11) NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `tag1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `tag2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `tag3` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `image_file_id` int(11) NULL DEFAULT NULL,
  `video_file_id` int(11) NULL DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'active',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `views` int(11) NULL DEFAULT NULL,
  `likes` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- View structure for categories_view
-- ----------------------------
DROP VIEW IF EXISTS `categories_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `categories_view` AS -- SELECT  
--     id,  
--     name,  
--     categories_tbl.row as description,  
--     category_order,
--     views,  
--     0 AS likes,  
--     0 AS comments,  
--     created_at AS created  
-- FROM  
--     categories_tbl 

SELECT   
    c.id,  
    c.name,  
    c.row as description,  
		c.category_order,
    c.views,  
    COUNT(DISTINCT CASE WHEN upe.emotion = 'heart' AND p.p_Id = 0 AND p.post_Type = 'discussion' THEN upe.id END) AS likes,  
    COUNT(DISTINCT CASE WHEN p.p_Id != 0 AND p.post_Type = 'discussion' THEN p.id END) AS comments,  
    c.created_at	AS created  
FROM   
    categories_tbl c  
LEFT JOIN   
    posts_tbl p ON p.target_Id = c.id  
LEFT JOIN   
    user_post_emotion_tbl upe ON upe.post_Id = p.id  
GROUP BY   
    c.id, c.name, c.description ;

-- ----------------------------
-- View structure for collections_view
-- ----------------------------
DROP VIEW IF EXISTS `collections_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `collections_view` AS -- SELECT   
-- 		id,
-- 		name,
-- 		description,
--     collection_order,
-- 		0 as views,
-- 		0 as likes,
-- 		0 as comments, 
-- 		created_at as created
-- FROM   
--     collections_tbl 

SELECT   
    c.id,  
    c.name,  
    c.description AS description,  
    c.collection_Order AS collection_order,  
    COALESCE(v.total_views, 0) AS views,  
    COALESCE(v.total_likes, 0) AS likes,  
    COUNT(DISTINCT p.id) AS comments,  
    c.created_At AS created  
FROM   
    collections_tbl c  
LEFT JOIN (  
    SELECT   
        collection_Id,  
        SUM(views) AS total_views,  
        SUM(likes) AS total_likes  
    FROM   
        videos_tbl  
    GROUP BY   
        collection_Id  
) v ON v.collection_Id = c.id  
LEFT JOIN   
    posts_tbl p ON p.post_Type = 'video' AND p.target_Id IN (SELECT id FROM videos_tbl WHERE collection_Id = c.id)  
GROUP BY   
    c.id, c.name, c.description, c.collection_Order, c.created_At ;

-- ----------------------------
-- View structure for colleges_view
-- ----------------------------
DROP VIEW IF EXISTS `colleges_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `colleges_view` AS -- select
-- id, college, count as users, active, paid,  floor(male/count *100) as male ,FLOOR(female/count *100) as female, matches, accepted, revenue, share
-- 	from
-- (SELECT
-- 		id,
--     college, 
-- 		0 as active,
-- 		0 as paid,
-- 		0 as matches,
-- 		0 as accepted,
-- 		0 as revenue, 
-- 		0 as share,
-- 		COUNT(*) AS count,  
--     COUNT(IF(sex = 'female', 1, NULL)) AS female,   
--     COUNT(IF(sex = 'male', 1, NULL)) AS male
-- FROM   
--     users_tbl   
-- GROUP BY   
--     college 
-- ) as AA 

-- SELECT  
--     c.id AS id,  
--     c.college AS college,  
--     COALESCE(u.user_count, 0) AS users,  
--     0 AS active,  
--     0 AS paid,
-- 		0 AS free,		
--     COALESCE(u.matches, 0) AS matches,  
--     COALESCE(u.accepted, 0) AS accepted,  
--     COALESCE(u.revenue, 0) AS revenue,  
--     COALESCE(u.share, 0) AS share,  
--     COALESCE(FLOOR(COALESCE(u.male, 0) / NULLIF(u.user_count, 0) * 100), 0) AS male,  
--     COALESCE(FLOOR(COALESCE(u.female, 0) / NULLIF(u.user_count, 0) * 100), 0) AS female
-- FROM  
--     colleges_tbl c  
-- LEFT JOIN  
--     (  
--         SELECT  
--             college,  
--             COUNT(*) AS user_count,  
--             COUNT(IF(sex = 'female', 1, NULL)) AS female,  
--             COUNT(IF(sex = 'male', 1, NULL)) AS male,  
--             0 AS matches,  
--             0 AS accepted,  
--             0 AS revenue,  
--             0 AS share  
--         FROM  
--             users_tbl  
--         GROUP BY  
--             college  
--     ) AS u ON c.college = u.college  
-- ORDER BY  
--     c.id 
SELECT  
    c.id AS college_id,  
    COUNT(u.id) AS users,  
    COUNT(DISTINCT us.user_id) AS active,  
    COUNT(DISTINCT CASE WHEN u.premium_name IS NOT NULL THEN u.id END) AS paid,  
    COUNT(DISTINCT CASE WHEN u.premium_name IS NULL THEN u.id END) AS free,  
    COUNT(DISTINCT m.id) AS matches,  
    COUNT(DISTINCT CASE WHEN m.email1_Status = 'accepted' OR m.email2_Status = 'accepted' THEN m.id END) AS accepted,  
    ROUND(SUM(CASE WHEN u.sex = 'male' THEN 1 ELSE 0 END) / COUNT(u.id) * 100, 2) AS male_percentage,  
    ROUND(SUM(CASE WHEN u.sex = 'female' THEN 1 ELSE 0 END) / COUNT(u.id) * 100, 2) AS female_percentage,  
    COALESCE(SUM(CASE   
        WHEN ut.description LIKE '%subscription%' THEN ut.amount   
        ELSE 0   
    END), 0) AS revenue,  
    COALESCE(SUM(CASE   
        WHEN ut.description LIKE '%information%' THEN ut.amount / 2   
        ELSE 0   
    END), 0) AS share  
FROM  
    colleges_tbl c  
LEFT JOIN  
    users_tbl u ON u.college = c.college  
LEFT JOIN  
    user_sessions_tbl us ON us.user_id = u.id  
LEFT JOIN  
    matches_tbl m ON m.email1 = u.email OR m.email2 = u.email  
LEFT JOIN  
    user_transactions_tbl ut ON ut.user_id = u.id  
GROUP BY  
    c.id ;

-- ----------------------------
-- View structure for college_users_view
-- ----------------------------
DROP VIEW IF EXISTS `college_users_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `college_users_view` AS SELECT   
		UUID() AS uuid,
		u.id as user_id,
    CONCAT(u.first_name, ' ', COALESCE(u.middle_name, ''), ' ', u.last_name) AS full_name,  
		c.college AS college,
		c.id AS college_id,
    u.sex,   
    u.joined_at,  
    "" AS last_active,  
    0 AS matches,  
    0 AS accepted,  
    0 AS revenue,  
    0 AS share  
FROM   
    colleges_tbl c  
LEFT JOIN   
    users_tbl u ON c.college = u.college ;

-- ----------------------------
-- View structure for discussions_view
-- ----------------------------
DROP VIEW IF EXISTS `discussions_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `discussions_view` AS -- SELECT   
--      p.id AS id,  
--      p.content AS discussion,  
--      c.name AS category,
--  		c.id	AS category_id,
--  		u.id AS user_id,
--      CONCAT(u.first_name, ' ', u.last_name) AS user,  
--      COALESCE(reply_count.reply_count, 0) AS replies,  
--      0 AS reactions,  
--  		p.p_id,
--      p.created_at AS posted  
--  FROM   
--      posts_tbl p  
--  LEFT JOIN   
--      categories_tbl c ON p.target_id = c.id  
--  LEFT JOIN   
--      users_tbl u ON p.user_id = u.id  
--  LEFT JOIN   
--      (SELECT   
--           p_id,   
--           COUNT(*) AS reply_count   
--       FROM   
--          posts_tbl   
--       WHERE   
--           p_id IS NOT NULL  
--       GROUP BY   
--           p_id) reply_count ON p.id = reply_count.p_id  
--  WHERE  
--      p.post_type = 'discussion' 

SELECT   
    p.id,  
    p.content as discussion,  
    c.id AS category_id,  
    c.name AS category,  
    p.user_id AS user_id,  
    CONCAT(u.first_name, ' ', u.last_name) AS user,  
    COUNT(r.p_id) AS replies,  
    COUNT(pe.emotion) AS reactions,  
    p.p_id AS p_id,  
    p.created_at AS posted  
FROM   
    posts_tbl p  
JOIN   
    categories_tbl c ON p.target_id = c.id  
JOIN   
    users_tbl u ON p.user_id = u.id  
LEFT JOIN   
    (SELECT p_id  
     FROM posts_tbl  
     WHERE p_id IS NOT NULL  
     GROUP BY p_id) r ON p.id = r.p_id  
LEFT JOIN   
    user_post_emotion_tbl pe ON p.id = pe.post_id  
WHERE   
    p.post_type = 'discussion'  
GROUP BY   
    p.id, c.id, u.id ;

-- ----------------------------
-- View structure for matches_view
-- ----------------------------
DROP VIEW IF EXISTS `matches_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `matches_view` AS SELECT   
    m.id AS id,  
    u1.id AS user1_id,  
    CONCAT(u1.first_name,   
           IF(u1.middle_name IS NOT NULL AND u1.middle_name != '', CONCAT(' ', u1.middle_name), ''),   
           ' ', u1.last_name) AS user1_name,
    u1.email AS user1_email,  
		m.email1_status AS user1_status,
    u2.id AS user2_id,  
    CONCAT(u2.first_name,   
           IF(u2.middle_name IS NOT NULL AND u2.middle_name != '', CONCAT(' ', u2.middle_name), ''),   
           ' ', u2.last_name) AS user2_name,
    u2.email AS user2_email,  
		m.email2_status AS user2_status,
    m.score AS score,  
    m.created_at  
FROM   
    matches_tbl m  
JOIN   
    users_tbl u1 ON m.email1 = u1.email  
JOIN   
    users_tbl u2 ON m.email2 = u2.email ;

-- ----------------------------
-- View structure for matching_actions_view
-- ----------------------------
DROP VIEW IF EXISTS `matching_actions_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `matching_actions_view` AS SELECT   
    m.id AS match_id,  
    CASE   
        WHEN m.email1_status IS NOT NULL THEN u2.id  
        ELSE u1.id  
    END AS matching_user_id,  
    CASE   
        WHEN m.email1_status IS NOT NULL THEN CONCAT(u2.first_name, ' ', u2.last_name)  
        ELSE CONCAT(u1.first_name, ' ', u1.last_name)  
    END AS matching_user_name,  
    m.score AS match_score,  
    MAX(CASE WHEN ma.matching_action = 'accepted' THEN ma.created_at ELSE NULL END) AS accepted_date,  
    MAX(CASE WHEN ma.matching_action = 'reignited' THEN ma.created_at ELSE NULL END) AS reignited_date,  
    MAX(CASE WHEN ma.matching_action = 'rejected' THEN ma.created_at ELSE NULL END) AS rejected_date,  
    m.created_at AS matched_date,  
    MAX(ma.created_at) AS last_activity_date  
FROM   
    matches_tbl m  
LEFT JOIN matching_action_tbl ma   
    ON (m.id = ma.user1_id OR m.id = ma.user2_id)  
LEFT JOIN users_tbl u1   
    ON m.email1 = u1.email  
LEFT JOIN users_tbl u2   
    ON m.email2 = u2.email  
GROUP BY   
    m.id, matching_user_id, matching_user_name, m.score, m.created_at ;

-- ----------------------------
-- View structure for reviews_view
-- ----------------------------
DROP VIEW IF EXISTS `reviews_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `reviews_view` AS SELECT   
    p.id,  
    p.content AS review,  
    p.user_id AS reviewer_id,  
    CONCAT(u.first_name, ' ', u.last_name) AS reviewer,  
		u.avatar AS reviewer_avatar,
    p.target_id AS reviewee_id,  
    CONCAT(c.first_name, ' ', c.last_name) AS reviewee,  
    p.rating,  
    r.id AS response_id,
    p.created_at,  
    p.status 
FROM   
    posts_tbl p  
LEFT JOIN   
    users_tbl c ON p.target_id = c.id  -- Join for reviewee  
LEFT JOIN   
    users_tbl u ON p.user_id = u.id    -- Join for reviewer  
LEFT JOIN   
    posts_tbl r ON r.target_id = p.user_id AND r.user_id = p.target_id  -- Join to identify reviewee's review about reviewer  
WHERE  
    p.post_type = 'review' 
ORDER BY  
    p.created_at ASC ;

-- ----------------------------
-- View structure for users_view
-- ----------------------------
DROP VIEW IF EXISTS `users_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `users_view` AS SELECT   
		id,  
		first_name,  
		last_name,  
    	college,  
		sex,  
		joined_at,  
		"" as last_active,  
		0 as matches,  
		0 as accepted,  
		0 as revenue,   
		0 as share  
-- 		COUNT(*) AS total_users,  
--     COUNT(IF(sex = 'female', 1, NULL)) AS total_females,   
--     COUNT(IF(sex = 'male', 1, NULL)) AS total_males  
FROM   
    users_tbl  
WHERE  
    role = 'user' ;

-- ----------------------------
-- View structure for user_statistics_view
-- ----------------------------
DROP VIEW IF EXISTS `user_statistics_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `user_statistics_view` AS SELECT  
		UUID() AS uuid,
    COUNT(*) AS total_users,
		0 as daily_active_users,
		0 as monthly_active_users,
		0 as paid_users,
		0 as free_users,
    COUNT(CASE WHEN sex = 'male' THEN 1 END) AS total_male_users,  
		0 as male_daily_active_users,
		0 as male_monthly_active_users,
		0 as male_paid_users,
		0 as male_free_users,
    COUNT(CASE WHEN sex = 'female' THEN 1 END) AS total_female_users,
		0 as female_daily_active_users,
		0 as female_monthly_active_users,
		0 as female_paid_users,
		0 as female_free_users
FROM  
    users_tbl ;

-- ----------------------------
-- View structure for videos_detail_view
-- ----------------------------
DROP VIEW IF EXISTS `videos_detail_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `videos_detail_view` AS SELECT
	`v`.`id` AS `id`,
	`v`.`title` AS `title`,
	`c`.`name` AS `collection`,
	`c`.`id` AS `collection_id`,
	`v`.`description` AS `description`,
	`v`.`tag1` AS `tag1`,
	`v`.`tag2` AS `tag2`,
	`v`.`tag3` AS `tag3`,
	`v`.`views` AS `views`,
	`v`.`likes` AS `likes`,
	count( DISTINCT `p`.`id` ) AS `comments`,
	`v`.`status` AS `status`,
	`v`.`created_at` AS `posted`,
	`imageFile`.`file_url` AS `image_file_url`,
	`videoFile`.`file_url` AS `video_file_url` 
FROM
	((((
					`videos_tbl` `v`
					LEFT JOIN `files_tbl` `imageFile` ON ((
							`v`.`image_file_id` = `imageFile`.`id` 
						)))
				LEFT JOIN `files_tbl` `videoFile` ON ((
						`v`.`video_file_id` = `videoFile`.`id` 
					)))
			LEFT JOIN `collections_tbl` `c` ON ((
					`v`.`collection_id` = `c`.`id` 
				)))
		LEFT JOIN `posts_tbl` `p` ON (((
					`p`.`post_type` = 'video' 
					) 
			AND ( `p`.`target_id` = `v`.`id` )))) 
GROUP BY
	`v`.`id`,
	`v`.`title`,
	`c`.`name`,
	`c`.`id`,
	`v`.`description`,
	`v`.`tag1`,
	`v`.`tag2`,
	`v`.`tag3`,
	`v`.`views`,
	`v`.`likes`,
	`v`.`status`,
	`v`.`created_at`,
	`imageFile`.`file_url`,
	`videoFile`.`file_url` ;

-- ----------------------------
-- View structure for videos_view
-- ----------------------------
DROP VIEW IF EXISTS `videos_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `videos_view` AS -- SELECT   
--     v.id AS id,  
--     v.title AS video, 
-- 		c.id AS collection_id,
-- 		c.name AS collection,
-- 		v.views,
-- 		v.likes,
-- 		0 as comments,
--     v.created_at AS posted
-- FROM   
--     videos_tbl v  
-- LEFT JOIN   
--     collections_tbl c ON v.collection_id = c.id 

SELECT   
    v.id AS id,  
    v.title AS video,   
    c.id AS collection_id,  
    c.name AS collection,  
    v.views,  
    v.likes,  
    COUNT(p.id) AS comments,  -- Count the number of comments (posts) for each video  
    v.created_at AS posted  
FROM   
    videos_tbl v  
LEFT JOIN   
    collections_tbl c ON v.collection_id = c.id  
LEFT JOIN   
    posts_tbl p ON p.target_id = v.id  -- Join posts where targetId matches video id  
GROUP BY   
    v.id, c.id  -- Group by video id and collection id to aggregate the counts  
ORDER BY   
    v.created_at DESC ;

SET FOREIGN_KEY_CHECKS = 1;
