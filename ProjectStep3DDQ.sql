-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Feb 08, 2019 at 03:25 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `laptops_laptopdocs`
--

CREATE TABLE `laptops_laptopdocs` (
  `Id` int(11) NOT NULL,
  `lt_id` int(11) NOT NULL,
  `doc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `laptop_docs`
--

CREATE TABLE `laptop_docs` (
  `Id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `doc_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `pref_phone` int(10) NOT NULL,
  `pref_email` varchar(65) NOT NULL,
  `home_office` int(11) NOT NULL,
  `assigned_laptop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laptops_laptopdocs`
--
ALTER TABLE `laptops_laptopdocs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laptop_docs`
--
ALTER TABLE `laptop_docs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `peripherals`
--
ALTER TABLE `peripherals`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`home_office`) REFERENCES `location` (`Id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`assigned_laptop`) REFERENCES `laptops` (`Id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`Id`) REFERENCES `peripherals` (`assigned_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
