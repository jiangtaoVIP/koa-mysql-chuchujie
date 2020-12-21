/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3301
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 21/12/2020 14:11:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商家用户id',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商家店铺名称',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号（登录账号）',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '店铺头像地址',
  `descText` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '店铺介绍',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, '涛坚持不懈的小店', '18899796648', '123456', '10000', '各种卖，啥都卖', '2020-12-10 10:53:36', '2020-12-10 10:53:36');
INSERT INTO `admin_user` VALUES (2, '测试2店', '18899796648', '123456', '10000', '发的发的发', '2020-12-10 11:11:49', '2020-12-10 11:12:00');

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
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updataTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category_two
-- ----------------------------
INSERT INTO `category_two` VALUES (1, 1, '外套', '10043', 'coat', '2020-11-13 10:00:06', '2020-11-25 15:11:22');
INSERT INTO `category_two` VALUES (2, 1, '卫衣', '10044', 'sweater', '2020-11-13 10:01:45', '2020-11-25 15:12:07');
INSERT INTO `category_two` VALUES (3, 1, '休闲长裤', '10045', 'trousers', '2020-11-13 10:19:37', '2020-11-25 15:12:32');
INSERT INTO `category_two` VALUES (4, 1, 'T恤', '10046', 'Tshirt', '2020-11-13 10:20:15', '2020-11-25 15:12:34');
INSERT INTO `category_two` VALUES (5, 2, '电视机', '10047', 'elevision', '2020-11-13 10:21:12', '2020-11-25 15:14:16');
INSERT INTO `category_two` VALUES (6, 2, '洗衣机', '10048', 'washing', '2020-11-13 10:21:54', '2020-11-25 15:14:43');
INSERT INTO `category_two` VALUES (7, 3, '项链', '10049', 'necklace', '2020-11-13 10:22:23', '2020-11-25 15:15:48');
INSERT INTO `category_two` VALUES (8, 3, '手串', '10050', 'handString', '2020-11-13 10:23:07', '2020-11-25 15:16:28');
INSERT INTO `category_two` VALUES (9, 4, '毛巾', '10051', 'towel', '2020-11-13 10:24:00', '2020-11-25 15:16:29');
INSERT INTO `category_two` VALUES (10, 5, '零食', '10052', 'snacks', '2020-11-13 10:26:45', '2020-11-25 15:16:52');
INSERT INTO `category_two` VALUES (11, 6, '手机', '10053', 'phone', '2020-11-13 10:27:24', '2020-11-25 15:17:19');
INSERT INTO `category_two` VALUES (12, 7, '连衣裙', '10054', 'dress', '2020-11-13 10:28:14', '2020-11-25 15:17:45');
INSERT INTO `category_two` VALUES (13, 8, '奔驰', '10055', 'benz', '2020-11-13 10:29:21', '2020-11-25 15:18:00');

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
) ENGINE = MyISAM AUTO_INCREMENT = 10056 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (10000, '微信图片_20201112222822.jpg', '53497', 'jpg', '2020-11-22 12:16:22');
INSERT INTO `file` VALUES (10054, '连衣裙.png', '9874', 'png', '2020-11-25 15:17:38');
INSERT INTO `file` VALUES (10055, '奔驰.png', '14536', 'png', '2020-11-25 15:17:55');
INSERT INTO `file` VALUES (10053, '手机.png', '4115', 'png', '2020-11-25 15:17:12');
INSERT INTO `file` VALUES (10052, '零食.png', '12565', 'png', '2020-11-25 15:16:47');
INSERT INTO `file` VALUES (10051, '毛巾.png', '6831', 'png', '2020-11-25 15:16:21');
INSERT INTO `file` VALUES (10050, '手串_1.png', '22548', 'png', '2020-11-25 15:15:43');
INSERT INTO `file` VALUES (10049, '项链.png', '11515', 'png', '2020-11-25 15:15:24');
INSERT INTO `file` VALUES (10048, '洗衣机.png', '12900', 'png', '2020-11-25 15:14:37');
INSERT INTO `file` VALUES (10047, '电视机.png', '9649', 'png', '2020-11-25 15:14:10');
INSERT INTO `file` VALUES (10045, '长裤.png', '14074', 'png', '2020-11-25 15:12:01');
INSERT INTO `file` VALUES (10046, 'T 恤.png', '6304', 'png', '2020-11-25 15:12:27');
INSERT INTO `file` VALUES (10043, '外套.png', '16338', 'png', '2020-11-25 15:07:08');
INSERT INTO `file` VALUES (10044, '卫衣.png', '13760', 'png', '2020-11-25 15:11:12');

-- ----------------------------
-- Table structure for goodsdetails
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails`;
CREATE TABLE `goodsdetails`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品',
  `parentId` int(11) NOT NULL COMMENT '该商品所属的二级分类id',
  `adminId` int(11) NULL DEFAULT NULL COMMENT '所属店铺id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `iconId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品缩略图',
  `homeImageIds` varchar(9999) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品首页轮播',
  `detailsImageIds` varchar(9999) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品详情图',
  `hot` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品火热小字段',
  `none_sku` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否为无规格商品(0 false，1 true)',
  `stock_num` int(11) NULL DEFAULT NULL COMMENT '商品总库存',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '默认价格',
  `oldPrice` decimal(10, 2) NULL DEFAULT NULL COMMENT '旧的价格',
  `sku` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所拥有的的规格类目',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails
