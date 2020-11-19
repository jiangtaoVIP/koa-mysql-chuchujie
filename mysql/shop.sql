/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3301
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3301
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 19/11/2020 18:38:59
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
  `parentId` int(11) NOT NULL COMMENT '该商品所属的二级分类id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `iconId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品缩略图',
  `homeImageIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品首页轮播',
  `detailsImageIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品详情图',
  `hot` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品火热小字段',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails
-- ----------------------------
INSERT INTO `goodsdetails` VALUES (1, 1, '易燃青年 长袖撞色拼接休闲夹克男 学生春装宽松翻领上衣外套', 'https://s10.mogucdn.com/mlcdn/c45406/180821_1bb8lfgjie5e5fl2e1j4il29jl5ch_160x160.jpg', 'https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg,https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg', 'https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg,https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg', '火热爆款', '2020-11-15 01:06:29', '2020-11-15 18:19:28');
INSERT INTO `goodsdetails` VALUES (2, 1, '原宿ulzzang羊羔毛加厚棉衣外套男冬季宽松韩版棉袄青少年棉服潮', 'https://s10.mogucdn.com/mlcdn/c45406/180821_1bb8lfgjie5e5fl2e1j4il29jl5ch_160x160.jpg', 'https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg,https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg', 'https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg,https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg', '新品上新', '2020-11-15 01:36:19', '2020-11-15 18:19:11');
INSERT INTO `goodsdetails` VALUES (3, 2, 'dssdsdsd', NULL, NULL, NULL, '新品上新', '2020-11-15 13:42:31', '2020-11-15 18:19:11');
INSERT INTO `goodsdetails` VALUES (4, 3, 'fsfsff', NULL, NULL, NULL, '新品上新', '2020-11-15 13:42:39', '2020-11-15 18:19:10');
INSERT INTO `goodsdetails` VALUES (5, 1, 'dsffa', NULL, NULL, NULL, '新品上新', '2020-11-15 13:42:43', '2020-11-15 18:18:53');
INSERT INTO `goodsdetails` VALUES (6, 4, 'dsddd', NULL, NULL, NULL, '新品上新', '2020-11-15 13:42:55', '2020-11-15 18:18:52');

-- ----------------------------
-- Table structure for goodsdetails_sku
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_sku`;
CREATE TABLE `goodsdetails_sku`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'sku id',
  `parentId` int(11) NULL DEFAULT NULL COMMENT '所属的商品父级id',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '该选项的价格',
  `stock` decimal(10, 0) NULL DEFAULT NULL COMMENT '该选项的库存',
  `skuImageIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '该选项的缩略图',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails_sku
-- ----------------------------
INSERT INTO `goodsdetails_sku` VALUES (1, 1, 11.00, 12212, NULL, '2020-11-15 01:14:37', '2020-11-15 01:53:23');
INSERT INTO `goodsdetails_sku` VALUES (2, 1, 12.00, 12, NULL, '2020-11-15 01:53:18', '2020-11-15 12:14:59');
INSERT INTO `goodsdetails_sku` VALUES (3, 2, 21.00, 12, NULL, '2020-11-15 12:54:55', '2020-11-15 12:54:55');

-- ----------------------------
-- Table structure for goodsdetails_type
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_type`;
CREATE TABLE `goodsdetails_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '类型名称',
  `skuId` int(255) NULL DEFAULT NULL COMMENT '关联的sku ID',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `parentId` int(11) NOT NULL COMMENT '所属商品id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails_type
-- ----------------------------
INSERT INTO `goodsdetails_type` VALUES (1, 'S', 1, '2020-11-15 12:13:22', '2020-11-15 12:23:48', 1);
INSERT INTO `goodsdetails_type` VALUES (2, 'M', 2, '2020-11-15 12:13:34', '2020-11-15 12:23:51', 1);
INSERT INTO `goodsdetails_type` VALUES (3, '41码', 3, '2020-11-15 13:10:32', '2020-11-15 13:10:32', 2);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通知id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '通知消息内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (1, '内测期间！双32全场一折、双32全场一折、双32全场一折、双32全场一折 ！！！ ');
INSERT INTO `message` VALUES (2, '222222');

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
  `isDefault` tinyint(1) UNSIGNED NULL DEFAULT 0 COMMENT '是否为默认（0，false，1,true）',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`, `parentId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_address
-- ----------------------------
INSERT INTO `shop_address` VALUES (1, 1, '江涛', '18899796648', '广东省', '广州市', '天河区', '车陂此前大街', '517400', 1, '2020-11-14 00:19:55', '2020-11-19 18:17:33');
INSERT INTO `shop_address` VALUES (4, 2, 'sa', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2020-11-14 01:05:13', '2020-11-18 10:29:12');

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
