CREATE TABLE `comment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `board_id` int,
  `contents` varchar(255),
  `depth` int DEFAULT 0,
  `parent_id` int DEFAULT NULL,
  `creatred_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comment (id) ON DELETE CASCADE
);