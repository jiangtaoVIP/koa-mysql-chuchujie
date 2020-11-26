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

 Date: 26/11/2020 18:35:06
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
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `iconId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品缩略图',
  `homeImageIds` varchar(9999) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品首页轮播',
  `detailsImageIds` varchar(9999) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品详情图',
  `hot` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品火热小字段',
  `none_sku` tinyint(1) NULL DEFAULT 1 COMMENT '是否为无规格商品(0 false，1 true)',
  `stock_num` int(11) NULL DEFAULT NULL COMMENT '商品总库存',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails
-- ----------------------------
INSERT INTO `goodsdetails` VALUES (1, 1, '易燃青年 长袖撞色拼接休闲夹克男 学生春装宽松翻领上衣外套', 'https://gd1.alicdn.com/imgextra/i1/2962257955/O1CN0128dR9njqCuZOkPz_!!2962257955.jpg', 'https://gd4.alicdn.com/imgextra/i4/2962257955/O1CN0128dR9me80xQJTDB_!!2962257955.jpg,https://gd1.alicdn.com/imgextra/i1/2962257955/O1CN0128dR9njqCuZOkPz_!!2962257955.jpg,https://gd3.alicdn.com/imgextra/i3/2962257955/TB2If_jnbZnBKNjSZFKXXcGOVXa_!!2962257955.jpg,https://gd3.alicdn.com/imgextra/i3/2962257955/TB2LsYAnfImBKNjSZFlXXc43FXa_!!2962257955.jpg', 'https://img.alicdn.com/imgextra/i3/2962257955/O1CN01xC0HeA28dRGwWsBI5_!!2962257955.jpg,https://img.alicdn.com/imgextra/i1/2962257955/O1CN01pk50d128dRGoky0o8_!!2962257955.jpg,https://img.alicdn.com/imgextra/i1/2962257955/TB2vI7Vm9YTBKNjSZKbXXXJ8pXa_!!2962257955.jpg,https://img.alicdn.com/imgextra/i2/2962257955/O1CN0128dR9rUhU45QqRH_!!2962257955.jpg', '火热爆款', 1, 1000, '2020-11-15 01:06:29', '2020-11-26 17:45:15');
INSERT INTO `goodsdetails` VALUES (2, 1, '原宿ulzzang羊羔毛加厚棉衣外套男冬季宽松韩版棉袄青少年棉服潮', 'https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01GILwHx1RGyHjMHMMR_!!175232085.jpg', 'https://gd3.alicdn.com/imgextra/i1/175232085/O1CN01PujZ8L1RGyHiw8C9X_!!175232085.jpg,https://gd3.alicdn.com/imgextra/i3/175232085/O1CN01aae81L1RGyHkhZQ3L_!!175232085.jpg,https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01GILwHx1RGyHjMHMMR_!!175232085.jpg,https://gd2.alicdn.com/imgextra/i2/175232085/O1CN01Mm0ZFj1RGyHkwBCbT_!!175232085.jpg', 'https://img.alicdn.com/imgextra/i4/175232085/O1CN01NUVNBE1RGyHl8Daen_!!175232085.jpg,https://img.alicdn.com/imgextra/i2/175232085/O1CN0196O5LZ1RGyHeKTsKX_!!175232085.jpg,https://img.alicdn.com/imgextra/i1/175232085/O1CN01MRTADv1RGyHkwD59a_!!175232085.jpg,https://img.alicdn.com/imgextra/i1/175232085/O1CN01lbsaim1RGyHlbFUMg_!!175232085.jpg', '新品上新', 1, 1000, '2020-11-15 01:36:19', '2020-11-26 17:45:18');
INSERT INTO `goodsdetails` VALUES (3, 2, '春秋棒球服男潮牌皮袖棒球衣男士宽松大码休闲毛呢夹克外套潮短款', 'https://gd4.alicdn.com/imgextra/i4/276426711/O1CN01r0xAzj1zRgVFxyKuD_!!276426711.jpg', 'https://gd3.alicdn.com/imgextra/i1/276426711/O1CN01WpaU3g1zRgTL0mrlU_!!276426711.jpg,https://gd4.alicdn.com/imgextra/i4/276426711/O1CN01r0xAzj1zRgVFxyKuD_!!276426711.jpg,https://gd2.alicdn.com/imgextra/i2/276426711/TB2NYZPaFXXXXclXXXXXXXXXXXX_!!276426711.jpg', 'https://img.alicdn.com/imgextra/i3/276426711/O1CN01LdPGnV1zRgYqMqxgI_!!276426711.jpg,https://img.alicdn.com/imgextra/i3/276426711/O1CN011zRgTKcGJQFW0Np_!!276426711.jpg,https://img.alicdn.com/imgextra/i3/276426711/O1CN011zRgSM6cvoXnOus_!!276426711.jpg,https://img.alicdn.com/imgextra/i2/276426711/O1CN01BIZ4sw1zRgTPSUtlv_!!276426711.jpg', '新品上新', 1, 1000, '2020-11-15 13:42:31', '2020-11-26 17:45:19');
INSERT INTO `goodsdetails` VALUES (4, 3, '运动裤男秋冬款宽松休闲长裤束脚裤冬季裤子男生加绒加厚潮牌卫裤', 'https://img.alicdn.com/imgextra/i2/2273198458/O1CN01csq9012CLoY7H4TcB_!!2-item_pic.png_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2273198458/O1CN01ixq9iG2CLoXl4heDH_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i2/2273198458/O1CN01csq9012CLoY7H4TcB_!!2-item_pic.png_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/2273198458/O1CN01Wjxz352CLoXu5cLeh_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2273198458/O1CN01lfl5zb2CLoXqXLicN_!!2273198458-0-lubanu-s.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2273198458/O1CN01pVLEDz2CLoXs74VY9_!!2273198458.jpg,https://img.alicdn.com/imgextra/i3/2273198458/O1CN01EsGG3P2CLoY1ukQyy_!!2273198458.jpg,https://img.alicdn.com/imgextra/i3/2273198458/O1CN01Ipjb4h2CLoYkYNyd9_!!2273198458.jpg,https://img.alicdn.com/imgextra/i1/2273198458/O1CN01SpTM2w2CLoXr3UQN8_!!2273198458.jpg', '新品上新', 1, 1000, '2020-11-15 13:42:39', '2020-11-26 17:45:20');
INSERT INTO `goodsdetails` VALUES (5, 4, '秋冬季款男士长袖t恤潮流加绒卫衣宽松秋装男生内搭打底衫上衣服', 'https://img.alicdn.com/imgextra/i1/3058416618/O1CN01ivGtM31yl5mgwp432_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/3058416618/O1CN01OsbWkH1yl5mY7JihK_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/3058416618/O1CN01H4Twux1yl5mxmQR6h_!!3058416618.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/3058416618/O1CN01ftAy3c1yl5mqgIpxE_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/3058416618/O1CN01QeVMBh1yl5mknqaUJ_!!3058416618-0-lubanu-s.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/3058416618/O1CN01tiZUCB1yl5n9u4l4z_!!3058416618.jpg,https://img.alicdn.com/imgextra/i1/3058416618/O1CN01ehzjSH1yl5n9u76dW_!!3058416618.jpg,https://img.alicdn.com/imgextra/i3/3058416618/O1CN01OorqRw1yl5n8RHndQ_!!3058416618.jpg', '新品上新', 1, 1000, '2020-11-15 13:42:43', '2020-11-26 17:45:21');
INSERT INTO `goodsdetails` VALUES (6, 5, '小米电视 4A60英寸4k超高清液晶屏智能平板电视机官方旗舰', 'https://img.alicdn.com/imgextra/i1/1714128138/O1CN01oFXUX029zFojI3FC9_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/1714128138/O1CN018lcSE329zFoZN6kj9_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01oFXUX029zFojI3FC9_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01GSJXUO29zFoSG3hbu_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/1714128138/O1CN01PvPx7I29zFmUek9TZ_!!1714128138.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/1714128138/O1CN01XRTBdu29zFneEOFxW_!!1714128138.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01lCbBQN29zFnZb4rIG_!!1714128138.jpg,https://img.alicdn.com/imgextra/i1/1714128138/O1CN01YJUFuw29zFmW0fHVa_!!1714128138.jpg', '4K HDR 智能语音', 1, 1000, '2020-11-15 13:42:55', '2020-11-26 17:45:22');
INSERT INTO `goodsdetails` VALUES (7, 6, '海尔出品Leader/统帅9kg公斤大容量家用全自动波轮洗衣机@B90M867', 'https://img.alicdn.com/imgextra/i4/470168984/O1CN01pnVUTs2GEitTM3SeB_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/470168984/O1CN01u7J4KK2GEisM3bOKr_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i4/470168984/O1CN01pnVUTs2GEitTM3SeB_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/470168984/O1CN01abyVxW2GEikcxk2ks_!!470168984.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/470168984/O1CN01wkxZ7r2GEiqIsr34y_!!470168984.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/470168984/O1CN01qeILOR2GEipxJJORX_!!470168984.jpg,https://img.alicdn.com/imgextra/i2/470168984/O1CN01GD3CDh2GEipypHb4s_!!470168984.jpg,https://img.alicdn.com/imgextra/i2/470168984/O1CN017Xu5uz2GEipp7MlbZ_!!470168984.jpg', '智能模糊 智能双宽', 1, 1000, '2020-11-22 00:32:07', '2020-11-26 17:45:23');
INSERT INTO `goodsdetails` VALUES (8, 7, 'Pandora潘多拉官网蓝色海洋之心ZT0139项链女锁骨链简约气质高级', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2978217349/O1CN01idGzDu249tKIvHrXI_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2978217349/O1CN01idGzDu249tKIvHrXI_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2978217349/O1CN01ysgdNG249tJxHV32e_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2978217349/O1CN01xsogwb249tJyUa9YS_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/2978217349/O1CN01Hz4uGW249tJuM0yDl_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2978217349/O1CN01roh32a249tHzusQfX_!!2978217349.jpg,https://img.alicdn.com/imgextra/i3/2978217349/O1CN01MGh2fg249tHzXXH2q_!!2978217349.jpg,https://img.alicdn.com/imgextra/i2/2978217349/O1CN01jry0VU249tI4W67cp_!!2978217349.jpg', '冬季新品 梦幻上市', 1, 1000, '2020-11-22 00:32:27', '2020-11-26 17:45:24');
INSERT INTO `goodsdetails` VALUES (9, 8, 'Pandora潘多拉 Moments经典扣925银手链590723CZ简约设计手串 女', 'https://img.alicdn.com/imgextra/i3/2978217349/O1CN01WsfGzA249tKM9HP1Z_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/2978217349/O1CN01WsfGzA249tKM9HP1Z_!!2978217349.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i4/2978217349/TB2mhv_Xc3X61BjSszdXXXoAVXa_!!2978217349.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2978217349/O1CN01ItAIeq249tHlupNSQ_!!2978217349.jpg,https://img.alicdn.com/imgextra/i3/2978217349/O1CN01U93Jns249tHgLyJT8_!!2978217349.jpg,https://img.alicdn.com/imgextra/i2/2978217349/O1CN01HazB1i249tHnLtO9s_!!2978217349.jpg', '三生三世  梦幻上市', 1, 1000, '2020-11-22 00:32:34', '2020-11-26 17:45:25');
INSERT INTO `goodsdetails` VALUES (10, 9, '洁丽雅毛巾2条 纯棉洗脸家用成人男女不掉毛柔软全棉吸水加厚面巾', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01OTcp3W2B6s1N0jHnS_!!494858290.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01OTcp3W2B6s1N0jHnS_!!494858290.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/494858290/O1CN01XwEmxV2B6s1HycRoz_!!494858290.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/494858290/O1CN01VVPSyF2B6s1Sg9Jgl_!!494858290.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/494858290/O1CN01ib4SD92B6s1DC7Pmb_!!494858290.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/494858290/O1CN01nv2cen2B6s0V8YKuT_!!494858290.jpg,https://img.alicdn.com/imgextra/i2/494858290/O1CN01bREszu2B6s0iTlhNG_!!494858290.jpg,https://img.alicdn.com/imgextra/i3/494858290/O1CN012uOdKu2B6s0fBFbWh_!!494858290.jpg', '鲁道夫抗菌', 1, 1000, '2020-11-22 00:34:02', '2020-11-26 17:45:26');
INSERT INTO `goodsdetails` VALUES (11, 10, '【百草味-全肉零食大礼包1642g】鸭脖子熟食休闲食品充饥夜宵整箱', 'https://img.alicdn.com/imgextra/i3/628189716/O1CN013dzrEb2LdyoEWzwwI_!!628189716.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/628189716/O1CN013dzrEb2LdyoEWzwwI_!!628189716.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i4/628189716/O1CN01wA7TMX2Ldyo82qhex_!!628189716.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i2/628189716/O1CN01grS8n92LdyoCBEm61_!!628189716.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/628189716/O1CN010c9BR12Ldyo8pbrj2_!!628189716.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/628189716/O1CN01rzjU8X2Ldyo6vFbyO_!!628189716.jpg,https://img.alicdn.com/imgextra/i1/628189716/O1CN018j4anb2LdyoC4xs5J_!!628189716.jpg,https://img.alicdn.com/imgextra/i3/628189716/O1CN01rrlR2j2LdyoC4wjPP_!!628189716.jpg', '600款零食 一站购', 1, 1000, '2020-11-22 00:34:12', '2020-11-26 17:45:27');
INSERT INTO `goodsdetails` VALUES (12, 11, 'Apple/苹果 iPhone 12 全网通5G新品智能手机', 'https://img.alicdn.com/imgextra/i3/2616970884/O1CN018YzXhr1IOul5Ty5ma_!!2616970884.png_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2616970884/O1CN01E6n5HM1IOul3E0kqn_!!2-item_pic.png_430x430q90.jpg,https://img.alicdn.com/imgextra/i1/2616970884/O1CN01mEOkmw1IOukhKrj6O_!!2616970884.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2616970884/O1CN01YdHFrQ1IOulBNVvaC_!!2616970884.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2616970884/O1CN01tCqYud1IOukcvFm6l_!!2616970884.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/2616970884/O1CN01hKr3KT1IOukZNURoT_!!2616970884.jpg', '正品行货', 1, 1000, '2020-11-22 00:34:23', '2020-11-26 17:45:27');
INSERT INTO `goodsdetails` VALUES (13, 12, 'FT GUOGE针织连衣裙两件套女2020年新款秋装修身法式温柔风毛衣裙', 'https://img.alicdn.com/imgextra/i1/2459043311/O1CN01dk1Q9B1aKU0GPRZv1_!!2459043311.jpg_400x400.jpg', 'https://img.alicdn.com/imgextra/i1/2459043311/O1CN01dk1Q9B1aKU0GPRZv1_!!2459043311.jpg_400x400.jpg,https://img.alicdn.com/imgextra/i4/2459043311/O1CN01ni7Hsz1aKU0EebtVK_!!2459043311.jpg_400x400.jpg,https://img.alicdn.com/imgextra/i2/2459043311/O1CN01Ev5coy1aKU0EeYjn7_!!2459043311.jpg_400x400.jpg', 'https://img.alicdn.com/imgextra/i1/2459043311/O1CN01vR9tlE1aKU06MAe5J_!!2459043311.jpg,https://img.alicdn.com/imgextra/i3/2459043311/O1CN01QxWXEq1aKU05WnO1x_!!2459043311.jpg,', '潮流穿搭 玩趣互动', 1, 1000, '2020-11-22 00:34:33', '2020-11-26 17:45:28');
INSERT INTO `goodsdetails` VALUES (14, 13, '传祺GS8 购车抽Dyson戴森HP06空气净化器风扇', 'https://img.alicdn.com/imgextra/i4/2023079849/O1CN01UF3mWC2MctUPTOEee_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i4/2023079849/O1CN01UF3mWC2MctUPTOEee_!!0-item_pic.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01c88VnI2MctUMyt1mV_!!2023079849.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01IFBJK62MctUPBtoqd_!!2023079849.jpg_430x430q90.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01lab7A12MctUPBw6Ev_!!2023079849.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i2/2023079849/O1CN01e3JBAz2MctUQOswAb_!!2023079849.jpg,https://img.alicdn.com/imgextra/i3/2023079849/O1CN01y3IBsD2MctTYpySGf_!!2023079849.jpg', '新品上新', 1, 1000, '2020-11-25 11:56:41', '2020-11-26 17:45:33');

-- ----------------------------
-- Table structure for goodsdetails_list
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_list`;
CREATE TABLE `goodsdetails_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合',
  `parentId` int(11) NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '该组合价格',
  `stock_num` int(11) NULL DEFAULT NULL COMMENT '该组合库存',
  `s1` int(255) NULL DEFAULT NULL COMMENT '规格类目 k_s 为 s1 的对应规格值 id',
  `s2` int(255) NULL DEFAULT NULL COMMENT '规格类目 k_s 为 s2 的对应规格值 id',
  `s3` int(255) NULL DEFAULT NULL COMMENT '规格类目 k_s 为 s3 的对应规格值 id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of goodsdetails_list
-- ----------------------------
INSERT INTO `goodsdetails_list` VALUES (2, 1, 10.00, 1000, 1, 4, NULL);
INSERT INTO `goodsdetails_list` VALUES (3, 1, 20.00, 111, 2, 5, NULL);

-- ----------------------------
-- Table structure for goodsdetails_sku
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_sku`;
CREATE TABLE `goodsdetails_sku`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品规格类目 id',
  `parentId` int(11) NULL DEFAULT NULL COMMENT '所属的商品父级id',
  `k` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT 'skuKeyName：规格类目名称',
  `k_s` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT 'skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id',
  `largeImageMode` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'largeImageMode是否展示大图模式（0 false ,1true）',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails_sku
