# Changelog

---

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- Given a version number MAJOR.MINOR.PATCH, increment the:
  1. MAJOR version when you make incompatible API changes
  2. MINOR version when you add functionality in a backwards compatible manner
  3. PATCH version when you make backwards compatible bug fixes
  4. Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

---

## Versions

### [1.8.0] - 2025-03-15

- Feature: coupon field on subscribe
- Feature: new plan validations on UI
- Feature: button and launch components previews on respective dialogs
- Fix: tooltip breaking button layout (columns) on page renderer

### [1.7.0] - 2025-03-11

- Feature: plans page with random banner and layout improvements

### [1.6.0] - 2025-03-08

- Feature: plans, payment handling and react-snap for pre-rendering

### [1.5.0] - 2025-03-01

- Feature: app icons rebranded

### [1.4.0] - 2025-03-01

- Feature: rebranding whole app; changed name to Pagefy

### [1.312.0] - 2022-11-27

- Feature: sign in with providers: Google, Facebook and Microsoft

### [1.31.0] - 2022-11-18

- Feature: Implemented profile gallery

### [1.30.4] - 2022-11-18

- Fix: Home 2 plans cards paddings, gaps
- Fix: Home 2 Section 1 removed space-between and replaced it by a responsive Stack
- Fix: Navigation menu with light bg when in respective route
- Fix: Removed mock data for testimonials
- Fix: Fixed slidy testimonials user picture into home 2
- Fix: Faqs now come from database

### [1.30.2] - 2022-11-14

- Refactor: Purchase pages with banner half page layouts
- Fix: User loggedin out of alignment
- Fix: Home2 buttons not opening pages
- Fix: logo with dark border for light BG

### [1.30.0] - 2022-11-14

- Feature: New signin and signup pages

### [1.29.0] - 2022-11-13

- Feature: New homepage

### [1.28.0] - 2022-11-10

- Feature: Floating phone page preview inside page editor.
- Fix: Draggable component layers numbers
- Fix: New color picker with fixed problems

### [1.27.0] - 2022-11-03

- Feature: Counters animation increasing it's number with time on page renderer

### [1.26.0] - 2022-11-03

- Feature: Testimonials implemented
- Refactor: auth token added to all requests with axios interceptors
- Refactor: auth error on the APIs now shows error toast from axios interceptors

### [1.25.0] - 2022-10-30

- Feature: Implemented counters

### [1.24.0] - 2022-10-29

- Feature: Implemented progress bar tool

### [1.23.0] - 2022-10-28

- Feature: Implemented Maps and Spotify tools in the page editor

### [1.22.0] - 2022-10-27

- Feature: Implemented customization of BG, fontColor, shadow and borders when creating a Launch component

### [1.21.0] - 2022-10-27

- Feature: Implemented Fixed Button to scroll up the screen

### [1.20.0] - 2022-10-27

- Feature: Implemented button type of TextOverImage

### [1.19.0] - 2022-10-27

- Feature: Removed the deleteImage request from everywhere, but the gallery.
- Feature: Implemented animation of scale when hovering page renderer components

### [1.18.0] - 2022-10-26

- Feature: added shadow feature in the button creation
- Feature: added button to upload file dialog to remove the current image

### [1.17.0] - 2022-10-26

- Feature: implemented whatsapp feature into the buttons and icons create-dialogs

### [1.16.1] - 2022-10-26

- Fix: Sign in and Sign up pages trimming email and names when submitting
- Fix: env var ALLOW_PURCHASE

### [1.16.0] - 2022-10-25

- Feature: tools now live in a dialog, opened by the + icon in the page editor toolbar
- Feature: new favicon with white BG
- Fix: Header now uses memoized components to optimize the application
- Feature: icons component (page editor and page renderer) now stay red on hover, to indicate deletion feature
- Feature: added constant on purchase-plan page to verify if the user can purchase any plan

### [1.15.1] - 2022-10-19

- Fix: Payment result screen only reads the status from the url now
- Fix: Added the finance tab title

### [1.15.0] - 2022-10-18

- Feature: Profile page for personal data
- Feature: Profile page for finance history
- Feature: Profile page for gallery (WIP)
- Feature: Payment screens:
  - Payment recurrency selection
  - Payment checkout with stripe component
  - Payment result
- Fix: header height and mobile logo

### [1.14.1] - 2022-10-10

- Fix: Custom script disabled in the page editor for non-Platinum user
- Fix: Profile cannot change plan anymore

### [1.14.0] - 2022-10-10

