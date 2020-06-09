Automation test for testwise

How to run cypress:

cd to cypress
./node_modules/.bin/cypress open

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

---------------------------------------------------------------------------------------

Run in "parallelish"

run specific folder

./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/main/*.js" --headless  --browser chrome --config video=false
''
./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/function/*.js" --headless  --browser chrome --config video=false

./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/profile/*.js" --headless  --browser chrome --config video=false

https://mixpanel.com/report/workspace/17263/explore#user?distinct_id=
95ec4410-418b-47ba-8b85-d5d3e8e04be6
5ed5551-9e-185f50020813ca3

Galaxy A51 or A50 should be ok. 
https://www.amazon.com/Samsung-Factory-Unlocked-Storage-Compatible/dp/B07VZL1W7K/ref=sr_1_3?dchild=1&keywords=Galaxy%2BA51&qid=1591656785&sr=8-3&th=1

Old Android (HTC One m7, current android version 5.1)
https://www.amazon.com/One-M7-HTC-32GB-Tel%C3%A9fono/dp/B00BJL133C/ref=sr_1_2?dchild=1&keywords=HTC+One&qid=1591659201&sr=8-2

(LG G4, current android version 7)
https://www.amazon.com/LG-G4-H810-Unlocked-Smartphone/dp/B01LZHA4YM/ref=sr_1_1?dchild=1&keywords=LG+G4&qid=1591659582&sr=8-1

