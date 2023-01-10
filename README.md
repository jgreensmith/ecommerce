## Nextjs e-commerce website builder (Shop)

This project uses nested dynamic routing to provide SSG e-commerce websites for small buisness owners.
you can view the project [here](https://ecommerce-eta-seven.vercel.app/)

and then follow the link to the example merchant!

<img width="1438" alt="Screenshot 2023-01-09 at 21 53 58" src="https://user-images.githubusercontent.com/71337767/211422957-dccba9ae-64ad-40fc-a9c4-b230296d51ca.png">

Elegent hover card banners are used on the products to reduce clutter on the Products page.

<img width="352" alt="Screenshot 2023-01-09 at 23 30 34" src="https://user-images.githubusercontent.com/71337767/211428904-b2cf9572-937b-414d-a6a8-c845f444576e.png">
<img width="621" alt="Screenshot 2023-01-09 at 23 39 18" src="https://user-images.githubusercontent.com/71337767/211429800-bc493fa2-0d0d-4ae2-baa1-9141bf983f3d.png">

To improve user experience, the customer can see the available variants of the product, they can easily filter through the variants and then the available quantity will match the inventory of that specific variant. This is much better for UX than dropdown menus.

<img width="439" alt="Screenshot 2023-01-10 at 12 39 20" src="https://user-images.githubusercontent.com/71337767/211554523-c10c154f-07f0-47b8-ade5-c2804fd45b43.png">

the project IDs are stored in the Mongodb Database and used with `getStaticPaths` and `getStaticProps` to provide the data for each storefront.

<img width="371" alt="Screenshot 2023-01-09 at 23 34 15" src="https://user-images.githubusercontent.com/71337767/211429274-c11e3a4f-e940-48ef-9438-ef7879a84a96.png">
<img width="552" alt="Screenshot 2023-01-09 at 23 35 55" src="https://user-images.githubusercontent.com/71337767/211429418-352d474f-482e-4228-9a1e-3f7ff88152e1.png">

The shop has default site settings incase the user doesn't wish to build their own custom website

## Repositories that make up the website builder

- [Sanity - Content Management System](https://github.com/jgreensmith/sanity-eccomerce-template) - Sanity is used to create schemas to provide content and site settings for each merchant. This repo will be cloned for each merchant, then by running `sanity init`, a new CMS project will be created with the same schemas. The project ID, and API keys will then be added to the database with the Control Panel

- [Control Panel](https://github.com/jgreensmith/company_control_panel) - The Control Panel is used to encrypt API keys and then add them along with the Sanity Project Id to the mongodb database.

- [Company Website - Authenticated Dashboard](https://github.com/jgreensmith/company) - an account can be created by signing up with credentials or google auth, after sending a nodemailer email verification link, the user data and hashed password is added to the database providing authentication. This creates a connected [Stripe](https://stripe.com/docs/connect) account, which enables the user to accept payments from their store!
