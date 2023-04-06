CREATE TABLE `service_providers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `logo_url` varchar(255),
  `name` varchar(255),
  `description` text,
  `contact_phone_number` varchar(255),
  `contact_email` varchar(255),
  `website_url` varchar(255),
  `address` text,
  `owner_id` int,
  `url_slug` varchar(255),
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
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
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE,
  `name` varchar(255),
  `is_admin` bool DEFAULT 0,
  `created_at` datetime DEFAULT (now()),
  `last_login` datetime
);

CREATE TABLE `sp_search_metrics` (
  `search_id` int PRIMARY KEY DEFAULT (uuid()),
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

-- CREATE TABLE activity_log ( 
--     `search_timestamp` datetime, 
--     `email` varchar(255),
--     `action` varchar(255) );

CREATE TABLE `activity_log` (
  `user_id` int,
  `user_is_admin` bool,
  `action_type` varchar(255),
  `action_description` varchar(255),
  `action_timestamp` datetime DEFAULT (now())
);

CREATE TABLE `sp_logos` (
  `id` int PRIMARY KEY,
  `sp_id` int,
  `image` blob,
  `filename` varchar(255),
  `upload_timestamp` datetime DEFAULT (now())
);


-- ALTER TABLE `service_providers` ADD FOREIGN KEY (`login_email`) REFERENCES `users` (`email`);

-- ALTER TABLE `sp_services` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `service_providers` (`id`);

-- ALTER TABLE `sp_services` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

-- ALTER TABLE `sp_counties` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `service_providers` (`id`);

-- ALTER TABLE `sp_counties` ADD FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

-- ALTER TABLE `sp_search_metrics` ADD FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

-- ALTER TABLE `sp_search_metrics` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `service_providers` ADD FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

ALTER TABLE `sp_services` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `service_providers` (`id`);

ALTER TABLE `sp_services` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `sp_counties` ADD FOREIGN KEY (`service_provider_id`) REFERENCES `service_providers` (`id`);

ALTER TABLE `sp_counties` ADD FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

ALTER TABLE `sp_search_metrics` ADD FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

ALTER TABLE `sp_search_metrics` ADD FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `activity_log` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `sp_logos` ADD FOREIGN KEY (`sp_id`) REFERENCES `service_providers` (`id`);
