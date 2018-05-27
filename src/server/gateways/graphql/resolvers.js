import { UserResolver } from './schema/User';
import { CommentResolver } from './schema/Comment';
import { AlertResolver } from './schema/Alert';

const RootQuery = Object.assign(
  AlertResolver.Query,
  CommentResolver.Query,
  UserResolver.Query,
);

export default {
  Query: RootQuery,
  Comment: CommentResolver.Comment,
  User: UserResolver.User,
  Alert: AlertResolver.Alert,
};
