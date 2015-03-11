-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost:3306
-- Généré le :  Mer 11 Mars 2015 à 01:12
-- Version du serveur :  5.5.38
-- Version de PHP :  5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `erp_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `T_Frais`
--

CREATE TABLE `T_Frais` (
`fraisId` int(20) NOT NULL,
  `date` date DEFAULT NULL,
  `consultantId` int(20) NOT NULL,
  `consultant` varchar(50) NOT NULL,
  `libelle` text NOT NULL,
  `client` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `cout` double NOT NULL,
  `status` varchar(20) NOT NULL,
  `commentaireConsultant` text,
  `commentaireAdmin` text
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `T_Frais`
--

INSERT INTO `T_Frais` (`fraisId`, `date`, `consultantId`, `consultant`, `libelle`, `client`, `type`, `cout`, `status`, `commentaireConsultant`, `commentaireAdmin`) VALUES
(31, '2015-03-03', 0, 'kilany', 'transport', 'AWB', 'transport', 30, 'Validé', 'espèce', NULL),
(33, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(34, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(35, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(36, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(38, '2015-03-03', 1, 'sakah', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', 'ok'),
(39, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(40, '2015-03-03', 1, 'sakah', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(41, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(43, '2015-03-03', 1, 'kilany', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(44, '2015-03-03', 1, 'dasilva', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(46, '2015-03-03', 1, 'dasilva', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(47, '2015-03-03', 1, 'legoc', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(48, '2015-03-03', 1, 'legoc', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(49, '2015-03-03', 1, 'legoc', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(50, '2015-03-03', 1, 'legoc', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(51, '2015-03-03', 1, 'legoc', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(52, '2015-03-03', 1, 'diaz', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(53, '2015-03-03', 1, 'diaz', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(54, '2015-03-03', 1, 'diaz', 'transport', 'AWB', 'transport', 30, 'En cours', 'espèce', NULL),
(55, '2015-04-04', 0, 'kilany', 'restau', 'sg', 'voyage', 5, 'Validé', 'espece\r\n', 'c''est trop');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `T_Frais`
--
ALTER TABLE `T_Frais`
 ADD PRIMARY KEY (`fraisId`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `T_Frais`
--
ALTER TABLE `T_Frais`
MODIFY `fraisId` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=56;