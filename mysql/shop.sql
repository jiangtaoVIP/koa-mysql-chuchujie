/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3301
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3301
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 14/11/2020 01:39:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category_one
-- ----------------------------
DROP TABLE IF EXISTS `category_one`;
CREATE TABLE `category_one`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品分类id',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类字段名',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category_one
-- ----------------------------
INSERT INTO `category_one` VALUES (1, 'boysClothing', '男装', '2020-11-11 11:38:40', NULL);
INSERT INTO `category_one` VALUES (2, 'appliances', '电器', '2020-11-11 11:39:27', NULL);
INSERT INTO `category_one` VALUES (3, 'decorations', '饰品', '2020-11-11 11:41:34', NULL);
INSERT INTO `category_one` VALUES (4, 'general', '百货', '2020-11-11 11:42:16', NULL);
INSERT INTO `category_one` VALUES (5, 'food', '食品', '2020-11-11 11:42:33', NULL);
INSERT INTO `category_one` VALUES (6, 'digital', '数码', '2020-11-11 11:47:14', NULL);
INSERT INTO `category_one` VALUES (7, 'girlsClothing', '女装', '2020-11-11 11:51:18', NULL);
INSERT INTO `category_one` VALUES (8, 'car', '车品', '2020-11-11 11:51:42', NULL);

-- ----------------------------
-- Table structure for category_two
-- ----------------------------
DROP TABLE IF EXISTS `category_two`;
CREATE TABLE `category_two`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `parentId` int(255) NOT NULL COMMENT '父级id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型名称',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updataTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category_two
-- ----------------------------
INSERT INTO `category_two` VALUES (1, 1, '外套', 'coat', '2020-11-13 10:00:06', '2020-11-13 10:00:11');
INSERT INTO `category_two` VALUES (2, 1, '卫衣', 'sweater', '2020-11-13 10:01:45', '2020-11-13 10:05:41');
INSERT INTO `category_two` VALUES (3, 1, '休闲长裤', 'trousers', '2020-11-13 10:19:37', '2020-11-13 10:19:37');
INSERT INTO `category_two` VALUES (4, 1, 'T恤', 'Tshirt', '2020-11-13 10:20:15', '2020-11-13 10:20:15');
INSERT INTO `category_two` VALUES (5, 2, '电视机', 'elevision', '2020-11-13 10:21:12', '2020-11-13 10:21:12');
INSERT INTO `category_two` VALUES (6, 2, '洗衣机', 'washing', '2020-11-13 10:21:54', '2020-11-13 10:21:54');
INSERT INTO `category_two` VALUES (7, 3, '项链', 'necklace', '2020-11-13 10:22:23', '2020-11-13 10:22:23');
INSERT INTO `category_two` VALUES (8, 3, '手串', 'handString', '2020-11-13 10:23:07', '2020-11-13 10:23:07');
INSERT INTO `category_two` VALUES (9, 4, '毛巾', 'towel', '2020-11-13 10:24:00', '2020-11-13 10:24:00');
INSERT INTO `category_two` VALUES (10, 5, '零食', 'snacks', '2020-11-13 10:26:45', '2020-11-13 10:26:45');
INSERT INTO `category_two` VALUES (11, 6, '手机', 'phone', '2020-11-13 10:27:24', '2020-11-13 10:27:29');
INSERT INTO `category_two` VALUES (12, 7, '连衣裙', 'dress', '2020-11-13 10:28:14', '2020-11-13 10:28:14');
INSERT INTO `category_two` VALUES (13, 8, '奔驰', 'benz', '2020-11-13 10:29:21', '2020-11-13 10:29:21');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '文件id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件名称',
  `size` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件大小',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件格式',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '文件创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10015 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (10014, '18809.jpg', '113066', 'jpg', '2020-11-11 09:54:02');
INSERT INTO `file` VALUES (10013, 'aaaa.jpg', '241027', 'jpg', '2020-11-10 16:20:52');
INSERT INTO `file` VALUES (10012, 'aaaa.jpg', '241027', 'jpg', '2020-11-10 16:02:45');

-- ----------------------------
-- Table structure for goodsdetails
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails`;
CREATE TABLE `goodsdetails`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shop_address
-- ----------------------------
DROP TABLE IF EXISTS `shop_address`;
CREATE TABLE `shop_address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地址id',
  `parentId` int(11) NOT NULL COMMENT '所属人id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '地址联系人',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '电话',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '省份',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '城市',
  `county` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '区域',
  `addressDetail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '详细地址',
  `areaCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '邮政编码',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`, `parentId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_address
