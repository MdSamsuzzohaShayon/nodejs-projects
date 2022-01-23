import express from 'express';
import db from './models';
import { users } from './seeders/users';
import { projects } from './seeders/projects';
import { projectassignments } from './seeders/projectassignments';

const app = express();

/*
const createUsers = () => {
    users.map(user => {
        db.User.create(user);
    })
}

createUsers();
*/

/*
const createProjects = () => {
    projects.map(project => {
        db.Project.create(project);
    })
}
createProjects();

*/

/*
const createProjectAssignments = () => {
    projectassignments.map(projectAssignment => {
        db.ProjectAssignment.create(projectAssignment);
    })
}
createProjectAssignments();
*/

app.get('/', (req, res, next) => {
    db.User.findAll({
        include: {
            model: db.Project
        }
    }).then((result: object) => {
        // console.log(result);
        res.status(200).json(result);
    }).catch((err: object) => console.log(err));
});



const port = process.env.PORT || 3000;

// IF THERE ARE NO TABLE THIS WILL CREATE 
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);

    });
});
