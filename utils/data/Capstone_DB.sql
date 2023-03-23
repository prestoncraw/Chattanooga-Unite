CREATE TABLE `service_providers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `logo_url` varchar(255),
  `name` varchar(255),
  `description` text,
  `contact_phone_number` varchar(255),
  `contact_email` varchar(255),
  `website_url` varchar(255),
  `address` text,
  `login_email` varchar(255)
);

CREATE TABLE `county` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `service` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255)
);

CREATE TABLE `sp_services` (
  `service_provider_id` int,
  `service_id` int
);

CREATE TABLE `sp_counties` (
  `service_provider_id` int,
  `county_id` int
);

CREATE TABLE `users` (
  `email` varchar(255) PRIMARY KEY,
  `is_admin` bool
);

CREATE TABLE `sp_search_metrics` (
  `search_timestamp` datetime,
  `county_id` int,
  `service_id` int,
  `found_match` bool
);

CREATE TABLE search_metrics (
   `search_timestamp` datetime,
   `service_id` int,
   `county_id` int,   
   `service_provider_id` int );

CREATE TABLE activity_log ( 
    `search_timestamp` datetime, 
    `email` varchar(255),
    `action` varchar(255) );


ALTER TABLE `service_providers` ADD FOREIGN KEY (`login_email`) REFERENCES `users` (`email`);

ALTER TABLE `sp_services` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `service_providers` (`id`);

ALTER TABLE `sp_services` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `sp_counties` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `service_providers` (`id`);

ALTER TABLE `sp_counties` ADD FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

ALTER TABLE `sp_search_metrics` ADD FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

ALTER TABLE `sp_search_metrics` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);
