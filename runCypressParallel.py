from subprocess import call


# ./node_modules/.bin/cypress run --spec "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/main/*.js" --headless  --browser chrome --config video=false
# specString = "/Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/main/*.js"

# call(["./node_modules/.bin/cypress run --spec", specString, "--headless  --browser chrome --config video=false"])


call(["./node_modules/.bin/cypress run --spec /Users/satapornworasilpchai/cypress/cypress/integration/Likewise Test/profile/staticProfile.js --headless --browser chrome --config video=false"], shell=True )