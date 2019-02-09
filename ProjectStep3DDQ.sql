-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Feb 08, 2019 at 07:22 PM
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
  `Id` int(11) NOT NULL,
  `make` varchar(4) NOT NULL,
  `model` varchar(25) NOT NULL,
  `sn` varchar(25) NOT NULL,
  `purchase_date` date NOT NULL,
  `warranty_end_date` date NOT NULL,
  `cpu` varchar(25) NOT NULL,
  `ram` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `laptops`
--

INSERT INTO `laptops` (`Id`, `make`, `model`, `sn`, `purchase_date`, `warranty_end_date`, `cpu`, `ram`) VALUES
(1, 'Dell', 'E6530', '3245323134', '2017-06-06', '2020-06-06', 'i5 3050', 8),
(4, 'Dell', 'E7550', 'adfkei94234', '2017-06-12', '2020-06-12', 'i7 3050', 8),
(5, 'Dell', 'E5637', '415456457ad', '2015-01-06', '2018-01-06', 'i5 1010', 4),
(6, 'Dell', 'E5530', '32jgjl4lklj', '2011-06-29', '2014-06-29', 'i3 930', 2),
(7, 'HP', 'ProBook 445', 'jleiwl3523', '2019-01-02', '2023-01-02', 'i7 9090', 16),
(8, 'HP', 'Elite X2', 'fk3983kgls84', '2018-12-25', '2023-12-25', 'Ryzen 3', 8);

-- --------------------------------------------------------

--
-- Table structure for table `laptops_laptopdocs`
--

CREATE TABLE `laptops_laptopdocs` (
  `Id` int(11) NOT NULL,
  `lt_id` int(11) NOT NULL,
  `doc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `laptops_laptopdocs`
--

INSERT INTO `laptops_laptopdocs` (`Id`, `lt_id`, `doc_id`) VALUES
(2, 1, 1),
(1, 1, 2),
(10, 4, 1),
(9, 4, 2),
(12, 5, 1),
(11, 5, 2),
(14, 6, 1),
(13, 6, 2),
(15, 7, 3),
(16, 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `laptop_docs`
--

CREATE TABLE `laptop_docs` (
  `Id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `doc_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `laptop_docs`
--

INSERT INTO `laptop_docs` (`Id`, `title`, `doc_link`) VALUES
(1, 'How to Reset Your Windows 10 PC', 'https://www.laptopmag.com/articles/reset-windows-10-pc'),
(2, 'Diagnostic Error Code Standardization For 2015 & 2016 Notebook and Tablet Systems', 'https://www.dell.com/support/article/us/en/04/sln300723/diagnostic-error-code-standardization-for-2015-2016-notebook-and-tablet-systems?lang=en'),
(3, 'HP Notebook PCs - Troubleshooting Error Messages on a Black Screen that may Occur During Startup or ', 'https://support.hp.com/us-en/document/c00480483');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `Id` int(11) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`Id`, `street_address`, `city`, `state`, `zip`) VALUES
(1, '12345 Main Street', 'Boise', 'ID', '83706'),
(2, '9875 First Ave', 'Salt Lake City', 'UT', '85487'),
(3, '9924 Front Street', 'Hailey', 'ID', '85687'),
(4, '5554 Avenue A', 'Seattle', 'WA', '95874');

-- --------------------------------------------------------

--
-- Table structure for table `peripherals`
--

CREATE TABLE `peripherals` (
  `Id` int(11) NOT NULL,
  `equip_type` varchar(10) NOT NULL,
  `make` varchar(25) NOT NULL,
  `model` varchar(25) NOT NULL,
  `assigned_user` int(11) NOT NULL,
  `asset_tag` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `peripherals`
--

INSERT INTO `peripherals` (`Id`, `equip_type`, `make`, `model`, `assigned_user`, `asset_tag`) VALUES
(2, 'Mouse', 'Dell', '', 13, 101),
(3, 'Keyboard', '103', 'kb234', 13, 0),
(6, 'Webcam', 'Microsoft', 'WC873', 13, 104),
(7, 'Keyboard', '103', 'kb234', 13, 103),
(8, 'Monitor', 'HP', 'ND3402', 13, 106),
(9, 'Monitor', 'HP', '16gh', 13, 109),
(10, 'Dock', 'Plugable', 'DC-100', 13, 120),
(11, 'Keyboard', 'Logitec', 'LKB372', 7, 119);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `job_title` varchar(75) NOT NULL,
  `pref_phone` varchar(12) NOT NULL,
  `pref_email` varchar(65) NOT NULL,
  `home_office` int(11) NOT NULL,
  `assigned_laptop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `first_name`, `last_name`, `department`, `job_title`, `pref_phone`, `pref_email`, `home_office`, `assigned_laptop`) VALUES
(7, 'Felicia', 'Ottley', 'IT', 'SharePoint Administrator', '208-555-1234', 'ottleyf@oregonstate.edu', 2, 5),
(10, 'Bob', 'Builder', 'Operations', 'Foreman', '555-55-1234', 'bob@letsbuildit.com', 2, 1),
(11, 'Mary', 'Contrary', 'Sales', 'Coordinator', '555-77-6666', 'mary@quite.com', 1, 4),
(12, 'Greg', 'Merlot', 'Executive', 'CEO', '999-11-1111', 'Greg@imaceo.com', 4, 6),
(13, 'Bill', 'Stone', 'Sales', 'Sales Executive', '123-45-6789', 'bill@pebkac.com', 3, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `laptops`
--
ALTER TABLE `laptops`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `sn` (`sn`),
  ADD KEY `Id` (`Id`);

--
-- Indexes for table `laptops_laptopdocs`
--
ALTER TABLE `laptops_laptopdocs`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `lt_id` (`lt_id`,`doc_id`),
  ADD KEY `doc_id` (`doc_id`);

--
-- Indexes for table `laptop_docs`
--
ALTER TABLE `laptop_docs`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id` (`Id`);

--
-- Indexes for table `peripherals`
--
ALTER TABLE `peripherals`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `asset_tag` (`asset_tag`),
  ADD KEY `assigned_user` (`assigned_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `pref_email` (`pref_email`),
  ADD KEY `home_office` (`home_office`),
  ADD KEY `assigned_laptop` (`assigned_laptop`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `laptops`
--
ALTER TABLE `laptops`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `laptops_laptopdocs`
--
ALTER TABLE `laptops_laptopdocs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `laptop_docs`
--
ALTER TABLE `laptop_docs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `peripherals`
--
ALTER TABLE `peripherals`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laptops_laptopdocs`
--
ALTER TABLE `laptops_laptopdocs`
  ADD CONSTRAINT `laptops_laptopdocs_ibfk_1` FOREIGN KEY (`lt_id`) REFERENCES `laptops` (`Id`),
  ADD CONSTRAINT `laptops_laptopdocs_ibfk_2` FOREIGN KEY (`doc_id`) REFERENCES `laptop_docs` (`Id`);

--
-- Constraints for table `peripherals`
--
ALTER TABLE `peripherals`
  ADD CONSTRAINT `peripherals_ibfk_1` FOREIGN KEY (`assigned_user`) REFERENCES `users` (`Id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`home_office`) REFERENCES `location` (`Id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`assigned_laptop`) REFERENCES `laptops` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
