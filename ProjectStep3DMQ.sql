
--
--These are the INSERT queries for the "IT Inventory and Documentation Database".
--the colon character : is being used to denote variables that will have data from 
--the backend programming.
--


--Insert a user into the user table
INSERT INTO `users` (`first_name`, `last_name`, `department`, `job_title`, `pref_phone`, `pref_email`, `home_office`, `assigned_laptop`) VALUES (':first_name_input', ':last_name_input', 
':department_from_HTML_dropdown_input', ':job_title_input', ':phone_number_input', ':pref_email_input', ':location_id_from_dropdown_input', 'laptop_id_from_dropdown_input');

--insert an entry into the laptop_docs table
INSERT INTO `laptop_docs` (`title`, `doc_link`) VALUES (':title_from_input', ':url_from_input');

--insert a laptop into the laptops table
INSERT INTO `laptops` (`make`, `model`, `sn`, `purchase_date`, `warranty_end_date`, `cpu`, `ram`) VALUES (':make_from_html_dropdown_input', ':model_input', ':sn_input', ':purchase_date_from_input', 
':warranty_end_date_from_input', ':cpu_from_input', ':ram_from_input');

--insert location into the location table
INSERT INTO `location` (`street_address`, `city`, `state`, `zip`) VALUES (':street_address_from_input', ':city_from_input', ':state_from_input', ':zip_from_input');

--insert perpherial into the perpherial table
INSERT INTO `peripherals` (`equip_type`, `make`, `model`, `assigned_user`, `asset_tag`) VALUES (':equip_type_input_from_html_dropdown', ':make_input', ':model_input', 
':user_id_from_dropdow_input', ':asset_tag_input');

--insert laptop/doc correlation into laptops_laptopdocs table
INSERT INTO `laptops_laptopdocs` (`lt_id`, `doc_id`) VALUES (':laptop_id_from_dropdown', ':laptop_docs_id_from_dropdown');


--
--These are the SELECT queries for the "IT Inventory and Documentation Database"
--

--select laptop docs
SELECT DISTINCT laptop_docs.Id, title, doc_link FROM laptop_docs LEFT JOIN laptops_laptopdocs ON laptops_laptopdocs.doc_id = laptop_docs.Id LEFT JOIN laptops ON laptops.Id = laptops_laptopdocs.lt_id;

--select document by id
SELECT Id, title, doc_link FROM laptop_docs WHERE Id = :Id_input;

--select distinct laptop make/model to populate laptop make/model dropdown
SELECT DISTINCT make, model FROM laptops ORDER BY make, model;

--select distinct documents associated with specific make/model
SELECT DISTINCT laptop_docs.title FROM laptop_docs INNER JOIN laptops_laptopdocs ON laptop_docs.Id = laptops_laptopdocs.doc_id INNER JOIN laptops ON laptops.Id = laptops_laptopdocs.lt_id WHERE laptops.make = :make_input AND laptops.model = :model_input;

--select documents that pertain to make and model
SELECT DISTINCT laptop_docs.title, laptop_docs.doc_link FROM laptop_docs INNER JOIN laptops_laptopdocs ON laptop_docs.Id = laptops_laptopdocs.doc_id INNER JOIN laptops ON laptops.Id = laptops_laptopdocs.lt_id WHERE laptops.make = :make_input AND laptops.model = :model_input

--select all laptops and their assigned users
SELECT laptops.Id, laptops.make, laptops.model, laptops.sn, users.first_name, users.last_name FROM laptops INNER JOIN users ON laptops.Id = users.assigned_laptop ORDER BY Id

--select all laptop docs
SELECT Id, title FROM laptop_docs

--select all laptops and their associated docs
SELECT laptops.Id AS LaptopId, laptops_laptopdocs.Id, laptops.make, laptops.model, laptops.sn, laptop_docs.title FROM laptops INNER JOIN laptops_laptopdocs ON laptops.Id = laptops_laptopdocs.lt_id INNER JOIN laptop_docs ON laptop_docs.Id = laptops_laptopdocs.doc_id ORDER BY laptops.Id

--select all laptops
SELECT Id, make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops

--select from laptops by id
SELECT Id, make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops WHERE Id = :Id_input

--select from laptops by model
SELECT Id, make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops WHERE model = :model_input

--select from locations
SELECT Id, street_address, city, state, zip FROM location

--select from location by id
SELECT Id, street_address, city, state, zip FROM location WHERE Id = :Id_input

--select perperhial info and assigned user info
SELECT peripherals.Id, equip_type, make, model, users.first_name, users.last_name FROM peripherals LEFT JOIN users ON users.Id = peripherals.assigned_user ORDER BY peripherals.Id ASC

--select user info to display in dropdown
SELECT Id, first_name, last_name, pref_email FROM users

--select perpherial info by id
SELECT Id, equip_type, make, model, assigned_user FROM peripherals WHERE Id =:Id_input

--select users, location, laptop 
SELECT users.Id, first_name, last_name, department, job_title, pref_phone, pref_email, location.city, location.state, laptops.sn FROM users INNER JOIN location ON location.Id = users.home_office LEFT JOIN laptops on laptops.Id = users.assigned_laptop

--select locations to populate dropdown
SELECT Id, city FROM location

--select available laptops
SELECT laptops.Id, sn, users.assigned_laptop FROM laptops left JOIN users ON laptops.Id = users.assigned_laptop WHERE users.assigned_laptop IS NULL

--select user by ID
SELECT Id, first_name, last_name, department, job_title, pref_phone, pref_email, home_office, assigned_laptop FROM users WHERE Id = :Id_input

--select user by email 
SELECT users.Id, first_name, last_name, department, job_title, pref_phone, pref_email, location.city, location.state FROM users INNER JOIN location ON location.Id = users.home_office WHERE pref_email = :email_input





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

--update laptop_docs title and doclink by id
UPDATE laptop_docs SET title=:title, doc_link=:doc_link WHERE Id=:Id

--update laptop by id
UPDATE laptops SET make=:make_input, model=:model_input, sn=:sn_input, purchase_date=:purchase_date_input, warranty_end_date=:warranty_end_date_input, cpu=:cpu_input, ram=:ram_input WHERE Id=:Id_input

--update location by id
UPDATE location SET street_address=:address_input, city=:city_input, state=:state_input, zip=:zip_input WHERE Id=:Id_input

--update perpherials by id
UPDATE peripherals SET equip_type=equip_type_input, make=:make_input, model=:model_input, assigned_user=:assigned_user_input WHERE Id=:Id_input

--update user by id
UPDATE users SET first_name=first_name_input, last_name=:last_name_input, department=:department_input, job_title=:job_title_input, pref_phone=:pref_phone_input, pref_email=:pref_email_input, home_office=:home_office_input, assigned_laptop=:assigned_laptop_input WHERE Id=:Id_input


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









