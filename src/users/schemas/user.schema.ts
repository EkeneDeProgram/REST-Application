// Import Schema and Document from the mongoose package
import { Schema, Document } from 'mongoose';

// Define the User schema with mongoose
export const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  // Define the email field as a required string
  email: { type: String, required: true },
  // Define the avatar field as an optional string
  avatar: String,
  // Define the avatarHash field as an optional string
  avatarHash: String,
});

// Define a TypeScript interface for the User document extending mongoose Document
export interface User extends Document {
  // Define the id field as a string (Note: mongoose will automatically add this field)
  id: string;
  userId: string;
  // Define the email field as a string
  email: string;
  // Define the avatar field as an optional string
  avatar?: string;
  // Define the avatarHash field as an optional string
  avatarHash?: string;
}
