Automation test for testwise

How to run cypress:

cd to cypress
./node_modules/.bin/cypress open

run specific folder

./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/main/*.js" --headless  --browser chrome --config video=false
''
./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/function/*.js" --headless  --browser chrome --config video=false

./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/profile/*.js" --headless  --browser chrome --config video=false


Each section focuses on each of the components of the website.

- Existing user login (Done)
- Login Validation (Done) 
- New registration email only (Done) (FB and Google exceptions, cannot change window)
- Password recovery (Won't do)
- Profile validation
	- Edit profile (Change name)
	- Content validation
	- Settings (Won't do)
		- Delete profile
		- Password change 
		- Change email  
- Core functions (In no particular order)
	- Recommend items w/ tips (Done)
	- Follow other users (Done)
	- Saves items (Done)
	- Save lists 
	- create list (Done)
	- Create ask (Done)
		- Add to ask
		- Agree to ask
		- Edit ask
		- End ask
	- Respond to ask
	- Comment and Like on list and items
	- Reply to comment
- Special and Edge Cases (Can be automated, but it is not core function)
	- Logged out state and ask interaction ()
	- Login at items/list/ask stay in place & carry over actions (rec/save)
	- Undoing actions
	- Message and notifications

Resuable functions are stored in support.js , eg simpleLogIn, logOut, startUp


