const User = require('../models/User');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const Attachment = require('../models/Attachment');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    company: { type: GraphQLString },
    website: { type: GraphQLString },
    phone: { type: GraphQLString },
    role: { type: GraphQLString },
    subscription: { type: GraphQLString }
  }),
});

// ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    attachment: { type: GraphQLString },
    clientID: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.clientID);  
      } 
    },
    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Ticket.find({ projectID: parent.id });
      } 
    },
    assignee: { 
      type: new GraphQLList(UserType), 
      resolve(parent, args) {
        return User.find({ _id: parent.assignee });
      } 
    },
    status: { type: GraphQLString },
    createdBy: { 
      type: UserType,
      resolve(parent, args) {          
        return User.findById(parent.createdBy);
      }
    },
  }),
});

// TicketType
const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    ticketType: { type: GraphQLString },
    status: { type: GraphQLString },
    priority: { type: GraphQLString },
    assignee: { 
      type: new GraphQLList(UserType), 
      resolve(parent, args) {
        return User.find({ _id: parent.assignee });
      } 
    },
    comments: {
      type: new GraphQLList(CommentType), 
      resolve(parent, args) {
        // parent.id is the Comment table _id: new ObjectId('655c1335e769491f99c3e129')
        return Comment.find({ ticketID: parent.id });
      } 
    },
    attachments: {
      type: new GraphQLList(AttachmentType), 
      resolve(parent, args) {
        return Attachment.find({ ticketID: parent.id });
      } 
    },
    submitter: { type: GraphQLString },
    project: { 
      type: ProjectType,
      resolve(parent, args) { 
        return Project.findById(parent.projectID);
      }
    },
  }),
});

// CommentType
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    ticketID: { type: GraphQLString },
    user: { 
      type: UserType,
      resolve(parent, args) {         
        return User.findById(parent.userID);
      }
    },
  }),
});

