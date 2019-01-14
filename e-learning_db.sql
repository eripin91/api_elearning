-- MySQL dump 10.17  Distrib 10.3.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: e-learning_db
-- ------------------------------------------------------
-- Server version	10.3.11-MariaDB-1:10.3.11+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assessment_tab`
--
CREATE DATABASE `e-learning_db`;
USE `e-learning_db`;

DROP TABLE IF EXISTS `assessment_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment_tab` (
  `assessmentid` int(10) NOT NULL AUTO_INCREMENT,
  `parentid` int(10) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 1,
  `duration` int(10) NOT NULL,
  `question_type` tinyint(1) NOT NULL DEFAULT 1,
  `question` varchar(350) NOT NULL,
  `options` text NOT NULL,
  `answer` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`assessmentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_tab`
--

LOCK TABLES `assessment_tab` WRITE;
/*!40000 ALTER TABLE `assessment_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `assessment_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_tab`
--

DROP TABLE IF EXISTS `classes_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classes_tab` (
  `classid` int(11) NOT NULL AUTO_INCREMENT,
  `guruid` int(10) NOT NULL DEFAULT 0,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `cover` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`classid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_tab`
--

LOCK TABLES `classes_tab` WRITE;
/*!40000 ALTER TABLE `classes_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `classes_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_detail_tab`
--

DROP TABLE IF EXISTS `courses_detail_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_detail_tab` (
  `detailid` int(11) NOT NULL AUTO_INCREMENT,
  `courseid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`detailid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_detail_tab`
--

LOCK TABLES `courses_detail_tab` WRITE;
/*!40000 ALTER TABLE `courses_detail_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses_detail_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_material_tab`
--

DROP TABLE IF EXISTS `courses_material_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_material_tab` (
  `materialid` int(10) NOT NULL AUTO_INCREMENT,
  `detailid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(350) NOT NULL,
  `video_url` varchar(300) NOT NULL,
  `thumbnails` text NOT NULL,
  `size` int(10) NOT NULL DEFAULT 0,
  `duration` int(10) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`materialid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_material_tab`
--

LOCK TABLES `courses_material_tab` WRITE;
/*!40000 ALTER TABLE `courses_material_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses_material_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_tab`
--

DROP TABLE IF EXISTS `courses_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_tab` (
  `courseid` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`courseid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_tab`
--

LOCK TABLES `courses_tab` WRITE;
/*!40000 ALTER TABLE `courses_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_likes_tab`
--

DROP TABLE IF EXISTS `discussion_likes_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion_likes_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_likes_tab`
--

LOCK TABLES `discussion_likes_tab` WRITE;
/*!40000 ALTER TABLE `discussion_likes_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion_likes_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_tab`
--

DROP TABLE IF EXISTS `discussion_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion_tab` (
  `discussionid` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` text NOT NULL,
  `parent` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`discussionid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_tab`
--

LOCK TABLES `discussion_tab` WRITE;
/*!40000 ALTER TABLE `discussion_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guru_tab`
--

DROP TABLE IF EXISTS `guru_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guru_tab` (
  `guruid` int(10) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(150) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`guruid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guru_tab`
--

LOCK TABLES `guru_tab` WRITE;
/*!40000 ALTER TABLE `guru_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `guru_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_tab`
--

DROP TABLE IF EXISTS `notification_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_tab` (
  `notificationid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`notificationid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_tab`
--

LOCK TABLES `notification_tab` WRITE;
/*!40000 ALTER TABLE `notification_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_assessment_tab`
--

DROP TABLE IF EXISTS `users_assessment_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_assessment_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `parentid` int(10) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 1,
  `answer` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_assessment_tab`
--

LOCK TABLES `users_assessment_tab` WRITE;
/*!40000 ALTER TABLE `users_assessment_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_assessment_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_classes_tab`
--

DROP TABLE IF EXISTS `users_classes_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_classes_tab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `score` int(10) NOT NULL DEFAULT 0,
  `finished_at` datetime NOT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT 0,
  `certificate` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_classes_tab`
--

LOCK TABLES `users_classes_tab` WRITE;
/*!40000 ALTER TABLE `users_classes_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_classes_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_material_progress_tab`
--

DROP TABLE IF EXISTS `users_material_progress_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_material_progress_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `watchingduration` int(10) NOT NULL,
  `is_done_watching` tinyint(1) NOT NULL DEFAULT 0,
  `is_downloaded` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_material_progress_tab`
--

LOCK TABLES `users_material_progress_tab` WRITE;
/*!40000 ALTER TABLE `users_material_progress_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_material_progress_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_tab`
--

DROP TABLE IF EXISTS `users_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_tab` (
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_tab`
--

LOCK TABLES `users_tab` WRITE;
/*!40000 ALTER TABLE `users_tab` DISABLE KEYS */;
INSERT INTO `users_tab` VALUES (1,'palmagratcy@gmailk.com','','','1234','65432',1,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `users_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_videos_tab`
--

DROP TABLE IF EXISTS `users_videos_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_videos_tab` (
  `videoid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `filename` varchar(300) NOT NULL,
  `status` tinyint(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`videoid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_videos_tab`
--

LOCK TABLES `users_videos_tab` WRITE;
/*!40000 ALTER TABLE `users_videos_tab` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_videos_tab` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-14 19:07:23
