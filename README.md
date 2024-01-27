# Note it - A note taking app

Note it is a note taking app that allows users to input notes, delete notes and edit notes. This app is made with React / Node.js / postgreSQL. It has user authentication and input authentication. 

### Live preview using AWS:

  http://3.8.177.87:3000/

## To run this yourself: Either use yum or apt

1. Install git:
```
  yum install git
```
2. Clone the github repo using:
```
  git clone https://github.com/LewisRKeeble/Noteit.git
```

3. Cd into the directory and install node and postgres:
```
  cd Noteit/ 
  yum install nodejs
  sudo yum install postgresql15-server
```
4. Initialise postgres:
```
  /usr/bin/postgresql-setup –-initdb
  systemctl enable postgresql
  systemctl start postgresql
  systemctl status postgresql
  ```
5. Log into postgres without a password and set the password using:
```
  sudo -i -u postgres
  psql
  \password postgres
```
  set the password you want for the user. (**Remeber password**)
  
6. Copy the sql code in the data.sql file in Noteit/server/ and use in the psql terminal to create a database and the 2 tables needed.
```
  cd Noteit/server
  cat data.sql
```

7. Edit the config file in ph_hba.conf:
```
  sudo nano /var/lib/pgsql/data/pg_hba.conf
```
  
  edit the method from indent to md5

8. Restart the postgres service:
```
  sudo service postgres restart
```

9. CD into the client and server files and install the packages:
```
  cd client
  npm i
  cd ../
  cd server
  npm i
```
10. In Noteit/server create a .env file and fill in the info below:
```
   SQLUSERNAME='postgres'
   SQLPASSWORD='The password you set in step 5'
   HOST='localhost'
   PORT=5432
```

11. Set the screens needed for the website:
```
  screen -S server
  cd /server/
  npm run start
  ctrl A 
  ctrl D
```
```
  screen -S client
  cd /client/
  npm start
  ctrl A
  ctrl D
```
Then thats it, the app should be running on two screens which can be connected with AWS to have a live hosted Note taking website.