// AttachmentType
const AttachmentType = new GraphQLObjectType({
  name: 'Attachment',
  fields: () => ({
    id: { type: GraphQLID },
    filename: { type: GraphQLString },
    filesize: { type: GraphQLString },
    ticketID: { type: GraphQLString },
    user: { 
      type: UserType,
      resolve(parent, args) {          
        return User.findById(parent.userID);
      }
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    getClients: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ role: "client" });
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    projectsPerUser: {
      type: new GraphQLList(ProjectType),
      args: { 
        user_id: { type: GraphQLID },
      },
      resolve(parent, args) {        
        return Project.find({ assignee: args.user_id });
      }
    },
    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Ticket.find({});
      },
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id);
      },
    },
    ticketsPerProject: {
      type: new GraphQLList(TicketType),
      args: { 
        project_id: { type: GraphQLID },
      },
      resolve(parent, args) {   
        // info: https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
        if (args.project_id.match(/^[0-9a-fA-F]{24}$/)) { 
          return Ticket.find({ projectID: args.project_id });
        }
      }
    },
    ticketsPerUser: {
      type: new GraphQLList(TicketType),
      args: { 
        user_id: { type: GraphQLID },
      },
      resolve(parent, args) {     
        return Ticket.find({ assignee: args.user_id });
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find();
      },
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Comment.findById(args.id);
      },
    },
    commentsPerTicket: {
      type: new GraphQLList(CommentType),
      args: { 
        ticket_id: { type: GraphQLID },
      },
      resolve(parent, args) {  
        return Comment.find({ ticketID: args.ticket_id });
      }
    },
    attachments: {
      type: new GraphQLList(AttachmentType),
      resolve(parent, args) {
        return Attachment.find({});
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add new user
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        company: { type: GraphQLString },
        website: { type: GraphQLString },
        phone: { type: GraphQLString },
        role: { type: GraphQLNonNull(GraphQLString) },
        subscription: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          company: args.company,
          website: args.website,
          phone: args.phone,
          role: args.role,
          subscription: args.subscription,
        });

        return user.save();
      },
    },
    // Delete user
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return User.findByIdAndDelete(args.id); 
      },
    },
    // Update user
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }, 
        website: { type: GraphQLString },        
        company: { type: GraphQLString }, 
        phone: { type: GraphQLString }, 
        role: { type: GraphQLString }, 
        subscription: { type: GraphQLString }, 
      },
      resolve(parent, args) {

        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              password: args.password,
              website: args.website,
              company: args.company,
              phone: args.phone,
              role: args.role,
              subscription: args.subscription,
            },
          },
          { new: true }
        );
      },
    },
    // Add new project
    addProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        attachment: { type: GraphQLNonNull(GraphQLString) },  
        clientID: { type: GraphQLNonNull(GraphQLID) }, 
		    tickets: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },   
        assignee: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },   
        status: { type: GraphQLNonNull(GraphQLString) },
        createdBy: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          description: args.description,
          image: args.image,
          attachment: args.attachment,
          clientID: args.clientID,
		      tickets: args.tickets,
          assignee: args.assignee,
          status: args.status,
          createdBy: args.createdBy
        });

        return project.save();
      },
    },
    // Delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id); 
      },
    },
    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) }, 
        attachment: { type: GraphQLNonNull(GraphQLString) }, 
        assignee: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              image: args.image,
              attachment: args.attachment,
              assignee: args.assignee, 
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    // Add new ticket
    addTicket: {
      type: TicketType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        ticketType: { type: GraphQLString },
        status: { type: GraphQLNonNull(GraphQLString) },  
        priority: { type: GraphQLNonNull(GraphQLString) },  
        assignee: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },   
        submitter: { type: GraphQLNonNull(GraphQLID) },
        projectID: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const ticket = new Ticket({
          title: args.title,
          description: args.description,
          ticketType: args.ticketType,
          status: args.status,
          priority: args.priority,
          assignee: args.assignee,
          submitter: args.submitter,
          projectID: args.projectID
        });

        return ticket.save();
      },
    },
    // Delete ticket 
    deleteTicket: {
      type: TicketType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndDelete(args.id); 
      }
    },
    // Update ticket
    updateTicket: {
      type: TicketType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        ticketType: { type: GraphQLNonNull(GraphQLString) }, 
        status: { type: GraphQLNonNull(GraphQLString) },        
        priority: { type: GraphQLNonNull(GraphQLString) }, 
        assignee: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
      },
      resolve(parent, args) {

        return Ticket.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              ticketType: args.ticketType,
              status: args.status,
              priority: args.priority,
              assignee: args.assignee,
            },
          },
          { new: true }
        );
      },
    },
    // Add new comment
    addComment: {
      type: CommentType,
      args: {
        message: { type: GraphQLNonNull(GraphQLString) },
        ticketID: { type: GraphQLNonNull(GraphQLString) },
        userID: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const comment = new Comment({
          message: args.message,
          ticketID: args.ticketID,
          userID: args.userID,
        });

        return comment.save();
      },
    },
    // Delete comment 
    deleteComment: {
      type: CommentType,
      args: {
        comment_id: { type: GraphQLNonNull(GraphQLID) },
        ticket_id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Comment.findOneAndDelete({ _id: args.comment_id, ticketID: args.ticket_id }); 
      },
    },
    // Update comment
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        message: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {

        return Comment.findByIdAndUpdate(
          args.id,
          {
            $set: {
              message: args.message,
            },
          },
          { new: true }
        );
      },
    },
    // Add new attachment
    addAttachment: {
      type: AttachmentType,
      args: {
        filename: { type: GraphQLNonNull(GraphQLString) },
        filesize: { type: GraphQLNonNull(GraphQLString) },
        ticketID: { type: GraphQLNonNull(GraphQLString) },
        userID: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const attachment = new Attachment({
          filename: args.filename,
          filesize: args.filesize,
          ticketID: args.ticketID,
          userID: args.userID,
        });

        return attachment.save();
      },
    },
    // Delete attachment 
    deleteAttachment: {
      type: AttachmentType,
      args: {
        attachment_id: { type: GraphQLNonNull(GraphQLID) },
        ticket_id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Attachment.findOneAndDelete({ _id: args.attachment_id, ticketID: args.ticket_id }); 
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});