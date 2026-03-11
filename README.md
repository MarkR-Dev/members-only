# members-only

This is a Node.js project to practice user authentication, validation, sanitization and database concepts.

This app features an anonymous message board where users can leave messages with their identity hidden, to all but those inside the "secret" members club.

- Users who are not currently logged in cannot create new messages, and they cannot see authors of messages.
- Users who are logged in can create new messages, but if they don't have member status they cannot see authors of messages nor can they delete messages.
- Users who are logged in and have member status can create messages, they can see authors of messages, but cannot delete messages.
- Users who are logged in and have admin status have full creation, identification and deletion privileges.

Some areas that could be improved for future projects:

- Consistent naming conventions for variables
- Research into the best variable syntax casing conventions
- Better CSS classes and higher level CSS files to reduce repetition
- Research into best practices for checking if a user is currently authenticated
