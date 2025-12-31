StyleDecor
Smart Home & Ceremony Decoration Booking System
Project Documentation
1. Introduction

StyleDecor is a full-stack web application designed to digitize and modernize the service management of local home and ceremony decoration businesses. The platform enables customers to discover decoration services, book consultations or on-site decoration services, make secure online payments, and track service progress in real time. At the same time, it provides administrators and decorators with powerful dashboards to manage services, bookings, assignments, and operational workflows.

The system is built to solve real-world problems faced by local decoration companies, such as manual booking handling, lack of scheduling visibility, poor service tracking, and inefficient decorator assignment.

2. Purpose of the System

The primary purpose of StyleDecor is to act as a centralized service booking and management platform that benefits both customers and service providers.

Problems Addressed

Long waiting times for in-person consultations

No structured online booking process

Difficulty managing multiple decorators and their specialties

No transparent service tracking for customers

Manual payment handling and record keeping

Objectives

Provide an online booking system for decoration services

Enable role-based dashboards for users, decorators, and admins

Automate payment processing

Allow real-time service status tracking

Improve business efficiency and customer experience

3. How StyleDecor Works
3.1 User Flow

A user visits the StyleDecor website.

The user browses available decoration services and packages.

The user views detailed information about a service.

The user logs in or registers to proceed with booking.

The user selects date, location, and service type.

The booking is stored in the system with a pending status.

The user completes payment using Stripe.

The admin assigns a decorator for on-site services.

The decorator updates service progress step by step.

The user tracks the service status until completion.

3.2 On-Site Service Status Workflow

Assigned

Planning Phase

Materials Prepared

On the Way to Venue

Setup in Progress

Completed

Each status update is recorded and visible to the user through the tracking page.

4. System Architecture

StyleDecor follows a client-server architecture.

Frontend

Built with React (Vite)

Handles UI rendering, routing, and user interaction

Communicates with the backend via REST APIs

Backend

Built with Node.js and Express

Handles authentication, authorization, business logic, and payments

Communicates with MongoDB for data storage

Database

MongoDB Atlas (cloud-hosted)

Stores users, services, bookings, payments, decorators, and tracking records

5. Technology Stack
Frontend Technologies

React (Vite)

React Router

Tailwind CSS

DaisyUI

Framer Motion

React Leaflet (Service Coverage Map)

Axios

Firebase Authentication

Backend Technologies

Node.js

Express.js

MongoDB (Atlas)

JWT (JSON Web Token)

Stripe Payment Gateway

Tools & Services

Firebase Authentication

MongoDB Atlas

Stripe

ImageBB / Cloudinary (for profile images)

Vercel / Netlify (frontend deployment)

Render / Railway (backend deployment)

6. Frontend Structure and Design

The frontend is structured using a modular and scalable folder hierarchy.

Core Design Principles

Clean and modern UI

Consistent spacing and typography

Mobile-responsive layout

Clear visual hierarchy

DaisyUI theme customization

Key UI Components

Navbar with authentication awareness

Footer with contact and business information

Dynamic service cards

Loading spinners and skeletons

Toast notifications for actions

7. Routing and Access Control

The application uses role-based routing.

Route Types

Public Routes: Home, Services, Coverage, Login, Register

Private Routes: Dashboard and booking features

Admin Routes: Service management, user management

Decorator Routes: Assigned services and status updates

Route Protection

JWT token verification

Firebase authentication state persistence

Automatic logout on token expiry

8. Authentication System
User Authentication

Email and password login

Google social login

Firebase authentication handling

Authorization

JWT tokens issued by backend

Tokens stored securely in local storage

Role verification on protected routes

User Roles

User

Decorator

Admin

9. Dashboard Functionalities
9.1 User Dashboard

View profile

View booking history

Cancel or update bookings

Make payments

View payment history

Track service status

9.2 Admin Dashboard

Manage users

Approve decorator applications

Create, update, and delete services

Assign decorators to bookings

Monitor payments and revenue

View analytics and service demand charts

9.3 Decorator Dashboard

View assigned projects

Check daily schedule

Update service status

View earnings summary

10. Booking and Payment System
Booking System

Bookings are created with a pending status

Booking records include service details, date, and user information

Admin assigns decorators after payment confirmation

Payment System

Stripe payment integration

Secure payment intent creation

Payment records stored in database

Automatic booking status update after payment

11. Tracking System

The tracking system allows users to monitor service progress.

Features

Status updates stored in tracking collection

Timeline-based tracking

Real-time visibility for users

Decorators update status via dashboard

12. Security Measures

Environment variables for sensitive keys

JWT-based authentication

Role-based access control

Protected API routes

Secure payment handling via Stripe

13. Deployment and Environment Setup
Deployment Rules Followed

Environment variables stored securely

No CORS or server errors

Firebase authorized domains configured

Backend and frontend hosted separately

Environment Variables Used

MongoDB credentials

Firebase configuration

JWT secret

Stripe secret key

14. How StyleDecor Helps People
For Customers

Easy online booking

Transparent pricing

Secure payments

Real-time service tracking

Reduced waiting time

For Business Owners

Centralized service management

Improved decorator coordination

Automated payments

Business analytics and insights

Professional digital presence

For Decorators

Clear task assignments

Organized schedule

Easy status updates

Earnings tracking

15.Conclusion:

StyleDecor is a complete, production-ready solution for managing home and ceremony decoration services. By combining modern frontend technologies, a secure backend, and real-world business logic, the platform delivers value to users, decorators, and administrators alike. The system is scalable, maintainable, and designed to support future enhancements such as AI-based recommendations, coupon systems, and multi-location service expansion.