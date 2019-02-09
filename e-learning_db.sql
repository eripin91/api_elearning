-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 09, 2019 at 10:11 PM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-learning_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessment_tab`
--

CREATE TABLE `assessment_tab` (
  `assessmentid` int(10) NOT NULL,
  `parentid` int(10) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `duration` int(10) NOT NULL,
  `question_type` tinyint(1) NOT NULL DEFAULT '1',
  `question` varchar(350) NOT NULL,
  `options` text NOT NULL,
  `answer` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `classes_tab`
--

CREATE TABLE `classes_tab` (
  `classid` int(11) NOT NULL,
  `guruid` int(10) NOT NULL DEFAULT '0',
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `cover` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL,
  `rating` double(10,1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes_tab`
--

INSERT INTO `classes_tab` (`classid`, `guruid`, `name`, `description`, `cover`, `status`, `priority`, `rating`, `created_at`, `updated_at`) VALUES
(1, 1, 'Belajar Memahami Kamu', 'Untuk orang yang jomblo abadi', 'https://i.pinimg.com/236x/2c/04/99/2c0499d83c2fc09957adc5100d08df1e--kata-kata-lucu-gambar.jpg', 0, 5, 0.0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 'Express in an hour', 'Cara Express buat jago Express JS', 'https://cdn.lynda.com/course/612195/612195-636458390742664213-16x9.jpg', 1, 10, 4.6, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 4, 'Menjadi Capres Idola', 'Bagaimana menjadi presiden yang dipilih oleh internet', 'http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg', 1, 2, 0.0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 4, 'Menjadi Capres Idola Jilid 2', 'Bagaimana menjadi presiden yang dipilih oleh internet', 'http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg', 1, 5, 0.0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 3, 'Menyanyi Tanpa Suara Bagus', 'Yang Penting Mukaku Cantik', 'https://awsimages.detik.net.id/community/media/visual/2018/05/02/cbecadbe-4946-49ea-932d-a6f2c0fc692a_43.jpeg?w=780&q=90', 1, 4, 0.0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(6, 3, 'Menyanyi Tanpa Suara Bagus Jili 2', 'Ya ga mungkinlah suara jelek jadi penyanyi', 'https://3.bp.blogspot.com/-_SEglsqFXEQ/VzlJ4I2-O6I/AAAAAAAAA9E/XSfXHh-iUjA45SFEySq5F4sk5P0c91zUwCLcB/s640/nyanyikamarmandi2.jpg', 1, 1, 0.0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 2, 'Ternak lele sampai ke mars', 'Bersama Elon Musk ingin ke mars untuk membuat kolam lele', 'https://1.bp.blogspot.com/-5Kmw6DbdES4/Wg_gbErmEiI/AAAAAAAAJhA/UrKCS0aXu8IKc6Ge1ppsOEIDyLRR7rJ6gCLcBGAs/s1600/Umpan%2Bikan%2Blele.jpg', 1, 8, 0.0, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses_detail_tab`
--

CREATE TABLE `courses_detail_tab` (
  `detailid` int(11) NOT NULL,
  `courseid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_detail_tab`
--

INSERT INTO `courses_detail_tab` (`detailid`, `courseid`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'BAB 1', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 'BAB 2', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 1, 'BAB 3', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 1, 'BAB 4', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 1, 'BAB 5', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(6, 1, 'BAB 6', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 1, 'BAB 7', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(8, 1, 'BAB 8', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(9, 1, 'BAB 9', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses_material_tab`
--

CREATE TABLE `courses_material_tab` (
  `materialid` int(10) NOT NULL,
  `detailid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(350) NOT NULL,
  `video_url` varchar(300) NOT NULL,
  `thumbnails` text NOT NULL,
  `size` int(10) NOT NULL DEFAULT '0',
  `duration` int(10) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_material_tab`
--

INSERT INTO `courses_material_tab` (`materialid`, `detailid`, `name`, `description`, `video_url`, `thumbnails`, `size`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 1, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 90, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 1, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 2, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(6, 2, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 2, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(8, 2, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(9, 2, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(10, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(11, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(12, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(13, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(14, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(15, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(16, 3, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(17, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(18, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(19, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(20, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(21, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(22, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(23, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(24, 4, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(25, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(26, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(27, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(28, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(29, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(30, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(31, 5, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(32, 6, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(33, 6, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(34, 6, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(35, 6, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(36, 6, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(37, 6, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(38, 7, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(39, 7, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(40, 7, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(41, 7, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(42, 7, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(43, 7, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(44, 8, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(45, 8, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(46, 8, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(47, 8, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(48, 9, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(49, 9, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(50, 9, 'Video Materi', 'Materinya Susah Banget Bro', 'https://www.youtube.com/watch?v=1XW1Ygatsz4', 'https://i.pinimg.com/236x/1d/ed/37/1ded37e086c186c881cf96002e3afb03--spider-man-fandoms.jpg', 0, 115, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses_tab`
--

CREATE TABLE `courses_tab` (
  `courseid` int(10) NOT NULL,
  `classid` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses_tab`
--

INSERT INTO `courses_tab` (`courseid`, `classid`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Express in an hour', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 3, 'React Native Crash Course', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 4, 'Fullstack Laravel and React Native', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_likes_tab`
--

CREATE TABLE `discussion_likes_tab` (
  `id` int(10) NOT NULL,
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `discussion_likes_tab`
--

INSERT INTO `discussion_likes_tab` (`id`, `discussionid`, `userid`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 3, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 6, 2, 1, '2019-01-31 00:00:00', '2019-01-23 13:23:00'),
(3, 8, 1, 1, '2019-01-23 12:43:35', '2019-01-23 12:43:35'),
(4, 6, 4, 1, '2019-01-24 12:43:15', '2019-01-24 12:43:15'),
(5, 17, 1, 1, '2019-01-24 13:20:20', '2019-01-24 13:20:20'),
(6, 8, 2, 1, '2019-02-04 16:26:07', '2019-02-04 16:26:07'),
(7, 16, 2, 0, '2019-02-06 13:16:26', '2019-02-06 13:36:11'),
(8, 17, 2, 1, '2019-02-06 13:24:47', '2019-02-06 13:25:07'),
(9, 11, 2, 1, '2019-02-06 13:29:18', '2019-02-08 22:03:39'),
(10, 11, 3, 1, '2019-02-08 22:19:38', '2019-02-08 22:32:41');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_tab`
--

CREATE TABLE `discussion_tab` (
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `courseid` int(11) DEFAULT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` text NOT NULL,
  `parent` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `discussion_tab`
--

INSERT INTO `discussion_tab` (`discussionid`, `userid`, `courseid`, `post_title`, `post_content`, `parent`, `status`, `created_at`, `updated_at`) VALUES
(6, 1, 2, '', 'Ini gimana nih ?', 0, 1, '2019-01-22 12:42:43', '2019-01-22 12:42:43'),
(7, 2, 2, '', 'Biar kaya gini gimana nih caranya gan ?', 0, 1, '2019-01-22 13:11:43', '2019-01-22 13:11:43'),
(8, 1, 2, '', 'Jadi jawabannya gini bro', 6, 1, '2019-01-22 14:11:43', '2019-01-22 14:11:43'),
(9, 3, 2, '', 'Jadi jawabannya gitu bro, ngerti kgk', 6, 1, '2019-01-22 14:13:25', '2019-01-22 14:13:25'),
(10, 3, 2, '', 'Jadi jawabannya gitu bro, ngerti kgk', 7, 1, '2019-01-22 14:26:55', '2019-01-22 14:26:55'),
(11, 1, 2, '', 'Jadi saya bingungnya gini gan', 0, 1, '2019-01-23 10:48:58', '2019-01-23 10:48:58'),
(12, 2, 2, '', 'Jadi jawabannya ada banyak bro, mw yang mana ?', 11, 1, '2019-01-23 10:53:21', '2019-01-23 10:53:21'),
(13, 4, 2, '', 'Ini yang bener gimana gan ?', 0, 1, '2019-01-24 12:43:58', '2019-01-24 12:43:58'),
(14, 2, 2, '', 'Jadi salahnya disini gan ', 13, 1, '2019-01-24 12:44:28', '2019-01-24 12:44:28'),
(15, 2, 2, '', 'bangsat lu', 6, 1, '2019-01-24 13:16:10', '2019-01-24 13:16:10'),
(16, 4, 2, '', 'Cara Buat Game gimana ya?', 0, 1, '2019-01-24 13:18:28', '2019-01-24 13:18:28'),
(17, 1, 2, '', 'Cara Buat Game gimana ya?', 0, 1, '2019-01-24 13:18:38', '2019-01-24 13:18:38'),
(18, 2, 2, '', 'Game Apaan Gan?', 17, 1, '2019-01-24 13:19:29', '2019-01-24 13:19:29'),
(19, 2, 2, '', 'Game Ganteng', 17, 1, '2019-01-24 13:48:46', '2019-01-24 13:48:46'),
(20, 4, 3, '', ' Saya bingung nih gan, jadi gini.....', 0, 1, '2019-01-31 14:38:12', '2019-01-31 14:38:12'),
(21, 4, 3, '', ' Saya bingung nih gan, jadi gini..... #2', 0, 1, '2019-01-31 14:39:08', '2019-01-31 14:39:08'),
(22, 4, 3, '', ' Saya bingung nih gan, jadi gini..... #3', 0, 1, '2019-01-31 14:39:20', '2019-01-31 14:39:20'),
(23, 4, 3, '', ' Saya bingung nih gan, jadi gini..... #4', 0, 1, '2019-01-31 14:43:34', '2019-01-31 14:43:34'),
(24, 4, 3, '', ' Saya bingung nih gan, jadi gini..... #5', 0, 1, '2019-01-31 14:43:51', '2019-01-31 14:43:51'),
(25, 4, 3, '', ' Saya bingung nih gan, jadi gini..... #5', 0, 1, '2019-01-31 14:44:01', '2019-01-31 14:44:01'),
(26, 2, 2, '', 'Jadi salahnya disini gan ', 6, 1, '2019-02-06 11:16:14', '2019-02-06 11:16:14'),
(32, 2, 2, '', 'Coba gini gan , bisa ga dipakenya ?', 6, 1, '2019-02-06 11:48:02', '2019-02-06 11:48:02'),
(33, 2, 2, '', 'Coba gini gan , bisa ga dipakenya ?', 6, 1, '2019-02-06 11:49:12', '2019-02-06 11:49:12'),
(34, 2, 2, '', 'Coba gini gan , bisa ga dipakenya ?', 6, 1, '2019-02-06 21:19:46', '2019-02-06 21:19:46'),
(35, 2, 2, '', 'Coba gini gan , bisa ga dipakenya diginiin lo ...', 6, 1, '2019-02-07 11:48:39', '2019-02-07 11:48:39'),
(36, 3, 2, '', 'gini loh ahh masa gitu aja gak bisa', 6, 1, '2019-02-07 11:50:32', '2019-02-07 11:50:32'),
(37, 3, 2, '', 'gini loh ahh masa gitu aja gak bisa', 6, 1, '2019-02-08 16:19:43', '2019-02-08 16:19:43'),
(38, 3, 2, '', 'Gini mah masi gampang gan', 6, 1, '2019-02-08 16:22:10', '2019-02-08 16:22:10'),
(39, 2, 2, '', 'Gini mah masi gampang gan #2', 6, 1, '2019-02-08 16:22:19', '2019-02-08 16:22:19');

-- --------------------------------------------------------

--
-- Table structure for table `guru_tab`
--

CREATE TABLE `guru_tab` (
  `guruid` int(10) NOT NULL,
  `fullname` varchar(150) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guru_tab`
--

INSERT INTO `guru_tab` (`guruid`, `fullname`, `profile_picture`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Arham Awal', 'https://avatars2.githubusercontent.com/u/18678301?s=460&v=4', 'Guru tampan', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 'Ageng Kurnia', 'https://media.suara.com/pictures/653x366/2017/05/30/75225-ageng-kiwi.jpg', 'Guru Mantap Jiwa', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 'Andira Kuswono', 'https://i1.sndcdn.com/artworks-000159652494-l3qfj7-t500x500.jpg', 'Guru Idola', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 'Nurhadi Aldo', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', 'Guru Panutan', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `notification_tab`
--

CREATE TABLE `notification_tab` (
  `notificationid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_tab`
--

INSERT INTO `notification_tab` (`notificationid`, `userid`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-01 23:12:31', '2019-02-01 23:12:31'),
(2, 5, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-04 11:07:10', '2019-02-04 11:07:10'),
(3, 6, 'Selamat Anda Telah Bergabung di Kelas Express in an hour', 1, '2019-02-04 11:27:43', '2019-02-04 11:27:43'),
(4, 5, 'Selamat Anda Telah Bergabung di Kelas Menjadi Capres Idola Jilid 2', 1, '2019-02-04 11:29:01', '2019-02-04 11:29:01'),
(11, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Andra Nur\"', 1, '2019-02-06 11:49:12', '2019-02-06 11:49:12'),
(12, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Andra Nur\"', 1, '2019-02-06 21:19:46', '2019-02-06 21:19:46'),
(13, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Andra Nur\"', 1, '2019-02-07 11:48:39', '2019-02-07 11:48:39'),
(14, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Nurhadi\"', 1, '2019-02-07 11:50:32', '2019-02-07 11:50:32'),
(15, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Nurhadi\"', 1, '2019-02-08 16:19:43', '2019-02-08 16:19:43'),
(16, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Nurhadi\"', 1, '2019-02-08 16:22:10', '2019-02-08 16:22:10'),
(17, 1, 'Pertanyaan anda \"Ini gimana nih ?\" Telah Dibalas Oleh \"Andra Nur\"', 1, '2019-02-08 16:22:19', '2019-02-08 16:22:19');

-- --------------------------------------------------------

--
-- Table structure for table `users_assessment_tab`
--

CREATE TABLE `users_assessment_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `parentid` int(10) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `answer` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_classes_tab`
--

CREATE TABLE `users_classes_tab` (
  `id` int(11) NOT NULL,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `score` int(10) NOT NULL DEFAULT '0',
  `finished_at` datetime DEFAULT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT '0',
  `certificate` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_classes_tab`
--

INSERT INTO `users_classes_tab` (`id`, `userid`, `classid`, `score`, `finished_at`, `is_done`, `certificate`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, '2019-01-02 00:00:00', 0, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 3, 0, '2019-01-02 00:00:00', 0, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 2, 5, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(4, 3, 4, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(5, 3, 6, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(6, 2, 2, 0, '2019-01-31 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 3, 2, 0, '2019-01-31 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(8, 1, 4, 0, NULL, 0, '', 1, '2019-02-01 23:05:21', '2019-02-01 23:05:21'),
(9, 1, 4, 0, NULL, 0, '', 1, '2019-02-01 23:12:31', '2019-02-01 23:12:31'),
(10, 5, 4, 0, NULL, 0, '', 1, '2019-02-04 11:07:10', '2019-02-04 11:07:10'),
(11, 6, 2, 0, NULL, 0, '', 1, '2019-02-04 11:27:43', '2019-02-04 11:27:43'),
(12, 5, 4, 0, NULL, 0, '', 1, '2019-02-04 11:29:01', '2019-02-04 11:29:01');

-- --------------------------------------------------------

--
-- Table structure for table `users_course_detail_tab`
--

CREATE TABLE `users_course_detail_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `detailid` int(10) NOT NULL,
  `is_completed` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_course_detail_tab`
--

INSERT INTO `users_course_detail_tab` (`id`, `userid`, `detailid`, `is_completed`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 2, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 1, 3, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 2, 3, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_material_progress_tab`
--

CREATE TABLE `users_material_progress_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `watchingduration` int(10) NOT NULL,
  `is_done_watching` tinyint(1) NOT NULL DEFAULT '0',
  `is_downloaded` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_rating_tab`
--

CREATE TABLE `users_rating_tab` (
  `id` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_rating_tab`
--

INSERT INTO `users_rating_tab` (`id`, `userid`, `classid`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(29, 1, 2, 5, 1, '2019-02-01 10:14:20', '2019-02-01 10:14:20'),
(31, 2, 2, 3, 1, '2019-02-01 10:16:15', '2019-02-01 10:16:15'),
(32, 2, 2, 5, 1, '2019-02-01 10:17:18', '2019-02-01 10:17:18'),
(33, 2, 2, 5, 1, '2019-02-01 10:19:08', '2019-02-01 10:19:08'),
(34, 2, 2, 5, 1, '2019-02-01 10:19:44', '2019-02-01 10:19:44'),
(35, 2, 2, 4, 1, '2019-02-01 10:23:20', '2019-02-01 10:23:20'),
(36, 2, 2, 4, 1, '2019-02-01 10:35:16', '2019-02-01 10:35:16'),
(37, 2, 2, 4, 1, '2019-02-01 10:35:55', '2019-02-01 10:35:55'),
(38, 2, 2, 5, 1, '2019-02-01 10:36:07', '2019-02-01 10:36:07'),
(39, 2, 2, 5, 1, '2019-02-01 10:36:57', '2019-02-01 10:36:57'),
(40, 2, 2, 5, 1, '2019-02-01 10:38:33', '2019-02-01 10:38:33'),
(41, 2, 2, 5, 1, '2019-02-01 10:39:26', '2019-02-01 10:39:26'),
(42, 2, 2, 5, 1, '2019-02-01 10:39:53', '2019-02-01 10:39:53'),
(43, 2, 2, 5, 1, '2019-02-01 10:41:02', '2019-02-01 10:41:02');

-- --------------------------------------------------------

--
-- Table structure for table `users_tab`
--

CREATE TABLE `users_tab` (
  `userid` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_tab`
--

INSERT INTO `users_tab` (`userid`, `email`, `fullname`, `phone`, `profile_picture`, `password`, `salt`, `status`, `created_at`, `updated_at`) VALUES
(1, 'andinog@gmail.com', 'Andi Nurcahya', '', '', '1234', '65432', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'tampnbgt@gmail.com', 'Andra Nur', '', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '123456', '124568', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 'nurhadi@aldo.com', 'Nurhadi', '', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '1234256', '1243568', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_videos_tab`
--

CREATE TABLE `users_videos_tab` (
  `videoid` int(10) NOT NULL,
  `materialid` int(10) NOT NULL,
  `filename` varchar(300) NOT NULL,
  `status` tinyint(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessment_tab`
--
ALTER TABLE `assessment_tab`
  ADD PRIMARY KEY (`assessmentid`);

--
-- Indexes for table `classes_tab`
--
ALTER TABLE `classes_tab`
  ADD PRIMARY KEY (`classid`);

--
-- Indexes for table `courses_detail_tab`
--
ALTER TABLE `courses_detail_tab`
  ADD PRIMARY KEY (`detailid`);

--
-- Indexes for table `courses_material_tab`
--
ALTER TABLE `courses_material_tab`
  ADD PRIMARY KEY (`materialid`);

--
-- Indexes for table `courses_tab`
--
ALTER TABLE `courses_tab`
  ADD PRIMARY KEY (`courseid`);

--
-- Indexes for table `discussion_likes_tab`
--
ALTER TABLE `discussion_likes_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discussion_tab`
--
ALTER TABLE `discussion_tab`
  ADD PRIMARY KEY (`discussionid`);

--
-- Indexes for table `guru_tab`
--
ALTER TABLE `guru_tab`
  ADD PRIMARY KEY (`guruid`);

--
-- Indexes for table `notification_tab`
--
ALTER TABLE `notification_tab`
  ADD PRIMARY KEY (`notificationid`);

--
-- Indexes for table `users_assessment_tab`
--
ALTER TABLE `users_assessment_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_classes_tab`
--
ALTER TABLE `users_classes_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_course_detail_tab`
--
ALTER TABLE `users_course_detail_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_material_progress_tab`
--
ALTER TABLE `users_material_progress_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_rating_tab`
--
ALTER TABLE `users_rating_tab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_tab`
--
ALTER TABLE `users_tab`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `users_videos_tab`
--
ALTER TABLE `users_videos_tab`
  ADD PRIMARY KEY (`videoid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessment_tab`
--
ALTER TABLE `assessment_tab`
  MODIFY `assessmentid` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `classes_tab`
--
ALTER TABLE `classes_tab`
  MODIFY `classid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `courses_detail_tab`
--
ALTER TABLE `courses_detail_tab`
  MODIFY `detailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `courses_material_tab`
--
ALTER TABLE `courses_material_tab`
  MODIFY `materialid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `courses_tab`
--
ALTER TABLE `courses_tab`
  MODIFY `courseid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `discussion_likes_tab`
--
ALTER TABLE `discussion_likes_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `discussion_tab`
--
ALTER TABLE `discussion_tab`
  MODIFY `discussionid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `guru_tab`
--
ALTER TABLE `guru_tab`
  MODIFY `guruid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `notification_tab`
--
ALTER TABLE `notification_tab`
  MODIFY `notificationid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `users_assessment_tab`
--
ALTER TABLE `users_assessment_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users_classes_tab`
--
ALTER TABLE `users_classes_tab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `users_course_detail_tab`
--
ALTER TABLE `users_course_detail_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users_material_progress_tab`
--
ALTER TABLE `users_material_progress_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users_rating_tab`
--
ALTER TABLE `users_rating_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `users_tab`
--
ALTER TABLE `users_tab`
  MODIFY `userid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
