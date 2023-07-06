- [x] Homepage view
- [x] Login view
- [x] Signup view
- [x] Profile view
- [x] Create Complaint view
- [x] Add User list in Profile view (only for Main)
- [x] Read and list Complaint && Report in Profile view (for Main)
- [x] Read and list Complaint && Report in Profile view (for User)
- [x] Add details button for Complaint && Report
- [x] Add delete button to delete Complaint && Report to list (only for Main)
- [x] Add buttons for Actions addition for Complaint && Report (only for User)
- [x] Add delete button for Actions in Complaint && Report (only for User)
- [x] Report detail view

# Models
- [x] Main model
- [x] User model
- [x] Complaint model
- [x] Report model
- [x] Action model

# User authentication
- [x] login setup
- [x] Signup setup
- [x] Logout setup

# Main Account
- [x] Create Main account
- [x] Read Main account
- [ ] Update Main account

# User Account
- [x] Create User by Main
- [x] Read Users by Main
- [ ] Update User by Main
- [x] Delete User by Main

# Complaint
- [x] Create Complaint
- [x] Read for all Complaint in list and in detail
- [x] Update for specific Complaint
- [x] Delete for specific Complaint (and Report in sequence)


# Report
- [x] Create Report by Complaint creation
- [x] Read all Reports in list and in detail => userId
- [x] Read all Reports in list and in detail => mainId
- [x] Update for specific Report => userId
- [x] Update for specific Report => mainId
- [x] Delete report by Complaint deletion

# Action
- [x] Create Action for specific Report part(see model) => userId
- [x] Read actions from specific Report => userId
- [x] Read actions from specific Report => mainId
- [x] Update action for specific Report => only userId
- [x] Delete action for specific Report => only userId
- [x] Delete action by Report deletion

# Middleware
- [x] Upload problemImg to Cloudinary
- [ ] Upload files (pptx, pdf, xlsx, etc.) to DB
- [ ] Migration to Atlas (by MongoDB)
