Bootstraping the project 
 Step-1 npm init -y
 Step-2 npm install typescript or npm install -D typescript
 Step-3 npx tsc --init [this creates a tsconifg file 

 inside the tsconfig file -> do this -> "rootDir": "./src" "outDir":"./dist"

 STEP-4 inSTALLING dependencies

npm install express, mongoose  <--- dont do like this as these will include libraries which is written in js so unable to use it in ts project
use mmodern syntax - import not require this would give some kind of error coz types arent in the codebase(no declaration file )
so the solution of that is

--> [  npm install -D @types/express ]or you can comment at the top //@ts-ignore (ugly way and bad practice)
Always install dependencies like this 

npm install  @types/jsonwebtoken 
