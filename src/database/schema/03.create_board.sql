CREATE TABLE `board` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `contents` varchar(255),
  `user_id` int,
  `categord_id` int,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
  FOREIGN KEY (categord_id) REFERENCES categord (id) ON DELETE CASCADE
);