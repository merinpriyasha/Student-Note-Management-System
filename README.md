# Student-Note-Management-System

> MERN is a fullstack implementation in MongoDB, Expressjs, React, Nodejs.

## clone or download

`$ git clone https://github.com/merinpriyasha/Student-Note-Management-System.git`
\
 `$ npm i`
 
 ## run fullstack app on your machine
 
 ### Prerequisites
 * MngoDB
 * Node
 * React
 * npm
 
 **notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other**
 
 ### Client-side usage(PORT: 3000)
` $ cd CLIENT   // go to client folder ` \
` $ cd Admin-Dashboard   // go to Admin-Dashboard folder ` \
`$ npm i       // npm install packages` \
`$ npm start  // run it locally`

### Server-side usage(PORT: 3002)

`$ npm i       // npm install packages`\
`$ npm run dev // run it locally`

### Postman documentation

* https://documenter.getpostman.com/view/19580307/UzJLMvce 

### System Diagram

![digram](https://user-images.githubusercontent.com/68733175/183234864-38478a74-0ac7-4e62-98d2-04f8af0c3eac.PNG)

## Screenshots of this project
 
![Capture1](https://user-images.githubusercontent.com/68733175/177757385-9d37573d-c30a-4fb3-82c7-697141cc650d.PNG)

* Using login page admin or student can login to the system successfully
* If the user login the first time then it redirects to the edit profile page otherwise it's redirecting to the dashboard <br>
(_Check with this admin credential: email: admin123@gmail.com password: admin123_)

![edit account](https://user-images.githubusercontent.com/68733175/177757444-f4c509f6-5f24-4642-b40c-8bd00f5d14cc.PNG)

* If the user visits the edit profile he/she can edit his/her personal information including the temporary password as his/her wants 

### Student Dashboard

![dashboard](https://user-images.githubusercontent.com/68733175/177757479-ca67c11d-67b1-4e18-9acf-b4dd5627bede.PNG)

* After successful login and also if that's not first-time login then the user can visit the dashboard
* If the user account is **Student** then he/she only can access for note tab on the sidebar

![notes display](https://user-images.githubusercontent.com/68733175/177757563-23e26d4f-e3fe-41a6-a8dc-cec22f4c7225.PNG)

* **Logged student** can view all notes that he/she created on this page 
* And also using this page **logged student** can add, update, and delete notes if he/she wants 

![delete popup](https://user-images.githubusercontent.com/68733175/177758147-e8330696-778c-4b85-95ad-31277b6e572d.PNG)

* If the student clicks on each raw, then it displays a popup with information about that specific note
* If student want to update information then he/she need to click on update button
* If student want to delete information then he/she need to click on delete button
* If student view all information without doing any changes then he/she can click cancel button after view details

![add note](https://user-images.githubusercontent.com/68733175/177823399-24cd0df3-2249-474b-9f5c-8f188389ce02.PNG)

* Student can add new notes by clicking add note button 

![update note](https://user-images.githubusercontent.com/68733175/177823438-fdfd0b26-8167-49f4-903a-988fb6fc48aa.PNG)

* Student can update note details if he/she want

![confirm delete](https://user-images.githubusercontent.com/68733175/177758171-43fef450-32b7-46c2-825f-c2c2246e2f47.PNG)

* If student want to delete some note he/she need to confirm that, after that he/she can delete that note properly.

### Admin Dashboard

![admin dash](https://user-images.githubusercontent.com/68733175/177758660-970093aa-e3e8-41f2-a48d-44ac985f3b77.PNG)

* After admin successful login and also if that's not first-time login then the admin can visit the dashboard
* If the user account is **Admin** then he/she  can access for student list, create account tabs on the sidebar

![admin -student list display](https://user-images.githubusercontent.com/68733175/177757672-f1fc6f8f-c16d-4861-b7a8-01c31f6cfa30.PNG)

* Using this page admin can view all the registered students in this system

![admin popup](https://user-images.githubusercontent.com/68733175/177757823-5c94685a-21b7-474e-8dbd-7aa007dcae66.PNG)

* If the admin clicks on each raw, then it displays a popup with all information about that specific student

![create account](https://user-images.githubusercontent.com/68733175/177758302-8588452c-b581-4ce0-9759-11b4aabf3fb0.PNG)

* If admin want to create new account for new student, then he can do that using this page.
* Here he need to send only the student email
