#Note it - A note taking app

### Live preview using AWS:

  http://3.8.177.87:3000/

##To run this yourself:

First install git:
  `yum install git`

Next you want to git clone the repo using:
  `git clone https://github.com/LewisRKeeble/Noteit.git`

Next cd into the directory and install node and postgres:
  `cd Noteit/ `
  `yum install nodejs`
  `sudo yum install postgresql15-server`

Next log into postgres without a password and set the password using:
  `sudo -i -u postgres`
  `psql`
  `\password postgres`
  set the password you want for the user. (**Remeber password**)
  
  
