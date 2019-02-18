-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Feb 09, 2019 at 03:33 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_ottleyf`
--

-- --------------------------------------------------------

--
-- Table structure for table `laptops`
--

CREATE TABLE `laptops` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `make` varchar(4) NOT NULL,
  `model` varchar(25) NOT NULL,
  `sn` varchar(25) NOT NULL UNIQUE,
  `purchase_date` date NOT NULL,
  `warranty_end_date` date,
  `cpu` varchar(25) NOT NULL,
  `ram` int(3) NOT NULL,
  KEY `Id` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `laptops`
--

INSERT INTO `laptops` (`make`, `model`, `sn`, `purchase_date`, `warranty_end_date`, `cpu`, `ram`) VALUES
('Dell', 'E6530', '3245323134', '2017-06-06', '2020-06-06', 'i5 3050', 8),
('Dell', 'E7550', 'adfkei94234', '2017-06-12', '2020-06-12', 'i7 3050', 8),
('Dell', 'E5637', '415456457ad', '2015-01-06', '2018-01-06', 'i5 1010', 4),
('Dell', 'E5530', '32jgjl4lklj', '2011-06-29', '2014-06-29', 'i3 930', 2),
('HP', 'ProBook 445', 'jleiwl3523', '2019-01-02', '2023-01-02', 'i7 9090', 16),
('HP', 'Elite X2', 'fk3983kgls84', '2018-12-25', '2023-12-25', 'Ryzen 3', 8),
('HP', 'ENVY', '8s9olwoskw', '2019-01-15', '2023-01-15', 'i7-8550u', 32);

-- --------------------------------------------------------



--
-- Table structure for table `laptop_docs`
--

CREATE TABLE `laptop_docs` (
  `Id` int(11) NOT NULL Primary Key AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `doc_link` varchar(255) NOT NULL,
  KEY `Id` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `laptop_docs`
--

INSERT INTO `laptop_docs` (`title`, `doc_link`) VALUES
('How to Reset Your Windows 10 PC', 'https://www.laptopmag.com/articles/reset-windows-10-pc'),
('Diagnostic Error Code Standardization For 2015 & 2016 Notebook and Tablet Systems', 'https://www.dell.com/support/article/us/en/04/sln300723/diagnostic-error-code-standardization-for-2015-2016-notebook-and-tablet-systems?lang=en'),
('HP Notebook PCs - Troubleshooting Error Messages on a Black Screen that may Occur During Startup or ', 'https://support.hp.com/us-en/document/c00480483'),
('HP Notebook PCs - Purchasing a Replacement Battery', 'https://support.hp.com/us-en/document/c00821572');

-- --------------------------------------------------------
--
-- Table structure for table `laptops_laptopdocs`
--

CREATE TABLE `laptops_laptopdocs` (
  `Id` int(11) NOT NULL PRIMARY Key AUTO_INCREMENT,
  `lt_id` int(11) NOT NULL,
  `doc_id` int(11) NOT NULL,
  KEY `lt_id` (`lt_id`,`doc_id`),
  KEY `doc_id` (`doc_id`),
  CONSTRAINT ltID FOREIGN KEY (`lt_id`) REFERENCES `laptops` (`Id`),
  CONSTRAINT docID FOREIGN KEY (`doc_id`) REFERENCES `laptop_docs` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `laptops_laptopdocs`
--

INSERT INTO `laptops_laptopdocs` (`lt_id`, `doc_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 3),
(5, 4),
(6, 3);

-- --------------------------------------------------------
--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `street_address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL,
  KEY `Id` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`street_address`, `city`, `state`, `zip`) VALUES
('12345 Main Street', 'Boise', 'ID', '83706'),
('9875 First Ave', 'Salt Lake City', 'UT', '85487'),
('9924 Front Street', 'Hailey', 'ID', '85687'),
('5554 Avenue A', 'Seattle', 'WA', '95874'),
('12546 Ocean Blvd', 'Santa Monica', 'CA', '91142');

-- --------------------------------------------------------



--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `job_title` varchar(75) NOT NULL,
  `pref_phone` varchar(12) NOT NULL,
  `pref_email` varchar(65) NOT NULL UNIQUE,
  `home_office` int(11) NOT NULL,
  `assigned_laptop` int(11),
  KEY `home_office` (`home_office`),
  KEY `assigned_laptop` (`assigned_laptop`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`home_office`) REFERENCES `location` (`Id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`assigned_laptop`) REFERENCES `laptops` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`first_name`, `last_name`, `department`, `job_title`, `pref_phone`, `pref_email`, `home_office`, `assigned_laptop`) VALUES
('Felicia', 'Ottley', 'IT', 'SharePoint Administrator', '208-555-1234', 'ottleyf@oregonstate.edu', 2, 5),
('Bob', 'Builder', 'Operations', 'Foreman', '555-55-1234', 'bob@letsbuildit.com', 2, 1),
('Mary', 'Contrary', 'Sales', 'Coordinator', '555-77-6666', 'mary@quite.com', 1, 2),
('Greg', 'Merlot', 'Executive', 'CEO', '999-11-1111', 'Greg@imaceo.com', 4, 3),
('Bill', 'Stone', 'Sales', 'Sales Executive', '123-45-6789', 'bill@pebkac.com', 3, 4),
('Pichu', 'Pokemon', 'Operations', 'Electrician', '978-444-4578', 'zapper@niantic.com', 4, 5);


--
--
-- Table structure for table `peripherals`
--

CREATE TABLE `peripherals` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `equip_type` varchar(10) NOT NULL,
  `make` varchar(25) NOT NULL,
  `model` varchar(25) NOT Null,
  `assigned_user` int(11),
  KEY `assigned_user` (`assigned_user`),
  CONSTRAINT `peripherals_ibfk_1` FOREIGN KEY (`assigned_user`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `peripherals`
--

INSERT INTO `peripherals` (`equip_type`, `make`, `model`, `assigned_user`) VALUES
('Mouse', 'Dell', '', 2),
('Keyboard', 'IBM', 'kb234', 2),
('Webcam', 'Microsoft', 'WC873', 2),
('Keyboard', 'logitech', 'kb234', 3),
('Monitor', 'HP', 'ND3402', 3),
('Monitor', 'HP', '16gh', 5),
('Dock', 'Plugable', 'DC-100', 1),
('Keyboard', 'Logitec', 'LKB372', 4),
('Headset', 'Plantronics', '710', 2),
('Mouse', 'HP', '', 1);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