-- ----------------------------
INSERT INTO `goodsdetails_sku` VALUES (1, 1, '颜色', 's1', 0, '2020-11-15 01:14:37', '2020-11-26 17:01:42');
INSERT INTO `goodsdetails_sku` VALUES (2, 1, '尺寸', 's2', 0, '2020-11-15 01:53:18', '2020-11-26 17:02:20');
INSERT INTO `goodsdetails_sku` VALUES (3, 2, '颜色', 's1', 0, '2020-11-15 12:54:55', '2020-11-26 17:03:20');

-- ----------------------------
-- Table structure for goodsdetails_type
-- ----------------------------
DROP TABLE IF EXISTS `goodsdetails_type`;
CREATE TABLE `goodsdetails_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `skuId` int(11) NOT NULL COMMENT '所属商品规格类目 id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '类型名称',
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '规格类目图片，只有第一个规格类目可以定义图片',
  `previewImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用于预览显示的规格类目图片',
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodsdetails_type
-- ----------------------------
INSERT INTO `goodsdetails_type` VALUES (1, 1, '黑色', 'https://img.yzcdn.cn/2.jpg', 'https://img.yzcdn.cn/2.jpg', '2020-11-15 12:13:22', '2020-11-26 16:27:20');
INSERT INTO `goodsdetails_type` VALUES (2, 1, '红色', 'https://img.yzcdn.cn/2.jpg', 'https://img.yzcdn.cn/2.jpg', '2020-11-15 12:13:34', '2020-11-26 16:27:23');
INSERT INTO `goodsdetails_type` VALUES (3, 1, '绿色', 'https://img.yzcdn.cn/2.jpg', 'https://img.yzcdn.cn/2.jpg', '2020-11-15 13:10:32', '2020-11-26 16:27:44');
INSERT INTO `goodsdetails_type` VALUES (4, 2, 'S码', NULL, NULL, '2020-11-26 16:31:26', '2020-11-26 16:31:26');
INSERT INTO `goodsdetails_type` VALUES (5, 2, 'M码', NULL, NULL, '2020-11-26 16:31:35', '2020-11-26 16:31:35');

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
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_address
-- ----------------------------
INSERT INTO `shop_address` VALUES (1, 1, '江涛', '18899796648', '广东省', '广州市', '天河区', '车陂此前大街', '517400', 1, '2020-11-14 00:19:55', '2020-11-26 14:40:24');
INSERT INTO `shop_address` VALUES (4, 2, 'sa', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2020-11-14 01:05:13', '2020-11-18 10:29:12');
INSERT INTO `shop_address` VALUES (5, 1, '黄11', '12212121212', '广东省', '广州市', '天河区', '车陂此前大街', '517400', 0, '2020-11-20 00:05:49', '2020-11-26 14:40:24');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
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
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '有人@你', '18899796648', 'M', '123456', '10000', '1606406400000', '的技术交底大家都减速电机三件大事的师父是非得失', NULL, '2020-11-25 15:59:01');
INSERT INTO `user` VALUES (2, '2', '2', NULL, '123456', '10000', NULL, NULL, NULL, '2020-11-23 00:23:08');
INSERT INTO `user` VALUES (3, '2', '1', NULL, '123456', '10000', NULL, NULL, NULL, '2020-11-23 00:23:09');
INSERT INTO `user` VALUES (4, '2', '2', NULL, '123456', '10000', NULL, NULL, NULL, '2020-11-23 00:23:10');
INSERT INTO `user` VALUES (5, '21', '1', NULL, '123456', '10000', NULL, NULL, NULL, '2020-11-23 00:23:11');
INSERT INTO `user` VALUES (6, '是多少', '2', NULL, '123456', '10000', NULL, NULL, NULL, '2020-11-23 00:23:12');
INSERT INTO `user` VALUES (7, '12', '1', NULL, '123456', '10000', NULL, NULL, NULL, '2020-11-23 00:23:13');
INSERT INTO `user` VALUES (8, '2', '2', NULL, NULL, '10000', NULL, NULL, NULL, '2020-11-22 15:15:00');
INSERT INTO `user` VALUES (9, '1', '2', NULL, NULL, '10000', NULL, NULL, NULL, '2020-11-22 15:15:00');
INSERT INTO `user` VALUES (10, '是多少', '1', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-03 10:59:01');
INSERT INTO `user` VALUES (11, '12', '21', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-03 10:59:02');
INSERT INTO `user` VALUES (12, '212', '212', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-03 10:59:03');
INSERT INTO `user` VALUES (13, '多福多寿', '21', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-03 10:59:04');
INSERT INTO `user` VALUES (14, '发的发生', '21', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-03 10:59:05');
INSERT INTO `user` VALUES (15, 'ewewe', '21', NULL, NULL, NULL, NULL, NULL, '2020-10-31 16:27:24', '2020-11-03 10:59:06');
INSERT INTO `user` VALUES (16, '放松放松', '1', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:24', '2020-11-03 10:59:06');
INSERT INTO `user` VALUES (17, '任务分为', '21', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:27', '2020-11-03 10:59:07');
INSERT INTO `user` VALUES (18, '放松放松', '21', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:28', '2020-11-03 10:59:08');
INSERT INTO `user` VALUES (19, '2', '21', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:29', '2020-11-03 10:59:09');
INSERT INTO `user` VALUES (20, '2', '21', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:30', '2020-11-03 10:59:09');
INSERT INTO `user` VALUES (21, '放松放松', '21', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:32', '2020-11-03 10:59:10');
INSERT INTO `user` VALUES (22, '分为服务费', '21', NULL, NULL, NULL, NULL, NULL, '2020-11-02 17:07:33', '2020-11-03 10:59:12');

SET FOREIGN_KEY_CHECKS = 1;
