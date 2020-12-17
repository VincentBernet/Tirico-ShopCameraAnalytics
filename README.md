# Tirici-ShopCameraAnalitics

*** Presentation Speech ?***

![Recordit GIF](Screenshot_ReadMe/Presentation2.gif)
<br/>
It's way smoother in reality, just the gif had to have few fps to be hosted on github. 
---

## Table of Contents 

- [Installation](#installation)
- [Features](#features)
- [Team](#team)
- [Contact](#Contact)

---

## Installation

First you need to have a local server environment like MAMP or XAMP <br /><br />
1] Download the whole github folder in your htdocs folder <br />
2] Go on your PHPmyAdmins page and create a new database named crud <br />
(you can use the following code : CREATE DATABASE crud DEFAULT CHARACTER SET utf8 ;) <br />
3] Go in Sql interface of this DataBase and copy paste the following Sql querrys : <br />

 ```
  GRANT ALL ON crud.* TO 'Admin'@'localhost' IDENTIFIED BY '1234';
  GRANT ALL ON crud.* TO 'Admin'@'127.0.0.1' IDENTIFIED BY '1234';

  CREATE TABLE users (
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128),
    email VARCHAR(128),
    password VARCHAR(128),
    PRIMARY KEY(user_id),
    INDEX(email)
  ) ENGINE=InnoDB CHARSET=utf8;

  ALTER TABLE users ADD INDEX(email);
  ALTER TABLE users ADD INDEX(password);
  
  INSERT INTO users (name,email,password) 
  VALUES ('UserDefault','vincent.bernet@efrei.net','1a52e17fa899cf40fb04cfc42e6352f1');

  INSERT INTO users (name,email,password) 
  VALUES ('UMSI','umsi@umich.edu','1a52e17fa899cf40fb04cfc42e6352f1');
  
CREATE TABLE Profile (
  profile_id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  headline TEXT,
  summary TEXT,
  PRIMARY KEY(profile_id),
  CONSTRAINT profile_ibfk_2
  FOREIGN KEY (user_id)
  REFERENCES users (user_id)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;<br />

CREATE TABLE Position (
  position_id INTEGER NOT NULL AUTO_INCREMENT,
  profile_id INTEGER,
  rank INTEGER,
  year INTEGER,
  description TEXT,
  PRIMARY KEY(position_id),
  CONSTRAINT position_ibfk_1
    FOREIGN KEY (profile_id)
    REFERENCES Profile (profile_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE Institution (
  institution_id INTEGER NOT NULL KEY AUTO_INCREMENT,
  name VARCHAR(255),
  UNIQUE(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE Education (
  profile_id INTEGER,
  institution_id INTEGER,
  rank INTEGER,
  year INTEGER,
  CONSTRAINT education_ibfk_1
    FOREIGN KEY (profile_id)
    REFERENCES Profile (profile_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT education_ibfk_2
    FOREIGN KEY (institution_id)
    REFERENCES Institution (institution_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(profile_id, institution_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

4] Only if you are on Mac : Go to pdo.php file and change the port number to 8808 <br/>

&nbsp;&nbsp;&nbsp; ![Pdo.php](Screenshot_ReadMe/Pdo.JPG)

5] Run the index.php file on your browser, if no SQL error's statement pop everything work !
If there is some error check your database and your port number.

## Features
On this application i implemetended multiples features such as :
 - Login/Register/Logout possibility linked to our DataBase
 - Complete CRUD application
 - Posibility to read/edit/delete only the profile created your own userprofile. 
 - Data validation all over our forms (via php and some java alert), using Session to set flash message
 - All forms use Session to avoid reloading the page and get anoying pops up and ressending data to our database with only Post.
 - Night mode button using Java script to change css of our whole website, using changment of CSS on the DOM and saving those on localstorage
 - Html and CSS injections protection via Html entities and using pdo to make the link beetween our page and our DataBase


---
## Team

> Whole application was made by me when i was getting a coursera specialisation on web developpment :

 <a href="https://github.com/VincentBernet.com" target="_blank">**FullStack**</a> |
|:---:|
| [![FVCproductions](https://avatars3.githubusercontent.com/u/54962581?s=300)](https://github.com/VincentBernet.com)    |
| <a target="_blank" rel="noopener noreferrer" href="https://github.com/VincentBernet">`github.com/BernetProductions`</a> |



---

## Contact
- Don't hesitate to contact me on Github or on Linkedin, i'm currently seeking an intership around Paris for April 2021 :

[![Linkedin](https://thelinkedinman.com/wp-content/uploads/2016/02/View-my-LinkedIn-profile-image-3-300x140.png)](https://www.linkedin.com/in/vincent-bernet-028a64193/)


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © <a href="https://www.linkedin.com/in/vincent-bernet-028a64193/" target="_blank">Bernet Vincent Marie</a>.
