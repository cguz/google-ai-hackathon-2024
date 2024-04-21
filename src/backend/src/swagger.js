const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'TeacherApp-Backend API',
        description: 'La siguiente página contiene una descripción detallada de las APIs ofrecidas por el Backend'
    },
    host: 'localhost:3000',
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Departments",
            "description": "Areas de conocimiento de los profesores"
        },
        {
            "name": "Teachers",
            "description": "Profesores de la aplicacion"
        }, {
            "name": "Students",
            "description": "Estudiantes de la aplicacion"
        }, {
            "name": "Users",
            "description": "Usuarios de la aplicacion"
        }, {
            "name": "Locations",
            "description": "Localizacion de los usuarios"
        },
        {
            "name": "Subjects",
            "description": "Asignaturas de los profesores"
        },
        {
            "name": "Class",
            "description": "Horario de las clases"
        },
        {
            "name": "Chats",
            "description": "Mensajeria interna"
        },
        {
            "name": "Ratings",
            "description": "Puntuacion otorgada a los profesores"
        }
    ],
    definitions: {
        Departments: {
            department_name: "mathe",
            description: "restar"
        },
        Locations: {
            "latitude": 34,
            "longitude": 4,
            "address": "Calle Pedro",
            "city": "Valencia",
            "province": "Valencia"

        },
        Students: {
            "name": "Emilio Alvarez",
            "nickname": "emilio123",
            "email": "em.12356@emil.com",
            "phone": "+34 232345234",
            "password": "12345",
            "date_of_birth": "1989-09-30",
            "status": 2,
            "role_id": 2,
            "location_id": 3,
            "photo": "url"
        },
        SubjectsUpdate: {
            "department_id": 2,
            "teacher_id": 2,
            "subject": "Literatura Anglosa"

        },
        Subjects: {
            "subjectForm": [
                {
                    "department_id": 1,
                    "teacher_id": 2,
                    "subject": "Trigonometria"
                },
                {
                    "department_id": 2,
                    "teacher_id": 2,
                    "subject": "Literatura Anglosajona"
                }
            ]
        },
        Teachers: {
            "experience": 5,
            "class_mode": "ll",
            "price_hour": 76,
            "about_me": "afa",
            "user_id": 3
        }, UsersLogin: {
            "email": "mairi@gmail.com",
            "password": "XX"
        },
        Users: {
            "userForm": {
                "name": "Juana Alvarez",
                "nickname": "juasdn123",
                "email": "pedesdasd@gmail.com",
                "phone": "643434548",
                "password": "12345",
                "date_of_birth": "1993-02-15",
                "status": 2,
                "role_id": 2,
                "photo": "url"
            },
            "teacherForm": {
                "experience": 5,
                "class_mode": "Mañana",
                "price_hour": 10.50,
                "about_me": "Soy un soñador brutal con todos los hierros"
            },
            "locationForm": {
                "latitude": 41.385063,
                "longitude": 2.987456,
                "address": "calle de quintal 25",
                "city": "Santiago",
                "province": "A Coruña"
            }
        },
        Class: {
            day_of_week: "lunes",
            start_time: "15:00:00",
            end_time: "17:00:00",
            slot: "tarde",
            teacher_id: 1

        },
        ClassUpdate: {
            day_of_week: "lunes",
            slot: "tarde",
            teacher_id: 1

        },
        Chats: {
            message: "hola",
            boolean_teacher: true,
            userId: 1,
            teacherId: 1
        },
        Ratings: {
            rating: 5,
            comment_student: "muy bien",
            teacherId: 1,
            userId: 1
        }

    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
