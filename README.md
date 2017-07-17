# Socket-Boilerplate
### Structure
Project is basically about getting started with [socket.io](https://socket.io/) on node.js, and a few about structuring the code.

Since, there are tons of code structures recommended by consumate coders and the techblogs, there is always a confusion to start with. Most of them are revolving around whether `feature` based or `role` based file structures, following the `MVC` architecture.

In my personal opinion, it all depends on what are you comfortable with and understandable to the team you are working with. Little bit also depends on the nature of project.

In this project we have adapted role based file structures following MVC structure for the server. And a seperate client module containing mostly `javascript` code, styles and other static assets, which all get compiled into a `public` directory using `gulp`. 

### Installation

After cloning the repository we need to install all the dependencies in package.json in node modules.

 `npm install`

Now, to start the server on defined port

 `npm start`

You can now go to browser on defined port and view.
Default

[http://localhost:1111/](http://localhost:1111/)

### Feedback
A warm welcome to any suggestions, improvements and of course the pull requests.
