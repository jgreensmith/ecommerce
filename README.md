## Nextjs e-ccommerce website builder (Shop)

This project uses nested dynamic routing to provide SSG e-ccomerce websites for small buisness owners.
you can view the project [here](https://ecommerce-eta-seven.vercel.app/)

and then follow the link to the example merchant!

<img width="1438" alt="Screenshot 2023-01-09 at 21 53 58" src="https://user-images.githubusercontent.com/71337767/211422957-dccba9ae-64ad-40fc-a9c4-b230296d51ca.png">

the project IDs are stored in the Mongodb Database and used with `getStaticPaths` and `getStaticProps` to provide the data for each storefront.

The shop has default site settings incase the user doesn't wish to build their own custom website

## Repositories that make up the website builder

- [Sanity - Content Management System](https://github.com/jgreensmith/sanity-eccomerce-template) - Sanity is used to create schemas to provide content and site settings for each merchant. This repo will be cloned for each merchant, then by running `sanity init`, a new CMS project will be created with the same schemas. The project ID, and API keys will then be added to the database with the Control Panel

- [Control Panel](https://github.com/jgreensmith/company_control_panel) - The Control Panel is used to encrypt API keys and then add them along with the Sanity Project Id to the mongodb database.

- [Company Website - Authenticated Dashboard](https://github.com/jgreensmith/company) - an account can be created by signing up with credentials or google auth, after sending a nodemailer email verification link, the user data and hashed password is added to the database providing authentication. This creates a connected [Stripe](https://stripe.com/docs/connect) account, which enables the user to accept payments from their store!
