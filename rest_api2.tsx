import * as jwt from 'jsonwebtoken';

// when a user logs in
const token = jwt.sign({ userID: user.id }, 'your-secret-key');

// when a user accesses a protected route
try {
  const decoded = jwt.verify(token, 'your-secret-key');
  // if verification succeeds, the user's ID will be in `decoded.userID`
} catch(err) {
  // if verification fails, an error will be thrown
}
import * as jwt from 'jsonwebtoken';

// when a user logs in
const token = jwt.sign({ userID: user.id }, 'your-secret-key');

// when a user accesses a protected route
try {
  const decoded = jwt.verify(token, 'your-secret-key');
  // if verification succeeds, the user's ID will be in `decoded.userID`
} catch(err) {
  // if verification fails, an error will be thrown
}