-- ----------------------------
INSERT INTO `shop_address` VALUES (1, 1, '江涛', '18899796648', '广东省', '广州市', '天河区', '车陂此前大街', '517400', '2020-11-14 00:19:55', '2020-11-14 00:19:55');
INSERT INTO `shop_address` VALUES (3, 1, 'sdsd', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-14 01:05:08', '2020-11-14 01:05:08');
INSERT INTO `shop_address` VALUES (4, 2, 'sa', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-14 01:05:13', '2020-11-14 01:05:13');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` int(255) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名称（登录账号）',
  `sex` enum('M','W') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市地址',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像地址',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建地址',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '18899796648', 'M', '123456', '18899796648', '洒水多', '阿斯达', NULL, NULL, '2020-10-31 16:29:58');
INSERT INTO `user` VALUES (2, '2', NULL, NULL, '2', NULL, NULL, NULL, NULL, '2020-11-03 10:03:29');
INSERT INTO `user` VALUES (3, '2', NULL, NULL, '1', NULL, NULL, NULL, NULL, '2020-11-03 10:58:15');
INSERT INTO `user` VALUES (4, '2', NULL, NULL, '2', NULL, NULL, NULL, NULL, '2020-11-03 10:03:31');
INSERT INTO `user` VALUES (5, '21', NULL, NULL, '1', NULL, NULL, NULL, NULL, '2020-11-03 10:58:58');
INSERT INTO `user` VALUES (6, '是多少', NULL, NULL, '2', NULL, NULL, NULL, NULL, '2020-11-03 10:11:22');
INSERT INTO `user` VALUES (7, '12', NULL, NULL, '1', NULL, NULL, NULL, NULL, '2020-11-03 10:58:59');
INSERT INTO `user` VALUES (8, '2', NULL, NULL, '2', NULL, NULL, NULL, NULL, '2020-11-03 10:59:00');
INSERT INTO `user` VALUES (9, '1', NULL, NULL, '2', NULL, NULL, NULL, NULL, '2020-11-03 10:59:00');
INSERT INTO `user` VALUES (10, '是多少', NULL, NULL, '1', 'hghh', NULL, NULL, NULL, '2020-11-03 10:59:01');
INSERT INTO `user` VALUES (11, '12', NULL, NULL, '21', NULL, NULL, NULL, NULL, '2020-11-03 10:59:02');
INSERT INTO `user` VALUES (12, '212', NULL, NULL, '212', NULL, NULL, NULL, NULL, '2020-11-03 10:59:03');
INSERT INTO `user` VALUES (13, '多福多寿', NULL, NULL, '21', NULL, NULL, NULL, NULL, '2020-11-03 10:59:04');
INSERT INTO `user` VALUES (14, '发的发生', NULL, NULL, '21', NULL, NULL, NULL, NULL, '2020-11-03 10:59:05');
INSERT INTO `user` VALUES (15, 'ewewe', NULL, NULL, '21', NULL, NULL, NULL, '2020-10-31 16:27:24', '2020-11-03 10:59:06');
INSERT INTO `user` VALUES (16, '放松放松', NULL, NULL, '1', NULL, NULL, NULL, '2020-11-02 17:07:24', '2020-11-03 10:59:06');
INSERT INTO `user` VALUES (17, '任务分为', NULL, NULL, '21', NULL, NULL, NULL, '2020-11-02 17:07:27', '2020-11-03 10:59:07');
INSERT INTO `user` VALUES (18, '放松放松', NULL, NULL, '21', NULL, NULL, NULL, '2020-11-02 17:07:28', '2020-11-03 10:59:08');
INSERT INTO `user` VALUES (19, '2', NULL, NULL, '21', NULL, NULL, NULL, '2020-11-02 17:07:29', '2020-11-03 10:59:09');
INSERT INTO `user` VALUES (20, '2', NULL, NULL, '21', NULL, NULL, NULL, '2020-11-02 17:07:30', '2020-11-03 10:59:09');
INSERT INTO `user` VALUES (21, '放松放松', NULL, NULL, '21', NULL, NULL, NULL, '2020-11-02 17:07:32', '2020-11-03 10:59:10');
INSERT INTO `user` VALUES (22, '分为服务费', NULL, NULL, '21', NULL, NULL, NULL, '2020-11-02 17:07:33', '2020-11-03 10:59:12');

SET FOREIGN_KEY_CHECKS = 1;
