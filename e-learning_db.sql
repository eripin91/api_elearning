-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 18 Jan 2019 pada 16.43
-- Versi Server: 5.7.24-0ubuntu0.18.04.1
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
-- Struktur dari tabel `assessment_tab`
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
-- Struktur dari tabel `classes_tab`
--

CREATE TABLE `classes_tab` (
  `classid` int(11) NOT NULL,
  `guruid` int(10) NOT NULL DEFAULT '0',
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `cover` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `classes_tab`
--

INSERT INTO `classes_tab` (`classid`, `guruid`, `name`, `description`, `cover`, `status`, `priority`, `created_at`, `updated_at`) VALUES
(1, 1, 'Belajar Memahami Kamu', 'Untuk orang yang jomblo abadi', 'https://i.pinimg.com/236x/2c/04/99/2c0499d83c2fc09957adc5100d08df1e--kata-kata-lucu-gambar.jpg', 0, 5, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 'Express in an hour', 'Cara Express buat jago Express', 'https://cdn.lynda.com/course/612195/612195-636458390742664213-16x9.jpg', 0, 10, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 4, 'Menjadi Capres Idola', 'Bagaimana menjadi presiden yang dipilih oleh internet', 'http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg', 0, 2, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 4, 'Menjadi Capres Idola Jilid 2', 'Bagaimana menjadi presiden yang dipilih oleh internet', 'http://cdn2.tstatic.net/kaltim/foto/bank/images/kompas-tv-nurhadi-aldo-rosi.jpg', 0, 5, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(5, 3, 'Menyanyi Tanpa Suara Bagus', 'Yang Penting Mukaku Cantik', 'https://awsimages.detik.net.id/community/media/visual/2018/05/02/cbecadbe-4946-49ea-932d-a6f2c0fc692a_43.jpeg?w=780&q=90', 0, 4, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(6, 3, 'Menyanyi Tanpa Suara Bagus Jili 2', 'Ya ga mungkinlah suara jelek jadi penyanyi', 'https://3.bp.blogspot.com/-_SEglsqFXEQ/VzlJ4I2-O6I/AAAAAAAAA9E/XSfXHh-iUjA45SFEySq5F4sk5P0c91zUwCLcB/s640/nyanyikamarmandi2.jpg', 0, 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 2, 'Ternak lele sampai ke mars', 'Bersama Elon Musk ingin ke mars untuk membuat kolam lele', 'https://1.bp.blogspot.com/-5Kmw6DbdES4/Wg_gbErmEiI/AAAAAAAAJhA/UrKCS0aXu8IKc6Ge1ppsOEIDyLRR7rJ6gCLcBGAs/s1600/Umpan%2Bikan%2Blele.jpg', 0, 8, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `courses_detail_tab`
--

CREATE TABLE `courses_detail_tab` (
  `detailid` int(11) NOT NULL,
  `courseid` int(10) NOT NULL,
  `assessmentid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `courses_detail_tab`
--

INSERT INTO `courses_detail_tab` (`detailid`, `courseid`,`assessmentid` `name`, `status`, `created_at`, `updated_at`) VALUES
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
-- Struktur dari tabel `courses_material_tab`
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
-- Dumping data untuk tabel `courses_material_tab`
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
-- Struktur dari tabel `courses_tab`
--

CREATE TABLE `courses_tab` (
  `courseid` int(10) NOT NULL AUTO_INCREMENT,
  `classid` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `courses_tab`
--

INSERT INTO `courses_tab` (`courseid`, `classid`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Express in an hour', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 3, 'React Native Crash Course', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 4, 'Fullstack Laravel and React Native', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');


-- --------------------------------------------------------

--
-- Struktur dari tabel `discussion_likes_tab`
--

CREATE TABLE `discussion_likes_tab` (
  `id` int(10) NOT NULL,
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `discussion_tab`
--

CREATE TABLE `discussion_tab` (
  `discussionid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` text NOT NULL,
  `parent` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `guru_tab`
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
-- Dumping data untuk tabel `guru_tab`
--

INSERT INTO `guru_tab` (`guruid`, `fullname`, `profile_picture`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Arham Awal', '', 'Guru tampan', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 'Ageng Kurnia', 'https://media.suara.com/pictures/653x366/2017/05/30/75225-ageng-kiwi.jpg', 'Guru Mantap Jiwa', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 'Andira Kuswono', 'https://i1.sndcdn.com/artworks-000159652494-l3qfj7-t500x500.jpg', 'Guru Idola', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(4, 'Nurhadi Aldo', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', 'Guru Panutan', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notification_tab`
--

CREATE TABLE `notification_tab` (
  `notificationid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_assessment_tab`
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
-- Struktur dari tabel `users_classes_tab`
--

CREATE TABLE `users_classes_tab` (
  `id` int(11) NOT NULL,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL,
  `score` int(10) NOT NULL DEFAULT '0',
  `finished_at` datetime NOT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT '0',
  `certificate` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users_classes_tab`
--

INSERT INTO `users_classes_tab` (`id`, `userid`, `classid`, `score`, `finished_at`, `is_done`, `certificate`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, '2019-01-02 00:00:00', 0, 'Selamat', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(2, 1, 3, 0, '2019-01-02 00:00:00', 0, 'Selamat', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 2, 5, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(4, 3, 4, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(5, 3, 6, 0, '2019-01-02 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-17 00:00:00'),
(6, 2, 2, 0, '2019-01-31 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(7, 3, 2, 0, '2019-01-31 00:00:00', 1, 'Selamat', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_material_progress_tab`
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
-- Struktur dari tabel `users_tab`
--

CREATE TABLE `users_tab` (
  `userid` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `profile_picture` varchar(300) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users_tab`
--

INSERT INTO `users_tab` (`userid`, `email`, `phone`, `profile_picture`, `password`, `salt`, `status`, `created_at`, `updated_at`) VALUES
(1, 'palmagratcy@gmailk.com', '', '', '1234', '65432', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'tampnbgt@gmail.com', '', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '123456', '124568', 1, '2019-01-31 00:00:00', '2019-01-31 00:00:00'),
(3, 'nurhadi@aldo.com', '', 'https://ichef.bbci.co.uk/news/1024/branded_indonesia/DDF9/production/_105052865_nurhadi_aldo.png', '1234256', '1243568', 0, '2019-01-31 00:00:00', '2019-01-31 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_videos_tab`
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
-- Indexes for table `users_material_progress_tab`
--
ALTER TABLE `users_material_progress_tab`
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
  MODIFY `detailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `courses_material_tab`
--
ALTER TABLE `courses_material_tab`
  MODIFY `materialid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `courses_tab`
--
ALTER TABLE `courses_tab`
  MODIFY `courseid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `discussion_likes_tab`
--
ALTER TABLE `discussion_likes_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `discussion_tab`
--
ALTER TABLE `discussion_tab`
  MODIFY `discussionid` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `guru_tab`
--
ALTER TABLE `guru_tab`
  MODIFY `guruid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users_assessment_tab`
--
ALTER TABLE `users_assessment_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users_classes_tab`
--
ALTER TABLE `users_classes_tab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users_material_progress_tab`
--
ALTER TABLE `users_material_progress_tab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users_tab`
--
ALTER TABLE `users_tab`
  MODIFY `userid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
