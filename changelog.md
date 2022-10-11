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
