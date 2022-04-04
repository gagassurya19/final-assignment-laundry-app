-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 04, 2022 at 01:23 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `laundry-new`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_customer`
--

CREATE TABLE `address_customer` (
  `id_address_customer` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `address_name` varchar(255) NOT NULL,
  `address_detail` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL COMMENT 'optional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address_customer`
--

INSERT INTO `address_customer` (`id_address_customer`, `id_customer`, `address_name`, `address_detail`, `telephone`, `notes`) VALUES
(29, 57, 'customer 2', 'Jl. Danau Ranau 2', '085123123123', 'alamat utama 1'),
(30, 58, 'qweqwe', 'qweqwe', '12312312', 'qweqweqwe'),
(32, 57, 'qwe', 'qwe', '123', 'qwe');

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `id_administrator` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profile` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL COMMENT 'admin,kasir,owner',
  `register_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `status` tinyint(1) NOT NULL COMMENT 'active(1) or suspend(0)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`id_administrator`, `first_name`, `last_name`, `username`, `email`, `telephone`, `password`, `photo_profile`, `role`, `register_date`, `status`) VALUES
(2, 'admin', 'admin', 'admin', 'admin@admin.admin', '123123123', '70fcc4598789bb15452060be975e63677e63a979b3d3b107bbb32b3eb0506a88', 'image-1649033538041.jpeg', 'admin', '2022-03-23 04:49:39', 1),
(3, 'kasir', 'kasir', 'kasir', 'kasir@kasir.kasir', '123', '4055d964d0070f63fa2233889b789e19b01132d22049d17a11ac9874e81cbefd', 'image-1649029059983.jpeg', 'kasir', '2022-03-26 02:16:21', 0),
(4, 'owner', 'owner', 'owner', 'owner@owner.owner', '123123', '756c9f2328f262b572ae999a2d432cb931a5a1c5ad4811490fa900427a3ef502', 'image-1649037805591.jpeg', 'owner', '2022-03-26 02:20:17', 1),
(20, 'new', 'admin', 'newadmin', 'newadmin@admin', '123123', '26196a736e7704dc57b294c24652708a5543cb21b6b25627dd978bb71c7a82e1', 'image-1649037369169.jpg', 'kasir', '2022-04-04 01:56:09', 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profile` varchar(255) DEFAULT NULL COMMENT 'optional',
  `register_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'active(1) or suspend(0)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id_customer`, `first_name`, `last_name`, `telephone`, `email`, `password`, `photo_profile`, `register_date`, `status`) VALUES
(57, 'customer', '1', '123', 'customer1@customer1.com', 'fc88e75b867ca525141c7ff9813e1dab601714fa0561ca1a2ad0cb96653bf138', 'image-1648960722851.jpeg', '2022-04-01 04:23:54', 1),
(58, 'Gagas Surya', 'Laksana', '123321', 'customer2@customer.com', 'cdf386536149ae58654a8390cfb4f495a6c08b3495326b5d1b3477a155a56675', 'image-1649061042521.jpg', '2022-04-02 14:46:11', 1),
(62, 'qwe', 'qwe', '123123', 'qweQWE', '0d74501555f77469958e062cd74c410dfd9404b3f2effb540d271d01b419fb72', NULL, '2022-04-04 09:23:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE `outlet` (
  `id_outlet` int(11) NOT NULL,
  `id_administrator` int(11) NOT NULL,
  `outlet_name` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL COMMENT 'optional',
  `status` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`id_outlet`, `id_administrator`, `outlet_name`, `telephone`, `address`, `notes`, `status`) VALUES
(5, 2, 'Outlet Sawojajar', '08123142412314', 'Jl. Danau Ranau E5G26', 'Outlet utama', 1),
(7, 4, 'Outlet Tulungagung', '08123124124', 'Jl. Kenangan', '', 1),
(8, 3, 'Outlet Malang', '08123123123', 'Jl. Danau air tawar', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `id_package` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL COMMENT 'optional',
  `status` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`id_package`, `name`, `price`, `notes`, `status`) VALUES
(2, 'Paket 1 kg', 5000, 'paket untuk bulan april', 1),
(5, 'Paket 2 kg', 9000, 'Paket untuk mei 2022', 0),
(6, 'Paket 3 kg', 12000, 'Paket bulan april 2022', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment_customer`
--

CREATE TABLE `payment_customer` (
  `id_payment_customer` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `payment_name` varchar(255) NOT NULL,
  `payment_number` varchar(255) NOT NULL,
  `payment_bank_name` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL COMMENT 'optional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment_customer`
--

INSERT INTO `payment_customer` (`id_payment_customer`, `id_customer`, `payment_name`, `payment_number`, `payment_bank_name`, `notes`) VALUES
(26, 57, 'Rekening Utama', '0481231231', 'Bank BCA', 'Rekening utama'),
(27, 58, 'qweqwe', '46784568', 'qweqweq', 'qewrqw'),
(29, 57, 'qweqwe', '123123123123', 'qweqwe', 'qweqweqwe');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id_transaction` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_address_customer` int(11) NOT NULL,
  `id_package` int(11) NOT NULL,
  `id_outlet` int(11) NOT NULL,
  `id_payment_customer` int(11) NOT NULL,
  `invoice_code` varchar(255) NOT NULL,
  `pickup_date` varchar(255) NOT NULL,
  `drop_date` varchar(255) NOT NULL,
  `pickup_time` varchar(255) NOT NULL,
  `drop_time` varchar(255) NOT NULL,
  `notes_laundry` varchar(255) DEFAULT NULL COMMENT 'optional',
  `notes_driver` varchar(255) DEFAULT NULL COMMENT 'optional',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'proses(0) & selesai(1)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id_transaction`, `id_customer`, `id_address_customer`, `id_package`, `id_outlet`, `id_payment_customer`, `invoice_code`, `pickup_date`, `drop_date`, `pickup_time`, `drop_time`, `notes_laundry`, `notes_driver`, `status`) VALUES
(59, 57, 29, 5, 8, 26, 'INV5721890171200127', '2022-04-07', '2022-04-14', '19:00', '18:07', NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_customer`
--
ALTER TABLE `address_customer`
  ADD PRIMARY KEY (`id_address_customer`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id_administrator`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexes for table `outlet`
--
ALTER TABLE `outlet`
  ADD PRIMARY KEY (`id_outlet`),
  ADD KEY `id_administrator` (`id_administrator`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id_package`);

--
-- Indexes for table `payment_customer`
--
ALTER TABLE `payment_customer`
  ADD PRIMARY KEY (`id_payment_customer`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id_transaction`),
  ADD KEY `id_customer` (`id_customer`),
  ADD KEY `id_address_customer` (`id_address_customer`),
  ADD KEY `id_package` (`id_package`),
  ADD KEY `id_outlet` (`id_outlet`),
  ADD KEY `id_payment_customer` (`id_payment_customer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_customer`
--
ALTER TABLE `address_customer`
  MODIFY `id_address_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id_administrator` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `outlet`
--
ALTER TABLE `outlet`
  MODIFY `id_outlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id_package` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment_customer`
--
ALTER TABLE `payment_customer`
  MODIFY `id_payment_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address_customer`
--
ALTER TABLE `address_customer`
  ADD CONSTRAINT `address_customer_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`);

--
-- Constraints for table `outlet`
--
ALTER TABLE `outlet`
  ADD CONSTRAINT `outlet_ibfk_1` FOREIGN KEY (`id_administrator`) REFERENCES `administrator` (`id_administrator`);

--
-- Constraints for table `payment_customer`
--
ALTER TABLE `payment_customer`
  ADD CONSTRAINT `payment_customer_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`),
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`id_address_customer`) REFERENCES `address_customer` (`id_address_customer`),
  ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`id_package`) REFERENCES `package` (`id_package`),
  ADD CONSTRAINT `transaction_ibfk_4` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`),
  ADD CONSTRAINT `transaction_ibfk_5` FOREIGN KEY (`id_payment_customer`) REFERENCES `payment_customer` (`id_payment_customer`);
