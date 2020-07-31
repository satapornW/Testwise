Automation test for testwise

How to run cypress:

cd to cypress
Running individual test with visual 
./node_modules/.bin/cypress open

Run headless
Running all test test, no visual
./node_modules/.bin/cypress run --headless --browser chrome

![image of sample result]
(https://github.com/satapornW/Testwise/blob/master/Screen%20Shot%202020-07-31%20at%208.27.39%20AM.png)

Each section focuses on each of the components of the website.

- Existing user login (Done)
- Login Validation (Done) 
- New registration email only (Done) (FB and Google exceptions, cannot change window)
	- Registration check
	- Profanity check
- Password recovery (Won't do)
- Profile validation
	- Edit profile bio
		- Normal
		- With profanity
			-This will be tested in a new user creation.
	- Content validation (Done)
	- Settings (Won't do)
		- Delete profile
		- Password change 
		- Change email
	- Inbox (follow, like, comment) (Done) 
- Core functions (In no particular order)
	- Recommend items w/ tips (Done)
	- Follow other users (Done)
	- Saves items (Done)
	- Save lists (Done)
	- create list (Done)
	- Edit list (To Do)
	- Remove item from list (To Do)
	- Create ask (Done)
		- Add to ask
		- Agree to ask
		- Edit ask
		- End ask
	- Respond to ask (Done)
	- Comment and Like on list and items
	- Reply to comment
- Special and Edge Cases (Can be automated, but it is not core function)
	- Register -> Auto follow (Done)
	- Logged out state and ask interaction (To do)
	- Login at items/list/ask stay in place & carry over actions (rec/save)
	- Logged out -> saved -> register (Done)
	- Message and notifications (Done)

Reusable functions are stored in support.js , eg simpleLogIn, logOut, startUp


