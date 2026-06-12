create a blog page on admin/articles

action: create, edit, delete

same card format as /articles page

give a form to write blogs: title, description, date, readDuration, writer

give predefined templates to use for blogs, also admin can add html in templates so it will format in te blog page.

article pages will be at /articles/[slug]

and the article url should be its title but removing all the special characters and spaces and in lowercase, hypenated.

example blog title: Monolithic Zirconia in 2026: A Complete Material Review
example url: /articles/monolithic-zirconia-in-2026-a-complete-material-review

- need to fix

/talks: Users need to manually refresh to see the video cards.

/admin/talks:

- Please add an option to lock a talk. On the user side, it should show as locked. To unlock it, the user needs to provide their name, email, and phone number, similar to the existing UI.

/education: The video does not play when clicking on the card.

/webinars: Users need to manually refresh to see the webinar cards.

/admin/customers:

- Do not use the same data from the Customer Stories and Reviews section.
- "More from our Partners" (Text Testimonials) is a separate section and has its own data. Please add an option to include partners separately.

Need to refactor the /admin/article page to create blogs. Create 3 predefined templates for blogs, and the admin will only use those 3 templates to create blogs. Use the Cloudinary API to upload images. The admin will upload the image, which will be stored in Cloudinary, and we will use the URL of the image in the blog. Use these environment variables to upload images.
CLOUDINARY_API_SECRET=8aubEf8rZACe_CBOwiIZ3oUjf38
CLOUDINARY_API_KEY=197418241346434

check the public\blog-page.png image and make the page /article/[slug] like that.

find product images from here src\app\assets\products and add the product images by there name to the correct product cards. Dont change anything else just add the product images correctly
