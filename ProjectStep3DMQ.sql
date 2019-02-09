
--
--These are the INSERT queries for the "IT Inventory and Documentation Database".
--the colon character : is being used to denote variables that will have data from 
--the backend programming.
--


--Insert a user into the user table
INSERT INTO `users` (`Id`, `first_name`, `last_name`, `department`, `job_title`, `pref_phone`, `pref_email`, `home_office`, `assigned_laptop`) VALUES (NULL, ':first_name_input', ':last_name_input', 
':department_from_HTML_dropdown_input', ':job_title_input', ':phone_number_input', ':pref_email_input', ':location_id_from_dropdown_input', 'laptop_id_from_dropdown_input');

--insert an entry into the laptop_docs table
INSERT INTO `laptop_docs` (`Id`, `title`, `doc_link`) VALUES (NULL, ':title_from_input', ':url_from_input');

--insert a laptop into the laptops table
INSERT INTO `laptops` (`Id`, `make`, `model`, `sn`, `purchase_date`, `warranty_end_date`, `cpu`, `ram`) VALUES (NULL, ':make_from_html_dropdown_input', ':model_input', ':sn_input', ':purchase_date_from_input', 
':warranty_end_date_from_input', ':cpu_from_input', ':ram_from_input');

--insert location into the location table
INSERT INTO `location` (`Id`, `street_address`, `city`, `state`, `zip`) VALUES (NULL, ':street_address_from_input', ':city_from_input', ':state_from_input', ':zip_from_input');

--insert perpherial into the perpherial table
INSERT INTO `peripherals` (`Id`, `equip_type`, `make`, `model`, `assigned_user`, `asset_tag`) VALUES (NULL, ':equip_type_input_from_html_dropdown', ':make_input', ':model_input', 
':user_id_from_dropdow_input', ':asset_tag_input');

--insert laptop/doc correlation into laptops_laptopdocs table
INSERT INTO `laptops_laptopdocs` (`Id`, `lt_id`, `doc_id`) VALUES (NULL, ':laptop_id_from_dropdown', ':laptop_docs_id_from_dropdown');


--
--These are the SELECT queries for the "IT Inventory and Documentation Database"
--

--select user by email address
SELECT * FROM `users` WHERE `pref_email` = ':pref_email_input';

--select user's id from users by email address
SELECT `Id` FROM `users` WHERE `pref_email` = ':pref_email_input';

--select perpherial by asset tag
SELECT * FROM `peripherals` WHERE `asset_tag` = ':asset_tag_input';

--select laptop by s/n
SELECT * FROM `laptops` WHERE `sn` = ':sn_input';

--select location by zip
SELECT * FROM `location` WHERE 'zip' = ':zip_input';

--select location id by zip
SELECT `Id` FROM `location` WHERE 'zip' = ':zip_input';

--select all from laptop_docs
SELECT * FROM `laptop_docs`

--select all from laptop_laptopdocs
SELECT * FROM `laptops_laptopdocs`

--select from users by first name
SELECT `Id`, `first_name`, `last_name`, `department`, `job_title`, `pref_phone`, `pref_email`, `home_office`, `assigned_laptop` FROM `users` WHERE `first_name` = ':first_name_input';

--select from users by last name
SELECT `Id`, `first_name`, `last_name`, `department`, `job_title`, `pref_phone`, `pref_email`, `home_office`, `assigned_laptop` FROM `users` WHERE `last_name` = ':last_name_input';

--select all laptops not assigned to a user from laptops to populate dropdown in users
SELECT `make`, `model`, `sn`, `purchase_date`, `warranty_end_date`, `cpu`, `ram` FROM `laptops` WHERE `Id` NOT IN (SELECT `assigned_laptop` FROM `users`);

--select all from laptops to populate laptop dropdown in laptops_laptopdocs table
SELECT * FROM `laptops`;

--select all from laptop_docs to populate laptop_docs dropdown in laptops_laptopdocs table
SELECT * FROM `laptop_docs`

--select from users to populate user dropdown in perpherial table
SELECT `first_name`, `last_name`, `department`,`pref_email`, `home_office` FROM `users`;

--select from location to populate dropdown in users
SELECT * FROM `location`;


--
--These are the UPDATE queries for the "IT Inventory and Documentation Database"
--

--update user attributes in user table (form will be pre-populated with current info using a select query, then user can just update what is needed)
UPDATE `users` SET `first_name`= ':first_name_input',`last_name`=':last_name_input',`department`=':department_input',`job_title`=':job_title_input',`pref_phone`=':pref_phone_input',
pref_email`=':pref_email_input',`home_office`=':home_office_id_from_dropdown_input',`assigned_laptop`=':laptop_id_from_dropdown_input' WHERE `Id` = ':selected_id';


--
--These are the DELETE queries for the "IT Inventory and Documentation Database"
--

--delete laptop by s/n
DELETE FROM `laptops` WHERE `sn` = ':sn_input';

--delete location by id
DELETE FROM `location` WHERE `Id` = ':Id_selected_input';

--delete user by email address
DELETE FROM `users` WHERE `pref_email` = ':email_input';

--Delete laptop doc by id
DELETE FROM `laptop_docs` WHERE `Id` = ':Id_selected_input';

--delete perpherial by asset tag
DELETE FROM `peripherals` WHERE `Id`  = ':Id_selected_input';

--delete item from laptops_laptopdocs by id
DELETE FROM `laptops_laptopdocs` WHERE `Id` = ':Id_selected_input';