- Feature: user can insert javascript code in the page, to be executed in the page load/mount
- Feature: Custom scrollbar

### [1.13.0] - 2022-10-10

- Feature: Implemented feature to allow component till 8 rows
- Feature: Implmented feature to allow user to pick a border radius among pre-defined options

### [1.12.1] - 2022-10-09

- Fix: Gallery fix on loading/adding new images
-

### [1.12.0] - 2022-10-09

- Feature: Gallery implemented
- Fix: BG size behaving differently for mobile and desktop on page renderer

### [1.11.0] - 2022-10-08

- Feature: Added a red arrow upon the featured card

### [1.10.1] - 2022-10-08

- Fix: Testimonials wrapping and title in the homepage

### [1.10.0] - 2022-10-08

- Feature: Homepage testimonials

### [1.9.0] - 2022-10-08

- Fix: Homepage layout
- Fix: Page editor - icon tooltip
- Feature: New signin and register buttons on the header
- Fix: layouts adjustments

### [1.8.7] - 2022-10-07

- Feature: Localized definitive Faqs

### [1.8.6] - 2022-10-06

- Fix: Added Helmet to PageRenderer to test open graph tags

### [1.8.5] - 2022-10-06

- Feature: Open Graph implementation in page renderer

### [1.8.4] - 2022-10-06

- Fix: All components now can have tel, mailto etc. URLs

### [1.8.3] - 2022-10-04

- Fix: youtube video in page renderer. Remvoed toLowerCase() from urls when saving

### [1.8.2] - 2022-10-04

- Fix: Icon link on renderer and editor, for URI (mailto etc) or URL
- Feature: Ability to remove animation after duplicating a component

### [1.8.1] - 2022-10-04

- Fix: click on icon opening external link on page renderer
- Fix: Icon url not accepting Maps link

### [1.8.0] - 2022-10-03

- Feature: GDPR consent popup and cookies page
- Feature: create icon dialog now allows "tel:xxxx" and "mailto:xxxx@xxx.xxx"
- Fix: editor icon click doesn't open link anymore
- Fix: all urls .toLowerCase() before being saved

### [1.7.0] - 2022-10-03

- Feature: Terms of Use and Privacy Policies pages

### [1.6.0] - 2022-10-03

- Feature: plan enablements for the functionalities

### [1.5.0] - 2022-10-03

- Feature: New homepage with new banners and layout
- Feature: Profile page

### [1.4.0] - 2022-10-02

- Feature: Implemented ExternalLink and InternalLink components
- Feature: Implemented Footer

### [1.3.1] - 2022-10-02

- Fix: ReCAPTCHA feature
- Support feedback after sending message

### [1.3.0] - 2022-10-02

- Feature: Implemented ReCAPTCHA
- Send support message/email

### [1.2.0] - 2022-09-30

- Feature: Added page preview into the page editor, for the case of the page not being public. When the page is public, a new tab opens the final user page view, otherwise a dialog is open showing the page preview.

### [1.1.3] - 2022-09-29

- Fix: Draggable card (component into an user page) showing the wrong value for the clicks analytics tooltip
- Fix: When user added a new component the wrong object was being saved into the page's local state (without the component ID)
- Fix: Issue to remove or toggle visibility of a component
- Refactoring: All uploaded images are set to be saved into a unique folder called "uploaded-images" into the user's storage bucket
- Fix: Wrong translation of the component types
- Fix: Error dealing with the return of the updatePage endpoint

### [1.1.2] - 2022-09-28

- Fix: when rendered page/bio was loading, the website showed that the page wasn't public
- Fix: links not working in the rendered page
- Feature: Socialbio logo in the footer of the rendered page
- Fix: Create page dialog doesn't allow url with white spaces anymore

### [1.1.1] - 2022-09-28

- Fix: infinite loading
- Fix: new logic in the component of auth checker
- Feature: new styling in the user-page bottom toolbar icons
- Feature: New component for full width contents
- Refactoring: Homepage full width.

### [1.1.0] - 2022-09-28

- Implemented FAQ page with accordion skeleton
- Improvement in UI feedback for firebase errors
- Added email and password validation regex in the forms
- Updated LOGO
- When user clicks on header menu SUPPORT, he navigates 1st to FAQ, then support

### [1.0.2] - 2022-09-25

- user-pages reducer setting loading = false in for all error types

### [1.0.1] - 2022-09-25

- Home page clearing "loading" from global state

### [1.0.0] - 2022-09-18

- First release of the frontend on [RENDER](https://www.render.com)
