import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import { compare } from 'bcryptjs';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({ email: credentials?.email });
        if (!user) {
          console.log('No user found with this email:', credentials?.email);
          throw new Error('No user found with this email');
        }
        if (!user.verified) {
          console.log('User not verified:', credentials?.email);
          throw new Error('Please verify your email before logging in.');
        }
        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) {
          console.log('Incorrect password for:', credentials?.email);
          throw new Error('Incorrect password');
        }
        console.log('User authenticated:', user.email);
        return { id: user._id.toString(), email: user.email, name: user.name, admin: user.admin };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.admin = token.admin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.admin = user.admin;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async createUser({ user }) {
      if (!user.email || !user.name) return;
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.CONTACT_GMAIL_USER,
            pass: process.env.CONTACT_GMAIL_PASS,
          },
        });
        await transporter.sendMail({
          from: `"Anaquest" <${process.env.CONTACT_GMAIL_USER}>`,
          to: user.email,
          subject: '🎉 Welcome to Anaquest – Your Learning Journey Begins! 🚀',
          text: `Hi ${user.name},\n\nThank you for registering with Anaquest. We are delighted to welcome you to our learning community. 🎓\n\nWith Anaquest, you can access a wide range of quizzes and resources designed to help you achieve your academic goals. If you have any questions or need assistance, our support team is here to help.\n\nWishing you success on your learning journey! 🌟\n\nBest regards,\nThe Anaquest Team`,
          html: `<p>Hi <strong>${user.name}</strong>,</p><p>Thank you for registering with <strong>Anaquest</strong>. We are delighted to welcome you to our learning community. 🎓</p><p>With Anaquest, you can access a wide range of quizzes and resources designed to help you achieve your academic goals. If you have any questions or need assistance, our support team is here to help.</p><p>Wishing you success on your learning journey! <span style=\"font-size:1.2em;\">🌟</span></p><p>Best regards,<br/>The Anaquest Team</p>`
        });
      } catch (e) {
        console.error('Failed to send welcome email:', e);
        // Do not throw, just log the error
      }
    }
  }
}); 