-- ----------------------------
INSERT INTO `goodsdetails` VALUES (1, 1, 1, '易燃青年 长袖撞色拼接休闲夹克男 学生春装宽松翻领上衣外套', 'https://gd1.alicdn.com/imgextra/i1/2962257955/O1CN0128dR9njqCuZOkPz_!!2962257955.jpg', 'https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg,https://gd1.alicdn.com/imgextra/i1/2962257955/O1CN0128dR9njqCuZOkPz_!!2962257955.jpg,https://gd3.alicdn.com/imgextra/i3/2962257955/TB2If_jnbZnBKNjSZFKXXcGOVXa_!!2962257955.jpg,https://gd3.alicdn.com/imgextra/i3/2962257955/TB2LsYAnfImBKNjSZFlXXc43FXa_!!2962257955.jpg', 'https://img.alicdn.com/imgextra/i3/2962257955/O1CN01xC0HeA28dRGwWsBI5_!!2962257955.jpg,https://img.alicdn.com/imgextra/i1/2962257955/O1CN01pk50d128dRGoky0o8_!!2962257955.jpg,https://img.alicdn.com/imgextra/i1/2962257955/TB2vI7Vm9YTBKNjSZKbXXXJ8pXa_!!2962257955.jpg,https://img.alicdn.com/imgextra/i2/2962257955/O1CN0128dR9rUhU45QqRH_!!2962257955.jpg', '火热爆款', 0, 1000, 20.00, 11.00, 's1,s2', '2020-11-15 01:06:29', '2020-12-10 11:11:17');
INSERT INTO `goodsdetails` VALUES (2, 1, 2, '原宿ulzzang羊羔毛加厚棉衣外套男冬季宽松韩版棉袄青少年棉服潮', 'https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01GILwHx1RGyHjMHMMR_!!175232085.jpg', 'https://gd3.alicdn.com/imgextra/i1/175232085/O1CN01PujZ8L1RGyHiw8C9X_!!175232085.jpg,https://gd3.alicdn.com/imgextra/i3/175232085/O1CN01aae81L1RGyHkhZQ3L_!!175232085.jpg,https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01GILwHx1RGyHjMHMMR_!!175232085.jpg,https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01Mm0ZFj1RGyHkwBCbT_!!175232085.jpg', 'https://img.alicdn.com/imgextra/i4/175232085/O1CN01NUVNBE1RGyHl8Daen_!!175232085.jpg,https://img.alicdn.com/imgextra/i2/175232085/O1CN0196O5LZ1RGyHeKTsKX_!!175232085.jpg,https://img.alicdn.com/imgextra/i1/175232085/O1CN01MRTADv1RGyHkwD59a_!!175232085.jpg,https://img.alicdn.com/imgextra/i1/175232085/O1CN01lbsaim1RGyHlbFUMg_!!175232085.jpg', '新品上新', 0, 1000, 55.00, 323.00, 's1,s2', '2020-11-15 01:36:19', '2020-12-11 10:30:36');
INSERT INTO `goodsdetails` VALUES (3, 2, 1, '春秋棒球服男潮牌皮袖棒球衣男士宽松大码休闲毛呢夹克外套潮短款', 'https://gd4.alicdn.com/imgextra/i4/276426711/O1CN01r0xAzj1zRgVFxyKuD_!!276426711.jpg', 'https://gd3.alicdn.com/imgextra/i1/276426711/O1CN01WpaU3g1zRgTL0mrlU_!!276426711.jpg,https://gd4.alicdn.com/imgextra/i4/276426711/O1CN01r0xAzj1zRgVFxyKuD_!!276426711.jpg,https://gd2.alicdn.com/imgextra/i2/276426711/TB2NYZPaFXXXXclXXXXXXXXXXXX_!!276426711.jpg', 'https://img.alicdn.com/imgextra/i3/276426711/O1CN01LdPGnV1zRgYqMqxgI_!!276426711.jpg,https://img.alicdn.com/imgextra/i3/276426711/O1CN011zRgTKcGJQFW0Np_!!276426711.jpg,https://img.alicdn.com/imgextra/i3/276426711/O1CN011zRgSM6cvoXnOus_!!276426711.jpg,https://img.alicdn.com/imgextra/i2/276426711/O1CN01BIZ4sw1zRgTPSUtlv_!!276426711.jpg', '新品上新', 0, 1000, 55.00, 233.00, 's1,s2', '2020-11-15 13:42:31', '2020-12-10 11:11:19');
INSERT INTO `goodsdetails` VALUES (4, 3, 1, '运动裤男秋冬款宽松休闲长裤束脚裤冬季裤子男生加绒加厚潮牌卫裤', 'https://img.alicdn.com/imgextra/i2/2273198458/O1CN01csq9012CLoY7H4TcB_!!2-item_pic.png_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2273198458/O1CN01ixq9iG2CLoXl4heDH_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i2/2273198458/O1CN01csq9012CLoY7H4TcB_!!2-item_pic.png_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/2273198458/O1CN01Wjxz352CLoXu5cLeh_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2273198458/O1CN01lfl5zb2CLoXqXLicN_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2273198458/O1CN01pVLEDz2CLoXs74VY9_!!2273198458.jpg,https://img.alicdn.com/imgextra/i3/2273198458/O1CN01EsGG3P2CLoY1ukQyy_!!2273198458.jpg,https://img.alicdn.com/imgextra/i3/2273198458/O1CN01Ipjb4h2CLoYkYNyd9_!!2273198458.jpg,https://img.alicdn.com/imgextra/i1/2273198458/O1CN01SpTM2w2CLoXr3UQN8_!!2273198458.jpg', '新品上新', 0, 1000, 43.00, 3323.00, 's1,s2', '2020-11-15 13:42:39', '2020-12-10 11:11:19');
INSERT INTO `goodsdetails` VALUES (5, 4, 1, '秋冬季款男士长袖t恤潮流加绒卫衣宽松秋装男生内搭打底衫上衣服', 'https://img.alicdn.com/imgextra/i1/3058416618/O1CN01ivGtM31yl5mgwp432_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/3058416618/O1CN01OsbWkH1yl5mY7JihK_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/3058416618/O1CN01H4Twux1yl5mxmQR6h_!!3058416618.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/3058416618/O1CN01ftAy3c1yl5mqgIpxE_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/3058416618/O1CN01QeVMBh1yl5mknqaUJ_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/3058416618/O1CN01tiZUCB1yl5n9u4l4z_!!3058416618.jpg,https://img.alicdn.com/imgextra/i1/3058416618/O1CN01ehzjSH1yl5n9u76dW_!!3058416618.jpg,https://img.alicdn.com/imgextra/i3/3058416618/O1CN01OorqRw1yl5n8RHndQ_!!3058416618.jpg', '新品上新', 0, 1000, 323.00, 2332.00, 's1,s2', '2020-11-15 13:42:43', '2020-12-10 11:11:20');
INSERT INTO `goodsdetails` VALUES (6, 5, 1, '小米电视 4A60英寸4k超高清液晶屏智能平板电视机官方旗舰', 'https://img.alicdn.com/imgextra/i1/1714128138/O1CN01oFXUX029zFojI3FC9_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/1714128138/O1CN018lcSE329zFoZN6kj9_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01oFXUX029zFojI3FC9_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01GSJXUO29zFoSG3hbu_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/1714128138/O1CN01PvPx7I29zFmUek9TZ_!!1714128138.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/1714128138/O1CN01XRTBdu29zFneEOFxW_!!1714128138.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01lCbBQN29zFnZb4rIG_!!1714128138.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01YJUFuw29zFmW0fHVa_!!1714128138.jpg', '4K HDR 智能语音', 0, 1000, 323.00, 2323.00, 's1', '2020-11-15 13:42:55', '2020-12-10 11:11:21');
INSERT INTO `goodsdetails` VALUES (7, 6, 1, '海尔出品Leader/统帅9kg公斤大容量家用全自动波轮洗衣机@B90M867', 'https://img.alicdn.com/imgextra/i4/470168984/O1CN01pnVUTs2GEitTM3SeB_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/470168984/O1CN01u7J4KK2GEisM3bOKr_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i4/470168984/O1CN01pnVUTs2GEitTM3SeB_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/470168984/O1CN01abyVxW2GEikcxk2ks_!!470168984.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/470168984/O1CN01wkxZ7r2GEiqIsr34y_!!470168984.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/470168984/O1CN01qeILOR2GEipxJJORX_!!470168984.jpg,https://img.alicdn.com/imgextra/i2/470168984/O1CN01GD3CDh2GEipypHb4s_!!470168984.jpg,https://img.alicdn.com/imgextra/i2/470168984/O1CN017Xu5uz2GEipp7MlbZ_!!470168984.jpg', '智能模糊 智能双宽', 0, 1000, 32.00, 232.00, 's1', '2020-11-22 00:32:07', '2020-12-10 11:11:22');
INSERT INTO `goodsdetails` VALUES (8, 7, 1, 'Pandora潘多拉官网蓝色海洋之心ZT0139项链女锁骨链简约气质高级', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2978217349/O1CN01idGzDu249tKIvHrXI_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2978217349/O1CN01idGzDu249tKIvHrXI_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2978217349/O1CN01ysgdNG249tJxHV32e_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2978217349/O1CN01xsogwb249tJyUa9YS_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2978217349/O1CN01Hz4uGW249tJuM0yDl_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2978217349/O1CN01roh32a249tHzusQfX_!!2978217349.jpg,https://img.alicdn.com/imgextra/i3/2978217349/O1CN01MGh2fg249tHzXXH2q_!!2978217349.jpg,https://img.alicdn.com/imgextra/i2/2978217349/O1CN01jry0VU249tI4W67cp_!!2978217349.jpg', '冬季新品 梦幻上市', 0, 1000, 355.00, 323.00, 's1', '2020-11-22 00:32:27', '2020-12-10 11:11:22');
INSERT INTO `goodsdetails` VALUES (9, 8, 1, 'Pandora潘多拉 Moments经典扣925银手链590723CZ简约设计手串 女', 'https://img.alicdn.com/imgextra/i3/2978217349/O1CN01WsfGzA249tKM9HP1Z_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/2978217349/O1CN01WsfGzA249tKM9HP1Z_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i4/2978217349/TB2mhv_Xc3X61BjSszdXXXoAVXa_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2978217349/O1CN01ItAIeq249tHlupNSQ_!!2978217349.jpg,https://img.alicdn.com/imgextra/i3/2978217349/O1CN01U93Jns249tHgLyJT8_!!2978217349.jpg,https://img.alicdn.com/imgextra/i2/2978217349/O1CN01HazB1i249tHnLtO9s_!!2978217349.jpg', '三生三世  梦幻上市', 0, 1000, 865.00, 23.00, 's1', '2020-11-22 00:32:34', '2020-12-10 11:11:23');
INSERT INTO `goodsdetails` VALUES (10, 9, 1, '洁丽雅毛巾2条 纯棉洗脸家用成人男女不掉毛柔软全棉吸水加厚面巾', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01OTcp3W2B6s1N0jHnS_!!494858290.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01OTcp3W2B6s1N0jHnS_!!494858290.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/494858290/O1CN01XwEmxV2B6s1HycRoz_!!494858290.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/494858290/O1CN01VVPSyF2B6s1Sg9Jgl_!!494858290.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01ib4SD92B6s1DC7Pmb_!!494858290.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/494858290/O1CN01nv2cen2B6s0V8YKuT_!!494858290.jpg,https://img.alicdn.com/imgextra/i2/494858290/O1CN01bREszu2B6s0iTlhNG_!!494858290.jpg,https://img.alicdn.com/imgextra/i3/494858290/O1CN012uOdKu2B6s0fBFbWh_!!494858290.jpg', '鲁道夫抗菌', 0, 1000, 1245.00, 2323.00, 's1', '2020-11-22 00:34:02', '2020-12-10 11:11:24');
INSERT INTO `goodsdetails` VALUES (11, 10, 1, '【百草味-全肉零食大礼包1642g】鸭脖子熟食休闲食品充饥夜宵整箱', 'https://img.alicdn.com/imgextra/i3/628189716/O1CN013dzrEb2LdyoEWzwwI_!!628189716.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/628189716/O1CN013dzrEb2LdyoEWzwwI_!!628189716.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i4/628189716/O1CN01wA7TMX2Ldyo82qhex_!!628189716.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i2/628189716/O1CN01grS8n92LdyoCBEm61_!!628189716.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/628189716/O1CN010c9BR12Ldyo8pbrj2_!!628189716.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/628189716/O1CN01rzjU8X2Ldyo6vFbyO_!!628189716.jpg,https://img.alicdn.com/imgextra/i1/628189716/O1CN018j4anb2LdyoC4xs5J_!!628189716.jpg,https://img.alicdn.com/imgextra/i3/628189716/O1CN01rrlR2j2LdyoC4wjPP_!!628189716.jpg', '600款零食 一站购', 0, 1000, 125.00, 2323.00, 's3', '2020-11-22 00:34:12', '2020-12-10 11:11:25');
INSERT INTO `goodsdetails` VALUES (12, 11, 1, 'Apple/苹果 iPhone 12 全网通5G新品智能手机', 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN018YzXhr1IOul5Ty5ma_!!2616970884.png_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2616970884/O1CN01E6n5HM1IOul3E0kqn_!!2-item_pic.png_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/2616970884/O1CN01mEOkmw1IOukhKrj6O_!!2616970884.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2616970884/O1CN01YdHFrQ1IOulBNVvaC_!!2616970884.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2616970884/O1CN01tCqYud1IOukcvFm6l_!!2616970884.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2616970884/O1CN01hKr3KT1IOukZNURoT_!!2616970884.jpg', '正品行货', 0, 1000, 99.99, 2323.00, 's1,s4', '2020-11-22 00:34:23', '2020-12-10 11:11:25');
INSERT INTO `goodsdetails` VALUES (13, 12, 1, 'FT GUOGE针织连衣裙两件套女2020年新款秋装修身法式温柔风毛衣裙', 'https://img.alicdn.com/imgextra/i1/2459043311/O1CN01dk1Q9B1aKU0GPRZv1_!!2459043311.jpg_400x400.jpg', 'https://img.alicdn.com/imgextra/i1/2459043311/O1CN01dk1Q9B1aKU0GPRZv1_!!2459043311.jpg_400x400.jpg,https://img.alicdn.com/imgextra/i4/2459043311/O1CN01ni7Hsz1aKU0EebtVK_!!2459043311.jpg_400x400.jpg,https://img.alicdn.com/imgextra/i2/2459043311/O1CN01Ev5coy1aKU0EeYjn7_!!2459043311.jpg_400x400.jpg', 'https://img.alicdn.com/imgextra/i1/2459043311/O1CN01vR9tlE1aKU06MAe5J_!!2459043311.jpg,https://img.alicdn.com/imgextra/i3/2459043311/O1CN01QxWXEq1aKU05WnO1x_!!2459043311.jpg,', '潮流穿搭 玩趣互动', 0, 1000, 111.11, 2323.00, 's1,s2', '2020-11-22 00:34:33', '2020-12-10 11:11:26');
INSERT INTO `goodsdetails` VALUES (14, 13, 1, '传祺GS8 购车抽Dyson戴森HP06空气净化器风扇', 'https://img.alicdn.com/imgextra/i4/2023079849/O1CN01UF3mWC2MctUPTOEee_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2023079849/O1CN01UF3mWC2MctUPTOEee_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01c88VnI2MctUMyt1mV_!!2023079849.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01IFBJK62MctUPBtoqd_!!2023079849.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01lab7A12MctUPBw6Ev_!!2023079849.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/2023079849/O1CN01e3JBAz2MctUQOswAb_!!2023079849.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01y3IBsD2MctTYpySGf_!!2023079849.jpg', '新品上新', 1, 1000, 11.10, 2323.00, '', '2020-11-25 11:56:41', '2020-12-10 11:11:28');

-- ----------------------------
-- Table structure for goodsdetails_list
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_list`;
CREATE TABLE `goodsdetails_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合',
  `parentId` int(11) NULL DEFAULT NULL COMMENT '所属商品id',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '该组合价格',
  `stock_num` int(11) NULL DEFAULT NULL COMMENT '该组合库存',
  `s1` int(255) NULL DEFAULT NULL COMMENT '规格类目 k_s 为 s1 的对应规格值 id',
  `s2` int(255) NULL DEFAULT NULL COMMENT '规格类目 k_s 为 s2 的对应规格值 id',
  `s3` int(255) NULL DEFAULT NULL,
  `s4` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of goodsdetails_list
-- ----------------------------
INSERT INTO `goodsdetails_list` VALUES (2, 1, 10.00, 1000, 1, 4, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (3, 1, 20.00, 111, 1, 5, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (4, 1, 30.00, 11111, 2, 4, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (5, 1, 40.00, 11, 2, 5, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (6, 2, 22.00, 111, 6, 8, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (7, 2, 666.00, 49, 7, 8, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (8, 3, 99.00, 444, 9, 10, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (9, 5, 19.00, 111, 11, 12, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (10, 5, 22.00, 33, 11, 13, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (11, 4, 9.90, 1222, 14, 15, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (12, 4, 12.00, 22, 14, 16, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (13, 4, 54.00, 2, 14, 17, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (14, 6, 99.00, 99, 18, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (15, 6, 111.00, 455, 19, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (16, 7, 1234.00, 344, 20, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (17, 7, 6666.00, 54, 21, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (18, 8, 5678.00, 45, 22, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (19, 8, 5467.00, 33, 23, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (20, 9, 455.00, 34434, 24, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (21, 9, 656.00, 444, 25, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (22, 10, 12.00, 21212, 26, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (23, 10, 22.00, 222, 27, NULL, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (24, 11, 45.00, 54545, NULL, NULL, 28, NULL);
INSERT INTO `goodsdetails_list` VALUES (25, 11, 88.00, 444, NULL, NULL, 29, NULL);
INSERT INTO `goodsdetails_list` VALUES (26, 12, 4999.00, 3333, 30, NULL, NULL, 32);
INSERT INTO `goodsdetails_list` VALUES (27, 12, 5499.00, 4444, 30, NULL, NULL, 33);
INSERT INTO `goodsdetails_list` VALUES (28, 12, 4999.00, 443, 31, NULL, NULL, 32);
INSERT INTO `goodsdetails_list` VALUES (29, 12, 5499.00, 6666, 31, NULL, NULL, 33);
INSERT INTO `goodsdetails_list` VALUES (30, 13, 344.00, 555, 34, 36, NULL, NULL);
INSERT INTO `goodsdetails_list` VALUES (31, 13, 444.00, 444, 35, 36, NULL, NULL);

-- ----------------------------
-- Table structure for goodsdetails_sku
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_sku`;
CREATE TABLE `goodsdetails_sku`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品规格类目 id',
  `k` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'skuKeyName：规格类目名称',
  `k_s` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id',
  `largeImageMode` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'largeImageMode是否展示大图模式（0 false ,1true）',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails_sku
-- ----------------------------
INSERT INTO `goodsdetails_sku` VALUES (1, '颜色', 's1', 1, '2020-11-15 01:14:37', '2020-11-28 10:49:32');
INSERT INTO `goodsdetails_sku` VALUES (2, '尺寸', 's2', 0, '2020-11-15 01:53:18', '2020-11-28 10:54:11');
INSERT INTO `goodsdetails_sku` VALUES (5, '口味', 's3', 0, '2020-11-29 15:02:46', '2020-11-29 15:02:46');
INSERT INTO `goodsdetails_sku` VALUES (6, '存储容量', 's4', 0, '2020-11-29 15:10:28', '2020-11-29 15:10:28');

-- ----------------------------
-- Table structure for goodsdetails_type
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_type`;
CREATE TABLE `goodsdetails_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `skuId` int(11) NOT NULL COMMENT '所属商品规格类目 id',
  `parentId` int(11) NULL DEFAULT NULL COMMENT '所属商品id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '类型名称',
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '规格类目图片，只有第一个规格类目可以定义图片',
  `previewImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用于预览显示的规格类目图片',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails_type
-- ----------------------------
INSERT INTO `goodsdetails_type` VALUES (1, 1, 1, '黑色', 'https://gd1.alicdn.com/imgextra/i1/2962257955/O1CN0128dR9njqCuZOkPz_!!2962257955.jpg', 'https://gd1.alicdn.com/imgextra/i1/2962257955/O1CN0128dR9njqCuZOkPz_!!2962257955.jpg', '2020-11-15 12:13:22', '2020-11-29 10:58:22');
INSERT INTO `goodsdetails_type` VALUES (2, 1, 1, '红色', 'https://gd3.alicdn.com/imgextra/i3/2962257955/TB2LsYAnfImBKNjSZFlXXc43FXa_!!2962257955.jpg', 'https://gd3.alicdn.com/imgextra/i3/2962257955/TB2LsYAnfImBKNjSZFlXXc43FXa_!!2962257955.jpg', '2020-11-15 12:13:34', '2020-11-29 10:58:23');
INSERT INTO `goodsdetails_type` VALUES (4, 2, 1, 'S码', NULL, NULL, '2020-11-26 16:31:26', '2020-11-29 10:58:24');
INSERT INTO `goodsdetails_type` VALUES (5, 2, 1, 'M码', NULL, NULL, '2020-11-26 16:31:35', '2020-11-29 10:58:24');
INSERT INTO `goodsdetails_type` VALUES (6, 1, 2, '绿色', 'https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01Mm0ZFj1RGyHkwBCbT_!!175232085.jpg', 'https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01Mm0ZFj1RGyHkwBCbT_!!175232085.jpg', '2020-11-29 10:55:43', '2020-11-29 10:59:22');
INSERT INTO `goodsdetails_type` VALUES (7, 1, 2, '灰色', 'https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01GILwHx1RGyHjMHMMR_!!175232085.jpg', 'https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01GILwHx1RGyHjMHMMR_!!175232085.jpg', '2020-11-29 11:00:32', '2020-11-29 11:00:53');
INSERT INTO `goodsdetails_type` VALUES (8, 2, 2, 'XXL码', NULL, NULL, '2020-11-29 11:00:49', '2020-11-29 11:00:55');
INSERT INTO `goodsdetails_type` VALUES (9, 1, 3, '哈偶色', 'https://gd2.alicdn.com/imgextra/i2/276426711/TB2NYZPaFXXXXclXXXXXXXXXXXX_!!276426711.jpg', 'https://gd2.alicdn.com/imgextra/i2/276426711/TB2NYZPaFXXXXclXXXXXXXXXXXX_!!276426711.jpg', '2020-11-29 11:08:58', '2020-11-29 11:09:50');
INSERT INTO `goodsdetails_type` VALUES (10, 2, 3, '尺寸1', NULL, NULL, '2020-11-29 11:09:41', '2020-11-29 11:09:41');
INSERT INTO `goodsdetails_type` VALUES (11, 1, 5, '军绿色', 'https://img.alicdn.com/imgextra/i3/3058416618/O1CN01QeVMBh1yl5mknqaUJ_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/3058416618/O1CN01QeVMBh1yl5mknqaUJ_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg', '2020-11-29 11:49:11', '2020-11-29 11:49:11');
INSERT INTO `goodsdetails_type` VALUES (12, 2, 5, '41码', NULL, NULL, '2020-11-29 11:49:30', '2020-11-29 11:50:07');
INSERT INTO `goodsdetails_type` VALUES (13, 2, 5, '42码', NULL, NULL, '2020-11-29 11:49:43', '2020-11-29 11:49:43');
INSERT INTO `goodsdetails_type` VALUES (14, 1, 4, '乌漆嘛黑色', 'https://img.alicdn.com/imgextra/i1/2273198458/O1CN01Wjxz352CLoXu5cLeh_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2273198458/O1CN01Wjxz352CLoXu5cLeh_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg', '2020-11-29 11:55:09', '2020-11-29 11:55:09');
INSERT INTO `goodsdetails_type` VALUES (15, 2, 4, '44', NULL, NULL, '2020-11-29 11:55:21', '2020-11-29 11:55:21');
INSERT INTO `goodsdetails_type` VALUES (16, 2, 4, '45', NULL, NULL, '2020-11-29 11:55:28', '2020-11-29 11:55:28');
INSERT INTO `goodsdetails_type` VALUES (17, 2, 4, '46', NULL, NULL, '2020-11-29 11:55:36', '2020-11-29 11:55:36');
INSERT INTO `goodsdetails_type` VALUES (18, 1, 6, '黑色', 'https://img.alicdn.com/imgextra/i3/1714128138/O1CN01PvPx7I29zFmUek9TZ_!!1714128138.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/1714128138/O1CN01PvPx7I29zFmUek9TZ_!!1714128138.jpg_430x430q90.jpg', '2020-11-29 12:00:09', '2020-11-29 14:39:07');
INSERT INTO `goodsdetails_type` VALUES (19, 1, 6, '蓝色', 'https://img.alicdn.com/imgextra/i1/1714128138/O1CN018lcSE329zFoZN6kj9_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/1714128138/O1CN018lcSE329zFoZN6kj9_!!0-item_pic.jpg_430x430q90.jpg', '2020-11-29 14:04:13', '2020-11-29 14:39:02');
INSERT INTO `goodsdetails_type` VALUES (20, 1, 7, '5KG性价比款', 'https://img.alicdn.com/imgextra/i1/470168984/O1CN01wkxZ7r2GEiqIsr34y_!!470168984.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/470168984/O1CN01wkxZ7r2GEiqIsr34y_!!470168984.jpg_430x430q90.jpg', '2020-11-29 14:42:16', '2020-11-29 14:43:21');
INSERT INTO `goodsdetails_type` VALUES (21, 1, 7, '8KG至尊款', 'https://img.alicdn.com/imgextra/i3/470168984/O1CN01abyVxW2GEikcxk2ks_!!470168984.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/470168984/O1CN01abyVxW2GEikcxk2ks_!!470168984.jpg_430x430q90.jpg', '2020-11-29 14:43:09', '2020-11-29 14:43:26');
INSERT INTO `goodsdetails_type` VALUES (22, 1, 8, '18k黄金三件套', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2978217349/O1CN01Hz4uGW249tJuM0yDl_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2978217349/O1CN01Hz4uGW249tJuM0yDl_!!2978217349.jpg_430x430q90.jpg', '2020-11-29 14:46:52', '2020-11-29 14:51:54');
INSERT INTO `goodsdetails_type` VALUES (23, 1, 8, '幸运三叶草', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2978217349/O1CN01idGzDu249tKIvHrXI_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2978217349/O1CN01idGzDu249tKIvHrXI_!!2978217349.jpg_430x430q90.jpg', '2020-11-29 14:50:35', '2020-11-29 14:51:57');
INSERT INTO `goodsdetails_type` VALUES (24, 1, 9, '16cm', 'https://img.alicdn.com/imgextra/i3/2978217349/O1CN01WsfGzA249tKM9HP1Z_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/2978217349/O1CN01WsfGzA249tKM9HP1Z_!!2978217349.jpg_430x430q90.jpg', '2020-11-29 14:55:57', '2020-11-29 14:56:00');
INSERT INTO `goodsdetails_type` VALUES (25, 1, 9, '18cm', 'https://img.alicdn.com/imgextra/i4/2978217349/TB2mhv_Xc3X61BjSszdXXXoAVXa_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2978217349/TB2mhv_Xc3X61BjSszdXXXoAVXa_!!2978217349.jpg_430x430q90.jpg', '2020-11-29 14:56:58', '2020-11-29 14:58:17');
INSERT INTO `goodsdetails_type` VALUES (26, 1, 10, '蓝白两条', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01ib4SD92B6s1DC7Pmb_!!494858290.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01ib4SD92B6s1DC7Pmb_!!494858290.jpg_430x430q90.jpg', '2020-11-29 14:59:51', '2020-11-29 14:59:51');
INSERT INTO `goodsdetails_type` VALUES (27, 1, 10, '灰色四条', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01OTcp3W2B6s1N0jHnS_!!494858290.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01OTcp3W2B6s1N0jHnS_!!494858290.jpg_430x430q90.jpg', '2020-11-29 15:00:20', '2020-11-29 15:00:20');
INSERT INTO `goodsdetails_type` VALUES (28, 5, 11, '果干礼包1235g', 'https://img.alicdn.com/imgextra/i3/628189716/O1CN013dzrEb2LdyoEWzwwI_!!628189716.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/628189716/O1CN013dzrEb2LdyoEWzwwI_!!628189716.jpg_430x430q90.jpg', '2020-11-29 15:04:09', '2020-11-29 15:04:09');
INSERT INTO `goodsdetails_type` VALUES (29, 5, 11, '进口零食大礼包', 'https://img.alicdn.com/imgextra/i2/628189716/O1CN01grS8n92LdyoCBEm61_!!628189716.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/628189716/O1CN01grS8n92LdyoCBEm61_!!628189716.jpg_430x430q90.jpg', '2020-11-29 15:04:44', '2020-11-29 15:04:44');
INSERT INTO `goodsdetails_type` VALUES (30, 1, 12, '黑色', 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01tCqYud1IOukcvFm6l_!!2616970884.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01tCqYud1IOukcvFm6l_!!2616970884.jpg_430x430q90.jpg', '2020-11-29 15:11:23', '2020-11-29 15:11:23');
INSERT INTO `goodsdetails_type` VALUES (31, 1, 12, '白色', 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01YdHFrQ1IOulBNVvaC_!!2616970884.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN01YdHFrQ1IOulBNVvaC_!!2616970884.jpg_430x430q90.jpg', '2020-11-29 15:12:50', '2020-11-29 15:12:50');
INSERT INTO `goodsdetails_type` VALUES (32, 6, 12, '64g', NULL, NULL, '2020-11-29 15:13:05', '2020-11-29 15:13:09');
INSERT INTO `goodsdetails_type` VALUES (33, 6, 12, '256g', NULL, NULL, '2020-11-29 15:13:21', '2020-11-29 15:13:21');
INSERT INTO `goodsdetails_type` VALUES (34, 1, 13, '咖灰色', 'https://img.alicdn.com/imgextra/i2/2459043311/O1CN01Ev5coy1aKU0EeYjn7_!!2459043311.jpg_400x400.jpg', 'https://img.alicdn.com/imgextra/i2/2459043311/O1CN01Ev5coy1aKU0EeYjn7_!!2459043311.jpg_400x400.jpg', '2020-11-29 15:18:43', '2020-11-29 15:18:43');
INSERT INTO `goodsdetails_type` VALUES (35, 1, 13, '黑色', 'https://img.alicdn.com/imgextra/i4/2459043311/O1CN01ni7Hsz1aKU0EebtVK_!!2459043311.jpg_400x400.jpg', 'https://img.alicdn.com/imgextra/i4/2459043311/O1CN01ni7Hsz1aKU0EebtVK_!!2459043311.jpg_400x400.jpg', '2020-11-29 15:19:09', '2020-11-29 15:19:09');
INSERT INTO `goodsdetails_type` VALUES (36, 2, 13, 'S', NULL, NULL, '2020-11-29 15:19:22', '2020-11-29 15:19:22');

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
INSERT INTO `message` VALUES (2, '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试');

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
) ENGINE = MyISAM AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_address
-- ----------------------------
INSERT INTO `shop_address` VALUES (4, 2, 'sa', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2020-11-14 01:05:13', '2020-11-18 10:29:12');
INSERT INTO `shop_address` VALUES (19, 1, '讲台', '18899796648', '北京市', '北京市', '东城区', '都算是', '441144', 0, '2020-12-15 18:01:09', '2020-12-15 18:19:56');
INSERT INTO `shop_address` VALUES (18, 1, '几', '18899796648', '北京市', '北京市', '西城区', '加速度', '157841', 0, '2020-12-15 18:00:39', '2020-12-15 18:21:10');
INSERT INTO `shop_address` VALUES (20, 1, '多少度', '12345678999', '北京市', '北京市', '朝阳区', '多少度', '123456', 0, '2020-12-15 18:04:18', '2020-12-15 18:19:05');
INSERT INTO `shop_address` VALUES (21, 1, '122', '12345678999', '北京市', '北京市', '东城区', '3434', '444444', 0, '2020-12-15 18:21:10', '2020-12-15 18:21:40');
INSERT INTO `shop_address` VALUES (23, 1, '1', '12345678999', '北京市', '北京市', '东城区', '弱弱', '111111', 0, '2020-12-15 18:24:16', '2020-12-15 18:24:16');
INSERT INTO `shop_address` VALUES (22, 1, '12222', '12345678999', '北京市', '北京市', '东城区', '3434', '444444', 0, '2020-12-15 18:21:22', '2020-12-15 18:29:49');
INSERT INTO `shop_address` VALUES (24, 1, '12', '12345678900', '北京市', '北京市', '东城区', '33333', '333333', 0, '2020-12-15 18:29:49', '2020-12-20 18:38:20');
INSERT INTO `shop_address` VALUES (25, 1, '122', '12345678900', '北京市', '北京市', '东城区', 'ewe', '111111', 0, '2020-12-15 18:33:44', '2020-12-20 18:38:20');
INSERT INTO `shop_address` VALUES (26, 1, '第四十', '12345678900', '北京市', '北京市', '东城区', 'ewe', '111111', 1, '2020-12-15 18:33:54', '2020-12-20 18:38:20');

-- ----------------------------
-- Table structure for shop_order
-- ----------------------------
DROP TABLE IF EXISTS `shop_order`;
CREATE TABLE `shop_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `orderId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单号',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `userId` int(11) NULL DEFAULT NULL COMMENT '所属的用户id',
  `goodsId` int(11) NULL DEFAULT NULL COMMENT '所属的商品id',
  `list` json NULL COMMENT '所属的规格list数据（可以有多个）',
  `none_sku` tinyint(1) NULL DEFAULT 0 COMMENT '是否为无规格商品(0 false，1 true)',
  `orderStatus` enum('DFK','DFH','DSH','DPJ') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'DFK' COMMENT '订单状态（DFK,DFH,DSH,DPJ）（代付款，代发货，待收货，待评价）',
  `descText` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单备注（可为空）',
  `addressId` int(11) NULL DEFAULT NULL COMMENT '订单收货地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_order
-- ----------------------------
INSERT INTO `shop_order` VALUES (6, '5148336c6709dd02e79a8ce3adc70fd9', '2020-12-18 18:12:17', '2020-12-18 18:12:17', 1, 7, '[{\"listId\": 17, \"cart_num\": 1}]', 0, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (7, 'c70af6cf7b52ca62e3729a0f80395de6', '2020-12-18 18:21:28', '2020-12-21 09:39:05', 1, 2, '[{\"listId\": 6, \"cart_num\": 2}, {\"listId\": 7, \"cart_num\": 1}]', 0, 'DFH', '', 26);
INSERT INTO `shop_order` VALUES (8, 'cb5f920a56ae406b54003cd990d427e6', '2020-12-18 18:21:28', '2020-12-21 09:39:02', 1, 10, '[{\"listId\": 22, \"cart_num\": 1}, {\"listId\": 23, \"cart_num\": 2}]', 0, 'DSH', '', 26);
INSERT INTO `shop_order` VALUES (9, 'c98c92a044c509b89b41ef0d1755f7bf', '2020-12-18 18:21:28', '2020-12-21 09:39:09', 1, 7, '[{\"listId\": 17, \"cart_num\": 5}]', 0, 'DPJ', '', 26);
INSERT INTO `shop_order` VALUES (10, '05069bb7b788d0652b3b1f37ebc288af', '2020-12-18 18:21:28', '2020-12-18 18:21:28', 1, 14, '[{\"cart_num\": 4}]', 1, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (11, '96e48814456e969c61051a0e83629e80', '2020-12-18 18:23:08', '2020-12-18 18:23:08', 1, 7, '[{\"listId\": 17, \"cart_num\": 5}]', 0, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (12, 'd325d10bd6a7a686e3a830219a0a5c48', '2020-12-18 18:23:08', '2020-12-18 18:23:08', 1, 2, '[{\"listId\": 6, \"cart_num\": 2}, {\"listId\": 7, \"cart_num\": 1}]', 0, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (13, '2b46256f29b031cf01391b29a03abed1', '2020-12-18 18:23:08', '2020-12-18 18:23:08', 1, 10, '[{\"listId\": 22, \"cart_num\": 1}, {\"listId\": 23, \"cart_num\": 2}]', 0, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (14, '0a7b1b663b3ef61c934da0ed396921c0', '2020-12-18 18:23:08', '2020-12-18 18:23:08', 1, 14, '[{\"cart_num\": 4}]', 1, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (15, '7e0cc62c4f561d0a2469ebd32fd48d07', '2020-12-18 18:40:37', '2020-12-18 18:40:37', 1, 2, '[{\"listId\": 7, \"cart_num\": 1}]', 0, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (16, 'e275f0169f601840afbe06e9f66a23d8', '2020-12-19 09:39:23', '2020-12-19 09:39:23', 1, 10, '[{\"listId\": 23, \"cart_num\": 2}, {\"listId\": 22, \"cart_num\": 1}]', 0, 'DFK', '', 25);
INSERT INTO `shop_order` VALUES (17, 'ad18108fef437e70e3dc3572e24c272f', '2020-12-19 09:39:23', '2020-12-19 09:39:23', 1, 7, '[{\"listId\": 17, \"cart_num\": 5}]', 0, 'DFK', '', 25);
INSERT INTO `shop_order` VALUES (18, 'd54ebd9c07b4bf0226d4ef7da3ca21a2', '2020-12-19 09:39:23', '2020-12-19 09:39:23', 1, 14, '[{\"cart_num\": 4}]', 1, 'DFK', '', 25);
INSERT INTO `shop_order` VALUES (19, '497c4dfcf7ad0da9ea0d38c616d515dd', '2020-12-19 09:39:23', '2020-12-19 09:39:23', 1, 2, '[{\"listId\": 7, \"cart_num\": 1}, {\"listId\": 6, \"cart_num\": 2}]', 0, 'DFK', '', 25);
INSERT INTO `shop_order` VALUES (20, 'e899666ee2e78aec969496016af1bb01', '2020-12-19 11:28:28', '2020-12-19 11:28:28', 1, 10, '[{\"listId\": 23, \"cart_num\": 2}]', 0, 'DFK', '', 26);
INSERT INTO `shop_order` VALUES (21, 'e899666ee2e78aec969496016af1bb01', '2020-12-19 11:28:28', '2020-12-19 11:28:28', 2, 10, '[{\"listId\": 23, \"cart_num\": 2}]', 0, 'DFK', '', 26);

-- ----------------------------
-- Table structure for shop_user
-- ----------------------------
DROP TABLE IF EXISTS `shop_user`;
CREATE TABLE `shop_user`  (
  `userId` int(255) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号（登录账号）',
  `sex` enum('M','W') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像地址',
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生日时间戳',
  `descText` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个性签名',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建地址',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_user
-- ----------------------------
INSERT INTO `shop_user` VALUES (1, '有人@你', '18899796648', 'M', '$2a$10$xaSX9eafON00WTmpBYVi9OTD/WYEwyATKwGvMUJ64ckUqT8ZTZzWW', '10000', '1606406400000', '的技术交底大家都减速电机三件大事的师父是非得失', '2020-12-21 09:55:41', '2020-12-21 10:41:54');

-- ----------------------------
-- Table structure for shopcart
-- ----------------------------
DROP TABLE IF EXISTS `shopcart`;
CREATE TABLE `shopcart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车数据id',
  `userId` int(11) NOT NULL COMMENT '所属用户id',
  `goodsId` int(11) NOT NULL COMMENT '所属商品id',
  `listId` int(11) NULL DEFAULT NULL COMMENT '规格类目id',
  `none_sku` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为无规格商品(0 false，1 true)',
  `cart_num` int(11) NOT NULL COMMENT '选择的商品数量',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 89 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of shopcart
-- ----------------------------
INSERT INTO `shopcart` VALUES (88, 1, 10, 23, 0, 2, '2020-12-19 11:19:45', '2020-12-19 11:19:45');
INSERT INTO `shopcart` VALUES (75, 1, 7, 17, 0, 17, '2020-12-11 18:27:20', '2020-12-19 10:04:00');
INSERT INTO `shopcart` VALUES (81, 1, 14, NULL, 1, 22, '2020-12-14 10:40:44', '2020-12-19 11:15:04');
INSERT INTO `shopcart` VALUES (84, 1, 2, 6, 0, 2, '2020-12-15 15:42:10', '2020-12-17 14:44:39');
INSERT INTO `shopcart` VALUES (85, 1, 2, 7, 0, 1, '2020-12-17 17:35:59', '2020-12-17 17:35:59');

SET FOREIGN_KEY_CHECKS = 1;
