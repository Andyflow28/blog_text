-- MySQL Script generated by MySQL Workbench
-- dom 18 sep 2022 04:52:30
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `text` DEFAULT CHARACTER SET utf8 ;
USE `text` ;

-- -----------------------------------------------------
-- Table `text`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `text`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `text`.`texts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `text`.`texts` (
  `notes_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `note` VARCHAR(10000) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`notes_id`),
  UNIQUE INDEX `notes_id_UNIQUE` (`notes_id` ASC) VISIBLE,
  INDEX `fk_texts_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_texts_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `text`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;